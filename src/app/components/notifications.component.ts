import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  NotificationService,
  AppNotification,
} from '../services/notification.service';
import { PwaService } from '../services/pwa.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 left-4 z-50 space-y-2 max-w-md">
      <div
        *ngFor="let notification of notifications"
        class="flex items-center p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform"
        [ngClass]="{
          'bg-blue-50 border-l-4 border-blue-500 text-blue-700':
            notification.type === 'info',
          'bg-green-50 border-l-4 border-green-500 text-green-700':
            notification.type === 'success',
          'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700':
            notification.type === 'warning',
          'bg-red-50 border-l-4 border-red-500 text-red-700':
            notification.type === 'error',
        }"
      >
        <div class="flex-1">
          <p class="text-sm font-medium">{{ notification.message }}</p>
        </div>

        <div class="ml-4 flex space-x-2">
          <button
            *ngIf="notification.action"
            (click)="handleAction(notification)"
            class="text-sm font-medium underline hover:no-underline"
          >
            {{ notification.action }}
          </button>

          <button
            (click)="dismiss(notification.id)"
            class="text-sm font-medium opacity-70 hover:opacity-100"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: AppNotification[] = [];
  private destroy$ = new Subject<void>();
  private notificationService = inject(NotificationService);
  private pwaService = inject(PwaService);

  ngOnInit(): void {
    this.notificationService.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe((notifications) => {
        this.notifications = notifications;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  dismiss(id: string): void {
    this.notificationService.removeNotification(id);
  }

  handleAction(notification: AppNotification): void {
    switch (notification.action) {
      case 'Update':
        this.pwaService.checkForUpdate();
        this.dismiss(notification.id);
        break;
      case 'Install':
        this.pwaService
          .showInstallPrompt()
          .then(() => this.dismiss(notification.id))
          .catch(() => {
            // Handle error silently
          });
        break;
      default:
        this.dismiss(notification.id);
    }
  }
}
