import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { JsonManagerComponent } from './components/json-manager.component';
import { RoomControlsComponent } from './components/room-controls.component';
import { CanvasInteractionDirective } from './directives/canvas-interaction.directive';
import { CanvasInteractionEvent } from './interfaces/canvas-interactio-event.interface';
import { RoomElement } from './interfaces/room-element.interface';
import { Room } from './interfaces/room.interface';
import { CanvasDrawingService } from './services/canvas-drawing.service';
import { ElementManagementService } from './services/element-management.service';

@Component({
  selector: 'app-room-planner',
  standalone: true,
  templateUrl: './room-planner.component.html',
  imports: [
    RoomControlsComponent,
    JsonManagerComponent,
    CanvasInteractionDirective,
  ],
})
export class RoomPlannerComponent {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private drawingService = inject(CanvasDrawingService);
  private elementService = inject(ElementManagementService);

  // 📦 Reactive state
  readonly room = signal<Room>({
    width: 600,
    height: 400,
    tables: [],
    entrances: [],
    decorations: [],
    walls: [],
  });

  readonly selectedId = signal<string | null>(null);
  readonly importedJSON = signal('');

  readonly selectedElement = computed(() => {
    return this.elementService.getSelectedElement(
      this.room(),
      this.selectedId()
    );
  });

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
  }

  // Event handlers for child components
  onAddElement(event: {
    elementType: 'table' | 'entrance' | 'decoration' | 'wall';
    shapeType: 'rect' | 'circle';
  }): void {
    const element = this.elementService.createElement(
      event.shapeType,
      event.elementType
    );

    this.room.update((room) => {
      switch (event.elementType) {
        case 'table':
          return { ...room, tables: [...room.tables, element] };
        case 'entrance':
          return { ...room, entrances: [...room.entrances, element] };
        case 'decoration':
          return {
            ...room,
            decorations: [...(room.decorations || []), element],
          };
        case 'wall':
          return { ...room, walls: [...(room.walls || []), element] };
        default:
          return room;
      }
    });
  }

  onClearElements(): void {
    this.room.update((r) => ({
      ...r,
      tables: [],
      entrances: [],
      decorations: [],
      walls: [],
    }));
    this.selectedId.set(null);
  }

  onRoomWidthChange(width: number): void {
    this.room.update((r) => ({ ...r, width }));
  }

  onRoomHeightChange(height: number): void {
    this.room.update((r) => ({ ...r, height }));
  }

  onCanvasInteraction(event: CanvasInteractionEvent): void {
    switch (event.type) {
      case 'select':
        this.selectedId.set(event.elementId);
        break;
      case 'move':
        if (event.elementId && event.position) {
          this.updateElement(event.elementId, {
            x: event.position.x,
            y: event.position.y,
          });
        }
        break;
      case 'resize':
        if (event.elementId && event.size) {
          this.updateElement(event.elementId, {
            width: event.size.width,
            height: event.size.height,
          });
        }
        break;
    }
  }

  onImportLayout(room: Room): void {
    this.room.set(room);
    this.selectedId.set(null);
  }

  onImportedJsonChange(json: string): void {
    this.importedJSON.set(json);
  }

  private updateElement(id: string, update: Partial<RoomElement>): void {
    const updatedRoom = this.elementService.updateElement(
      this.room(),
      id,
      update
    );
    this.room.set(updatedRoom);
  }
}
