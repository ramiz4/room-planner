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
} from '../interfaces/canvas-interactio-event.interface';
import {
  RoomElement,
  ShapeTypeEnum,
} from '../interfaces/room-element.interface';
import { Room } from '../interfaces/room.interface';
import { CanvasDrawingService } from '../services/canvas-drawing.service';
import { ElementManagementService } from '../services/element-management.service';

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
  private lastTouchDistance = 0;
  private activeTouch: Touch | null = null;

  ngAfterViewInit(): void {
    this.setupMouseEvents();
    this.setupTouchEvents();
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

  private setupTouchEvents(): void {
    const canvas = this.elementRef.nativeElement;

    // Prevent default touch behaviors
    canvas.style.touchAction = 'none';

    canvas.addEventListener(
      'touchstart',
      (e: TouchEvent) => {
        e.preventDefault();
        this.onTouchStart(e);
      },
      { passive: false }
    );

    canvas.addEventListener(
      'touchmove',
      (e: TouchEvent) => {
        e.preventDefault();
        this.onTouchMove(e);
      },
      { passive: false }
    );

    canvas.addEventListener(
      'touchend',
      (e: TouchEvent) => {
        e.preventDefault();
        this.onTouchEnd(e);
      },
      { passive: false }
    );

    canvas.addEventListener(
      'touchcancel',
      (e: TouchEvent) => {
        e.preventDefault();
        this.onTouchEnd(e);
      },
      { passive: false }
    );
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
      if (element.shapeType === ShapeTypeEnum.CIRCLE) {
        // For circles, maintain aspect ratio by using the maximum dimension
        const deltaX = event.offsetX - element.x;
        const deltaY = event.offsetY - element.y;
        const maxDelta = Math.max(deltaX, deltaY);
        const newSize = this.drawingService.snap(maxDelta);

        this.interaction.emit({
          type: CanvasInteractionEventTypeEnum.RESIZE,
          elementId: element.id,
          element,
          size: { width: newSize, height: newSize },
        });
      } else {
        // For rectangles, allow independent width and height
        const newWidth = this.drawingService.snap(event.offsetX - element.x);
        const newHeight = this.drawingService.snap(event.offsetY - element.y);

        this.interaction.emit({
          type: CanvasInteractionEventTypeEnum.RESIZE,
          elementId: element.id,
          element,
          size: { width: newWidth, height: newHeight },
        });
      }
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

  private getTouchCoordinates(touch: Touch): { x: number; y: number } {
    const canvas = this.elementRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (touch.clientX - rect.left) * scaleX,
      y: (touch.clientY - rect.top) * scaleY,
    };
  }

  private getTouchDistance(touch1: Touch, touch2: Touch): number {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private onTouchStart(event: TouchEvent): void {
    event.preventDefault(); // Prevent scrolling and other default behaviors
    const touches = event.touches;

    if (touches.length === 1) {
      // Single touch - handle like mouse down for dragging/selection
      const touch = touches[0];
      const coords = this.getTouchCoordinates(touch);
      this.activeTouch = touch;

      const element = this.elementService.findElementAt(
        this.room,
        coords.x,
        coords.y
      );

      if (element) {
        this.interaction.emit({
          type: CanvasInteractionEventTypeEnum.SELECT,
          elementId: element.id,
          element,
        });

        // Check if touch is near resize handle
        if (this.isNearResizeHandle(coords.x, coords.y, element)) {
          this.resizing = true;
          this.dragging = false;
          this.offsetX = coords.x;
          this.offsetY = coords.y;
        } else {
          // Regular dragging
          this.dragging = true;
          this.resizing = false;
          this.offsetX = coords.x - element.x;
          this.offsetY = coords.y - element.y;
        }
      } else {
        this.interaction.emit({
          type: CanvasInteractionEventTypeEnum.SELECT,
          elementId: null,
        });
      }
    } else if (touches.length === 2 && this.selectedId) {
      // Two-finger pinch for resizing
      const element = this.elementService.getSelectedElement(
        this.room,
        this.selectedId
      );

      if (element) {
        this.resizing = true;
        this.dragging = false;
        this.lastTouchDistance = this.getTouchDistance(touches[0], touches[1]);
      }
    }
  }

  private onTouchMove(event: TouchEvent): void {
    event.preventDefault(); // Prevent scrolling during drag/resize
    if (!this.activeTouch && !this.resizing) return;

    const touches = event.touches;

    if (touches.length === 1 && this.selectedId) {
      const touch = touches[0];
      const coords = this.getTouchCoordinates(touch);

      const element = this.elementService.getSelectedElement(
        this.room,
        this.selectedId
      );

      if (!element) return;

      if (this.dragging) {
        // Single touch drag
        const newX = this.drawingService.snap(coords.x - this.offsetX);
        const newY = this.drawingService.snap(coords.y - this.offsetY);

        this.interaction.emit({
          type: CanvasInteractionEventTypeEnum.MOVE,
          elementId: element.id,
          element,
          position: { x: newX, y: newY },
        });
      } else if (this.resizing) {
        // Single touch resize using handle
        const deltaX = coords.x - this.offsetX;
        const deltaY = coords.y - this.offsetY;

        if (element.shapeType === ShapeTypeEnum.CIRCLE) {
          // For circles, use the maximum delta to maintain circle shape
          const maxDelta = Math.max(Math.abs(deltaX), Math.abs(deltaY));
          const newSize = this.drawingService.snap(Math.max(20, element.width + maxDelta * 2));

          this.interaction.emit({
            type: CanvasInteractionEventTypeEnum.RESIZE,
            elementId: element.id,
            element,
            size: { width: newSize, height: newSize },
          });
        } else {
          // For rectangles, resize based on drag direction
          const newWidth = this.drawingService.snap(Math.max(20, element.width + deltaX));
          const newHeight = this.drawingService.snap(Math.max(20, element.height + deltaY));

          this.interaction.emit({
            type: CanvasInteractionEventTypeEnum.RESIZE,
            elementId: element.id,
            element,
            size: { width: newWidth, height: newHeight },
          });
        }

        // Update offset for next move
        this.offsetX = coords.x;
        this.offsetY = coords.y;
      }
    } else if (touches.length === 2 && this.resizing && this.selectedId) {
      // Two-finger pinch resize
      const element = this.elementService.getSelectedElement(
        this.room,
        this.selectedId
      );

      if (!element) return;

      const currentDistance = this.getTouchDistance(touches[0], touches[1]);
      const scaleFactor = currentDistance / this.lastTouchDistance;

      if (element.shapeType === ShapeTypeEnum.CIRCLE) {
        // For circles, maintain aspect ratio
        const newSize = this.drawingService.snap(element.width * scaleFactor);

        this.interaction.emit({
          type: CanvasInteractionEventTypeEnum.RESIZE,
          elementId: element.id,
          element,
          size: { width: newSize, height: newSize },
        });
      } else {
        // For rectangles, scale both dimensions
        const newWidth = this.drawingService.snap(element.width * scaleFactor);
        const newHeight = this.drawingService.snap(
          element.height * scaleFactor
        );

        this.interaction.emit({
          type: CanvasInteractionEventTypeEnum.RESIZE,
          elementId: element.id,
          element,
          size: { width: newWidth, height: newHeight },
        });
      }

      this.lastTouchDistance = currentDistance;
    }
  }

  private onTouchEnd(event: TouchEvent): void {
    this.resizing = false;
    this.dragging = false;
    this.activeTouch = null;
    this.lastTouchDistance = 0;
  }

  private isNearResizeHandle(
    x: number,
    y: number,
    element: RoomElement
  ): boolean {
    const tolerance = 30; // Increased tolerance for touch
    const handleSize = 8;

    if (element.shapeType === 'circle') {
      const radius = Math.min(element.width, element.height) / 2;
      const centerX = element.x + element.width / 2;
      const centerY = element.y + element.height / 2;

      const angle = Math.PI / 4;
      const handleX = centerX + Math.cos(angle) * radius;
      const handleY = centerY + Math.sin(angle) * radius;

      return (
        Math.abs(x - handleX) < tolerance && Math.abs(y - handleY) < tolerance
      );
    } else {
      const handleX = element.x + element.width - handleSize / 2;
      const handleY = element.y + element.height - handleSize / 2;

      return (
        Math.abs(x - handleX) < tolerance && Math.abs(y - handleY) < tolerance
      );
    }
  }
}
