import { RoomElement } from './room-element.interface';

export interface Room {
  width: number; // Width in pixels
  height: number; // Height in pixels
  widthMeters: number; // Width in meters
  heightMeters: number; // Height in meters
  tables: RoomElement[];
  staticElements: RoomElement[];
}
