import { Component } from '@angular/core';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
})
export class InstallComponent {
  codeExample = `import { Component } from '@angular/core';
import { RoomPlannerComponent, Room, RoomElement } from '@ramiz4/room-planner';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RoomPlannerComponent],
  template: \`
    <room-planner
      [initialRoom]="roomData"
      (roomChange)="onRoomChange($event)"
      (elementSelected)="onElementSelected($event)">
    </room-planner>
  \`
})
export class LayoutComponent {
  roomData: Room = {
    width: 800,
    height: 600,
    widthMeters: 20,
    heightMeters: 15,
    tables: [],
    staticElements: []
  };

  onRoomChange(room: Room) {
    console.log('Room updated:', room);
  }

  onElementSelected(element: RoomElement | null) {
    console.log('Element selected:', element);
  }
}`;
}
