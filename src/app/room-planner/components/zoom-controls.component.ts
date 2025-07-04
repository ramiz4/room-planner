import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-zoom-controls',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="flex items-center gap-2 bg-black/60 text-white text-xs rounded px-2 py-1"
    >
      <select
        class="text-white text-xs rounded px-1 py-0.5"
        [value]="zoom"
        (change)="onZoomSelect($event)"
      >
        <option
          *ngFor="let level of allZoomLevels"
          [value]="level"
          [selected]="level === zoom"
        >
          {{ level * 100 | number: '1.0-0' }}%
        </option>
      </select>
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
