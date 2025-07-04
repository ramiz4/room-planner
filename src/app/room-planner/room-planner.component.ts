import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { AddElementsDropdownComponent } from './components/add-elements-dropdown.component';
import { ElementPropertiesComponent } from './components/element-properties.component';
import { JsonExportComponent } from './components/json-export.component';
import { JsonImportComponent } from './components/json-import.component';
import { RoomSizeControlsComponent } from './components/room-size-controls.component';
import { ZoomControlsComponent } from './components/zoom-controls.component';
import { ROOM_PLANNER_CONSTANTS } from './constants/room-planner.constants';
import { ButtonFeedbackDirective } from './directives/button-feedback.directive';
import { CanvasInteractionDirective } from './directives/canvas-interaction.directive';
import {
  CanvasInteractionEvent,
  CanvasInteractionEventTypeEnum,
} from './interfaces/canvas-interactio-event.interface';
import {
  ElementType,
  ElementTypeEnum,
  RoomElement,
  ShapeType,
} from './interfaces/room-element.interface';
import { Room } from './interfaces/room.interface';
import { CanvasDrawingService } from './services/canvas-drawing.service';
import { ElementManagementService } from './services/element-management.service';
import { RoomStorageService } from './services/room-storage.service';

@Component({
  selector: 'app-room-planner',
  templateUrl: './room-planner.component.html',
  imports: [
    CommonModule,
    AddElementsDropdownComponent,
    RoomSizeControlsComponent,
    JsonExportComponent,
    JsonImportComponent,
    ElementPropertiesComponent,
    CanvasInteractionDirective,
    ButtonFeedbackDirective,
    ZoomControlsComponent,
  ],
})
export class RoomPlannerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private drawingService = inject(CanvasDrawingService);
  private elementService = inject(ElementManagementService);
  private storageService = inject(RoomStorageService);

  // 📦 Reactive state
  readonly room = signal<Room>(this.initializeRoom());

  readonly selectedId = signal<string | null>(null);
  readonly importedJSON = signal('');
  readonly zoomLevel = signal(1);
  readonly cameraX = signal(0);
  readonly cameraY = signal(0);

  readonly selectedElement = computed(() => {
    return this.elementService.getSelectedElement(
      this.room(),
      this.selectedId(),
    );
  });

  readonly hasElements = computed(() => {
    const room = this.room();
    return room.tables.length > 0 || room.staticElements.length > 0;
  });

  readonly showExportManager = signal(false);
  readonly showImportManager = signal(false);
  readonly showElementGuide = signal(false);

  private resizeListener = () => this.updateCanvasSize();

  // Initialize room from storage or defaults
  private initializeRoom(): Room {
    const savedRoom = this.storageService.loadRoom();
    if (savedRoom) {
      return savedRoom;
    }

    return {
      width: ROOM_PLANNER_CONSTANTS.ROOM_WIDTH,
      height: ROOM_PLANNER_CONSTANTS.ROOM_HEIGHT,
      widthMeters: ROOM_PLANNER_CONSTANTS.ROOM_WIDTH_METERS,
      heightMeters: ROOM_PLANNER_CONSTANTS.ROOM_HEIGHT_METERS,
      tables: [],
      staticElements: [],
    };
  }

  // 🧠 Redraw effect
  constructor() {
    effect(() => {
      const room = this.room();
      const cameraX = this.cameraX();
      const cameraY = this.cameraY();
      const zoom = this.zoomLevel();

      if (this.ctx) {
        this.drawingService.drawRoom(
          this.ctx,
          room,
          this.selectedId(),
          cameraX,
          cameraY,
          zoom,
        );
      }
    });

    // 💾 Auto-save effect
    effect(() => {
      const room = this.room();
      this.storageService.saveRoom(room);
    });
  }

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;

    // Set canvas size to viewport size
    this.updateCanvasSize();

    // Listen for window resize
    window.addEventListener('resize', this.resizeListener);

    // Initialize z-indices for any existing elements
    const roomWithZIndices = this.elementService.initializeZIndices(
      this.room(),
    );
    this.room.set(roomWithZIndices);

    // Center the room in the viewport initially
    this.centerRoomInViewport();

    // Trigger initial drawing
    this.drawingService.drawRoom(
      this.ctx,
      this.room(),
      this.selectedId(),
      this.cameraX(),
      this.cameraY(),
      this.zoomLevel(),
    );
  }

  private updateCanvasSize(): void {
    const canvas = this.canvasRef.nativeElement;
    const dpr = window.devicePixelRatio || 1;

    // Set canvas to viewport size
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Scale context for high DPI displays
    this.ctx.scale(dpr, dpr);

    // Redraw after resize
    if (this.room()) {
      this.drawingService.drawRoom(
        this.ctx,
        this.room(),
        this.selectedId(),
        this.cameraX(),
        this.cameraY(),
        this.zoomLevel(),
      );
    }
  }

  private centerRoomInViewport(): void {
    const room = this.room();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Center the room in the viewport
    const centerX = (viewportWidth - room.width) / 2;
    const centerY = (viewportHeight - room.height) / 2;

    this.cameraX.set(-centerX);
    this.cameraY.set(-centerY);
  }

  // Event handlers for child components
  onAddElement(event: {
    elementType: ElementType;
    shapeType: ShapeType;
  }): void {
    const element = this.elementService.createElement(
      event.elementType,
      event.shapeType,
      this.room(), // Pass the current room to enable offset positioning
    );

    this.room.update((room) => {
      switch (event.elementType) {
        case ElementTypeEnum.TABLE:
          return { ...room, tables: [...room.tables, element] };
        case ElementTypeEnum.STATIC:
          return { ...room, staticElements: [...room.staticElements, element] };
        default:
          return room;
      }
    });

    // Select the newly added element and bring it to front
    this.selectedId.set(element.id);
    this.showGuide();
  }

  onClearElements(): void {
    this.room.update((r) => ({
      ...r,
      tables: [],
      staticElements: [],
    }));
    this.selectedId.set(null);
    // Reset element positioning to start from the beginning
    this.elementService.resetElementPositioning();
    // Clear storage as well
    this.storageService.clearRoom();
  }

  onRoomWidthMetersChange(widthMeters: number): void {
    const widthPixels = this.metersToPixels(widthMeters);
    this.room.update((r) => ({
      ...r,
      width: widthPixels,
      widthMeters: widthMeters,
    }));
  }

  onRoomHeightMetersChange(heightMeters: number): void {
    const heightPixels = this.metersToPixels(heightMeters);
    this.room.update((r) => ({
      ...r,
      height: heightPixels,
      heightMeters: heightMeters,
    }));
  }

  private metersToPixels(meters: number): number {
    return Math.round(meters * ROOM_PLANNER_CONSTANTS.PIXELS_PER_METER);
  }

  private pixelsToMeters(pixels: number): number {
    return (
      Math.round((pixels / ROOM_PLANNER_CONSTANTS.PIXELS_PER_METER) * 10) / 10
    );
  }

  onCanvasInteraction(event: CanvasInteractionEvent): void {
    switch (event.type) {
      case CanvasInteractionEventTypeEnum.SELECT:
        if (event.elementId) {
          // Bring the selected element to front
          const updatedRoom = this.elementService.bringElementToFront(
            this.room(),
            event.elementId,
          );
          this.room.set(updatedRoom);
        }
        this.selectedId.set(event.elementId);
        break;
      case CanvasInteractionEventTypeEnum.MOVE:
        if (event.elementId && event.position) {
          this.onUpdateElement(event.elementId, {
            x: event.position.x,
            y: event.position.y,
          });
        }
        break;
      case CanvasInteractionEventTypeEnum.RESIZE:
        if (event.elementId && event.size) {
          this.onUpdateElement(event.elementId, {
            width: event.size.width,
            height: event.size.height,
          });
        }
        break;
      case CanvasInteractionEventTypeEnum.ZOOM:
        if (event.zoom) {
          this.zoomLevel.set(event.zoom);
        }
        break;
    }
  }

  onZoomChange(zoom: number): void {
    this.zoomLevel.set(zoom);
  }

  onPanChange(pan: { x: number; y: number }): void {
    this.cameraX.set(pan.x);
    this.cameraY.set(pan.y);
  }

  onCameraChange(camera: { x: number; y: number }): void {
    this.cameraX.set(camera.x);
    this.cameraY.set(camera.y);
  }

  onImportLayout(room: Room): void {
    // Ensure meter values are calculated if not present
    const roomWithMeters = {
      ...room,
      widthMeters: room.widthMeters ?? this.pixelsToMeters(room.width),
      heightMeters: room.heightMeters ?? this.pixelsToMeters(room.height),
    };

    // Initialize z-indices for imported elements
    const roomWithZIndices =
      this.elementService.initializeZIndices(roomWithMeters);
    this.room.set(roomWithZIndices);
    this.selectedId.set(null);
    // Clear the imported JSON after successful import
    this.importedJSON.set('');
    // Reset element positioning to start from the beginning
    this.elementService.resetElementPositioning();
  }

  onImportedJsonChange(json: string): void {
    this.importedJSON.set(json);
  }

  onUpdateElement(elementId: string, update: Partial<RoomElement>): void {
    const updatedRoom = this.elementService.updateElement(
      this.room(),
      elementId,
      update,
    );
    this.room.set(updatedRoom);
  }

  onDeleteElement(elementId: string): void {
    const updatedRoom = this.elementService.deleteElement(
      this.room(),
      elementId,
    );
    this.room.set(updatedRoom);
    this.selectedId.set(null);
  }

  onDuplicateElement(elementId: string): void {
    const element = this.elementService.getSelectedElement(
      this.room(),
      elementId,
    );
    if (!element) return;

    const duplicatedElement = this.elementService.createElement(
      element.elementType,
      element.shapeType || 'rectangle',
      this.room(), // Pass the current room for offset positioning
    );

    // Position the duplicate slightly offset from the original
    duplicatedElement.x = element.x + 20;
    duplicatedElement.y = element.y + 20;
    duplicatedElement.width = element.width;
    duplicatedElement.height = element.height;
    duplicatedElement.color = element.color;
    duplicatedElement.label = element.label
      ? `${element.label} Copy`
      : undefined;

    this.room.update((room) => {
      switch (element.elementType) {
        case ElementTypeEnum.TABLE:
          return { ...room, tables: [...room.tables, duplicatedElement] };
        case ElementTypeEnum.STATIC:
          return {
            ...room,
            staticElements: [...room.staticElements, duplicatedElement],
          };
        default:
          return room;
      }
    });

    // Select the duplicated element
    this.selectedId.set(duplicatedElement.id);
  }

  onCenterElement(elementId: string): void {
    const element = this.elementService.getSelectedElement(
      this.room(),
      elementId,
    );
    if (!element) return;

    const room = this.room();
    const centerX = (room.width - element.width) / 2;
    const centerY = (room.height - element.height) / 2;

    this.onUpdateElement(elementId, { x: centerX, y: centerY });
  }

  toggleExportManager(): void {
    this.showExportManager.update((v) => !v);
  }

  toggleImportManager(): void {
    this.showImportManager.update((v) => !v);
  }

  showGuide(): void {
    this.showElementGuide.set(true);
    setTimeout(() => this.showElementGuide.set(false), 4000);
  }

  ngOnDestroy() {
    // Cleanup if necessary
    window.removeEventListener('resize', this.resizeListener);
  }
}
