import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {
  CanvasInteractionEvent,
  CanvasInteractionEventTypeEnum,
} from '../src/app/room-planner/interfaces/canvas-interactio-event.interface';
import { Room } from '../src/app/room-planner/interfaces/room.interface';
import { CanvasDrawingService } from '../src/app/room-planner/services/canvas-drawing.service';
import { ElementManagementService } from '../src/app/room-planner/services/element-management.service';

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

    canvas.addEventListener('mousedown', (e: MouseEvent) =>
      this.onMouseDown(e)
    );
    canvas.addEventListener('mousemove', (e: MouseEvent) =>
      this.onMouseMove(e)
    );
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
        type: CanvasInteractionEventTypeEnum.SELECT,
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
        type: CanvasInteractionEventTypeEnum.SELECT,
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
        type: CanvasInteractionEventTypeEnum.RESIZE,
        elementId: element.id,
        element,
        size: { width: newWidth, height: newHeight },
      });
    } else if (this.dragging) {
      const newX = this.drawingService.snap(event.offsetX - this.offsetX);
      const newY = this.drawingService.snap(event.offsetY - this.offsetY);

      this.interaction.emit({
        type: CanvasInteractionEventTypeEnum.MOVE,
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
