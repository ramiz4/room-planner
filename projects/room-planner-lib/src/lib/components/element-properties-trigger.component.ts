import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoomElement } from '../interfaces/room-element.interface';
import { ButtonFeedbackDirective } from '../directives/button-feedback.directive';

@Component({
  selector: 'app-element-properties-trigger',
  template: `
    @if (selectedElement) {
      <!-- Element Properties Trigger -->
      <button
        appButtonFeedback
        class="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-white shadow-sm transition-colors hover:bg-blue-700"
        type="button"
        (click)="onToggleElementProperties()"
      >
        <svg
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span class="max-w-[120px] truncate text-sm font-medium">
          Edit
          {{ selectedElement ? selectedElement.label || 'Element' : 'Element' }}
        </span>
      </button>
    } @else if (hasElements) {
      <!-- Hint when no element is selected but elements exist -->
      <div class="flex items-center gap-2 px-4 py-3 text-sm text-gray-500">
        <svg
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Select an element to edit its properties</span>
      </div>
    }
  `,
  imports: [CommonModule, ButtonFeedbackDirective],
})
export class ElementPropertiesTriggerComponent {
  @Input() selectedElement: RoomElement | null = null;
  @Input() hasElements = false;
  @Output() toggleElementProperties = new EventEmitter<void>();

  onToggleElementProperties(): void {
    this.toggleElementProperties.emit();
  }
}
