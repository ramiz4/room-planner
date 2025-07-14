# Room Planner Sample App

This is a comprehensive sample application demonstrating how to use the room-planner Angular library in different scenarios.

## Features

- **Demo Page**: Basic usage examples and code snippets
- **Restaurant Example**: Shows how to use the library for restaurant layout planning
- **Office Example**: Demonstrates office space planning with different layout types

## Running the Sample App

```bash
# Install dependencies (if not already done)
pnpm install

# Start the sample app
pnpm run serve:sample
```

The app will be available at `http://localhost:4200`

## Sample App Structure

```
projects/room-planner-app/
├── src/
│   ├── app/
│   │   ├── demo/           # Basic demo component
│   │   ├── restaurant/     # Restaurant example
│   │   ├── office/         # Office example
│   │   ├── app.component.ts
│   │   └── app.routes.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── tsconfig.app.json
└── README.md
```

## What You'll See

### Demo Page

- Code examples showing how to import and use the library
- Mock data demonstration
- Basic API documentation

### Restaurant Example

- Restaurant-specific layout templates
- Table management features
- Integration examples with backend services
- Restaurant metrics and statistics

### Office Example

- Multiple office layout types:
  - Traditional cubicle layout
  - Open office floor plan
  - Meeting room focused layout
- Office space metrics
- Different use case scenarios

## Using This as a Template

You can use this sample app as a starting point for your own projects:

1. Copy the relevant component from `/demo`, `/restaurant`, or `/office`
2. Install the room-planner library: `npm install @ramiz4/room-planner`
3. Update the imports to use the actual library instead of placeholders
4. Customize the layouts and functionality for your specific needs

## Real Implementation

In a real application, you would:

1. **Install the library**:

   ```bash
   npm install room-planner
   ```

2. **Import the component**:

   ```typescript
   import { RoomPlannerComponent } from 'room-planner';
   ```

3. **Use in your template**:
   ```html
   <room-planner [initialRoom]="roomData" (roomChange)="onRoomChange($event)">
   </room-planner>
   ```

## Integration Examples

The sample app shows how to integrate with:

- Backend services for saving/loading layouts
- Real-time updates for restaurant table status
- Office space management systems
- Custom UI components and controls

## Building the Sample App

```bash
# Build for production
pnpm run build:sample

# Output will be in dist/room-planner-app/
```

## Contributing

Feel free to enhance the sample app with additional examples or use cases!
