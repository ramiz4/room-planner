import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ElementType,
  ElementTypeEnum,
  ShapeType,
  ShapeTypeEnum,
} from '../interfaces/room-element.interface';
import { Room } from '../interfaces/room.interface';

@Component({
  selector: 'app-room-controls',
  template: `
    <div class="controls">
      <div class="room-settings">
        <label>
          Width:
          <input
            type="number"
            [value]="room.width"
            (input)="onRoomWidthChange($event)"
          />
        </label>

        <label>
          Height:
          <input
            type="number"
            [value]="room.height"
            (input)="onRoomHeightChange($event)"
          />
        </label>
      </div>

      <div class="element-controls">
        <button
          (click)="onAddElement(elementTypeEnum.TABLE, shapeTypeEnum.RECTANGLE)"
        >
          Add Table (rect)
        </button>
        <button
          (click)="onAddElement(elementTypeEnum.TABLE, shapeTypeEnum.CIRCLE)"
        >
          Add Table (circle)
        </button>
        <button
          (click)="
            onAddElement(elementTypeEnum.ENTRANCE, shapeTypeEnum.RECTANGLE)
          "
        >
          Add Entrance
        </button>
        <button
          (click)="onAddElement(elementTypeEnum.WALL, shapeTypeEnum.RECTANGLE)"
        >
          Add Wall
        </button>
        <button
          (click)="
            onAddElement(elementTypeEnum.DECORATION, shapeTypeEnum.CIRCLE)
          "
        >
          Add Decoration
        </button>
      </div>

      <div class="action-controls">
        <button (click)="onClearElements()" class="danger">Clear All</button>
      </div>
    </div>
  `,
})
export class RoomControlsComponent {
  @Input() room!: Room;

  @Output() roomWidthChange = new EventEmitter<number>();
  @Output() roomHeightChange = new EventEmitter<number>();
  @Output() addElement = new EventEmitter<{
    elementType: ElementType;
    shapeType: ShapeType;
  }>();
  @Output() clearElements = new EventEmitter<void>();

  elementTypeEnum = ElementTypeEnum;
  shapeTypeEnum = ShapeTypeEnum;

  onRoomWidthChange(event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    this.roomWidthChange.emit(value);
  }

  onRoomHeightChange(event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    this.roomHeightChange.emit(value);
  }

  onAddElement(elementType: ElementType, shapeType: ShapeType): void {
    this.addElement.emit({ elementType, shapeType });
  }

  onClearElements(): void {
    this.clearElements.emit();
  }
}
