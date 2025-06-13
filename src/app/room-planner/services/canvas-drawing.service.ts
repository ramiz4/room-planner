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
  private readonly HANDLE_SIZE = ROOM_PLANNER_CONSTANTS.HANDLE_SIZE;
  private readonly GRID_SIZE = ROOM_PLANNER_CONSTANTS.GRID_SIZE;

  drawRoom(
    ctx: CanvasRenderingContext2D,
    room: Room,
    selectedId: string | null
  ): void {
    const canvas = ctx.canvas;
    canvas.width = room.width;
    canvas.height = room.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    this.drawGrid(ctx, canvas.width, canvas.height);

    // Draw room border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Combine all elements and sort by z-index for proper layering
    const allElements = [
      ...(room.walls || []),
      ...(room.decorations || []),
      ...room.tables,
      ...room.entrances,
    ].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

    // Draw all elements in z-index order
    this.drawElements(ctx, allElements, selectedId, true);
  }

  private drawElements(
    ctx: CanvasRenderingContext2D,
    elements: RoomElement[],
    selectedId: string | null,
    drawLabels = false
  ): void {
    for (const element of elements) {
      this.drawElement(ctx, element, element.id === selectedId, drawLabels);
    }
  }

  private drawElement(
    ctx: CanvasRenderingContext2D,
    el: RoomElement,
    isSelected: boolean,
    drawLabel = false
  ): void {
    ctx.fillStyle = el.color || 'gray';
    // Apply shadow effect
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

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
    isSelected: boolean
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
    isSelected: boolean
  ): void {
    const radius = Math.min(el.width, el.height) / 2;
    const centerX = el.x + el.width / 2;
    const centerY = el.y + el.height / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    if (isSelected) {
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
      this.drawResizeHandle(ctx, el);
    }
  }

  private drawSelectionOutline(
    ctx: CanvasRenderingContext2D,
    el: RoomElement
  ): void {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.strokeRect(el.x, el.y, el.width, el.height);
  }

  private drawResizeHandle(
    ctx: CanvasRenderingContext2D,
    el: RoomElement
  ): void {
    ctx.fillStyle = 'black';

    if (el.shapeType === ShapeTypeEnum.CIRCLE) {
      // For circles, draw the handle on the edge of the circle
      const radius = Math.min(el.width, el.height) / 2;
      const centerX = el.x + el.width / 2;
      const centerY = el.y + el.height / 2;

      // Position handle at bottom-right edge of the circle
      const angle = Math.PI / 4; // 45 degrees
      const handleX = centerX + Math.cos(angle) * radius - this.HANDLE_SIZE / 2;
      const handleY = centerY + Math.sin(angle) * radius - this.HANDLE_SIZE / 2;

      ctx.fillRect(handleX, handleY, this.HANDLE_SIZE, this.HANDLE_SIZE);
    } else {
      // For rectangles, use the original positioning
      ctx.fillRect(
        el.x + el.width - this.HANDLE_SIZE,
        el.y + el.height - this.HANDLE_SIZE,
        this.HANDLE_SIZE,
        this.HANDLE_SIZE
      );
    }
  }

  private drawElementLabel(
    ctx: CanvasRenderingContext2D,
    el: RoomElement
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
      textHeight + 4
    );

    // Draw border around text background
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 1;
    ctx.strokeRect(
      centerX - textWidth / 2 - 4,
      centerY - textHeight / 2 - 2,
      textWidth + 8,
      textHeight + 4
    );

    // Draw text
    ctx.fillStyle = 'black';
    ctx.fillText(text, centerX, centerY);
  }

  private drawGrid(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ): void {
    ctx.strokeStyle = '#e5e7eb'; // Light gray color
    ctx.lineWidth = 1;
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
