import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExportTriggerComponent } from './export-trigger.component';

describe('ExportTriggerComponent', () => {
  let component: ExportTriggerComponent;
  let fixture: ComponentFixture<ExportTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportTriggerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit exportClick when button is clicked', () => {
    spyOn(component.exportClick, 'emit');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.exportClick.emit).toHaveBeenCalled();
  });

  it('should have correct button attributes', () => {
    const button = fixture.nativeElement.querySelector('button');

    expect(button.title).toBe('Export Layout');
    expect(button.type).toBe('button');
  });
});
