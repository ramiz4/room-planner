import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { ButtonFeedbackDirective } from '../directives/button-feedback.directive';
import {
  ElementType,
  ElementTypeEnum,
  ShapeType,
  ShapeTypeEnum,
} from '../interfaces/room-element.interface';

@Component({
  selector: 'app-add-elements-dropdown',
  standalone: true,
  imports: [CommonModule, ButtonFeedbackDirective],
  template: `
    <div class="relative">
      <button
        appButtonFeedback
        class="flex items-center gap-2 p-2 pe-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:ring-1 focus:ring-blue-500 transition-colors"
        type="button"
        (click)="toggleDropdown()"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Add Elements
        <svg
          class="w-4 h-4 ml-1 transform transition-transform"
          [class.rotate-180]="showDropdown()"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <div
        *ngIf="showDropdown()"
        class="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50"
      >
        <!-- Invisible backdrop to close dropdown -->
        <div
          class="fixed inset-0 z-40"
          (click)="closeDropdown()"
          (keydown.escape)="closeDropdown()"
          tabindex="0"
          role="button"
          aria-label="Close dropdown"
        ></div>

        <div
          class="relative z-50 bg-white border border-gray-300 rounded-md shadow-lg"
        >
          <!-- Tables Section -->
          <div class="p-2 border-b border-gray-200">
            <div class="text-xs font-medium text-gray-600 mb-2 px-2">
              Tables
            </div>
            <button
              appButtonFeedback
              class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
              type="button"
              (click)="
                addElement(ElementTypeEnum.TABLE, ShapeTypeEnum.RECTANGLE)
              "
            >
              <div class="w-4 h-3 border border-gray-400 bg-blue-100"></div>
              Rectangle
            </button>
            <button
              appButtonFeedback
              class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
              type="button"
              (click)="addElement(ElementTypeEnum.TABLE, ShapeTypeEnum.CIRCLE)"
            >
              <div
                class="w-4 h-4 border border-gray-400 bg-blue-100 rounded-full"
              ></div>
              Circle
            </button>
          </div>

          <!-- Static Elements Section -->
          <div class="p-2 border-b border-gray-200">
            <div class="text-xs font-medium text-gray-600 mb-2 px-2">
              Static
            </div>
            <button
              appButtonFeedback
              class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
              type="button"
              (click)="
                addElement(ElementTypeEnum.STATIC, ShapeTypeEnum.RECTANGLE)
              "
            >
              <div class="w-4 h-3 border border-gray-400 bg-gray-200"></div>
              Rectangle
            </button>
            <button
              appButtonFeedback
              class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
              type="button"
              (click)="addElement(ElementTypeEnum.STATIC, ShapeTypeEnum.CIRCLE)"
            >
              <div
                class="w-4 h-4 border border-gray-400 bg-gray-200 rounded-full"
              ></div>
              Circle
            </button>
          </div>

          <!-- Clear All Section -->
          <div class="p-2">
            <button
              appButtonFeedback
              class="w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-red-600 rounded flex items-center gap-2"
              type="button"
              (click)="clearAll()"
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
                />
              </svg>
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AddElementsDropdownComponent {
  readonly showDropdown = signal(false);

  // Expose enums to template
  readonly ElementTypeEnum = ElementTypeEnum;
  readonly ShapeTypeEnum = ShapeTypeEnum;

  @Output() addElementEvent = new EventEmitter<{
    elementType: ElementType;
    shapeType: ShapeType;
  }>();

  @Output() clearAllEvent = new EventEmitter<void>();

  toggleDropdown(): void {
    this.showDropdown.update((v) => !v);
  }

  closeDropdown(): void {
    this.showDropdown.set(false);
  }

  addElement(elementType: ElementType, shapeType: ShapeType): void {
    this.addElementEvent.emit({ elementType, shapeType });
    this.closeDropdown();
  }

  clearAll(): void {
    this.clearAllEvent.emit();
    this.closeDropdown();
  }
}
