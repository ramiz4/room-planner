import { Component, output } from '@angular/core';
import { ButtonFeedbackDirective } from '../directives/button-feedback.directive';

@Component({
  selector: 'app-export-trigger',
  templateUrl: './export-trigger.component.html',
  imports: [ButtonFeedbackDirective],
  standalone: true,
})
export class ExportTriggerComponent {
  // Output event
  exportClick = output<void>();

  onExportClick(): void {
    this.exportClick.emit();
  }
}
