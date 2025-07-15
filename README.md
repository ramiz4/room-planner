# Room Planner Angular Library 📐

<div align="center">

![Angular](https://img.shields.io/badge/Angular-19.2-red?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)
![Library](https://img.shields.io/badge/Library-Ready-green?style=flat-square)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-blue?style=flat-square&logo=tailwindcss)
![PNPM](https://img.shields.io/badge/PNPM-8.15-orange?style=flat-square&logo=pnpm)
![CI](https://github.com/ramiz4/room-planner/workflows/CI/badge.svg)
![Deploy](https://github.com/ramiz4/room-planner/workflows/Deploy%20Sample%20App%20to%20GitHub%20Pages/badge.svg)
![Library Tests](https://github.com/ramiz4/room-planner/workflows/Library%20Tests/badge.svg)

A modern, reusable Angular library for designing and managing room layouts with an intuitive drag-and-drop interface. Perfect for restaurant management, office planning, and any space management application.

[📚 Library Documentation](projects/room-planner-lib/README.md) | [🎯 Sample App](projects/room-planner-app/README.md) | [🔧 Workflows](.github/WORKFLOWS.md) | [🐛 Report Bug](https://github.com/ramiz4/room-planner/issues) | [💡 Feature Request](https://github.com/ramiz4/room-planner/issues)

</div>

## 🌟 Overview

Room Planner is a modern Angular library and sample application for creating interactive room layouts with drag-and-drop functionality. This monorepo contains both a reusable Angular library (`room-planner-lib`) and a comprehensive sample application (`room-planner-app`) demonstrating various use cases including restaurant floor planning, office space management, and more.

**🎯 Target Audience:**

- Angular developers looking for a room planning component
- Restaurant owners and managers planning layouts
- Office space planners and facility managers
- Anyone needing interactive space planning tools

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

### **Core Room Planning**

- **Drag & Drop Interface**: Intuitive placement of tables, furniture, and elements
- **Custom Room Dimensions**: Define exact room sizes with meter/pixel conversion
- **Element Management**: Create, edit, move, resize, and delete room elements
- **Export/Import**: Save and load room layouts as JSON
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### 🪑 **Element Types**

- **Tables**: Various sizes (2-top, 4-top, 6-top, etc.) with customizable shapes
- **Static Elements**: Walls, doors, furniture, equipment, and fixtures
- **Shape Support**: Rectangles, circles, and custom shapes
- **Property Editing**: Colors, labels, dimensions, and positioning

### � **Technical Features**

- **Modern Angular**: Built with Angular 19+ using standalone components
- **TypeScript**: Fully typed for better development experience
- **Signals**: Reactive state management with Angular signals
- **Standalone Components**: Modern Angular architecture
- **Comprehensive Testing**: Unit tests for all major components and services
- **Theme Support**: Light and dark mode options for different lighting conditions
- **Zoom Controls**: Detailed editing with pan and zoom for precise table placement
- **Touch Friendly**: Optimized for tablet devices commonly used in restaurants
- **Accessibility**: WCAG compliant design for inclusive restaurant management

### 🔧 **Developer Features**

- **Modern Angular**: Built with Angular 19 and latest practices for restaurant management
- **TypeScript**: Fully typed codebase for reliable restaurant operations
- **TailwindCSS**: Utility-first styling for modern, responsive UI components
- **Comprehensive Testing**: Full unit and integration test coverage for production reliability
- **TypeScript**: Full type safety and excellent developer experience

## 🎯 Library Usage

### Integration in Your App

```typescript
import { RoomPlannerComponent } from '@ramiz4/room-planner';

@Component({
  template: `<room-planner
    [initialRoom]="roomData"
    [showThemeToggle]="true"
  ></room-planner>`,
  imports: [RoomPlannerComponent],
})
export class MyComponent {
  roomData = createRoom({
    widthMeters: 10,
    heightMeters: 8,
    tables: [],
    staticElements: [],
  });
}
```

### Sample Application Features

The included sample app demonstrates:

- View and edit saved restaurant layouts
- Create new floor plans and table arrangements
- All data stored locally using browser storage
- Automatic sync when back online

## 🚀 Quick Start

### Prerequisites

This project uses [pnpm](https://pnpm.io/) for efficient package management:

```bash
# Install pnpm globally
npm install -g pnpm

# Verify installation
pnpm --version
```

### Installation & Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/ramiz4/room-planner.git
   cd room-planner
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the sample app**

   ```bash
   pnpm run serve:sample
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

### Building the Library

1. **Build the library**

   ```bash
   pnpm run build:lib
   ```

2. **Run library tests**

   ```bash
   pnpm run test:lib
   ```

3. **Package for distribution**

   ```bash
   pnpm run pack:lib
   ```

## 📋 Available Scripts

| Command                 | Description                  | Use Case              |
| ----------------------- | ---------------------------- | --------------------- |
| `pnpm start`            | Start sample app development | Daily development     |
| `pnpm run serve:sample` | Serve sample app             | Testing library usage |
| `pnpm run build:sample` | Build sample app             | Sample app deployment |
| `pnpm run build:lib`    | Build library                | Library development   |
| `pnpm run test:lib`     | Run library tests            | Library testing       |
| `pnpm run test:sample`  | Run sample app tests         | Sample app testing    |
| `pnpm run lint`         | Check code quality           | Code review           |
| `pnpm run lint:fix`     | Fix linting issues           | Code cleanup          |
| `pnpm run format:fix`   | Format and fix code          | Code formatting       |
| `pnpm run pack:lib`     | Package library for npm      | Library distribution  |
| `pnpm run publish:lib`  | Publish library to npm       | Library publishing    |

### 🏗️ Building for Production

**Library Build:**

```bash
pnpm run build:lib
```

**Sample App Build:**

```bash
pnpm run build:sample
```

**Publishing the Library:**

```bash
# Test packaging
pnpm run pack:lib

# Publish to npm (requires npm login)
pnpm run publish:lib
```

## 📖 Documentation

- **[Library Documentation](projects/room-planner-lib/README.md)** - How to use the Angular library
- **[Sample App Documentation](projects/room-planner-app/README.md)** - Running and understanding the sample app
- **[Product Requirements](docs/PRD.md)** - Original requirements and specifications

## 🎮 Usage Examples

### Basic Library Usage

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
    console.log('Selected element:', element);
  }
}
```

### Installation in Your Project

```bash
# Install the library
npm install @ramiz4/room-planner

# Or with pnpm
pnpm add @ramiz4/room-planner
```

## 🧪 Testing

### Running Tests

```bash
# Test the library
pnpm run test:lib

# Test the sample app
pnpm run test:sample

# Run tests in CI mode
pnpm run test:ci
```

### Test Coverage

The library includes comprehensive unit tests for:

- ✅ **Components**: All major UI components
- ✅ **Services**: Drawing, element management, storage
- ✅ **Directives**: Canvas interaction, button feedback
- ✅ **Utilities**: Room factory, unit conversion
- ✅ **Interfaces**: Type safety and contracts

## 🏗️ Architecture

### Library Structure

```
room-planner-lib/
├── � components/          # UI Components
│   ├── room-planner.component.ts
│   ├── add-elements-dropdown.component.ts
│   ├── element-properties.component.ts
│   └── zoom-controls.component.ts
│
├── � services/           # Business Logic
│   ├── canvas-drawing.service.ts
│   ├── element-management.service.ts
│   ├── room-storage.service.ts
│   └── theme.service.ts
│
├── 📁 directives/         # Custom Directives
│   ├── canvas-interaction.directive.ts
│   └── button-feedback.directive.ts
│
├── 📁 interfaces/         # TypeScript Types
│   ├── room.interface.ts
│   ├── room-element.interface.ts
│   └── canvas-interaction-event.interface.ts
│
├── 📁 utils/             # Utilities
│   ├── room.factory.ts
│   └── unit-conversion.ts
│
└── 📁 constants/         # Configuration
    └── room-planner.constants.ts
```

1. **Try the Sample App**
   - Visit the [live demo](https://ramiz4.github.io/room-planner/v2/)
   - Explore different layouts and features

2. **Create Your Room**
   - Use **Room Size Controls** to set custom dimensions
   - Adjust width and height to match your real space

3. **Add Elements**
   - Click the **Add Elements** dropdown
   - Choose from furniture, fixtures, and decorative items
   - Drag selected items onto the room canvas

4. **Design Your Layout**
   - **Drag & Drop**: Move elements around the room
   - **Resize**: Click elements to modify their properties
   - **Rotate**: Adjust orientation as needed
   - **Zoom**: Use zoom controls for precise positioning

5. **Save Your Work**
   - Click **Export** to save your design as JSON
   - Use **Import** to load previously saved layouts
   - Designs auto-save locally for your convenience

### Pro Tips 💡

- **Zoom In**: For precise element placement and fine-tuning
- **Grid Snap**: Elements automatically align for clean layouts
- **Mobile Friendly**: Use touch gestures on mobile devices
- **Offline Mode**: Continue designing even without internet
- **Multiple Projects**: Create different layouts for different rooms

### Common Use Cases

- **Home Renovation**: Plan before you buy furniture
- **Interior Design**: Visualize client proposals
- **Real Estate**: Show potential room arrangements
- **Office Planning**: Optimize workspace layouts
- **Event Planning**: Design room setups for gatherings

### Key Design Patterns

- **Standalone Components**: Modern Angular architecture
- **Signal-based State**: Reactive state management
- **Dependency Injection**: Clean service architecture
- **Factory Pattern**: Room and element creation utilities
- **Observer Pattern**: Event-driven interactions

## ⚙️ GitHub Actions & CI/CD

This project includes comprehensive GitHub Actions workflows for automated testing, building, and deployment:

### 🔧 **Continuous Integration** (`ci.yml`)

- **Triggers**: Every push to `main`, all pull requests
- **Actions**: Linting, testing, building library and sample app
- **Artifacts**: Built library and sample app packages

### 🚀 **Deployment** (`deploy.yml`)

- **Triggers**: Successful CI workflow on `main` branch
- **Actions**: Deploys sample app to GitHub Pages
- **Output**: Live demo at [GitHub Pages URL]

### 🧪 **Library Tests** (`library-tests.yml`)

- **Triggers**: Pull requests affecting library files
- **Actions**: Focused library testing and validation
- **Features**: PR comments with build summaries

### 📦 **Publish Library** (`publish-library.yml`)

- **Triggers**: Manual workflow dispatch, GitHub releases
- **Actions**: Version bump, npm publishing, GitHub releases
- **Output**: Published package on npm registry

### Setup Instructions

See **[.github/SETUP.md](.github/SETUP.md)** for complete workflow configuration guide.

For detailed workflow documentation, see **[.github/WORKFLOWS.md](.github/WORKFLOWS.md)**.

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup

1. **Fork & Clone**

   ```bash
   git clone https://github.com/ramiz4/room-planner.git
   cd room-planner
   pnpm install
   ```

2. **Create Feature Branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Development Guidelines**
   - Follow [Angular Style Guide](https://angular.io/guide/styleguide)
   - Write tests for new features (library focus)
   - Update documentation as needed
   - Test library in sample app

4. **Testing Requirements**

   ```bash
   pnpm run lint:fix      # Code quality
   pnpm run test:lib      # Library unit tests
   pnpm run build:lib     # Library build
   pnpm run serve:sample  # Test in sample app
   ```

5. **Submit Pull Request**
   - Provide clear description of changes
   - Include screenshots for UI changes
   - Reference any related issues
   - Ensure all checks pass

### Code Standards

- **TypeScript**: Strict mode enabled, full type coverage
- **Angular**: Follow official Angular coding standards and standalone patterns
- **Testing**: Comprehensive test coverage for library components and services
- **Accessibility**: WCAG 2.1 AA compliance
- **Library Design**: Clean public API, minimal dependencies

### Issue Reporting

When reporting bugs or requesting features:

1. **Check existing issues** first
2. **Use issue templates** when available
3. **Provide reproduction steps** for bugs
4. **Test in both library and sample app**
5. **Include Angular/browser versions** for compatibility issues

## 📚 Additional Resources

### Documentation

- [📖 Library Documentation](projects/room-planner-lib/README.md)
- [🎯 Sample App Documentation](projects/room-planner-app/README.md)
- [📋 Product Requirements Document](docs/PRD.md)
- [🅰️ Angular Library Guide](https://angular.dev/tools/libraries)

### Learning Resources

- [Angular Library Development](https://angular.dev/tools/libraries)
- [Angular Standalone Components](https://angular.dev/guide/components/importing)
- [Angular Signals](https://angular.dev/guide/signals)
- [ng-packagr Documentation](https://github.com/ng-packagr/ng-packagr)

### Tools & Extensions

- [Angular CLI](https://angular.dev/tools/cli) - Development tools
- [ng-packagr](https://github.com/ng-packagr/ng-packagr) - Library packaging
- [Angular DevKit](https://github.com/angular/angular-cli/tree/main/packages/angular_devkit) - Build tools
- [Storybook](https://storybook.js.org/docs/angular/get-started/introduction) - Component documentation

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**[⬆ Back to Top](#room-planner-angular-library-)**

Made with ❤️ using Angular and modern web technologies

</div>
