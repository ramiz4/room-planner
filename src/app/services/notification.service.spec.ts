import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add notification to the list', () => {
    const notification = {
      type: 'info' as const,
      message: 'Test notification',
    };

    service.showNotification(notification);

    service.notifications$.subscribe((notifications) => {
      expect(notifications.length).toBe(1);
      expect(notifications[0].message).toBe('Test notification');
      expect(notifications[0].type).toBe('info');
    });
  });

  it('should remove notification by id', () => {
    const notification = {
      type: 'info' as const,
      message: 'Test notification',
    };

    service.showNotification(notification);

    let notificationId: string;
    service.notifications$.subscribe((notifications) => {
      if (notifications.length > 0) {
        notificationId = notifications[0].id;
      }
    });

    service.removeNotification(notificationId!);

    service.notifications$.subscribe((notifications) => {
      expect(notifications.length).toBe(0);
    });
  });

  it('should show PWA update available notification', () => {
    service.showPwaUpdateAvailable();

    service.notifications$.subscribe((notifications) => {
      expect(notifications.length).toBe(1);
      expect(notifications[0].message).toContain('new version');
      expect(notifications[0].action).toBe('Update');
      expect(notifications[0].persistent).toBe(true);
    });
  });

  it('should show offline mode notification', () => {
    service.showOfflineMode();

    service.notifications$.subscribe((notifications) => {
      expect(notifications.length).toBe(1);
      expect(notifications[0].message).toContain('offline');
      expect(notifications[0].type).toBe('warning');
      expect(notifications[0].persistent).toBe(true);
    });
  });
});
