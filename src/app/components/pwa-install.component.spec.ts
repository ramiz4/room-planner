import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PwaService } from '../services/pwa.service';
import { PwaInstallComponent } from './pwa-install.component';

describe('PwaInstallComponent', () => {
  let component: PwaInstallComponent;
  let fixture: ComponentFixture<PwaInstallComponent>;
  let mockPwaService: jasmine.SpyObj<PwaService>;

  beforeEach(async () => {
    mockPwaService = jasmine.createSpyObj('PwaService', [
      'getInstallationStatus',
      'showInstallPrompt',
      'checkForUpdate',
    ]);
    mockPwaService.getInstallationStatus.and.returnValue('not-available');
    mockPwaService.showInstallPrompt.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      imports: [PwaInstallComponent],
      providers: [{ provide: PwaService, useValue: mockPwaService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PwaInstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call pwa service showInstallPrompt when installPwa is triggered', () => {
    mockPwaService.getInstallationStatus.and.returnValue('available');
    component.installPwa();
    expect(mockPwaService.showInstallPrompt).toHaveBeenCalled();
  });

  it('should call pwa service checkForUpdate when updatePwa is triggered', () => {
    component.updatePwa();
    expect(mockPwaService.checkForUpdate).toHaveBeenCalled();
  });

  it('should set showInstallButton to false when status is not available', () => {
    mockPwaService.getInstallationStatus.and.returnValue('not-available');
    component.ngOnInit();
    expect(component.showInstallButton).toBeFalse();
  });

  it('should set showInstallButton to true when status is available', () => {
    mockPwaService.getInstallationStatus.and.returnValue('available');
    component.ngOnInit();
    expect(component.showInstallButton).toBeTrue();
  });
});
