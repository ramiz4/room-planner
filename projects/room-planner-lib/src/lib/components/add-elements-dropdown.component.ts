import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { ButtonFeedbackDirective } from '../directives/button-feedback.directive';
import {
  ElementType,
  ElementTypeEnum,
  ShapeType,
  ShapeTypeEnum,
} from '../interfaces/room-element.interface';

@Component({
  selector: 'app-add-elements-dropdown',
  standalone: true,
  imports: [CommonModule, ButtonFeedbackDirective],
  templateUrl: './add-elements-dropdown.component.html',
})
export class AddElementsDropdownComponent {
  readonly showDropdown = signal(false);

  // Expose enums to template
  readonly ElementTypeEnum = ElementTypeEnum;
  readonly ShapeTypeEnum = ShapeTypeEnum;

  @Output() addElementEvent = new EventEmitter<{
    elementType: ElementType;
    shapeType: ShapeType;
  }>();

  @Output() clearAllEvent = new EventEmitter<void>();
  @Output() exportLayoutEvent = new EventEmitter<void>();
  @Output() importLayoutEvent = new EventEmitter<void>();

  toggleDropdown(): void {
    this.showDropdown.update((v) => !v);
  }

  closeDropdown(): void {
    this.showDropdown.set(false);
  }

  addElement(elementType: ElementType, shapeType: ShapeType): void {
    this.addElementEvent.emit({ elementType, shapeType });
    this.closeDropdown();
  }

  clearAll(): void {
    this.clearAllEvent.emit();
    this.closeDropdown();
  }

  exportLayout(): void {
    this.exportLayoutEvent.emit();
    this.closeDropdown();
  }

  importLayout(): void {
    this.importLayoutEvent.emit();
    this.closeDropdown();
  }
}
