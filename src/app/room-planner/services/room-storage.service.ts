import { Injectable } from '@angular/core';
import { Room } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomStorageService {
  private readonly STORAGE_KEY = 'room-planner-data';

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
