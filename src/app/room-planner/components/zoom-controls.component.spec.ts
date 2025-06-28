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

  it('should emit zoomChange when select value changes', () => {
    spyOn(component.zoomChange, 'emit');
    const select = fixture.nativeElement.querySelector('select');
    select.value = '1.5';
    select.dispatchEvent(new Event('change'));
    expect(component.zoomChange.emit).toHaveBeenCalledWith(1.5);
  });
});
