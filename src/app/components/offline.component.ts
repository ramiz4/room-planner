import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
      <div class="mx-4 max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <div class="mb-6">
          <svg
            class="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2v6m0 8v6m-8-8h6m8 0h6"
            ></path>
          </svg>
        </div>
        <h2 class="mb-4 text-2xl font-bold text-gray-800">You're Offline</h2>
        <p class="mb-6 text-gray-600">
          It looks like you've lost your internet connection. Don't worry - your
          room designs are saved locally and will sync when you're back online.
        </p>
        <button
          (click)="checkConnection()"
          class="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
        >
          Try Again
        </button>
        <div class="mt-4 text-sm text-gray-500">
          <p>While offline, you can still:</p>
          <ul class="mt-2 space-y-1">
            <li>• View your saved room designs</li>
            <li>• Edit existing projects</li>
            <li>• Create new room layouts</li>
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class OfflineComponent {
  checkConnection(): void {
    if (navigator.onLine) {
      window.location.reload();
    } else {
      // Show a toast or alert that connection is still not available
      alert(
        'Still no internet connection. Please check your network settings.'
      );
    }
  }
}
