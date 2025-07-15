import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button
      (click)="toggleTheme()"
      class="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      [title]="
        theme() === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
      "
    >
      <!-- Sun icon for light mode -->
      <svg
        *ngIf="theme() === 'light'"
        class="h-5 w-5 text-gray-700 dark:text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      <!-- Moon icon for dark mode -->
      <svg
        *ngIf="theme() === 'dark'"
        class="h-5 w-5 text-gray-700 dark:text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  `,
  imports: [NgIf],
  standalone: true,
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  theme = this.themeService.theme;

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
