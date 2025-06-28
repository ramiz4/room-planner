import { Component, output } from '@angular/core';
import { ButtonFeedbackDirective } from '../directives/button-feedback.directive';

@Component({
  selector: 'app-import-trigger',
  templateUrl: './import-trigger.component.html',
  imports: [ButtonFeedbackDirective],
  standalone: true,
})
export class ImportTriggerComponent {
  // Output event
  importClick = output<void>();

  onImportClick(): void {
    this.importClick.emit();
  }
}
