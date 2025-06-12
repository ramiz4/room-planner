export type RoomElementType = 'rect' | 'circle';

export interface Room {
  width: number;
  height: number;
  tables: RoomElement[];
  entrances: RoomElement[];
  decorations: RoomElement[];
  walls: RoomElement[];
}

export interface RoomElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  type: RoomElementType;
  label?: string; // Label for elements like entrances
}
