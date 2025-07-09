import { Injectable } from '@angular/core';
import { ROOM_PLANNER_CONSTANTS } from '../constants/room-planner.constants';
import {
  RoomElement,
  ShapeTypeEnum,
} from '../interfaces/room-element.interface';
import { Room } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root',
})
export class CanvasDrawingService {
  private readonly HANDLE_SIZE = ROOM_PLANNER_CONSTANTS.ELEMENT_HANDLE_SIZE;
  private readonly GRID_SIZE = ROOM_PLANNER_CONSTANTS.ROOM_GRID_SIZE;

  drawRoom(
    ctx: CanvasRenderingContext2D,
    room: Room,
    selectedId: string | null,
    cameraX = 0,
    cameraY = 0,
    zoom = 1,
  ): void {
    const canvas = ctx.canvas;

    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save the current context state
    ctx.save();

    // Apply camera transform (zoom and pan)
    ctx.scale(zoom, zoom);
    ctx.translate(-cameraX, -cameraY);

    // Draw infinite grid
    this.drawInfiniteGrid(
      ctx,
      cameraX,
      cameraY,
      zoom,
      canvas.width,
      canvas.height,
    );

    // Draw room border
    ctx.strokeStyle = ROOM_PLANNER_CONSTANTS.ROOM_BORDER_COLOR;
    ctx.lineWidth = ROOM_PLANNER_CONSTANTS.ROOM_BORDER_WIDTH;
    ctx.strokeRect(0, 0, room.width, room.height);

    // Combine all elements and sort by z-index for proper layering
    const allElements = [...room.staticElements, ...room.tables].sort(
      (a, b) => (a.zIndex || 0) - (b.zIndex || 0),
    );

    // Draw all elements in z-index order
    this.drawElements(ctx, allElements, selectedId, true);

    // Restore the context state
    ctx.restore();
  }

  private drawInfiniteGrid(
    ctx: CanvasRenderingContext2D,
    cameraX: number,
    cameraY: number,
    zoom: number,
    canvasWidth: number,
    canvasHeight: number,
  ): void {
    const gridSize = this.GRID_SIZE * zoom;

    // Only draw grid if zoom level is appropriate
    if (gridSize < 5) return; // Too zoomed out

    ctx.strokeStyle = '#dedede'; // Light gray color for grid lines
    ctx.lineWidth = 0.5;

    // Calculate visible area in world coordinates
    const startX = Math.floor(cameraX / this.GRID_SIZE) * this.GRID_SIZE;
    const startY = Math.floor(cameraY / this.GRID_SIZE) * this.GRID_SIZE;
    const endX = cameraX + canvasWidth / zoom;
    const endY = cameraY + canvasHeight / zoom;

    // Draw vertical grid lines
    for (let x = startX; x <= endX; x += this.GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, cameraY);
      ctx.lineTo(x, endY);
      ctx.stroke();
    }

    // Draw horizontal grid lines
    for (let y = startY; y <= endY; y += this.GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(cameraX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();
    }
  }

  private drawElements(
    ctx: CanvasRenderingContext2D,
    elements: RoomElement[],
    selectedId: string | null,
    drawLabels = false,
  ): void {
    for (const element of elements) {
      this.drawElement(ctx, element, element.id === selectedId, drawLabels);
    }
  }

  private drawElement(
    ctx: CanvasRenderingContext2D,
    el: RoomElement,
    isSelected: boolean,
    drawLabel = false,
  ): void {
    ctx.fillStyle = el.color || ROOM_PLANNER_CONSTANTS.ELEMENT_COLOR;

    if (ROOM_PLANNER_CONSTANTS.ELEMENT_SHADOW_VISIBLE) {
      ctx.shadowColor = ROOM_PLANNER_CONSTANTS.ELEMENT_SHADOW_COLOR;
      ctx.shadowBlur = ROOM_PLANNER_CONSTANTS.ELEMENT_SHADOW_BLUR;
      ctx.shadowOffsetX = ROOM_PLANNER_CONSTANTS.ELEMENT_SHADOW_OFFSET_X;
      ctx.shadowOffsetY = ROOM_PLANNER_CONSTANTS.ELEMENT_SHADOW_OFFSET_Y;
    }

    if (el.shapeType === ShapeTypeEnum.RECTANGLE) {
      this.drawRectangle(ctx, el, isSelected);
    } else if (el.shapeType === ShapeTypeEnum.CIRCLE) {
      this.drawCircle(ctx, el, isSelected);
    }

    if (drawLabel && el.label) {
      this.drawElementLabel(ctx, el);
    }
  }

  private drawRectangle(
    ctx: CanvasRenderingContext2D,
    el: RoomElement,
    isSelected: boolean,
  ): void {
    ctx.fillRect(el.x, el.y, el.width, el.height);

    if (isSelected) {
      this.drawSelectionOutline(ctx, el);
      this.drawResizeHandle(ctx, el);
    }
  }

  private drawCircle(
    ctx: CanvasRenderingContext2D,
    el: RoomElement,
    isSelected: boolean,
  ): void {
    const radius = Math.min(el.width, el.height) / 2;
    const centerX = el.x + el.width / 2;
    const centerY = el.y + el.height / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    if (isSelected) {
      this.drawSelectionOutline(ctx, el);
      this.drawResizeHandle(ctx, el);
    }
  }

  private drawSelectionOutline(
    ctx: CanvasRenderingContext2D,
    el: RoomElement,
  ): void {
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 2;
    if (el.shapeType === ShapeTypeEnum.CIRCLE) {
      const radius = Math.min(el.width, el.height) / 2;
      const centerX = el.x + el.width / 2;
      const centerY = el.y + el.height / 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.strokeRect(el.x, el.y, el.width, el.height);
    }
  }

  private drawResizeHandle(
    ctx: CanvasRenderingContext2D,
    el: RoomElement,
  ): void {
    let handleX: number, handleY: number;

    if (el.shapeType === ShapeTypeEnum.CIRCLE) {
      // For circles, draw the handle on the edge of the circle
      const radius = Math.min(el.width, el.height) / 2;
      const centerX = el.x + el.width / 2;
      const centerY = el.y + el.height / 2;

      // Position handle at bottom-right edge of the circle
      const angle = Math.PI / 4; // 45 degrees
      handleX = centerX + Math.cos(angle) * radius - this.HANDLE_SIZE / 2;
      handleY = centerY + Math.sin(angle) * radius - this.HANDLE_SIZE / 2;
    } else {
      // For rectangles, use the original positioning
      handleX = el.x + el.width - this.HANDLE_SIZE;
      handleY = el.y + el.height - this.HANDLE_SIZE;
    }

    // Draw resize icon
    this.drawResizeIcon(ctx, handleX, handleY, this.HANDLE_SIZE);
  }

  private drawResizeIcon(
    ctx: CanvasRenderingContext2D,
    handleX: number,
    handleY: number,
    handleSize: number,
  ): void {
    ctx.save();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';

    // Calculate positions for the diagonal lines
    const padding = 3;
    const spacing = 4;
    const startX = handleX + handleSize - padding;
    const startY = handleY + handleSize - padding;

    // Draw three diagonal lines (bottom-right corner pattern)
    for (let i = 0; i < 3; i++) {
      const offset = i * spacing;

      ctx.beginPath();
      // First line of each set
      ctx.moveTo(startX - offset, startY);
      ctx.lineTo(startX, startY - offset);
      ctx.stroke();

      // Second line of each set (creates the double-line effect)
      ctx.beginPath();
      ctx.moveTo(startX - offset - 1, startY);
      ctx.lineTo(startX, startY - offset - 1);
      ctx.stroke();
    }

    ctx.restore();
  }

  private drawElementLabel(
    ctx: CanvasRenderingContext2D,
    el: RoomElement,
  ): void {
    // Reset shadow for text
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw white background for better readability
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const text = el.label || '';
    if (!text) return;

    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = 16; // Approximate height

    let centerX: number, centerY: number;

    if (el.shapeType === ShapeTypeEnum.CIRCLE) {
      centerX = el.x + el.width / 2;
      centerY = el.y + el.height / 2;
    } else {
      centerX = el.x + el.width / 2;
      centerY = el.y + el.height / 2;
    }

    // Draw background rectangle for text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(
      centerX - textWidth / 2 - 4,
      centerY - textHeight / 2 - 2,
      textWidth + 8,
      textHeight + 4,
    );

    // Draw border around text background
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 1;
    ctx.strokeRect(
      centerX - textWidth / 2 - 4,
      centerY - textHeight / 2 - 2,
      textWidth + 8,
      textHeight + 4,
    );

    // Draw text
    ctx.fillStyle = 'black';
    ctx.fillText(text, centerX, centerY);
  }

  private drawGrid(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ): void {
    ctx.strokeStyle = ROOM_PLANNER_CONSTANTS.ROOM_GRID_COLOR;
    ctx.lineWidth = ROOM_PLANNER_CONSTANTS.ROOM_GRID_WIDTH;
    ctx.setLineDash([]);

    // Draw vertical grid lines
    for (let x = this.GRID_SIZE; x < width; x += this.GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Draw horizontal grid lines
    for (let y = this.GRID_SIZE; y < height; y += this.GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  snap(value: number): number {
    return Math.round(value / this.GRID_SIZE) * this.GRID_SIZE;
  }

  get handleSize(): number {
    return this.HANDLE_SIZE;
  }
}
