export type RoomElementType = 'rect' | 'circle';

export interface RoomElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  type: RoomElementType;
  label?: string;
}
