import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPlannerComponent } from './room-planner.component';

describe('RoomPlannerComponent', () => {
  let component: RoomPlannerComponent;
  let fixture: ComponentFixture<RoomPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomPlannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
