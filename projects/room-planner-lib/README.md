# @ramiz4/room-planner

An Angular component library for creating interactive floor plans and restaurant layouts with drag-and-drop functionality, customizable elements, and export/import capabilities.

## Installation

```bash
npm install @ramiz4/room-planner
```

Or with pnpm:

```bash
pnpm add @ramiz4/room-planner
```

## Quick Start

### Read-Only Mode (Default)

Perfect for displaying layouts without editing capabilities:

```typescript
import { Component } from '@angular/core';
import {
  RoomPlannerComponent,
  createRoom,
  Room,
  RoomElement,
} from '@ramiz4/room-planner';

@Component({
  selector: 'app-layout-viewer',
  template: `
    <room-planner
      [initialRoom]="roomData"
      (elementSelected)="onElementSelected($event)"
    >
    </room-planner>
  `,
  imports: [RoomPlannerComponent],
})
export class LayoutViewerComponent {
  roomData = createRoom({
    widthMeters: 12,
    heightMeters: 8,
    tables: [
      {
        id: 'table-1',
        x: 100,
        y: 100,
        width: 80,
        height: 80,
        label: 'Table 1',
        elementType: 'table',
        shapeType: 'rectangle',
        color: '#3498db',
      },
    ],
    staticElements: [],
  });

  onElementSelected(element: RoomElement | null) {
    console.log('Selected:', element?.label || 'None');
  }
}
```

### Editable Mode

Full editing capabilities including room size controls and element management:

```typescript
import { Component } from '@angular/core';
import {
  RoomPlannerComponent,
  createRoom,
  Room,
  RoomElement,
} from '@ramiz4/room-planner';

@Component({
  selector: 'app-layout-editor',
  template: `
    <room-planner
      [initialRoom]="roomData"
      [editable]="true"
      [showThemeToggle]="true"
      (roomChange)="onRoomChange($event)"
      (elementSelected)="onElementSelected($event)"
    >
    </room-planner>
  `,
  imports: [RoomPlannerComponent],
})
export class LayoutEditorComponent {
  roomData = createRoom({
    widthMeters: 10,
    heightMeters: 8,
    tables: [],
    staticElements: [],
  });

  onRoomChange(room: Room) {
    console.log('Layout updated:', room);
    // Save to your backend or local storage
  }

  onElementSelected(element: RoomElement | null) {
    console.log('Element selected:', element);
  }
}
```

## Features

- 🎯 **Dual Modes**: Read-only viewer or full editor with permissions control
- 🪑 **Interactive Elements**: Drag-and-drop tables, chairs, and static elements
- 📐 **Metric Support**: Real-world room dimensions in meters
- 🎨 **Customization**: Colors, shapes, labels, and element properties
- 📱 **Responsive**: Works seamlessly on desktop and mobile devices
- 🖱️ **Intuitive Interface**: Point-and-click editing with visual feedback
- 💾 **Data Management**: Export/import layouts as JSON
- 🌓 **Theme Support**: Optional dark/light mode toggle
- 🔍 **Zoom & Pan**: Navigate large floor plans with ease
- ⚡ **Modern Stack**: Built with Angular 19 and optimized performance

## API Reference

### Component Properties

#### Inputs

| Property          | Type      | Default     | Description                                                                       |
| ----------------- | --------- | ----------- | --------------------------------------------------------------------------------- |
| `initialRoom`     | `Room`    | `undefined` | Initial room configuration to load                                                |
| `editable`        | `boolean` | `false`     | Enable editing controls (room size, element properties, add/edit/delete elements) |
| `showThemeToggle` | `boolean` | `false`     | Show dark/light theme toggle button                                               |

#### Outputs

| Event             | Type                  | Description                                    |
| ----------------- | --------------------- | ---------------------------------------------- |
| `roomChange`      | `Room`                | Emitted when the room layout changes           |
| `elementSelected` | `RoomElement \| null` | Emitted when an element is selected/deselected |

### Available Controls by Mode

#### Read-Only Mode (`editable="false"`)

- ✅ Zoom and pan controls
- ✅ Element selection (click to select)
- ✅ Theme toggle (if `showThemeToggle="true"`)
- ❌ Room size editing
- ❌ Element editing/deletion
- ❌ Add new elements

#### Editable Mode (`editable="true"`)

- ✅ All read-only features
- ✅ Room size controls (resize room dimensions)
- ✅ Element properties panel (edit selected elements)
- ✅ Add elements dropdown (tables, chairs, static elements)
- ✅ Export/import layout functionality

## Links

- 🌐 **Live Demo**: [https://ramiz4.github.io/room-planner/](https://ramiz4.github.io/room-planner/)
- 📚 **Documentation**: [GitHub Repository](https://github.com/ramiz4/room-planner)
- 📦 **NPM Package**: [@ramiz4/room-planner](https://www.npmjs.com/package/@ramiz4/room-planner)

## License

MIT © [Ramiz](https://github.com/ramiz4)
