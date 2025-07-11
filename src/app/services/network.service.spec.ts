import { TestBed } from '@angular/core/testing';
import { NetworkService } from './network.service';

describe('NetworkService', () => {
  let service: NetworkService;

  beforeEach(() => {
    // Mock navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return current online status', () => {
    expect(service.isOnline).toBe(true);
    expect(service.isOffline).toBe(false);
  });

  it('should emit online status changes', (done) => {
    service.isOnline$.subscribe((isOnline) => {
      expect(isOnline).toBe(true);
      done();
    });
  });
});
