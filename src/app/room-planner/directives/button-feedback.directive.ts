import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'button[appButtonFeedback]',
  standalone: true,
})
export class ButtonFeedbackDirective {
  private lastTouchEnd = 0;

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    // Only trigger vibration on actual user clicks to comply with browser security policies
    if (this.isUserGesture(event) && 'vibrate' in navigator) {
      try {
        navigator.vibrate?.(10);
      } catch (error) {
        // Silently handle cases where vibration is blocked or not supported
        console.debug('Vibration not available or blocked:', error);
      }
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    const now = Date.now();
    // Prevent fast double taps that could trigger zoom
    if (now - this.lastTouchEnd <= 300) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.lastTouchEnd = now;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    // Prevent default behavior that might lead to zoom
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }

  public isUserGesture(event: Event): boolean {
    // Check if the event is trusted (genuine user interaction)
    return event.isTrusted;
  }
}
