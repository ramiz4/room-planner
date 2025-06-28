import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonFeedbackDirective } from '../directives/button-feedback.directive';
import { Room } from '../interfaces/room.interface';

@Component({
  selector: 'app-json-export',
  standalone: true,
  imports: [CommonModule, ButtonFeedbackDirective],
  templateUrl: './json-export.component.html',
})
export class JsonExportComponent {
  @Input() room!: Room;

  get exportedJson(): string {
    return JSON.stringify(this.room, null, 2);
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
