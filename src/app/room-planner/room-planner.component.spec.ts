import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPlannerComponent } from './room-planner.component';

describe('RoomPlannerComponent', () => {
  let component: RoomPlannerComponent;
  let fixture: ComponentFixture<RoomPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomPlannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle mobile properties visibility', () => {
    component.showMobileProperties.set(false);
    component.toggleMobileProperties();
    expect(component.showMobileProperties()).toBeTrue();
  });

  it('should toggle layout manager visibility', () => {
    component.showLayoutManager.set(false);
    component.toggleLayoutManager();
    expect(component.showLayoutManager()).toBeTrue();
  });

  it('should toggle mobile controls visibility', () => {
    component.showMobileControls.set(false);
    component.toggleMobileControls();
    expect(component.showMobileControls()).toBeTrue();
  });
});
