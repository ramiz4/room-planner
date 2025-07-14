import { Component, input, output } from '@angular/core';
import { ButtonFeedbackDirective } from '../directives/button-feedback.directive';

@Component({
  selector: 'app-room-size-controls',
  templateUrl: './room-size-controls.component.html',
  standalone: true,
  imports: [ButtonFeedbackDirective],
})
export class RoomSizeControlsComponent {
  // Inputs
  widthMeters = input.required<number>();
  heightMeters = input.required<number>();

  // Outputs
  widthChange = output<number>();
  heightChange = output<number>();

  onWidthInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = +parseFloat(target.value).toFixed(1);
    if (!isNaN(value)) {
      this.widthChange.emit(value);
    }
  }

  incrementWidth(): void {
    const newWidth = +(this.widthMeters() + 0.1).toFixed(1);
    this.widthChange.emit(newWidth);
  }

  decrementWidth(): void {
    const newWidth = +(this.widthMeters() - 0.1).toFixed(1);
    this.widthChange.emit(newWidth);
  }

  onHeightInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = +parseFloat(target.value).toFixed(1);
    if (!isNaN(value)) {
      this.heightChange.emit(value);
    }
  }

  incrementHeight(): void {
    const newHeight = +(this.heightMeters() + 0.1).toFixed(1);
    this.heightChange.emit(newHeight);
  }

  decrementHeight(): void {
    const newHeight = +(this.heightMeters() - 0.1).toFixed(1);
    this.heightChange.emit(newHeight);
  }
}
