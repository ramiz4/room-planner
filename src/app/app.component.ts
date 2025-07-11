import { Component, OnInit, inject } from '@angular/core';
import { RoomPlannerComponent } from './room-planner/room-planner.component';
import { PwaInstallComponent } from './components/pwa-install.component';
import { NotificationsComponent } from './components/notifications.component';
import { PwaService } from './services/pwa.service';
import { NetworkService } from './services/network.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  imports: [RoomPlannerComponent, PwaInstallComponent, NotificationsComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private pwaService = inject(PwaService);
  private networkService = inject(NetworkService);
  private notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.initializePwaFeatures();
  }

  private initializePwaFeatures(): void {
    // Monitor network status
    this.networkService.isOnline$.subscribe((isOnline) => {
      if (isOnline) {
        this.notificationService.showOnlineMode();
      } else {
        this.notificationService.showOfflineMode();
      }
    });

    // Show install prompt notification if available
    setTimeout(() => {
      if (
        this.pwaService.isInstallPromptAvailable &&
        !this.pwaService.isInstalled()
      ) {
        this.notificationService.showInstallAvailable();
      }
    }, 3000); // Wait 3 seconds before showing install prompt
  }
}
