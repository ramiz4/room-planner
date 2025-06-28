import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'button[appButtonFeedback]',
  standalone: true,
})
export class ButtonFeedbackDirective {
  @HostListener('mousedown')
  @HostListener('touchstart')
  onPress(): void {
    if ('vibrate' in navigator) {
      navigator.vibrate?.(10);
    }
  }
}
