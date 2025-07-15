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
  private readonly GRID_SIZE = ROOM_PLANNER_CONSTANTS.ROOM_GRID_SIZE;
  private readonly ELEMENT_OFFSET_X = 20; // Pixels to offset new elements horizontally
  private readonly ELEMENT_OFFSET_Y = 20; // Pixels to offset new elements vertically
  private lastElementPosition: { x: number; y: number } = {
    x: ROOM_PLANNER_CONSTANTS.ELEMENT_X_POSITION,
    y: ROOM_PLANNER_CONSTANTS.ELEMENT_Y_POSITION,
  };

  snap(value: number): number {
    return Math.round(value / this.GRID_SIZE) * this.GRID_SIZE;
  }

  clampPosition(room: Room, element: RoomElement): { x: number; y: number } {
    const x = Math.max(0, Math.min(element.x, room.width - element.width));
    const y = Math.max(0, Math.min(element.y, room.height - element.height));
    return { x, y };
  }

  private nextZIndex = 1;

  private calculateNextElementPosition(room: Room): { x: number; y: number } {
    // Calculate new position with offset
    let nextX = this.lastElementPosition.x + this.ELEMENT_OFFSET_X;
    let nextY = this.lastElementPosition.y + this.ELEMENT_OFFSET_Y;

    // Check if the new position would be outside the room bounds
    const elementWidth = ROOM_PLANNER_CONSTANTS.ELEMENT_WIDTH;
    const elementHeight = ROOM_PLANNER_CONSTANTS.ELEMENT_HEIGHT;

    // If element would go outside room bounds, wrap to next row or reset to start
    if (nextX + elementWidth > room.width) {
      nextX = ROOM_PLANNER_CONSTANTS.ELEMENT_X_POSITION;
      nextY += this.ELEMENT_OFFSET_Y;
    }

    // If element would go outside room height, reset to starting position
    if (nextY + elementHeight > room.height) {
      nextX = ROOM_PLANNER_CONSTANTS.ELEMENT_X_POSITION;
      nextY = ROOM_PLANNER_CONSTANTS.ELEMENT_Y_POSITION;
    }

    return { x: nextX, y: nextY };
  }

  createElement(
    elementType: ElementType,
    shapeType: ShapeType,
    room?: Room
  ): RoomElement {
    // Calculate position for new element
    let position;
    if (room) {
      position = this.calculateNextElementPosition(room);
      // Update last element position for next element
      this.lastElementPosition = position;
    } else {
      // Fallback to default position if room is not provided
      position = {
        x: ROOM_PLANNER_CONSTANTS.ELEMENT_X_POSITION,
        y: ROOM_PLANNER_CONSTANTS.ELEMENT_Y_POSITION,
      };
    }

    return {
      id: crypto.randomUUID(),
      x: this.snap(position.x),
      y: this.snap(position.y),
      width: this.snap(ROOM_PLANNER_CONSTANTS.ELEMENT_WIDTH),
      height: this.snap(ROOM_PLANNER_CONSTANTS.ELEMENT_HEIGHT),
      color: ROOM_PLANNER_CONSTANTS.ELEMENT_COLOR,
      label: elementType === ElementTypeEnum.TABLE ? 'Table' : 'Static Element',
      elementType: elementType,
      shapeType: shapeType,
      zIndex: this.nextZIndex++,
    };
  }

  updateElement(room: Room, id: string, update: Partial<RoomElement>): Room {
    // Find which array the element belongs to
    const tableEl = room.tables.find((el) => el.id === id);
    const staticEl = room.staticElements.find((el) => el.id === id);

    const applyUpdate = (el: RoomElement): RoomElement => {
      let updated = { ...el, ...update };
      if (updated.elementType === ElementTypeEnum.TABLE) {
        const pos = this.clampPosition(room, updated);
        updated = { ...updated, ...pos };
      }
      return updated;
    };

    if (tableEl) {
      return {
        ...room,
        tables: room.tables.map((el) => (el.id === id ? applyUpdate(el) : el)),
      };
    } else if (staticEl) {
      return {
        ...room,
        staticElements: room.staticElements.map((el) =>
          el.id === id ? applyUpdate(el) : el
        ),
      };
    }
    return room;
  }

  findElementAt(room: Room, x: number, y: number): RoomElement | null {
    // Combine all element types into a single array for hit testing
    // Sort by z-index (highest first) to check elements on top first
    const allElements = [...room.staticElements, ...room.tables].sort(
      (a, b) => (b.zIndex || 0) - (a.zIndex || 0)
    );

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
      room.staticElements.find((el) => el.id === selectedId) ||
      null
    );
  }

  bringElementToFront(room: Room, elementId: string): Room {
    // Find the current highest z-index
    const allElements = [...room.tables, ...room.staticElements];

    const maxZIndex = Math.max(...allElements.map((el) => el.zIndex || 0));
    const newZIndex = maxZIndex + 1;

    // Update the selected element's z-index
    return this.updateElement(room, elementId, { zIndex: newZIndex });
  }

  initializeZIndices(room: Room): Room {
    let zIndex = 1;
    const allElementArrays = [room.staticElements, room.tables];

    // Assign z-indices to elements that don't have them
    allElementArrays.forEach((elements) => {
      elements.forEach((element) => {
        if (element.zIndex === undefined) {
          element.zIndex = zIndex++;
        } else {
          zIndex = Math.max(zIndex, element.zIndex + 1);
        }
      });
    });

    // Update nextZIndex to continue from the highest assigned value
    this.nextZIndex = zIndex;

    return room;
  }

  deleteElement(room: Room, elementId: string): Room {
    return {
      ...room,
      tables: room.tables.filter((el) => el.id !== elementId),
      staticElements: room.staticElements.filter((el) => el.id !== elementId),
    };
  }

  resetElementPositioning(): void {
    this.lastElementPosition = {
      x: ROOM_PLANNER_CONSTANTS.ELEMENT_X_POSITION,
      y: ROOM_PLANNER_CONSTANTS.ELEMENT_Y_POSITION,
    };
  }
}
