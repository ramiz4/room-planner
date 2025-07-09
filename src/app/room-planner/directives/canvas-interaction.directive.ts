import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  AfterViewInit,
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
export class CanvasInteractionDirective implements AfterViewInit {
  private elementRef = inject(ElementRef<HTMLCanvasElement>);
  private elementService = inject(ElementManagementService);
  private drawingService = inject(CanvasDrawingService);

  @Input() room!: Room;
  @Input() selectedId: string | null = null;
  @Input() zoom = 1;
  @Input() cameraX = 0;
  @Input() cameraY = 0;

  @Output() interaction = new EventEmitter<CanvasInteractionEvent>();
  @Output() cameraChange = new EventEmitter<{ x: number; y: number }>();

  private resizing = false;
  private dragging = false;
  private panning = false;
  private offsetX = 0;
  private offsetY = 0;
  private panStartX = 0;
  private panStartY = 0;
  private lastTouchDistance = 0;
  private activeTouch: Touch | null = null;
  private pinchZooming = false;
  private touchPanning = false;
  private lastTouchCenter = { x: 0, y: 0 };

  private readonly MIN_ZOOM = 0.25;
  private readonly MAX_ZOOM = 3;

  ngAfterViewInit(): void {
    this.setupMouseEvents();
    this.setupTouchEvents();
    this.setupWheelEvents();
  }

  private setupMouseEvents(): void {
    const canvas = this.elementRef.nativeElement;

    canvas.addEventListener('mousedown', (e: MouseEvent) =>
      this.onMouseDown(e),
    );
    canvas.addEventListener('mousemove', (e: MouseEvent) =>
      this.onMouseMove(e),
    );
    canvas.addEventListener('mouseup', () => this.onMouseUp());
    canvas.addEventListener('mouseleave', () => this.onMouseUp());
  }

  private setupWheelEvents(): void {
    const canvas = this.elementRef.nativeElement;

    canvas.addEventListener(
      'wheel',
      (e: WheelEvent) => {
        e.preventDefault();
        this.onWheel(e);
      },
      { passive: false },
    );
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
      { passive: false },
    );

    canvas.addEventListener(
      'touchmove',
      (e: TouchEvent) => {
        e.preventDefault();
        this.onTouchMove(e);
      },
      { passive: false },
    );

    canvas.addEventListener(
      'touchend',
      (e: TouchEvent) => {
        e.preventDefault();
        this.onTouchEnd();
      },
      { passive: false },
    );

    canvas.addEventListener(
      'touchcancel',
      (e: TouchEvent) => {
        e.preventDefault();
        this.onTouchEnd();
      },
      { passive: false },
    );
  }

  private onMouseDown(event: MouseEvent): void {
    const coords = this.getMouseCoordinates(event);
    const element = this.elementService.findElementAt(
      this.room,
      coords.x,
      coords.y,
    );

    if (element) {
      this.interaction.emit({
        type: CanvasInteractionEventTypeEnum.SELECT,
        elementId: element.id,
        element,
      });

      if (
        this.elementService.isOverHandle(
          coords.x,
          coords.y,
          element,
          this.drawingService.handleSize,
        )
      ) {
        this.resizing = true;
      } else {
        this.dragging = true;
        this.offsetX = coords.x - element.x;
        this.offsetY = coords.y - element.y;
      }
    } else {
      this.interaction.emit({
        type: CanvasInteractionEventTypeEnum.SELECT,
        elementId: null,
      });

      // Start panning when clicking on empty space
      this.panning = true;
      this.panStartX = event.clientX;
      this.panStartY = event.clientY;
    }
  }

  private onMouseMove(event: MouseEvent): void {
    if (this.panning) {
      // Handle canvas panning with screen coordinates
      const deltaX = (event.clientX - this.panStartX) / this.zoom;
      const deltaY = (event.clientY - this.panStartY) / this.zoom;

      this.cameraChange.emit({
        x: this.cameraX - deltaX,
        y: this.cameraY - deltaY,
      });

      // Update pan start position for next frame
      this.panStartX = event.clientX;
      this.panStartY = event.clientY;
      return;
    }

    if (!this.selectedId) return;

    const element = this.elementService.getSelectedElement(
      this.room,
      this.selectedId,
    );
    if (!element) return;

    const coords = this.getMouseCoordinates(event);
    if (this.resizing) {
      if (element.shapeType === ShapeTypeEnum.CIRCLE) {
        // For circles, maintain aspect ratio by using the maximum dimension
        const deltaX = coords.x - element.x;
        const deltaY = coords.y - element.y;
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
        const newWidth = this.drawingService.snap(coords.x - element.x);
        const newHeight = this.drawingService.snap(coords.y - element.y);

        this.interaction.emit({
          type: CanvasInteractionEventTypeEnum.RESIZE,
          elementId: element.id,
          element,
          size: { width: newWidth, height: newHeight },
        });
      }
    } else if (this.dragging) {
      const newX = this.drawingService.snap(coords.x - this.offsetX);
      const newY = this.drawingService.snap(coords.y - this.offsetY);

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
    this.panning = false;
  }

  private onWheel(event: WheelEvent): void {
    // Only zoom when Ctrl key is pressed (like Figma/browser behavior)
    if (!event.ctrlKey) {
      return;
    }

    const delta = event.deltaY;
    const zoomFactor = 1 - delta * 0.001;

    // Get mouse position for zoom-to-cursor
    const canvas = this.elementRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Calculate world position before zoom
    const worldX = mouseX / this.zoom + this.cameraX;
    const worldY = mouseY / this.zoom + this.cameraY;

    const newZoom = Math.min(
      this.MAX_ZOOM,
      Math.max(this.MIN_ZOOM, this.zoom * zoomFactor),
    );

    // Calculate new camera position to keep mouse position fixed
    const newCameraX = worldX - mouseX / newZoom;
    const newCameraY = worldY - mouseY / newZoom;

    // Emit both zoom and camera changes
    this.interaction.emit({
      type: CanvasInteractionEventTypeEnum.ZOOM,
      elementId: null,
      zoom: newZoom,
    });

    this.cameraChange.emit({
      x: newCameraX,
      y: newCameraY,
    });
  }

  private getMouseCoordinates(event: MouseEvent): { x: number; y: number } {
    const canvas = this.elementRef.nativeElement;
    const rect = canvas.getBoundingClientRect();

    // Get screen coordinates relative to canvas
    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;

    // Convert screen coordinates to world coordinates
    const worldX = screenX / this.zoom + this.cameraX;
    const worldY = screenY / this.zoom + this.cameraY;

    return { x: worldX, y: worldY };
  }

  private getTouchCoordinates(touch: Touch): { x: number; y: number } {
    const canvas = this.elementRef.nativeElement;
    const rect = canvas.getBoundingClientRect();

    // Get screen coordinates relative to canvas
    const screenX = touch.clientX - rect.left;
    const screenY = touch.clientY - rect.top;

    // Convert screen coordinates to world coordinates
    const worldX = screenX / this.zoom + this.cameraX;
    const worldY = screenY / this.zoom + this.cameraY;

    return { x: worldX, y: worldY };
  }

  private getTouchDistance(touch1: Touch, touch2: Touch): number {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private getTouchCenter(
    touch1: Touch,
    touch2: Touch,
  ): { x: number; y: number } {
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    };
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
        coords.y,
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

        // Start single-touch panning on empty space
        this.panning = true;
        this.panStartX = touch.clientX;
        this.panStartY = touch.clientY;
      }
    } else if (touches.length === 2) {
      // Two-finger gestures
      this.activeTouch = null; // Clear single touch
      this.panning = false; // Stop single-finger panning

      const touch1Coords = this.getTouchCoordinates(touches[0]);
      const touch2Coords = this.getTouchCoordinates(touches[1]);

      if (this.selectedId) {
        const element = this.elementService.getSelectedElement(
          this.room,
          this.selectedId,
        );

        const touchesOnElement =
          element &&
          this.isTouchRelatedToElement(touch1Coords, element) &&
          this.isTouchRelatedToElement(touch2Coords, element);

        if (touchesOnElement) {
          // Two-finger pinch to resize when touches start on element
          this.resizing = true;
          this.dragging = false;
          this.lastTouchDistance = this.getTouchDistance(
            touches[0],
            touches[1],
          );
          return;
        }
      }

      // Default to canvas pan/zoom
      this.resizing = false;
      this.dragging = false;
      this.touchPanning = true;
      this.pinchZooming = true;
      this.lastTouchDistance = this.getTouchDistance(touches[0], touches[1]);
      this.lastTouchCenter = this.getTouchCenter(touches[0], touches[1]);
    }
  }

  private onTouchMove(event: TouchEvent): void {
    event.preventDefault(); // Prevent scrolling during drag/resize
    const touches = event.touches;

    if (touches.length === 1) {
      // Single touch handling
      if (this.panning) {
        // Single-finger panning
        const touch = touches[0];
        const deltaX = (touch.clientX - this.panStartX) / this.zoom;
        const deltaY = (touch.clientY - this.panStartY) / this.zoom;

        this.cameraChange.emit({
          x: this.cameraX - deltaX,
          y: this.cameraY - deltaY,
        });

        this.panStartX = touch.clientX;
        this.panStartY = touch.clientY;
        return;
      }

      if (!this.activeTouch || !this.selectedId) return;

      const touch = touches[0];
      const coords = this.getTouchCoordinates(touch);

      const element = this.elementService.getSelectedElement(
        this.room,
        this.selectedId,
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
          const newSize = this.drawingService.snap(
            Math.max(20, element.width + maxDelta * 2),
          );

          this.interaction.emit({
            type: CanvasInteractionEventTypeEnum.RESIZE,
            elementId: element.id,
            element,
            size: { width: newSize, height: newSize },
          });
        } else {
          // For rectangles, resize based on drag direction
          const newWidth = this.drawingService.snap(
            Math.max(20, element.width + deltaX),
          );
          const newHeight = this.drawingService.snap(
            Math.max(20, element.height + deltaY),
          );

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
    } else if (touches.length === 2) {
      // Two-finger gestures
      if (this.selectedId && this.resizing) {
        // Two-finger pinch resize for selected element
        const element = this.elementService.getSelectedElement(
          this.room,
          this.selectedId,
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
          const newWidth = this.drawingService.snap(
            element.width * scaleFactor,
          );
          const newHeight = this.drawingService.snap(
            element.height * scaleFactor,
          );

          this.interaction.emit({
            type: CanvasInteractionEventTypeEnum.RESIZE,
            elementId: element.id,
            element,
            size: { width: newWidth, height: newHeight },
          });
        }

        this.lastTouchDistance = currentDistance;
      } else if (this.touchPanning || this.pinchZooming) {
        // Two-finger pan and zoom when nothing is selected
        const currentDistance = this.getTouchDistance(touches[0], touches[1]);
        const currentCenter = this.getTouchCenter(touches[0], touches[1]);

        // Handle panning
        if (this.touchPanning) {
          const deltaX = (currentCenter.x - this.lastTouchCenter.x) / this.zoom;
          const deltaY = (currentCenter.y - this.lastTouchCenter.y) / this.zoom;

          this.cameraChange.emit({
            x: this.cameraX - deltaX,
            y: this.cameraY - deltaY,
          });
        }

        // Handle zooming
        if (this.pinchZooming && this.lastTouchDistance > 0) {
          const scaleFactor = currentDistance / this.lastTouchDistance;
          const newZoom = Math.min(
            this.MAX_ZOOM,
            Math.max(this.MIN_ZOOM, this.zoom * scaleFactor),
          );

          this.interaction.emit({
            type: CanvasInteractionEventTypeEnum.ZOOM,
            elementId: null,
            zoom: newZoom,
          });
        }

        // Update for next frame
        this.lastTouchDistance = currentDistance;
        this.lastTouchCenter = currentCenter;
      }
    }
  }

  private onTouchEnd(): void {
    this.resizing = false;
    this.dragging = false;
    this.panning = false;
    this.touchPanning = false;
    this.pinchZooming = false;
    this.activeTouch = null;
    this.lastTouchDistance = 0;
  }

  private isNearResizeHandle(
    x: number,
    y: number,
    element: RoomElement,
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

  private isInsideElement(x: number, y: number, element: RoomElement): boolean {
    if (element.shapeType === ShapeTypeEnum.RECTANGLE) {
      return (
        x >= element.x &&
        x <= element.x + element.width &&
        y >= element.y &&
        y <= element.y + element.height
      );
    }

    const cx = element.x + element.width / 2;
    const cy = element.y + element.height / 2;
    const radius = Math.min(element.width, element.height) / 2;
    const dx = x - cx;
    const dy = y - cy;
    return dx * dx + dy * dy <= radius * radius;
  }

  private isTouchRelatedToElement(
    coords: { x: number; y: number },
    element: RoomElement,
  ): boolean {
    return (
      this.isInsideElement(coords.x, coords.y, element) ||
      this.isNearResizeHandle(coords.x, coords.y, element)
    );
  }
}
