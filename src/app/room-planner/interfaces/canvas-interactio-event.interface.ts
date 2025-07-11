import { RoomElement } from './room-element.interface';

export enum CanvasInteractionEventTypeEnum {
  SELECT = 'select',
  MOVE = 'move',
  RESIZE = 'resize',
  ZOOM = 'zoom',
}

export interface CanvasInteractionEvent {
  type: CanvasInteractionEventTypeEnum;
  elementId: string | null;
  element?: RoomElement;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  zoom?: number;
}
