import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Room } from '../interfaces/room.interface';

@Component({
  selector: 'app-json-manager',
  standalone: true,
  template: `
    <div class="json-manager">
      <div class="export-section">
        <h3>Exported JSON</h3>
        <div class="json-display">
          <pre>{{ exportedJson }}</pre>
          <button (click)="copyToClipboard()" class="copy-btn">Copy</button>
        </div>
      </div>

      <div class="import-section">
        <h3>Import Layout</h3>
        <div class="import-controls">
          <textarea
            rows="6"
            cols="60"
            [value]="importedJson"
            (input)="onImportChange($event)"
            placeholder="Paste JSON layout here..."
          ></textarea>
          <div class="import-actions">
            <button (click)="onImport()" [disabled]="!importedJson.trim()">
              Import
            </button>
            <button (click)="clearImport()" class="secondary">Clear</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class JsonManagerComponent {
  @Input() room!: Room;
  @Input() importedJson: string = '';

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
        // Ensure all required arrays exist
        const room: Room = {
          width: parsed.width,
          height: parsed.height,
          tables: parsed.tables || [],
          entrances: parsed.entrances || [],
          decorations: parsed.decorations || [],
          walls: parsed.walls || [],
        };
        this.import.emit(room);
      } else {
        alert('Invalid format: Missing width or height');
      }
    } catch (error) {
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
    } catch (error) {
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
