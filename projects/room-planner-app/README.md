# Room Planner Sample App

A comprehensive sample application demonstrating how to use the `@ramiz4/room-planner` Angular library with different usage patterns and modes.

## Features

- **📖 Install Guide**: Installation instructions and basic setup
- **👁️ Sample Viewer**: Read-only mode demonstration with pre-built layouts
- **✏️ Sample Editable**: Full editor mode with all editing capabilities
- **🌓 Theme Support**: Light/dark mode toggle functionality

## Running the Sample App

```bash
# From the workspace root
pnpm install
pnpm start

# Or specifically for the sample app
pnpm run serve:sample
```

The app will be available at `http://localhost:4200`

## Sample App Structure

```
projects/room-planner-app/
├── src/app/
│   ├── install/              # Installation guide and setup
│   ├── sample/               # Read-only sample layouts
│   ├── sample-editable/      # Editable mode demonstration
│   ├── components/           # Shared components (theme toggle)
│   ├── services/             # App services (theme service)
│   ├── app.component.ts      # Main app component
│   └── app.routes.ts         # Routing configuration
├── public/                   # Static assets
├── tsconfig.app.json         # TypeScript configuration
└── README.md                 # This file
```

## What You'll See

### 📖 Install Page (`/install`)

- Step-by-step installation instructions
- Basic code examples showing library usage
- API documentation with input/output properties
- Getting started guide

### 👁️ Sample Page (`/sample`)

- **Read-only mode demonstration**
- Pre-built restaurant layout with multiple table types
- Element selection showcase
- Layout management controls (load template, save, clear)
- Shows how to use the library for viewing existing layouts

### ✏️ Editable Page (`/sample-editable`)

- **Full editor mode with all capabilities**
- Room size controls for adjusting dimensions
- Element properties panel for editing selected items
- Add/edit/delete functionality for all element types
- Export/import layout capabilities
- Demonstrates complete editing workflow

## Using This as a Template

The sample app provides excellent starting points for your own projects:

### For Read-Only Layouts

```typescript
// Copy from sample.component.ts
<room-planner
  [initialRoom]="roomData"
  (elementSelected)="onElementSelected($event)"
></room-planner>
```

### For Editable Layouts

```typescript
// Copy from sample-editable.component.ts
<room-planner
  [initialRoom]="roomData"
  [editable]="true"
  (roomChange)="onRoomChange($event)"
  (elementSelected)="onElementSelected($event)"
></room-planner>
```

### Integration Steps

1. Install the library: `npm install @ramiz4/room-planner`
2. Copy the relevant component code
3. Import the library components in your module
4. Customize layouts and functionality for your needs

## Key Implementation Examples

### Theme Support

- Dark/light mode toggle implementation
- Theme persistence using localStorage
- Component-level theme service integration

### Layout Management

- Creating rooms with `createRoom()` factory function
- Handling room changes and element selection
- Managing layout state with Angular signals

### Element Handling

- Pre-configured table layouts (2-top, 4-top, 6-top tables)
- Static elements (entrances, service stations, restrooms)
- Color-coded element types for visual organization

## Building the Sample App

```bash
# Build for production
pnpm run build:sample

# Output will be in dist/room-planner-app/
```
