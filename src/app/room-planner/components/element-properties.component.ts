import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  OnChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ROOM_PLANNER_CONSTANTS } from '../constants/room-planner.constants';
import {
  ElementType,
  ElementTypeEnum,
  RoomElement,
  ShapeTypeEnum,
} from '../interfaces/room-element.interface';

@Component({
  selector: 'app-element-properties',
  imports: [FormsModule],
  templateUrl: './element-properties.component.html',
})
export class ElementPropertiesComponent implements OnChanges {
  @Input() selectedElement: RoomElement | null = null;
  @Output() updateElement = new EventEmitter<Partial<RoomElement>>();
  @Output() deleteElement = new EventEmitter<void>();
  @Output() duplicateElementEvent = new EventEmitter<void>();
  @Output() centerElementEvent = new EventEmitter<void>();

  private aspectRatio = 1;

  labelInput = signal('');
  lockAspectRatio = signal(false);
  ROOM_PLANNER_CONSTANTS = ROOM_PLANNER_CONSTANTS;
  ElementTypeEnum = ElementTypeEnum;
  ShapeTypeEnum = ShapeTypeEnum;

  ngOnChanges() {
    if (this.selectedElement) {
      this.labelInput.set(this.selectedElement.label || '');
      this.aspectRatio =
        this.selectedElement.width / this.selectedElement.height;
    }
  }

  onLabelChange(): void {
    if (this.selectedElement) {
      const newLabel = this.labelInput().trim();
      this.updateElement.emit({ label: newLabel || undefined });
    }
  }

  onLabelSave(event: Event): void {
    this.onLabelChange();
    (event.target as HTMLInputElement)?.blur();
  }

  onLabelCancel(event: Event): void {
    this.resetLabel();
    (event.target as HTMLInputElement)?.blur();
  }

  onColorChange(event: Event): void {
    const color = (event.target as HTMLInputElement).value;
    this.updateElement.emit({ color });
  }

  onColorInputChange(event: Event): void {
    const color = (event.target as HTMLInputElement).value;
    if (this.isValidColor(color)) {
      this.updateElement.emit({ color });
    }
  }

  onWidthChange(event: Event): void {
    const width = +(event.target as HTMLInputElement).value;
    if (width > 0) {
      if (this.lockAspectRatio()) {
        const height = Math.round(width / this.aspectRatio);
        this.updateElement.emit({ width, height });
      } else {
        this.updateElement.emit({ width });
      }
    }
  }

  onHeightChange(event: Event): void {
    const height = +(event.target as HTMLInputElement).value;
    if (height > 0) {
      if (this.lockAspectRatio()) {
        const width = Math.round(height * this.aspectRatio);
        this.updateElement.emit({ width, height });
      } else {
        this.updateElement.emit({ height });
      }
    }
  }

  onXChange(event: Event): void {
    const x = +(event.target as HTMLInputElement).value;
    if (x >= 0) {
      this.updateElement.emit({ x });
    }
  }

  onYChange(event: Event): void {
    const y = +(event.target as HTMLInputElement).value;
    if (y >= 0) {
      this.updateElement.emit({ y });
    }
  }

  onDeleteElement(): void {
    this.deleteElement.emit();
  }

  resetLabel(): void {
    if (this.selectedElement) {
      this.labelInput.set(this.selectedElement.label || '');
    }
  }

  getElementTypeLabel(type: ElementType): string {
    switch (type) {
      case ElementTypeEnum.TABLE:
        return 'Table';
      case ElementTypeEnum.STATIC:
        return 'Static';
      default:
        return String(type);
    }
  }

  getElementTypeClass(type: ElementType): string {
    switch (type) {
      case ElementTypeEnum.TABLE:
        return 'bg-blue-100 text-blue-800';
      case ElementTypeEnum.STATIC:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  setPresetSize(element: RoomElement, width: number, height: number): void {
    if (element.shapeType === ShapeTypeEnum.CIRCLE) {
      height = width;
    }
    this.updateElement.emit({ ...element, width, height });
  }

  centerElement(): void {
    this.centerElementEvent.emit();
  }

  duplicateElement(): void {
    this.duplicateElementEvent.emit();
  }

  private isValidColor(color: string): boolean {
    const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
    return hexRegex.test(color);
  }
}
