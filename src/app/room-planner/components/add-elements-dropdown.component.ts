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
        class="flex items-center gap-2 px-2 py-1 text-sm rounded bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition-colors"
        type="button"
        (click)="toggleDropdown()"
        title="Add Elements"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-4 h-4"
        >
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <div
        *ngIf="showDropdown()"
        class="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50"
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
              class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2 cursor-pointer"
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
              class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2 cursor-pointer"
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
              class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2 cursor-pointer"
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
              class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2 cursor-pointer"
              type="button"
              (click)="addElement(ElementTypeEnum.STATIC, ShapeTypeEnum.CIRCLE)"
            >
              <div
                class="w-4 h-4 border border-gray-400 bg-gray-200 rounded-full"
              ></div>
              Circle
            </button>
          </div>

          <!-- Layout Section -->
          <div class="p-2 border-b border-gray-200">
            <div class="text-xs font-medium text-gray-600 mb-2 px-2">
              Layout
            </div>
            <button
              appButtonFeedback
              class="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 text-blue-600 rounded flex items-center gap-2 cursor-pointer"
              type="button"
              (click)="exportLayout()"
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export Layout
            </button>
            <button
              appButtonFeedback
              class="w-full text-left px-3 py-2 text-sm hover:bg-green-50 text-green-600 rounded flex items-center gap-2 cursor-pointer"
              type="button"
              (click)="importLayout()"
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                ></path>
              </svg>
              Import Layout
            </button>
          </div>

          <!-- Clear All Section -->
          <div class="p-2">
            <button
              appButtonFeedback
              class="w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-red-600 rounded flex items-center gap-2 cursor-pointer"
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
  @Output() exportLayoutEvent = new EventEmitter<void>();
  @Output() importLayoutEvent = new EventEmitter<void>();

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

  exportLayout(): void {
    this.exportLayoutEvent.emit();
    this.closeDropdown();
  }

  importLayout(): void {
    this.importLayoutEvent.emit();
    this.closeDropdown();
  }
}
