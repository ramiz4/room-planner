import { TestBed } from '@angular/core/testing';
import { SwUpdate } from '@angular/service-worker';
import { of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let mockSwUpdate: jasmine.SpyObj<SwUpdate>;

  beforeEach(async () => {
    mockSwUpdate = jasmine.createSpyObj('SwUpdate', ['checkForUpdate'], {
      isEnabled: false,
      versionUpdates: of(),
      unrecoverableState: of(),
    });

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: SwUpdate, useValue: mockSwUpdate }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
