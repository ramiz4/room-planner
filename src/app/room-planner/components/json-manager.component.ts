import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Room } from '../interfaces/room.interface';
import { JsonExportComponent } from './json-export.component';
import { JsonImportComponent } from './json-import.component';

@Component({
  selector: 'app-json-manager',
  imports: [CommonModule, JsonExportComponent, JsonImportComponent],
  templateUrl: './json-manager.component.html',
})
export class JsonManagerComponent {
  @Input() room!: Room;
  @Input() importedJson = '';
  @Input() view: 'export' | 'import' | 'both' = 'both';

  @Output() import = new EventEmitter<Room>();
  @Output() importedJsonChange = new EventEmitter<string>();

  onImport(room: Room): void {
    this.import.emit(room);
  }

  onImportedJsonChange(value: string): void {
    this.importedJsonChange.emit(value);
  }
}
