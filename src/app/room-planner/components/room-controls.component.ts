import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonFeedbackDirective } from '../directives/button-feedback.directive';
import {
  ElementType,
  ElementTypeEnum,
  ShapeType,
  ShapeTypeEnum,
} from '../interfaces/room-element.interface';
import { Room } from '../interfaces/room.interface';

@Component({
  selector: 'app-room-controls',
  standalone: true,
  imports: [CommonModule, ButtonFeedbackDirective],
  templateUrl: './room-controls.component.html',
})
export class RoomControlsComponent {
  @Input() room!: Room;

  @Output() roomWidthMetersChange = new EventEmitter<number>();
  @Output() roomHeightMetersChange = new EventEmitter<number>();
  @Output() addElement = new EventEmitter<{
    elementType: ElementType;
    shapeType: ShapeType;
  }>();
  @Output() clearElements = new EventEmitter<void>();

  elementTypeEnum = ElementTypeEnum;
  shapeTypeEnum = ShapeTypeEnum;

  onRoomWidthMetersChange(event: Event): void {
    const meters = +(event.target as HTMLInputElement).value;
    this.roomWidthMetersChange.emit(meters);
  }

  onRoomHeightMetersChange(event: Event): void {
    const meters = +(event.target as HTMLInputElement).value;
    this.roomHeightMetersChange.emit(meters);
  }

  onAddElement(elementType: ElementType, shapeType: ShapeType): void {
    this.addElement.emit({ elementType, shapeType });
  }

  onClearElements(): void {
    this.clearElements.emit();
  }
}
