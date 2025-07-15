# Room Planner Angular Library 📐

<div align="center">

![Angular](https://img.shields.io/badge/Angular-19.2-red?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-blue?style=flat-square&logo=tailwindcss)
![CI](https://github.com/ramiz4/room-planner/workflows/CI/badge.svg)
![Deploy](https://github.com/ramiz4/room-planner/workflows/Deploy%20Sample%20App%20to%20GitHub%20Pages/badge.svg)

A modern Angular library for creating interactive floor plans and room layouts with drag-and-drop functionality. Perfect for restaurant management, office planning, and space management applications.

**[🌐 Live Demo](https://ramiz4.github.io/room-planner/) | [📚 Library Docs](projects/room-planner-lib/README.md) | [🎯 Sample App](projects/room-planner-app/README.md)**

</div>

## 🌟 Overview

This monorepo contains a reusable Angular library (`room-planner-lib`) for creating interactive room layouts and a comprehensive sample application (`room-planner-app`) demonstrating its capabilities.

**Key Features:**

- 🎯 **Dual Modes**: Read-only viewer or full editor with permission controls
- 🪑 **Interactive Elements**: Drag-and-drop tables, furniture, and room elements
- 📐 **Real-world Scale**: Metric support with accurate room dimensions
- 💾 **Data Management**: Export/import layouts as JSON
- 🎨 **Customizable**: Colors, shapes, labels, and element properties
- 📱 **Responsive**: Works on desktop, tablet, and mobile devices

## 📁 Project Structure

```
room-planner/
├── 📦 projects/
│   ├── 🔧 room-planner-lib/     # Reusable Angular library
│   │   ├── src/lib/             # Library source code
│   │   ├── package.json         # Library package config
│   │   └── README.md            # Library documentation
│   │
│   └── 🎯 room-planner-app/     # Sample application
│       ├── src/app/             # Sample app source
│       ├── package.json         # App dependencies
│       └── README.md            # App documentation
│
├── 📄 package.json              # Root workspace config
├── 📄 angular.json              # Angular CLI config
├── 📄 pnpm-workspace.yaml       # PNPM workspace config
└── 📖 docs/                     # Documentation
```

## ✨ Library Features

- **🎯 Flexible Modes**: Read-only viewer or full editor
- **🪑 Element Types**: Tables, chairs, static elements (walls, doors, equipment)
- **📐 Custom Dimensions**: Define exact room sizes with meter/pixel conversion
- **🎨 Rich Customization**: Colors, shapes, labels, and properties
- **💾 Import/Export**: Save and load layouts as JSON
- **🌓 Theme Support**: Light and dark mode options
- **📱 Mobile Friendly**: Touch-optimized for tablets and phones
- **⚡ Modern Angular**: Built with Angular 19, standalone components, and signals

## 🚀 Quick Start

### Prerequisites

```bash
# Install pnpm globally
npm install -g pnpm
```

### Development Setup

1. **Clone and Install**

   ```bash
   git clone https://github.com/ramiz4/room-planner.git
   cd room-planner
   pnpm install
   ```

2. **Start Development**

   ```bash
   # Start sample app
   pnpm start

   # Build library
   pnpm run build:lib

   # Run tests
   pnpm run test:lib
   ```

3. **View the Demo**
   Open `http://localhost:4200/` in your browser

### Using the Library

```bash
# Install in your project
npm install @ramiz4/room-planner
```

```typescript
import { RoomPlannerComponent, createRoom } from '@ramiz4/room-planner';

@Component({
  template: `
    <room-planner
      [initialRoom]="roomData"
      [editable]="true"
      (roomChange)="onRoomChange($event)"
    ></room-planner>
  `,
  imports: [RoomPlannerComponent],
})
export class MyComponent {
  roomData = createRoom({
    widthMeters: 10,
    heightMeters: 8,
    tables: [],
    staticElements: [],
  });

  onRoomChange(room: Room) {
    console.log('Layout updated:', room);
  }
}
```

## 📋 Available Scripts

| Command                 | Description                      |
| ----------------------- | -------------------------------- |
| `pnpm start`            | Start sample app for development |
| `pnpm run build:lib`    | Build the Angular library        |
| `pnpm run build:sample` | Build sample app for production  |
| `pnpm run test:lib`     | Run library unit tests           |
| `pnpm run test:sample`  | Run sample app tests             |
| `pnpm run lint`         | Check code quality               |
| `pnpm run lint:fix`     | Fix linting issues               |
| `pnpm run pack:lib`     | Package library for npm          |

## 🏗️ Architecture

### Monorepo Structure

```
room-planner/
├── 📦 projects/
│   ├── room-planner-lib/     # Reusable Angular library
│   └── room-planner-app/     # Sample application
├── 📄 package.json           # Workspace configuration
├── 📄 angular.json           # Angular CLI configuration
└── � docs/                  # Additional documentation
```

### Library Components

- **Components**: Room planner, element controls, property panels
- **Services**: Canvas drawing, element management, storage
- **Directives**: Canvas interaction, touch gestures
- **Utilities**: Room factory, unit conversion, type definitions

## 🤝 Contributing

1. **Fork & Clone**

   ```bash
   git clone https://github.com/your-username/room-planner.git
   cd room-planner
   pnpm install
   ```

2. **Development**

   ```bash
   git checkout -b feature/your-feature
   pnpm start  # Start development server
   ```

3. **Testing & Quality**

   ```bash
   pnpm run lint:fix    # Fix code style
   pnpm run test:lib    # Run tests
   pnpm run build:lib   # Verify build
   ```

4. **Submit PR**
   - Provide clear description
   - Include screenshots for UI changes
   - Ensure all checks pass

## 📚 Documentation

- **[📚 Library API](projects/room-planner-lib/README.md)** - Component usage and API reference
- **[🎯 Sample App](projects/room-planner-app/README.md)** - Demo application guide
- **[📋 Requirements](docs/PRD.md)** - Original project specifications

## 📄 License

MIT © [Ramiz](https://github.com/ramiz4)

---

<div align="center">

**[⬆ Back to Top](#room-planner-angular-library-)**

</div>
