import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ROOM_PLANNER_CONSTANTS } from '../constants/room-planner.constants';
import { ElementType, RoomElement } from '../interfaces/room-element.interface';

@Component({
  selector: 'app-element-properties',
  standalone: true,
  imports: [FormsModule],
  template: `
    @if (selectedElement) {
    <div class="space-y-3">
      <!-- Element Type Display -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-xs font-medium text-gray-600">Type:</span>
          <span
            class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
            [class]="getElementTypeClass(selectedElement.elementType)"
          >
            {{ getElementTypeLabel(selectedElement.elementType) }}
          </span>
        </div>
        <div class="text-xs text-gray-500">
          ID: {{ selectedElement.id.slice(-8) }}
        </div>
      </div>

      <!-- Label Input -->
      <div class="space-y-1">
        <label
          for="element-label"
          class="block text-xs font-medium text-gray-700"
        >
          Label
        </label>
        <input
          id="element-label"
          name="elementLabel"
          type="text"
          [(ngModel)]="labelInput"
          (blur)="onLabelChange()"
          (keydown.enter)="onLabelChange()"
          (keydown.escape)="resetLabel()"
          placeholder="Enter label..."
          class="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-xs"
        />
      </div>

      <!-- Color Picker -->
      <div class="space-y-1">
        <label
          for="element-color"
          class="block text-xs font-medium text-gray-700"
        >
          Color
        </label>
        <div class="flex items-center gap-2">
          <input
            id="element-color"
            name="elementColor"
            type="color"
            [value]="
              selectedElement.color ||
              ROOM_PLANNER_CONSTANTS.ELEMENT_COLOR_SELECTED
            "
            (change)="onColorChange($event)"
            class="h-8 w-8 border border-gray-300 rounded cursor-pointer flex-shrink-0"
          />
          <input
            id="element-color-hex"
            name="elementColorHex"
            type="text"
            [value]="
              selectedElement.color ||
              ROOM_PLANNER_CONSTANTS.ELEMENT_COLOR_SELECTED
            "
            (input)="onColorInputChange($event)"
            placeholder="#6b7280"
            class="min-w-0 flex-1 px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-xs font-mono"
          />
        </div>
      </div>

      <!-- Dimensions -->
      <div class="grid grid-cols-2 gap-2">
        <div class="space-y-1">
          <label
            for="element-width"
            class="block text-xs font-medium text-gray-700"
          >
            Width
          </label>
          <input
            id="element-width"
            name="elementWidth"
            type="number"
            [value]="selectedElement.width"
            (input)="onWidthChange($event)"
            min="10"
            max="500"
            class="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-xs"
          />
        </div>
        <div class="space-y-1">
          <label
            for="element-height"
            class="block text-xs font-medium text-gray-700"
          >
            Height
          </label>
          <input
            id="element-height"
            name="elementHeight"
            type="number"
            [value]="selectedElement.height"
            (input)="onHeightChange($event)"
            min="10"
            max="500"
            class="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-xs"
          />
        </div>
      </div>

      <!-- Position -->
      <div class="grid grid-cols-2 gap-2">
        <div class="space-y-1">
          <label
            for="element-x"
            class="block text-xs font-medium text-gray-700"
          >
            X Position
          </label>
          <input
            id="element-x"
            name="elementX"
            type="number"
            [value]="selectedElement.x"
            (input)="onXChange($event)"
            min="0"
            class="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-xs"
          />
        </div>
        <div class="space-y-1">
          <label
            for="element-y"
            class="block text-xs font-medium text-gray-700"
          >
            Y Position
          </label>
          <input
            id="element-y"
            name="elementY"
            type="number"
            [value]="selectedElement.y"
            (input)="onYChange($event)"
            min="0"
            class="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-xs"
          />
        </div>
      </div>

      <!-- Delete Button -->
      <div class="mt-8">
        <button
          (click)="onDeleteElement()"
          class="w-full flex items-center justify-center gap-1 px-2 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 focus:ring-1 focus:ring-red-500 focus:ring-offset-1 transition-all duration-200 text-xs font-medium"
        >
          <svg
            class="w-3 h-3"
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
          Delete Element
        </button>
      </div>
    </div>
    } @else {
    <div class="text-center text-gray-500 py-6">
      <svg
        class="w-8 h-8 mx-auto mb-2 text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        ></path>
      </svg>
      <p class="text-xs">Select an element to edit its properties</p>
    </div>
    }
  `,
})
export class ElementPropertiesComponent {
  @Input() selectedElement: RoomElement | null = null;
  @Output() updateElement = new EventEmitter<Partial<RoomElement>>();
  @Output() deleteElement = new EventEmitter<void>();

  labelInput = signal('');
  ROOM_PLANNER_CONSTANTS = ROOM_PLANNER_CONSTANTS;

  ngOnChanges() {
    if (this.selectedElement) {
      this.labelInput.set(this.selectedElement.label || '');
    }
  }

  onLabelChange(): void {
    if (this.selectedElement) {
      const newLabel = this.labelInput().trim();
      this.updateElement.emit({ label: newLabel || undefined });
    }
  }

  onColorChange(event: Event): void {
    const color = (event.target as HTMLInputElement).value;
    this.updateElement.emit({ color });
  }

  onColorInputChange(event: Event): void {
    const color = (event.target as HTMLInputElement).value;
    if (this.isValidColor(color)) {
      this.updateElement.emit({ color });
    }
  }

  onWidthChange(event: Event): void {
    const width = +(event.target as HTMLInputElement).value;
    if (width > 0) {
      this.updateElement.emit({ width });
    }
  }

  onHeightChange(event: Event): void {
    const height = +(event.target as HTMLInputElement).value;
    if (height > 0) {
      this.updateElement.emit({ height });
    }
  }

  onXChange(event: Event): void {
    const x = +(event.target as HTMLInputElement).value;
    if (x >= 0) {
      this.updateElement.emit({ x });
    }
  }

  onYChange(event: Event): void {
    const y = +(event.target as HTMLInputElement).value;
    if (y >= 0) {
      this.updateElement.emit({ y });
    }
  }

  onDeleteElement(): void {
    this.deleteElement.emit();
  }

  resetLabel(): void {
    if (this.selectedElement) {
      this.labelInput.set(this.selectedElement.label || '');
    }
  }

  getElementTypeLabel(type: ElementType): string {
    switch (type) {
      case 'table':
        return 'Table';
      case 'entrance':
        return 'Entrance';
      case 'decoration':
        return 'Decoration';
      case 'wall':
        return 'Wall';
      default:
        return String(type);
    }
  }

  getElementTypeClass(type: ElementType): string {
    switch (type) {
      case 'table':
        return 'bg-blue-100 text-blue-800';
      case 'entrance':
        return 'bg-green-100 text-green-800';
      case 'decoration':
        return 'bg-purple-100 text-purple-800';
      case 'wall':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  private isValidColor(color: string): boolean {
    const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
    return hexRegex.test(color);
  }
}
