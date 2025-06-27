import { TestBed } from '@angular/core/testing';
import { ElementManagementService } from './element-management.service';
import { Room } from '../interfaces/room.interface';
import {
  ElementTypeEnum,
  ShapeTypeEnum,
} from '../interfaces/room-element.interface';

describe('ElementManagementService', () => {
  let service: ElementManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementManagementService);
  });

  it('should clamp table position within room bounds', () => {
    const room: Room = {
      width: 100,
      height: 100,
      tables: [
        {
          id: '1',
          x: 10,
          y: 10,
          width: 20,
          height: 20,
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.RECTANGLE,
        },
      ],
      staticElements: [],
    };

    const updatedRoom = service.updateElement(room, '1', { x: -10, y: 95 });
    const table = updatedRoom.tables[0];
    expect(table.x).toBe(0);
    expect(table.y).toBe(80);
  });
});
