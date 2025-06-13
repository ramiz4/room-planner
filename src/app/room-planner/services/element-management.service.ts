import { Injectable } from '@angular/core';
import { ROOM_PLANNER_CONSTANTS } from '../constants/room-planner.constants';
import {
  ElementType,
  ElementTypeEnum,
  RoomElement,
  ShapeType,
  ShapeTypeEnum,
} from '../interfaces/room-element.interface';
import { Room } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root',
})
export class ElementManagementService {
  private readonly GRID_SIZE = ROOM_PLANNER_CONSTANTS.GRID_SIZE;

  snap(value: number): number {
    return Math.round(value / this.GRID_SIZE) * this.GRID_SIZE;
  }

  createElement(elementType: ElementType, shapeType: ShapeType): RoomElement {
    const baseElement: RoomElement = {
      id: crypto.randomUUID(),
      x: this.snap(100),
      y: this.snap(100),
      width: this.snap(100),
      height: this.snap(60),
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      elementType: elementType,
      shapeType: shapeType,
    };

    // Customize based on element type
    switch (elementType) {
      case ElementTypeEnum.TABLE:
        return {
          ...baseElement,
          width: this.snap(80),
          height: this.snap(40),
          color: '#FFD700',
          label: 'Table',
        };
      case ElementTypeEnum.ENTRANCE:
        return {
          ...baseElement,
          x: this.snap(50),
          y: this.snap(0),
          width: this.snap(80),
          height: this.snap(30),
          color: '#808080',
          label: 'Entrance',
        };
      case ElementTypeEnum.WALL:
        return {
          ...baseElement,
          width: this.snap(200),
          height: this.snap(20),
          color: '#8B4513',
          label: 'Wall',
        };
      case ElementTypeEnum.DECORATION:
        return {
          ...baseElement,
          width: this.snap(50),
          height: this.snap(50),
          color: '#32CD32',
          label: 'Deco',
        };
      default:
        return baseElement;
    }
  }

  updateElement(room: Room, id: string, update: Partial<RoomElement>): Room {
    // Find which array the element belongs to
    const tableEl = room.tables.find((el) => el.id === id);
    const entranceEl = room.entrances.find((el) => el.id === id);
    const decorationEl = room.decorations?.find((el) => el.id === id);
    const wallEl = room.walls?.find((el) => el.id === id);

    if (tableEl) {
      return {
        ...room,
        tables: room.tables.map((el) =>
          el.id === id ? { ...el, ...update } : el
        ),
      };
    } else if (entranceEl) {
      return {
        ...room,
        entrances: room.entrances.map((el) =>
          el.id === id ? { ...el, ...update } : el
        ),
      };
    } else if (decorationEl) {
      return {
        ...room,
        decorations: room.decorations!.map((el) =>
          el.id === id ? { ...el, ...update } : el
        ),
      };
    } else if (wallEl) {
      return {
        ...room,
        walls: room.walls!.map((el) =>
          el.id === id ? { ...el, ...update } : el
        ),
      };
    }
    return room;
  }

  findElementAt(room: Room, x: number, y: number): RoomElement | null {
    // Combine all element types into a single array for hit testing
    // Reverse to check elements drawn on top (later in the array) first
    const allElements = [
      ...(room.walls || []),
      ...(room.decorations || []),
      ...room.tables,
      ...room.entrances,
    ].reverse();

    return (
      allElements.find((el) => {
        if (el.shapeType === ShapeTypeEnum.RECTANGLE) {
          return (
            x >= el.x &&
            x <= el.x + el.width &&
            y >= el.y &&
            y <= el.y + el.height
          );
        } else if (el.shapeType === ShapeTypeEnum.CIRCLE) {
          const cx = el.x + el.width / 2;
          const cy = el.y + el.height / 2;
          const dx = (x - cx) / (el.width / 2);
          const dy = (y - cy) / (el.height / 2);
          return dx * dx + dy * dy <= 1;
        }
        return false;
      }) ?? null
    );
  }

  isOverHandle(
    x: number,
    y: number,
    element: RoomElement,
    handleSize: number
  ): boolean {
    if (element.shapeType === ShapeTypeEnum.CIRCLE) {
      // For circles, check if mouse is over the handle on the circle edge
      const radius = Math.min(element.width, element.height) / 2;
      const centerX = element.x + element.width / 2;
      const centerY = element.y + element.height / 2;

      // Handle position at bottom-right edge of the circle
      const angle = Math.PI / 4; // 45 degrees
      const handleX = centerX + Math.cos(angle) * radius - handleSize / 2;
      const handleY = centerY + Math.sin(angle) * radius - handleSize / 2;

      return (
        x >= handleX &&
        x <= handleX + handleSize &&
        y >= handleY &&
        y <= handleY + handleSize
      );
    } else {
      // For rectangles, use the original logic
      const handleX = element.x + element.width - handleSize;
      const handleY = element.y + element.height - handleSize;
      return (
        x >= handleX &&
        x <= handleX + handleSize &&
        y >= handleY &&
        y <= handleY + handleSize
      );
    }
  }

  getSelectedElement(
    room: Room,
    selectedId: string | null
  ): RoomElement | null {
    if (!selectedId) return null;

    return (
      room.tables.find((el) => el.id === selectedId) ||
      room.entrances.find((el) => el.id === selectedId) ||
      room.decorations?.find((el) => el.id === selectedId) ||
      room.walls?.find((el) => el.id === selectedId) ||
      null
    );
  }
}
