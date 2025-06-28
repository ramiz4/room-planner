import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonFeedbackDirective } from '../directives/button-feedback.directive';
import { RoomElement } from '../interfaces/room-element.interface';
import { Room } from '../interfaces/room.interface';
import { ROOM_PLANNER_CONSTANTS } from '../constants/room-planner.constants';

@Component({
  selector: 'app-json-import',
  standalone: true,
  imports: [CommonModule, ButtonFeedbackDirective],
  templateUrl: './json-import.component.html',
})
export class JsonImportComponent {
  @Input() importedJson = '';

  @Output() import = new EventEmitter<Room>();
  @Output() importedJsonChange = new EventEmitter<string>();

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
          widthMeters: parsed.widthMeters ?? this.pixelsToMeters(parsed.width),
          heightMeters:
            parsed.heightMeters ?? this.pixelsToMeters(parsed.height),
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

  private pixelsToMeters(pixels: number): number {
    return (
      Math.round((pixels / ROOM_PLANNER_CONSTANTS.PIXELS_PER_METER) * 10) / 10
    );
  }
}
