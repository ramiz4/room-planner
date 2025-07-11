import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfflineComponent } from './offline.component';

describe('OfflineComponent', () => {
  let component: OfflineComponent;
  let fixture: ComponentFixture<OfflineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfflineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display offline message', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain("You're Offline");
    expect(compiled.textContent).toContain('lost your internet connection');
  });

  it('should have try again button', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.textContent.trim()).toBe('Try Again');
  });

  it('should call checkConnection when try again button is clicked', () => {
    spyOn(component, 'checkConnection');
    const button = fixture.nativeElement.querySelector('button');

    button.click();

    expect(component.checkConnection).toHaveBeenCalled();
  });
});
