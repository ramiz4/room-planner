import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'room-planner-theme';

  // Initialize theme from localStorage or system preference
  private readonly initialTheme = this.getInitialTheme();
  readonly theme = signal<Theme>(this.initialTheme);

  constructor() {
    console.log('ThemeService constructor - Initial theme:', this.initialTheme);

    // Apply theme to document when theme changes
    effect(() => {
      const currentTheme = this.theme();
      this.applyTheme(currentTheme);
      this.saveTheme(currentTheme);
    });

    // Apply initial theme
    this.applyTheme(this.initialTheme);
  }

  private getInitialTheme(): Theme {
    console.log('Getting initial theme...');

    // Check localStorage first
    const savedTheme = localStorage.getItem(this.storageKey) as Theme;
    console.log('Saved theme from localStorage:', savedTheme);

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    // Fall back to system preference
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    console.log('System prefers dark mode:', systemPrefersDark);

    return systemPrefersDark ? 'dark' : 'light';
  }

  private applyTheme(theme: Theme): void {
    console.log('Applying theme:', theme);
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      console.log(
        'Added dark class, classes:',
        htmlElement.classList.toString(),
      );
    } else {
      htmlElement.classList.remove('dark');
      console.log(
        'Removed dark class, classes:',
        htmlElement.classList.toString(),
      );
    }
  }

  private saveTheme(theme: Theme): void {
    localStorage.setItem(this.storageKey, theme);
  }

  toggleTheme(): void {
    console.log('Toggle theme called, current theme:', this.theme());
    this.theme.update((current) => (current === 'light' ? 'dark' : 'light'));
    console.log('New theme after toggle:', this.theme());
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }
}
