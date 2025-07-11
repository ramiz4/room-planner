import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  NotificationService,
  AppNotification,
} from '../services/notification.service';
import { PwaService } from '../services/pwa.service';
import { NotificationsComponent } from './notifications.component';
import { BehaviorSubject } from 'rxjs';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;
  let mockNotificationService: jasmine.SpyObj<NotificationService>;
  let mockPwaService: jasmine.SpyObj<PwaService>;
  let notificationsSubject: BehaviorSubject<AppNotification[]>;

  beforeEach(async () => {
    notificationsSubject = new BehaviorSubject<AppNotification[]>([]);

    mockNotificationService = jasmine.createSpyObj(
      'NotificationService',
      ['removeNotification'],
      {
        notifications$: notificationsSubject.asObservable(),
      },
    );

    mockPwaService = jasmine.createSpyObj('PwaService', [
      'checkForUpdate',
      'showInstallPrompt',
    ]);
    mockPwaService.showInstallPrompt.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      imports: [NotificationsComponent],
      providers: [
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: PwaService, useValue: mockPwaService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call notification service removeNotification when dismissing', () => {
    const notificationId = 'test-id';
    component.dismiss(notificationId);
    expect(mockNotificationService.removeNotification).toHaveBeenCalledWith(
      notificationId,
    );
  });

  it('should update notifications from service', () => {
    const testNotifications: AppNotification[] = [
      { id: '1', message: 'Test 1', type: 'info' },
      { id: '2', message: 'Test 2', type: 'error' },
    ];

    notificationsSubject.next(testNotifications);

    expect(component.notifications).toEqual(testNotifications);
  });

  it('should handle Update action by calling checkForUpdate', () => {
    const notification: AppNotification = {
      id: '1',
      message: 'Update available',
      type: 'info',
      action: 'Update',
    };

    component.handleAction(notification);

    expect(mockPwaService.checkForUpdate).toHaveBeenCalled();
    expect(mockNotificationService.removeNotification).toHaveBeenCalledWith(
      '1',
    );
  });

  it('should handle Install action by calling showInstallPrompt', () => {
    const notification: AppNotification = {
      id: '2',
      message: 'Install app',
      type: 'info',
      action: 'Install',
    };

    component.handleAction(notification);

    expect(mockPwaService.showInstallPrompt).toHaveBeenCalled();
  });
});
