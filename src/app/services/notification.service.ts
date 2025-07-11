import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AppNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  action?: string;
  persistent?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications = new BehaviorSubject<AppNotification[]>([]);

  get notifications$(): Observable<AppNotification[]> {
    return this.notifications.asObservable();
  }

  showNotification(notification: Omit<AppNotification, 'id'>): void {
    const newNotification: AppNotification = {
      ...notification,
      id: this.generateId(),
    };

    const current = this.notifications.value;
    this.notifications.next([...current, newNotification]);

    // Auto-remove non-persistent notifications after 5 seconds
    if (!notification.persistent) {
      setTimeout(() => {
        this.removeNotification(newNotification.id);
      }, 5000);
    }
  }

  removeNotification(id: string): void {
    const current = this.notifications.value;
    this.notifications.next(current.filter((n) => n.id !== id));
  }

  showPwaUpdateAvailable(): void {
    this.showNotification({
      type: 'info',
      message: 'A new version of Room Planner is available!',
      action: 'Update',
      persistent: true,
    });
  }

  showOfflineMode(): void {
    this.showNotification({
      type: 'warning',
      message:
        'You are currently offline. Your changes will sync when connection is restored.',
      persistent: true,
    });
  }

  showOnlineMode(): void {
    this.showNotification({
      type: 'success',
      message: 'Connection restored! Your data has been synced.',
      persistent: false,
    });
  }

  showInstallAvailable(): void {
    this.showNotification({
      type: 'info',
      message: 'Install Room Planner for a better experience!',
      action: 'Install',
      persistent: true,
    });
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
