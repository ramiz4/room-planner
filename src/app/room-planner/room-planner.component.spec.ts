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
    component.showElementProperties.set(false);
    component.toggleElementProperties();
    expect(component.showElementProperties()).toBeTrue();
  });

  it('should toggle mobile controls visibility', () => {
    component.showRoomControls.set(false);
    component.toggleRoomControls();
    expect(component.showRoomControls()).toBeTrue();
  });

  it('should toggle export manager visibility', () => {
    component.showExportManager.set(false);
    component.toggleExportManager();
    expect(component.showExportManager()).toBeTrue();
  });

  it('should toggle import manager visibility', () => {
    component.showImportManager.set(false);
    component.toggleImportManager();
    expect(component.showImportManager()).toBeTrue();
  });
});
