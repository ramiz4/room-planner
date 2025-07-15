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
  selector: 'app-sample-editable',
  imports: [NgIf, RoomPlannerComponent],
  templateUrl: './sample-editable.component.html',
})
export class SampleEditableComponent {
  selectedElement = signal<RoomElement | null>(null);

  templateData = signal<Room>(
    createRoom({
      widthMeters: 10,
      heightMeters: 8,
      tables: [
        {
          id: 'table-1',
          x: 100,
          y: 100,
          width: 80,
          height: 80,
          label: 'Table 1',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#3498db',
        },
        {
          id: 'table-2',
          x: 220,
          y: 100,
          width: 80,
          height: 80,
          label: 'Table 2',
          elementType: ElementTypeEnum.TABLE,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#2ecc71',
        },
      ],
      staticElements: [
        {
          id: 'entrance',
          x: 350,
          y: 50,
          width: 150,
          height: 30,
          label: 'Entrance',
          elementType: ElementTypeEnum.STATIC,
          shapeType: ShapeTypeEnum.RECTANGLE,
          color: '#95a5a6',
        },
      ],
    })
  );

  roomStats = signal<{ tableCount: number; roomSize: string } | null>(null);

  constructor() {
    this.updateStats(this.templateData());
  }

  private updateStats(room: Room) {
    this.roomStats.set({
      tableCount: room.tables.length,
      roomSize: `${room.widthMeters}m × ${room.heightMeters}m`,
    });
  }

  onRoomChange(room: Room) {
    console.log('Room changed:', room);
    this.updateStats(room);
  }

  onElementSelected(element: RoomElement | null) {
    console.log('Element selected:', element);
    this.selectedElement.set(element);
  }

  clearLayout() {
    const emptyRoom: Room = createRoom({
      widthMeters: 8,
      heightMeters: 6,
      tables: [],
      staticElements: [],
    });

    this.templateData.set(emptyRoom);
    this.roomStats.set(null);
    this.selectedElement.set(null);
  }

  resetLayout() {
    this.templateData.set(
      createRoom({
        widthMeters: 10,
        heightMeters: 8,
        tables: [
          {
            id: 'table-1',
            x: 100,
            y: 100,
            width: 80,
            height: 80,
            label: 'Table 1',
            elementType: ElementTypeEnum.TABLE,
            shapeType: ShapeTypeEnum.RECTANGLE,
            color: '#3498db',
          },
          {
            id: 'table-2',
            x: 220,
            y: 100,
            width: 80,
            height: 80,
            label: 'Table 2',
            elementType: ElementTypeEnum.TABLE,
            shapeType: ShapeTypeEnum.RECTANGLE,
            color: '#2ecc71',
          },
        ],
        staticElements: [
          {
            id: 'entrance',
            x: 350,
            y: 50,
            width: 150,
            height: 30,
            label: 'Entrance',
            elementType: ElementTypeEnum.STATIC,
            shapeType: ShapeTypeEnum.RECTANGLE,
            color: '#95a5a6',
          },
        ],
      })
    );
    this.updateStats(this.templateData());
  }
}
