import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Room } from '../interfaces/room.interface';

@Component({
  selector: 'app-room-controls',
  standalone: true,
  template: `
    <div class="controls">
      <div class="room-settings">
        <label>
          Width:
          <input
            type="number"
            [value]="room.width"
            (input)="onRoomWidthChange($event)"
          />
        </label>

        <label>
          Height:
          <input
            type="number"
            [value]="room.height"
            (input)="onRoomHeightChange($event)"
          />
        </label>
      </div>

      <div class="element-controls">
        <button (click)="onAddElement('table', 'rect')">
          Add Table (rect)
        </button>
        <button (click)="onAddElement('table', 'circle')">
          Add Table (circle)
        </button>
        <button (click)="onAddElement('entrance', 'rect')">Add Entrance</button>
        <button (click)="onAddElement('wall', 'rect')">Add Wall</button>
        <button (click)="onAddElement('decoration', 'circle')">
          Add Decoration
        </button>
      </div>

      <div class="action-controls">
        <button (click)="onClearElements()" class="danger">Clear All</button>
      </div>
    </div>
  `,
  styles: [
    `
      // .controls {
      //   display: flex;
      //   flex-wrap: wrap;
      //   gap: 1rem;
      //   margin-bottom: 1rem;
      //   padding: 1rem;
      //   border: 1px solid #ddd;
      //   border-radius: 4px;
      //   background-color: #f9f9f9;
      // }

      // .room-settings,
      // .element-controls,
      // .action-controls {
      //   display: flex;
      //   gap: 0.5rem;
      //   align-items: center;
      // }

      // label {
      //   display: flex;
      //   align-items: center;
      //   gap: 0.25rem;
      //   font-weight: 500;
      // }

      // input {
      //   padding: 0.25rem;
      //   border: 1px solid #ccc;
      //   border-radius: 2px;
      //   width: 80px;
      // }

      // button {
      //   padding: 0.5rem 1rem;
      //   border: 1px solid #007acc;
      //   background-color: #007acc;
      //   color: white;
      //   border-radius: 4px;
      //   cursor: pointer;
      //   font-size: 0.9rem;
      // }

      // button:hover {
      //   background-color: #005a9e;
      // }

      // button.danger {
      //   background-color: #dc3545;
      //   border-color: #dc3545;
      // }

      // button.danger:hover {
      //   background-color: #c82333;
      // }
    `,
  ],
})
export class RoomControlsComponent {
  @Input() room!: Room;

  @Output() roomWidthChange = new EventEmitter<number>();
  @Output() roomHeightChange = new EventEmitter<number>();
  @Output() addElement = new EventEmitter<{
    elementType: 'table' | 'entrance' | 'decoration' | 'wall';
    shapeType: 'rect' | 'circle';
  }>();
  @Output() clearElements = new EventEmitter<void>();

  onRoomWidthChange(event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    this.roomWidthChange.emit(value);
  }

  onRoomHeightChange(event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    this.roomHeightChange.emit(value);
  }

  onAddElement(
    elementType: 'table' | 'entrance' | 'decoration' | 'wall',
    shapeType: 'rect' | 'circle'
  ): void {
    this.addElement.emit({ elementType, shapeType });
  }

  onClearElements(): void {
    this.clearElements.emit();
  }
}
