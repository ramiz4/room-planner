import { NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  ElementTypeEnum,
  Room,
  RoomElement,
  RoomPlannerComponent,
  ShapeTypeEnum,
  createRoom,
} from '@ramiz4/room-planner';

@Component({
  selector: 'app-sample',
  imports: [NgIf, RoomPlannerComponent],
  templateUrl: './sample.component.html',
})
export class SampleComponent {
  showTemplate = signal(false);
  selectedElement = signal<RoomElement | null>(null);

  templateData = signal<Room>(
    createRoom({
      widthMeters: 13,
      heightMeters: 8,
      tables: [],
      staticElements: [],
    })
  );

  roomStats = signal<{ tableCount: number; roomSize: string } | null>(null);

  loadSampleTemplate() {
    const sampleLayout: Room = createRoom({
      widthMeters: 12,
      heightMeters: 8,
      tables: [
        // Front row - 2-person tables (y: 100-160)
        {
          id: 'table-2p-1',
          x: 80,
          y: 100,
          width: 60,
          height: 60,
          label: 'Table 1',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#3498db',
        },
        {
          id: 'table-2p-2',
          x: 180,
          y: 100,
          width: 60,
          height: 60,
          label: 'Table 2',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#3498db',
        },
        {
          id: 'table-2p-3',
          x: 280,
          y: 100,
          width: 60,
          height: 60,
          label: 'Table 3',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#3498db',
        },
        {
          id: 'table-2p-4',
          x: 380,
          y: 100,
          width: 60,
          height: 60,
          label: 'Table 4',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#3498db',
        },

        // Middle row - 4-person tables (y: 200-280)
        {
          id: 'table-4p-1',
          x: 80,
          y: 200,
          width: 80,
          height: 80,
          label: 'Table 5',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#2ecc71',
        },
        {
          id: 'table-4p-2',
          x: 200,
          y: 200,
          width: 80,
          height: 80,
          label: 'Table 6',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#2ecc71',
        },
        {
          id: 'table-4p-3',
          x: 320,
          y: 200,
          width: 80,
          height: 80,
          label: 'Table 7',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#2ecc71',
        },
        {
          id: 'table-4p-4',
          x: 440,
          y: 200,
          width: 80,
          height: 80,
          label: 'Table 8',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#2ecc71',
        },

        // Back row - 6-person tables (y: 320-400)
        {
          id: 'table-6p-1',
          x: 80,
          y: 320,
          width: 100,
          height: 80,
          label: 'Table 9',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#e74c3c',
        },
        {
          id: 'table-6p-2',
          x: 220,
          y: 320,
          width: 100,
          height: 80,
          label: 'Table 10',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#e74c3c',
        },
        {
          id: 'table-6p-3',
          x: 360,
          y: 320,
          width: 100,
          height: 80,
          label: 'Table 11',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#e74c3c',
        },

        // VIP booths along right wall
        {
          id: 'booth-1',
          x: 850,
          y: 100,
          width: 120,
          height: 70,
          label: 'VIP Booth 1',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#9b59b6',
        },
        {
          id: 'booth-2',
          x: 850,
          y: 190,
          width: 120,
          height: 70,
          label: 'VIP Booth 2',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#9b59b6',
        },
        {
          id: 'booth-3',
          x: 850,
          y: 280,
          width: 120,
          height: 70,
          label: 'VIP Booth 3',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#9b59b6',
        },

        // Bar seating area - bottom area
        {
          id: 'bar-table-1',
          x: 200,
          y: 520,
          width: 50,
          height: 50,
          label: 'Bar 1',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.CIRCLE,
          color: '#f39c12',
        },
        {
          id: 'bar-table-2',
          x: 280,
          y: 520,
          width: 50,
          height: 50,
          label: 'Bar 2',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.CIRCLE,
          color: '#f39c12',
        },
        {
          id: 'bar-table-3',
          x: 360,
          y: 520,
          width: 50,
          height: 50,
          label: 'Bar 3',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.CIRCLE,
          color: '#f39c12',
        },
        {
          id: 'bar-table-4',
          x: 440,
          y: 520,
          width: 50,
          height: 50,
          label: 'Bar 4',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.CIRCLE,
          color: '#f39c12',
        },

        // Additional dining tables to fill space
        {
          id: 'table-extra-1',
          x: 580,
          y: 100,
          width: 80,
          height: 80,
          label: 'Table 12',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#16a085',
        },
        {
          id: 'table-extra-2',
          x: 580,
          y: 200,
          width: 80,
          height: 80,
          label: 'Table 13',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#16a085',
        },
        {
          id: 'table-extra-3',
          x: 580,
          y: 300,
          width: 80,
          height: 80,
          label: 'Table 14',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#16a085',
        },
      ],
      staticElements: [
        // Main entrance (top center)
        {
          id: 'main-entrance',
          x: 450,
          y: 0,
          width: 300,
          height: 20,
          label: 'Main Entrance',
          elementType: ElementTypeEnum.STATIC,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#95a5a6',
        },

        // Host station (near entrance)
        {
          id: 'host-station',
          x: 50,
          y: 30,
          width: 80,
          height: 40,
          label: 'Host Station',
          elementType: ElementTypeEnum.STATIC,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#34495e',
        },

        // Waiting area (near entrance)
        {
          id: 'wait-area',
          x: 150,
          y: 30,
          width: 120,
          height: 40,
          label: 'Waiting Area',
          elementType: ElementTypeEnum.STATIC,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#d35400',
        },

        // Kitchen area (bottom right)
        {
          id: 'kitchen',
          x: 700,
          y: 450,
          width: 300,
          height: 150,
          label: 'Kitchen',
          elementType: ElementTypeEnum.STATIC,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#e67e22',
        },

        // Walk-in cooler (inside kitchen area)
        {
          id: 'cooler',
          x: 1020,
          y: 450,
          width: 80,
          height: 60,
          label: 'Cooler',
          elementType: ElementTypeEnum.STATIC,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#3498db',
        },

        // Storage room (bottom right corner)
        {
          id: 'storage',
          x: 1020,
          y: 540,
          width: 80,
          height: 60,
          label: 'Storage',
          elementType: ElementTypeEnum.STATIC,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#7f8c8d',
        },

        // Bar counter (center bottom)
        {
          id: 'bar-counter',
          x: 150,
          y: 600,
          width: 400,
          height: 50,
          label: 'Bar Counter',
          elementType: ElementTypeEnum.STATIC,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#8e44ad',
        },

        // Service station (center)
        {
          id: 'service-station',
          x: 700,
          y: 200,
          width: 80,
          height: 60,
          label: 'Service Station',
          elementType: ElementTypeEnum.STATIC,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#16a085',
        },

        // Manager office (top right)
        {
          id: 'manager-office',
          x: 1020,
          y: 100,
          width: 100,
          height: 80,
          label: 'Office',
          elementType: ElementTypeEnum.STATIC,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#95a5a6',
        },

        // Restrooms (bottom left)
        {
          id: 'mens-restroom',
          x: 50,
          y: 650,
          width: 80,
          height: 80,
          label: "Men's",
          elementType: ElementTypeEnum.STATIC,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#2c3e50',
        },
        {
          id: 'womens-restroom',
          x: 50,
          y: 550,
          width: 80,
          height: 80,
          label: "Women's",
          elementType: ElementTypeEnum.STATIC,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#2c3e50',
        },

        // Emergency exit (right side)
        {
          id: 'emergency-exit',
          x: 1150,
          y: 300,
          width: 50,
          height: 100,
          label: 'Emergency Exit',
          elementType: ElementTypeEnum.STATIC,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#e74c3c',
        },
      ],
    });

    this.templateData.set(sampleLayout);
    this.showTemplate.set(true);
    this.updateStats(sampleLayout);
  }

  saveLayout() {
    console.log('Saving layout...', this.templateData());
    // In a real app, this would call your layout service
    alert('Layout saved successfully! (This is a demo)');
  }

  clearLayout() {
    const emptyRoom: Room = createRoom({
      widthMeters: 8,
      heightMeters: 6,
      tables: [],
      staticElements: [],
    });

    this.templateData.set(emptyRoom);
    this.showTemplate.set(false);
    this.roomStats.set(null);
    this.selectedElement.set(null);
  }

  private updateStats(room: Room) {
    this.roomStats.set({
      tableCount: room.tables.length,
      roomSize: `${room.widthMeters}m × ${room.heightMeters}m`,
    });
  }

  onRoomChange(room: Room) {
    console.log('Room changed:', room);
    // Simply update stats without updating templateData to prevent loops
    this.updateStats(room);
  }

  onElementSelected(element: RoomElement | null) {
    console.log('Element selected:', element);
    this.selectedElement.set(element);
  }
}
