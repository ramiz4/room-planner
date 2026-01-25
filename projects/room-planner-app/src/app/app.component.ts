import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './components/theme-toggle.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ThemeToggleComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  mobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.mobileMenuOpen.update((value) => !value);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
