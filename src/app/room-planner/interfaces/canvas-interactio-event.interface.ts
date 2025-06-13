import { RoomElement } from './room-element.interface';


export interface CanvasInteractionEvent {
  type: 'select' | 'move' | 'resize';
  elementId: string | null;
  element?: RoomElement;
  position?: { x: number; y: number; };
  size?: { width: number; height: number; };
}
