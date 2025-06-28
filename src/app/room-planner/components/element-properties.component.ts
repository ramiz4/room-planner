import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  OnChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonFeedbackDirective } from '../directives/button-feedback.directive';
import { ROOM_PLANNER_CONSTANTS } from '../constants/room-planner.constants';
import {
  ElementType,
  ElementTypeEnum,
  RoomElement,
  ShapeTypeEnum,
} from '../interfaces/room-element.interface';

@Component({
  selector: 'app-element-properties',
  imports: [FormsModule, ButtonFeedbackDirective],
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
    const widthMeters = +(event.target as HTMLInputElement).value;
    if (widthMeters > 0) {
      const widthPixels = this.metersToPixels(widthMeters);
      if (this.lockAspectRatio()) {
        const heightPixels = Math.round(widthPixels / this.aspectRatio);
        this.updateElement.emit({ width: widthPixels, height: heightPixels });
      } else {
        this.updateElement.emit({ width: widthPixels });
      }
    }
  }

  onHeightChange(event: Event): void {
    const heightMeters = +(event.target as HTMLInputElement).value;
    if (heightMeters > 0) {
      const heightPixels = this.metersToPixels(heightMeters);
      if (this.lockAspectRatio()) {
        const widthPixels = Math.round(heightPixels * this.aspectRatio);
        this.updateElement.emit({ width: widthPixels, height: heightPixels });
      } else {
        this.updateElement.emit({ height: heightPixels });
      }
    }
  }

  onXChange(event: Event): void {
    const xMeters = +(event.target as HTMLInputElement).value;
    if (xMeters >= 0) {
      const xPixels = this.metersToPixels(xMeters);
      this.updateElement.emit({ x: xPixels });
    }
  }

  onYChange(event: Event): void {
    const yMeters = +(event.target as HTMLInputElement).value;
    if (yMeters >= 0) {
      const yPixels = this.metersToPixels(yMeters);
      this.updateElement.emit({ y: yPixels });
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

  setPresetSize(
    element: RoomElement,
    widthMeters: number,
    heightMeters: number,
  ): void {
    let finalHeightMeters = heightMeters;
    if (element.shapeType === ShapeTypeEnum.CIRCLE) {
      finalHeightMeters = widthMeters;
    }
    const widthPixels = this.metersToPixels(widthMeters);
    const heightPixels = this.metersToPixels(finalHeightMeters);
    this.updateElement.emit({
      ...element,
      width: widthPixels,
      height: heightPixels,
    });
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

  // Conversion methods for pixels to meters and vice versa
  private pixelsToMeters(pixels: number): number {
    return (
      Math.round((pixels / ROOM_PLANNER_CONSTANTS.PIXELS_PER_METER) * 100) / 100
    );
  }

  private metersToPixels(meters: number): number {
    return Math.round(meters * ROOM_PLANNER_CONSTANTS.PIXELS_PER_METER);
  }

  // Getters for meter values to display in UI
  getWidthInMeters(): number {
    return this.selectedElement
      ? this.pixelsToMeters(this.selectedElement.width)
      : 0;
  }

  getHeightInMeters(): number {
    return this.selectedElement
      ? this.pixelsToMeters(this.selectedElement.height)
      : 0;
  }

  getXInMeters(): number {
    return this.selectedElement
      ? this.pixelsToMeters(this.selectedElement.x)
      : 0;
  }

  getYInMeters(): number {
    return this.selectedElement
      ? this.pixelsToMeters(this.selectedElement.y)
      : 0;
  }
}
