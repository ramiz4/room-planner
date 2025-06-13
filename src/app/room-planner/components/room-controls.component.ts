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
    <div class="space-y-6">
      <!-- Room Settings Section -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          Room Dimensions
        </h3>
        
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">
              Width (px)
            </label>
            <input
              type="number"
              [value]="room.width"
              (input)="onRoomWidthChange($event)"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              min="100"
              max="1000"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">
              Height (px)
            </label>
            <input
              type="number"
              [value]="room.height"
              (input)="onRoomHeightChange($event)"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              min="100"
              max="1000"
            />
          </div>
        </div>
      </div>

      <!-- Element Controls Section -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Elements
        </h3>
        
        <div class="space-y-3">
          <!-- Tables -->
          <div class="space-y-2">
            <p class="text-sm font-medium text-gray-600">Tables</p>
            <div class="grid grid-cols-2 gap-2">
              <button
                (click)="onAddElement(elementTypeEnum.TABLE, shapeTypeEnum.RECTANGLE)"
                class="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-sm font-medium"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                </svg>
                Rectangle
              </button>
              <button
                (click)="onAddElement(elementTypeEnum.TABLE, shapeTypeEnum.CIRCLE)"
                class="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-sm font-medium"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
                Round
              </button>
            </div>
          </div>

          <!-- Other Elements -->
          <div class="space-y-2">
            <p class="text-sm font-medium text-gray-600">Room Features</p>
            <div class="space-y-2">
              <button
                (click)="onAddElement(elementTypeEnum.ENTRANCE, shapeTypeEnum.RECTANGLE)"
                class="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 text-sm font-medium"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Add Entrance
              </button>
              <button
                (click)="onAddElement(elementTypeEnum.WALL, shapeTypeEnum.RECTANGLE)"
                class="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 text-sm font-medium"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                Add Wall
              </button>
              <button
                (click)="onAddElement(elementTypeEnum.DECORATION, shapeTypeEnum.CIRCLE)"
                class="w-full flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 text-sm font-medium"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
                Add Decoration
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Controls Section -->
      <div class="pt-4 border-t border-gray-200">
        <button 
          (click)="onClearElements()" 
          class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 font-medium"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          Clear All Elements
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
