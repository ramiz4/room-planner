import { Injectable, ApplicationRef, inject } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { filter, first } from 'rxjs/operators';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private promptEvent: BeforeInstallPromptEvent | null = null;
  private swUpdate = inject(SwUpdate);
  private appRef = inject(ApplicationRef);

  constructor() {
    this.initUpdateCheck();
    this.initInstallPrompt();
  }

  private initUpdateCheck(): void {
    if (this.swUpdate.isEnabled) {
      // Allow the app to stabilize first, before starting polling for updates with `interval()`.
      const appIsStable$ = this.appRef.isStable.pipe(
        first((isStable) => isStable === true),
      );
      const everySixHours$ = interval(6 * 60 * 60 * 1000);
      const everySixHoursOnceAppIsStable$ = concat(
        appIsStable$,
        everySixHours$,
      );

      everySixHoursOnceAppIsStable$.subscribe(() =>
        this.swUpdate.checkForUpdate(),
      );

      this.swUpdate.versionUpdates
        .pipe(
          filter(
            (evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY',
          ),
        )
        .subscribe(() => {
          if (confirm('New version available. Load New Version?')) {
            window.location.reload();
          }
        });
    }
  }

  private initInstallPrompt(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        this.promptEvent = e as BeforeInstallPromptEvent;
      });
    }
  }

  public showInstallPrompt(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.promptEvent) {
        this.promptEvent.prompt();
        this.promptEvent.userChoice.then((result) => {
          console.log('User response to the install prompt: ', result);
          this.promptEvent = null;
          resolve();
        });
      } else {
        console.log('Install prompt is not available');
        reject('Install prompt is not available');
      }
    });
  }

  public get isInstallPromptAvailable(): boolean {
    return !!this.promptEvent;
  }

  public checkForUpdate(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate().then(() => {
        console.log('Checked for updates');
      });
    }
  }

  public isInstalled(): boolean {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(display-mode: standalone)').matches;
    }
    return false;
  }

  public getInstallationStatus(): string {
    if (this.isInstalled()) {
      return 'installed';
    } else if (this.isInstallPromptAvailable) {
      return 'available';
    } else {
      return 'not-available';
    }
  }
}
