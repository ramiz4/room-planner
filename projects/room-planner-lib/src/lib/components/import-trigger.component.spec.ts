import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportTriggerComponent } from './import-trigger.component';

describe('ImportTriggerComponent', () => {
  let component: ImportTriggerComponent;
  let fixture: ComponentFixture<ImportTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportTriggerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit importClick when button is clicked', () => {
    spyOn(component.importClick, 'emit');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.importClick.emit).toHaveBeenCalled();
  });

  it('should have correct button attributes', () => {
    const button = fixture.nativeElement.querySelector('button');

    expect(button.title).toBe('Import Layout');
    expect(button.type).toBe('button');
  });
});
