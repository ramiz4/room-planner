import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Room } from '../interfaces/room.interface';

@Component({
  selector: 'app-json-export',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './json-export.component.html',
})
export class JsonExportComponent {
  @Input() room!: Room;

  copied = false;

  get exportedJson(): string {
    return JSON.stringify(this.room, null, 2);
  }

  async copyToClipboard(): Promise<void> {
    try {
      this.copied = true;
      // Use the Clipboard API if available
      if (!navigator.clipboard) {
        throw new Error('Clipboard API not available');
      }
      // Write the JSON string to the clipboard
      // Use navigator.clipboard.writeText to copy the JSON string
      await navigator.clipboard.writeText(this.exportedJson);
      // You could emit an event here to show a success message
      setTimeout(() => {
        this.copied = false; // Reset copied state after a delay
      }, 2000);
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
