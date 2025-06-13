import { Injectable } from '@angular/core';
import { RoomElement } from '../interfaces/room-element.interface';
import { Room } from '../interfaces/room.interface';
import { ROOM_PLANNER_CONSTANTS } from '../constants/room-planner.constants';

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
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Draw elements in order: walls, decorations, tables, entrances
    this.drawElements(ctx, room.walls || [], selectedId);
    this.drawElements(ctx, room.decorations || [], selectedId);
    this.drawElements(ctx, room.tables, selectedId);
    this.drawElements(ctx, room.entrances, selectedId, true);
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

    if (el.type === 'rect') {
      this.drawRectangle(ctx, el, isSelected);
    } else if (el.type === 'circle') {
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
    ctx.fillRect(
      el.x + el.width - this.HANDLE_SIZE,
      el.y + el.height - this.HANDLE_SIZE,
      this.HANDLE_SIZE,
      this.HANDLE_SIZE
    );
  }

  private drawElementLabel(
    ctx: CanvasRenderingContext2D,
    el: RoomElement
  ): void {
    ctx.fillStyle = 'black';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (el.type === 'circle') {
      const centerX = el.x + el.width / 2;
      const centerY = el.y + el.height / 2;
      ctx.fillText(el.label!, centerX, centerY);
    } else {
      ctx.fillText(el.label!, el.x + el.width / 2, el.y + el.height / 2);
    }
  }

  snap(value: number): number {
    return Math.round(value / this.GRID_SIZE) * this.GRID_SIZE;
  }

  get handleSize(): number {
    return this.HANDLE_SIZE;
  }
}
