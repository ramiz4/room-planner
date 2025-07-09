import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomSizeControlsComponent } from './room-size-controls.component';

describe('RoomSizeControlsComponent', () => {
  let component: RoomSizeControlsComponent;
  let fixture: ComponentFixture<RoomSizeControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomSizeControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomSizeControlsComponent);
    component = fixture.componentInstance;

    // Set required inputs
    fixture.componentRef.setInput('widthMeters', 6.0);
    fixture.componentRef.setInput('heightMeters', 4.0);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit widthChange when width input changes', () => {
    spyOn(component.widthChange, 'emit');

    const widthInput = fixture.nativeElement.querySelector('#width-input');
    widthInput.value = '8.5';
    widthInput.dispatchEvent(new Event('input'));

    expect(component.widthChange.emit).toHaveBeenCalledWith(8.5);
  });

  it('should emit heightChange when height input changes', () => {
    spyOn(component.heightChange, 'emit');

    const heightInput = fixture.nativeElement.querySelector('#height-input');
    heightInput.value = '5.2';
    heightInput.dispatchEvent(new Event('input'));

    expect(component.heightChange.emit).toHaveBeenCalledWith(5.2);
  });

  it('should not emit change for invalid number inputs', () => {
    spyOn(component.widthChange, 'emit');
    spyOn(component.heightChange, 'emit');

    const widthInput = fixture.nativeElement.querySelector('#width-input');
    const heightInput = fixture.nativeElement.querySelector('#height-input');

    widthInput.value = 'invalid';
    widthInput.dispatchEvent(new Event('input'));

    heightInput.value = '';
    heightInput.dispatchEvent(new Event('input'));

    expect(component.widthChange.emit).not.toHaveBeenCalled();
    expect(component.heightChange.emit).not.toHaveBeenCalled();
  });

  it('should display current width and height values', () => {
    const widthInput = fixture.nativeElement.querySelector(
      '#width-input',
    ) as HTMLInputElement;
    const heightInput = fixture.nativeElement.querySelector(
      '#height-input',
    ) as HTMLInputElement;

    expect(widthInput.value).toBe('6');
    expect(heightInput.value).toBe('4');
  });
});
