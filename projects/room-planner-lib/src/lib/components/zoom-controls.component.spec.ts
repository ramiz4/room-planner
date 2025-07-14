import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZoomControlsComponent } from './zoom-controls.component';

describe('ZoomControlsComponent', () => {
  let component: ZoomControlsComponent;
  let fixture: ComponentFixture<ZoomControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoomControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZoomControlsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('zoom', 1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit zoomChange when zoom in button is clicked', () => {
    spyOn(component.zoomChange, 'emit');
    const zoomInButton = fixture.nativeElement.querySelectorAll('button')[1]; // Second button is zoom in
    zoomInButton.click();
    expect(component.zoomChange.emit).toHaveBeenCalledWith(1.2); // zoom * 1.2
  });

  it('should emit zoomChange when zoom out button is clicked', () => {
    spyOn(component.zoomChange, 'emit');
    const zoomOutButton = fixture.nativeElement.querySelectorAll('button')[0]; // First button is zoom out
    zoomOutButton.click();
    expect(component.zoomChange.emit).toHaveBeenCalledWith(1 / 1.2); // zoom / 1.2
  });

  it('should emit zoomChange when reset button is clicked', () => {
    spyOn(component.zoomChange, 'emit');
    const resetButton = fixture.nativeElement.querySelectorAll('button')[2]; // Third button is reset
    resetButton.click();
    expect(component.zoomChange.emit).toHaveBeenCalledWith(1);
  });
});
