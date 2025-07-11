import { Injectable } from '@angular/core';
import { Room } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomStorageService {
  private readonly STORAGE_KEY = 'room-planner-data';
  private readonly ZOOM_STORAGE_KEY = 'room-planner-zoom';
  private readonly CAMERA_POSITION_STORAGE_KEY = 'room-planner-camera-position';

  /**
   * Save room data to localStorage
   */
  saveRoom(room: Room): void {
    try {
      const serializedRoom = JSON.stringify(room);
      localStorage.setItem(this.STORAGE_KEY, serializedRoom);
    } catch (error) {
      console.warn('Failed to save room data to localStorage:', error);
    }
  }

  /**
   * Load room data from localStorage
   */
  loadRoom(): Room | null {
    try {
      const serializedRoom = localStorage.getItem(this.STORAGE_KEY);
      if (serializedRoom) {
        return JSON.parse(serializedRoom);
      }
    } catch (error) {
      console.warn('Failed to load room data from localStorage:', error);
    }
    return null;
  }

  /**
   * Clear room data from localStorage
   */
  clearRoom(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear room data from localStorage:', error);
    }
  }

  /**
   * Save zoom level to localStorage
   */
  saveZoomLevel(zoomLevel: number): void {
    try {
      localStorage.setItem(this.ZOOM_STORAGE_KEY, zoomLevel.toString());
    } catch (error) {
      console.warn('Failed to save zoom level to localStorage:', error);
    }
  }

  /**
   * Load zoom level from localStorage
   */
  loadZoomLevel(): number | null {
    try {
      const savedZoom = localStorage.getItem(this.ZOOM_STORAGE_KEY);
      if (savedZoom) {
        const zoomValue = parseFloat(savedZoom);
        // Validate zoom value is reasonable (between 0.1 and 5)
        if (zoomValue >= 0.1 && zoomValue <= 5) {
          return zoomValue;
        }
      }
    } catch (error) {
      console.warn('Failed to load zoom level from localStorage:', error);
    }
    return null;
  }

  /**
   * Clear zoom level from localStorage
   */
  clearZoomLevel(): void {
    try {
      localStorage.removeItem(this.ZOOM_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear zoom level from localStorage:', error);
    }
  }

  /**
   * Save camera position to localStorage
   */
  saveCameraPosition(x: number, y: number): void {
    try {
      const cameraPosition = { x, y };
      localStorage.setItem(
        this.CAMERA_POSITION_STORAGE_KEY,
        JSON.stringify(cameraPosition),
      );
    } catch (error) {
      console.warn('Failed to save camera position to localStorage:', error);
    }
  }

  /**
   * Load camera position from localStorage
   */
  loadCameraPosition(): { x: number; y: number } | null {
    try {
      const savedPosition = localStorage.getItem(
        this.CAMERA_POSITION_STORAGE_KEY,
      );
      if (savedPosition) {
        const position = JSON.parse(savedPosition);
        // Validate position structure and reasonable values
        if (
          typeof position === 'object' &&
          typeof position.x === 'number' &&
          typeof position.y === 'number' &&
          isFinite(position.x) &&
          isFinite(position.y)
        ) {
          return position;
        }
      }
    } catch (error) {
      console.warn('Failed to load camera position from localStorage:', error);
    }
    return null;
  }

  /**
   * Clear camera position from localStorage
   */
  clearCameraPosition(): void {
    try {
      localStorage.removeItem(this.CAMERA_POSITION_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear camera position from localStorage:', error);
    }
  }

  /**
   * Clear all stored data (room, zoom, camera position)
   */
  clearAllData(): void {
    this.clearRoom();
    this.clearZoomLevel();
    this.clearCameraPosition();
  }

  /**
   * Check if localStorage is available
   */
  private isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
}
