import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-room-size-controls',
  templateUrl: './room-size-controls.component.html',
  standalone: true,
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
    const value = parseFloat(target.value);
    if (!isNaN(value)) {
      this.widthChange.emit(value);
    }
  }

  onHeightInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value);
    if (!isNaN(value)) {
      this.heightChange.emit(value);
    }
  }
}
