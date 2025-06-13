import { RoomElement } from './room-element.interface';

export interface Room {
  width: number;
  height: number;
  tables: RoomElement[];
  entrances: RoomElement[];
  decorations: RoomElement[];
  walls: RoomElement[];
}
