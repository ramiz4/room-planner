export enum ElementTypeEnum {
  TABLE = 'table',
  ENTRANCE = 'entrance',
  DECORATION = 'decoration',
  WALL = 'wall',
}

export type ElementType = ElementTypeEnum[keyof ElementTypeEnum];

export enum ShapeTypeEnum {
  RECTANGLE = 'rect',
  CIRCLE = 'circle',
}

export type ShapeType = ShapeTypeEnum[keyof ShapeTypeEnum];

export interface RoomElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  elementType: ElementType;
  shapeType: ShapeType;
  label?: string;
}
