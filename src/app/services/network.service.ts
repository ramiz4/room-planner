import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private onlineStatus = new BehaviorSubject<boolean>(navigator.onLine);

  constructor() {
    this.initializeNetworkListeners();
  }

  private initializeNetworkListeners(): void {
    if (typeof window !== 'undefined') {
      const online$ = fromEvent(window, 'online');
      const offline$ = fromEvent(window, 'offline');

      merge(online$, offline$)
        .pipe(map(() => navigator.onLine))
        .subscribe((status) => {
          this.onlineStatus.next(status);
        });
    }
  }

  get isOnline$(): Observable<boolean> {
    return this.onlineStatus.asObservable();
  }

  get isOnline(): boolean {
    return this.onlineStatus.value;
  }

  get isOffline(): boolean {
    return !this.isOnline;
  }
}
