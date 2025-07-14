import { ROOM_PLANNER_CONSTANTS } from '../constants/room-planner.constants';
import { Room } from '../interfaces/room.interface';
import { RoomElement } from '../interfaces/room-element.interface';

/**
 * Input interface for creating a room - users only need to specify meters
 */
export interface RoomInput {
  widthMeters: number;
  heightMeters: number;
  tables?: RoomElement[];
  staticElements?: RoomElement[];
}

/**
 * Creates a Room object with computed pixel dimensions
 */
export function createRoom(input: RoomInput): Room {
  const width = Math.round(
    input.widthMeters * ROOM_PLANNER_CONSTANTS.PIXELS_PER_METER
  );
  const height = Math.round(
    input.heightMeters * ROOM_PLANNER_CONSTANTS.PIXELS_PER_METER
  );

  return {
    get width() {
      return width;
    },
    get height() {
      return height;
    },
    widthMeters: input.widthMeters,
    heightMeters: input.heightMeters,
    tables: input.tables || [],
    staticElements: input.staticElements || [],
  };
}

/**
 * Updates room dimensions and recalculates pixel values
 */
export function updateRoomDimensions(
  room: Room,
  widthMeters?: number,
  heightMeters?: number
): Room {
  const newWidthMeters = widthMeters ?? room.widthMeters;
  const newHeightMeters = heightMeters ?? room.heightMeters;

  return createRoom({
    widthMeters: newWidthMeters,
    heightMeters: newHeightMeters,
    tables: room.tables,
    staticElements: room.staticElements,
  });
}

/**
 * Helper to convert meters to pixels
 */
export function metersToPixels(meters: number): number {
  return Math.round(meters * ROOM_PLANNER_CONSTANTS.PIXELS_PER_METER);
}

/**
 * Helper to convert pixels to meters
 */
export function pixelsToMeters(pixels: number): number {
  return (
    Math.round((pixels / ROOM_PLANNER_CONSTANTS.PIXELS_PER_METER) * 10) / 10
  );
}
