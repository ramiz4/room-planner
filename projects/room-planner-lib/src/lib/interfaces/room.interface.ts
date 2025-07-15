import { RoomElement } from './room-element.interface';

export interface Room {
  readonly width: number; // Width in pixels (computed from widthMeters)
  readonly height: number; // Height in pixels (computed from heightMeters)
  widthMeters: number; // Width in meters
  heightMeters: number; // Height in meters
  tables: RoomElement[];
  staticElements: RoomElement[];
}
