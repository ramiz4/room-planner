import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { ElementPropertiesComponent } from './components/element-properties.component';
import { JsonExportComponent } from './components/json-export.component';
import { JsonImportComponent } from './components/json-import.component';
import { RoomControlsComponent } from './components/room-controls.component';
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

@Component({
  selector: 'app-room-planner',
  templateUrl: './room-planner.component.html',
  imports: [
    CommonModule,
    RoomControlsComponent,
    JsonExportComponent,
    JsonImportComponent,
    ElementPropertiesComponent,
    CanvasInteractionDirective,
    ButtonFeedbackDirective,
  ],
})
export class RoomPlannerComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private drawingService = inject(CanvasDrawingService);
  private elementService = inject(ElementManagementService);

  // 📦 Reactive state
  readonly room = signal<Room>({
    width: ROOM_PLANNER_CONSTANTS.ROOM_WIDTH,
    height: ROOM_PLANNER_CONSTANTS.ROOM_HEIGHT,
    tables: [],
    staticElements: [],
  });

  readonly selectedId = signal<string | null>(null);
  readonly importedJSON = signal('');

  readonly selectedElement = computed(() => {
    return this.elementService.getSelectedElement(
      this.room(),
      this.selectedId(),
    );
  });

  readonly showElementProperties = signal(false);
  readonly showRoomControls = signal(false);
  readonly showExportManager = signal(false);
  readonly showImportManager = signal(false);
  readonly showElementGuide = signal(false);

  // 🧠 Redraw effect
  constructor() {
    effect(() => {
      const room = this.room();
      if (this.ctx) {
        this.drawingService.drawRoom(this.ctx, room, this.selectedId());
      }
    });
  }

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;

    // Initialize z-indices for any existing elements
    const roomWithZIndices = this.elementService.initializeZIndices(
      this.room(),
    );
    this.room.set(roomWithZIndices);

    // Trigger initial drawing now that canvas context is available
    this.drawingService.drawRoom(this.ctx, this.room(), this.selectedId());
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
  }

  onRoomWidthChange(width: number): void {
    this.room.update((r) => ({ ...r, width }));
  }

  onRoomHeightChange(height: number): void {
    this.room.update((r) => ({ ...r, height }));
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
    }
  }

  onImportLayout(room: Room): void {
    // Initialize z-indices for imported elements
    const roomWithZIndices = this.elementService.initializeZIndices(room);
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

  toggleElementProperties(): void {
    this.showElementProperties.update((v) => !v);
  }

  toggleRoomControls(): void {
    this.showRoomControls.update((v) => !v);
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
}
