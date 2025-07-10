import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-zoom-controls',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="flex items-center gap-6  px-2 py-1 text-sm text-gray-800 dark:text-gray-200"
    >
      <button (click)="zoomChange.emit(zoom / 1.2)" class="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-zoom-out-icon lucide-zoom-out"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" x2="16.65" y1="21" y2="16.65" />
          <line x1="8" x2="14" y1="11" y2="11" />
        </svg>
      </button>
      <span class="flex-1 w-8 text-center">
        {{ zoom * 100 | number: '1.0-0' }}%
      </span>
      <button (click)="zoomChange.emit(zoom * 1.2)" class="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-zoom-in-icon lucide-zoom-in"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" x2="16.65" y1="21" y2="16.65" />
          <line x1="11" x2="11" y1="8" y2="14" />
          <line x1="8" x2="14" y1="11" y2="11" />
        </svg>
      </button>
      <button (click)="zoomChange.emit(1)" class="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-maximize-icon lucide-maximize"
        >
          <path d="M8 3H5a2 2 0 0 0-2 2v3" />
          <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
          <path d="M3 16v3a2 2 0 0 0 2 2h3" />
          <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
        </svg>
      </button>
    </div>
  `,
})
export class ZoomControlsComponent {
  @Input() zoom = 1;
  @Output() zoomChange = new EventEmitter<number>();

  readonly zoomLevels = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  get allZoomLevels(): number[] {
    if (this.zoomLevels.includes(this.zoom)) {
      return this.zoomLevels;
    }
    return [this.zoom, ...this.zoomLevels];
  }

  onZoomSelect(event: Event): void {
    const value = parseFloat((event.target as HTMLSelectElement).value);
    this.zoomChange.emit(value);
  }
}
