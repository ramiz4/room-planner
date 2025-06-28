import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPlannerComponent } from './room-planner.component';
import { CanvasInteractionEventTypeEnum } from './interfaces/canvas-interactio-event.interface';

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

  it('should update room width when onRoomWidthMetersChange is called', () => {
    const initialWidth = component.room().widthMeters;
    component.onRoomWidthMetersChange(8.5);
    expect(component.room().widthMeters).toBe(8.5);
    expect(component.room().widthMeters).not.toBe(initialWidth);
  });

  it('should update room height when onRoomHeightMetersChange is called', () => {
    const initialHeight = component.room().heightMeters;
    component.onRoomHeightMetersChange(5.2);
    expect(component.room().heightMeters).toBe(5.2);
    expect(component.room().heightMeters).not.toBe(initialHeight);
  });

  it('should update zoom level on canvas zoom interaction', () => {
    component.onCanvasInteraction({
      type: CanvasInteractionEventTypeEnum.ZOOM,
      elementId: null,
      zoom: 1.5,
    });
    expect(component.zoomLevel()).toBe(1.5);
  });
});
