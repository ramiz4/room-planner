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
    <div class="flex flex-wrap items-center gap-6">
      <!-- Room Dimensions -->
      <div class="flex items-center gap-3">
        <h3 class="text-sm font-semibold text-gray-800 flex items-center gap-1">
          <svg
            class="w-4 h-4 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          Room:
        </h3>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1">
            <label class="text-xs text-gray-600">W:</label>
            <input
              type="number"
              [value]="room.width"
              (input)="onRoomWidthChange($event)"
              class="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              min="100"
              max="1000"
            />
          </div>
          <div class="flex items-center gap-1">
            <label class="text-xs text-gray-600">H:</label>
            <input
              type="number"
              [value]="room.height"
              (input)="onRoomHeightChange($event)"
              class="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              min="100"
              max="1000"
            />
          </div>
        </div>
      </div>

      <!-- Add Elements -->
      <div class="flex items-center gap-3">
        <h3 class="text-sm font-semibold text-gray-800 flex items-center gap-1">
          <svg
            class="w-4 h-4 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Add:
        </h3>

        <!-- Tables -->
        <div class="flex items-center gap-1">
          <span class="text-xs text-gray-600">Tables:</span>
          <button
            (click)="
              onAddElement(elementTypeEnum.TABLE, shapeTypeEnum.RECTANGLE)
            "
            class="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 focus:ring-1 focus:ring-blue-500 transition-colors"
            title="Add Rectangle Table"
          >
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>
          </button>
          <button
            (click)="onAddElement(elementTypeEnum.TABLE, shapeTypeEnum.CIRCLE)"
            class="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 focus:ring-1 focus:ring-blue-500 transition-colors"
            title="Add Round Table"
          >
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
          </button>
        </div>

        <!-- Static Elements -->
        <div class="flex items-center gap-1">
          <span class="text-xs text-gray-600">Static:</span>
          <button
            (click)="
              onAddElement(elementTypeEnum.STATIC, shapeTypeEnum.RECTANGLE)
            "
            class="p-1.5 bg-gray-600 text-white rounded hover:bg-gray-700 focus:ring-1 focus:ring-gray-500 transition-colors"
            title="Add Rectangle Static Element"
          >
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>
          </button>
          <button
            (click)="onAddElement(elementTypeEnum.STATIC, shapeTypeEnum.CIRCLE)"
            class="p-1.5 bg-gray-600 text-white rounded hover:bg-gray-700 focus:ring-1 focus:ring-gray-500 transition-colors"
            title="Add Circle Static Element"
          >
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
          </button>
        </div>
      </div>

      <!-- Clear Button -->
      <div class="flex items-center">
        <button
          (click)="onClearElements()"
          class="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 focus:ring-1 focus:ring-red-500 transition-colors"
          title="Clear All Elements"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
          Clear All
        </button>
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
