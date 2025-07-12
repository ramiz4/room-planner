import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementPropertiesTriggerComponent } from './element-properties-trigger.component';
import {
  RoomElement,
  ElementTypeEnum,
  ShapeTypeEnum,
} from '../interfaces/room-element.interface';

describe('ElementPropertiesTriggerComponent', () => {
  let component: ElementPropertiesTriggerComponent;
  let fixture: ComponentFixture<ElementPropertiesTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementPropertiesTriggerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ElementPropertiesTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggleElementProperties when button is clicked', () => {
    const mockElement: RoomElement = {
      id: 'test-id',
      label: 'Test Table',
      elementType: ElementTypeEnum.TABLE,
      shapeType: ShapeTypeEnum.RECTANGLE,
      x: 100,
      y: 100,
      width: 80,
      height: 60,
      zIndex: 1,
    };

    component.selectedElement = mockElement;
    component.hasElements = true;

    spyOn(component.toggleElementProperties, 'emit');

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();

    button.click();

    expect(component.toggleElementProperties.emit).toHaveBeenCalled();
  });

  it('should show hint when no element is selected but elements exist', () => {
    component.selectedElement = null;
    component.hasElements = true;

    fixture.detectChanges();

    const hintDiv = fixture.nativeElement.querySelector('div');
    expect(hintDiv).toBeTruthy();
    expect(hintDiv.textContent).toContain(
      'Select an element to edit its properties'
    );
  });

  it('should not display anything when no elements exist', () => {
    component.selectedElement = null;
    component.hasElements = false;

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    const hintDiv = fixture.nativeElement.querySelector('div');
    expect(button).toBeFalsy();
    expect(hintDiv).toBeFalsy();
  });
});
