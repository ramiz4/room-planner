import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PwaService } from '../services/pwa.service';

@Component({
  selector: 'app-pwa-install',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="showInstallButton" class="fixed right-4 bottom-4 z-50">
      <button
        (click)="installPwa()"
        class="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white shadow-lg transition-colors duration-200 hover:bg-blue-700"
        title="Install Room Planner"
      >
        <svg
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
        Install App
      </button>
    </div>

    <div *ngIf="showUpdateButton" class="fixed top-4 right-4 z-50">
      <button
        (click)="updatePwa()"
        class="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white shadow-lg transition-colors duration-200 hover:bg-green-700"
        title="Update Room Planner"
      >
        <svg
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
        Update Available
      </button>
    </div>
  `,
  styles: [
    `
      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
    `,
  ],
})
export class PwaInstallComponent implements OnInit {
  showInstallButton = false;
  showUpdateButton = false;
  private pwaService = inject(PwaService);

  ngOnInit(): void {
    this.checkInstallationStatus();
    // Check periodically for install prompt availability
    setInterval(() => {
      this.checkInstallationStatus();
    }, 5000);
  }

  private checkInstallationStatus(): void {
    const status = this.pwaService.getInstallationStatus();
    this.showInstallButton = status === 'available';
  }

  installPwa(): void {
    this.pwaService
      .showInstallPrompt()
      .then(() => {
        this.showInstallButton = false;
      })
      .catch((error) => {
        console.log('Error showing install prompt:', error);
      });
  }

  updatePwa(): void {
    this.pwaService.checkForUpdate();
    this.showUpdateButton = false;
  }
}
