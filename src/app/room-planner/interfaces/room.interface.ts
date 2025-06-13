import { RoomElement } from './room-element.interface';

export interface Room {
  width: number;
  height: number;
  tables: RoomElement[];
  staticElements: RoomElement[];
}
