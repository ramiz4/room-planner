import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'button[appButtonFeedback]',
  standalone: true,
})
export class ButtonFeedbackDirective {
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

  public isUserGesture(event: Event): boolean {
    // Check if the event is trusted (genuine user interaction)
    return event.isTrusted;
  }
}
