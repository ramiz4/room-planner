import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from '../interfaces/room.interface';
import { RoomElement } from '../interfaces/room-element.interface';

@Component({
  selector: 'app-json-manager',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-8">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Layout Manager</h2>
        <p class="text-gray-600">
          Export your current layout or import an existing one
        </p>
      </div>

      <div
        class="grid grid-cols-1 gap-8"
        [ngClass]="{ 'lg:grid-cols-2': view === 'both' }"
      >
        <!-- Export Section -->
        <div class="space-y-4" *ngIf="view !== 'import'">
          <div class="flex items-center gap-2 mb-4">
            <svg
              class="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            <h3 class="text-lg font-semibold text-gray-800">Export Layout</h3>
          </div>

          <div
            class="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
          >
            <div
              class="p-4 bg-gray-100 border-b border-gray-200 flex justify-between items-center"
            >
              <span class="text-sm font-medium text-gray-700"
                >Current Layout JSON</span
              >
              <button
                (click)="copyToClipboard()"
                class="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
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
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
                Copy
              </button>
            </div>
            <div class="p-4">
              <pre
                class="text-xs text-gray-700 font-mono bg-white p-3 rounded border overflow-auto max-h-60 whitespace-pre-wrap"
                >{{ exportedJson }}</pre
              >
            </div>
          </div>
        </div>

        <!-- Import Section -->
        <div class="space-y-4" *ngIf="view !== 'export'">
          <div class="flex items-center gap-2 mb-4">
            <svg
              class="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
              ></path>
            </svg>
            <h3 class="text-lg font-semibold text-gray-800">Import Layout</h3>
          </div>

          <div class="space-y-4">
            <div>
              <label
                for="json-import"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Paste JSON Layout
              </label>
              <textarea
                id="json-import"
                rows="8"
                [value]="importedJson"
                (input)="onImportChange($event)"
                placeholder="Paste your room layout JSON here..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors font-mono text-sm resize-none"
              ></textarea>
            </div>

            <div class="flex gap-3">
              <button
                (click)="onImport()"
                [disabled]="!importedJson.trim()"
                class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600"
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
              <button
                (click)="clearImport()"
                class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium"
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
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class JsonManagerComponent {
  @Input() room!: Room;
  @Input() importedJson = '';
  @Input() view: 'export' | 'import' | 'both' = 'both';

  @Output() import = new EventEmitter<Room>();
  @Output() importedJsonChange = new EventEmitter<string>();

  get exportedJson(): string {
    return JSON.stringify(this.room, null, 2);
  }

  onImportChange(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.importedJsonChange.emit(value);
  }

  onImport(): void {
    try {
      const parsed = JSON.parse(this.importedJson);
      if (parsed.width && parsed.height) {
        let staticElements: RoomElement[] = [];

        // If it's the new format with staticElements
        if (parsed.staticElements) {
          staticElements = parsed.staticElements;
        } else {
          // If it's the old format, combine the separate arrays
          staticElements = [
            ...(parsed.entrances || []),
            ...(parsed.decorations || []),
            ...(parsed.walls || []),
          ];
        }

        const room: Room = {
          width: parsed.width,
          height: parsed.height,
          tables: parsed.tables || [],
          staticElements: staticElements,
        };
        this.import.emit(room);
      } else {
        alert('Invalid format: Missing width or height');
      }
    } catch {
      alert('Invalid JSON format');
    }
  }

  clearImport(): void {
    this.importedJsonChange.emit('');
  }

  async copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.exportedJson);
      // You could emit an event here to show a success message
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = this.exportedJson;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }
}
