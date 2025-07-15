import { Injectable } from '@angular/core';
import { ROOM_PLANNER_CONSTANTS } from '../constants/room-planner.constants';

@Injectable({
  providedIn: 'root',
})
export class UnitConversionService {
  /**
   * Converts meters to pixels based on the scale factor
   * @param meters The value in meters
   * @returns The equivalent value in pixels (rounded)
   */
  metersToPixels(meters: number): number {
    return Math.round(meters * ROOM_PLANNER_CONSTANTS.PIXELS_PER_METER);
  }

  /**
   * Converts pixels to meters based on the scale factor
   * @param pixels The value in pixels
   * @returns The equivalent value in meters (rounded to 1 decimal place)
   */
  pixelsToMeters(pixels: number): number {
    return (
      Math.round((pixels / ROOM_PLANNER_CONSTANTS.PIXELS_PER_METER) * 10) / 10
    );
  }

  /**
   * Validates if a meter value is within acceptable room dimensions
   * @param meters The value in meters to validate
   * @returns True if the value is valid for room dimensions
   */
  isValidRoomDimension(meters: number): boolean {
    return meters >= 1 && meters <= 50;
  }
}
