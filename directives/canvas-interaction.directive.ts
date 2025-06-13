import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { RoomElement } from '../room-element.interface';
import { Room } from '../room.interface';
import { CanvasDrawingService } from '../services/canvas-drawing.service';
import { ElementManagementService } from '../services/element-management.service';

export interface CanvasInteractionEvent {
  type: 'select' | 'move' | 'resize';
  elementId: string | null;
  element?: RoomElement;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
}

@Directive({
  selector: '[appCanvasInteraction]',
})
export class CanvasInteractionDirective {
  private elementRef = inject(ElementRef<HTMLCanvasElement>);
  private elementService = inject(ElementManagementService);
  private drawingService = inject(CanvasDrawingService);

  @Input() room!: Room;
  @Input() selectedId: string | null = null;

  @Output() interaction = new EventEmitter<CanvasInteractionEvent>();

  private resizing = false;
  private dragging = false;
  private offsetX = 0;
  private offsetY = 0;

  ngAfterViewInit(): void {
    this.setupMouseEvents();
  }

  private setupMouseEvents(): void {
    const canvas = this.elementRef.nativeElement;

    canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
    canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
    canvas.addEventListener('mouseup', () => this.onMouseUp());
    canvas.addEventListener('mouseleave', () => this.onMouseUp());
  }

  private onMouseDown(event: MouseEvent): void {
    const element = this.elementService.findElementAt(
      this.room,
      event.offsetX,
      event.offsetY
    );

    if (element) {
      this.interaction.emit({
        type: 'select',
        elementId: element.id,
        element,
      });

      if (
        this.elementService.isOverHandle(
          event.offsetX,
          event.offsetY,
          element,
          this.drawingService.handleSize
        )
      ) {
        this.resizing = true;
      } else {
        this.dragging = true;
        this.offsetX = event.offsetX - element.x;
        this.offsetY = event.offsetY - element.y;
      }
    } else {
      this.interaction.emit({
        type: 'select',
        elementId: null,
      });
    }
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.selectedId) return;

    const element = this.elementService.getSelectedElement(
      this.room,
      this.selectedId
    );
    if (!element) return;

    if (this.resizing) {
      const newWidth = this.drawingService.snap(event.offsetX - element.x);
      const newHeight = this.drawingService.snap(event.offsetY - element.y);

      this.interaction.emit({
        type: 'resize',
        elementId: element.id,
        element,
        size: { width: newWidth, height: newHeight },
      });
    } else if (this.dragging) {
      const newX = this.drawingService.snap(event.offsetX - this.offsetX);
      const newY = this.drawingService.snap(event.offsetY - this.offsetY);

      this.interaction.emit({
        type: 'move',
        elementId: element.id,
        element,
        position: { x: newX, y: newY },
      });
    }
  }

  private onMouseUp(): void {
    this.resizing = false;
    this.dragging = false;
  }
}
