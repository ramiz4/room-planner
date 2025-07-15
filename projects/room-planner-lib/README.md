# @ramiz4/room-planner

Angular room planner component library for creating interactive floor plans and restaurant layouts.

> **Status**: GitHub workflows are now properly configured and running on the `v2/library-monorepo` branch. Deployment workflow updated with correct base href for Angular routing.

## Installation

```bash
npm install @ramiz4/room-planner
```

Or with pnpm:

```bash
pnpm add @ramiz4/room-planner
```

## Quick Start

```typescript
import { Component } from '@angular/core';
import {
  RoomPlannerComponent,
  createRoom,
  Room,
  RoomElement,
} from '@ramiz4/room-planner';

@Component({
  selector: 'app-my-planner',
  template: `
    <room-planner
      [initialRoom]="roomData"
      [showThemeToggle]="true"
      (roomChange)="onRoomChange($event)"
      (elementSelected)="onElementSelected($event)"
    >
    </room-planner>
  `,
  imports: [RoomPlannerComponent],
})
export class MyPlannerComponent {
  roomData = createRoom({
    widthMeters: 10,
    heightMeters: 8,
    tables: [],
    staticElements: [],
  });

  onRoomChange(room: Room) {
    console.log('Room updated:', room);
  }

  onElementSelected(element: RoomElement | null) {
    console.log('Element selected:', element);
  }
}
```

## Features

- 🪑 Interactive table placement and management
- 📐 Custom room dimensions with metric support
- 🎨 Customizable element colors and properties
- 📱 Responsive design for mobile and desktop
- 🖱️ Drag and drop interface
- 💾 Export/import room layouts as JSON
- 🌓 Optional dark/light theme toggle
- ⚡ Built with Angular 19 and modern web standards

## API

### Inputs

| Property          | Type      | Default     | Description                             |
| ----------------- | --------- | ----------- | --------------------------------------- |
| `initialRoom`     | `Room`    | `undefined` | Initial room configuration to load      |
| `showThemeToggle` | `boolean` | `false`     | Whether to show the theme toggle button |

### Outputs

| Event             | Type                  | Description                                    |
| ----------------- | --------------------- | ---------------------------------------------- |
| `roomChange`      | `Room`                | Emitted when the room layout changes           |
| `elementSelected` | `RoomElement \| null` | Emitted when an element is selected/deselected |

## Documentation

For complete documentation, examples, and API reference, see the [main repository](https://github.com/ramiz4/room-planner).

## Live Demo

Try the interactive demo at: [https://ramiz4.github.io/room-planner/](https://ramiz4.github.io/room-planner/)

## License

MIT © [Ramiz](https://github.com/ramiz4)
