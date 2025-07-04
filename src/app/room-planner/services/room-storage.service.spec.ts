import { TestBed } from '@angular/core/testing';
import { RoomStorageService } from './room-storage.service';
import { Room } from '../interfaces/room.interface';
import { ROOM_PLANNER_CONSTANTS } from '../constants/room-planner.constants';

describe('RoomStorageService', () => {
  let service: RoomStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomStorageService);

    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up localStorage after each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save and load room data', () => {
    const testRoom: Room = {
      width: ROOM_PLANNER_CONSTANTS.ROOM_WIDTH,
      height: ROOM_PLANNER_CONSTANTS.ROOM_HEIGHT,
      widthMeters: ROOM_PLANNER_CONSTANTS.ROOM_WIDTH_METERS,
      heightMeters: ROOM_PLANNER_CONSTANTS.ROOM_HEIGHT_METERS,
      tables: [
        {
          id: 'test-table-1',
          x: 100,
          y: 100,
          width: 80,
          height: 60,
          color: '#8B4513',
          label: 'Test Table',
          elementType: 'table',
          shapeType: 'rectangle',
          zIndex: 1,
        },
      ],
      staticElements: [],
    };

    // Save the room
    service.saveRoom(testRoom);

    // Load the room
    const loadedRoom = service.loadRoom();

    expect(loadedRoom).toEqual(testRoom);
  });

  it('should return null when no room data exists', () => {
    const loadedRoom = service.loadRoom();
    expect(loadedRoom).toBeNull();
  });

  it('should clear room data', () => {
    const testRoom: Room = {
      width: 500,
      height: 400,
      widthMeters: 5,
      heightMeters: 4,
      tables: [],
      staticElements: [],
    };

    // Save room data
    service.saveRoom(testRoom);
    expect(service.loadRoom()).toEqual(testRoom);

    // Clear room data
    service.clearRoom();
    expect(service.loadRoom()).toBeNull();
  });

  it('should handle localStorage errors gracefully', () => {
    // Mock localStorage to throw an error
    const originalSetItem = Storage.prototype.setItem;
    const originalGetItem = Storage.prototype.getItem;

    spyOn(console, 'warn');

    Storage.prototype.setItem = jasmine
      .createSpy()
      .and.throwError('Storage error');
    Storage.prototype.getItem = jasmine
      .createSpy()
      .and.throwError('Storage error');

    const testRoom: Room = {
      width: 500,
      height: 400,
      widthMeters: 5,
      heightMeters: 4,
      tables: [],
      staticElements: [],
    };

    // Should not throw error when saving fails
    expect(() => service.saveRoom(testRoom)).not.toThrow();

    // Should return null when loading fails
    expect(service.loadRoom()).toBeNull();

    // Should have logged warnings
    expect(console.warn).toHaveBeenCalled();

    // Restore original methods
    Storage.prototype.setItem = originalSetItem;
    Storage.prototype.getItem = originalGetItem;
  });
});
