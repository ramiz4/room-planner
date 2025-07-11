# Room Planner PWA 🏠

A modern Progressive Web App for designing and planning room layouts with an intuitive drag-and-drop interface.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.11 with PWA support.

## ✨ Features

- **Progressive Web App**: Install and use offline
- **Drag & Drop Interface**: Intuitive room element placement
- **Room Layout Planning**: Design your perfect space
- **Import/Export**: Save and share your designs
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Offline Support**: Continue working without internet
- **Auto-Updates**: Automatic app updates when available

## 📱 PWA Features

### Installation

- **Install Button**: Automatic install prompt on supported browsers
- **Offline Access**: Full functionality without internet connection
- **App-like Experience**: Standalone app behavior when installed

### Offline Capabilities

- View and edit saved room designs
- Create new room layouts
- All data stored locally using browser storage
- Automatic sync when back online

### Service Worker Features

- Asset caching for fast loading
- Background updates
- Offline fallback pages
- Data persistence

## Prerequisites

This project uses [pnpm](https://pnpm.io/) for package management. Install pnpm globally if you haven't already:

```bash
npm install -g pnpm
```

## Setup

Install dependencies:

```bash
pnpm install
```

## Development server

To start a local development server, run:

```bash
ng serve
```

or

```bash
pnpm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

**Note**: PWA features (service worker, install prompt) are only available in production builds.

## Available Scripts

- `pnpm start` - Start development server
- `pnpm run build` - Build for production
- `pnpm run test` - Run unit tests
- `pnpm run lint` - Run linting
- `pnpm run format:fix` - Fix formatting and linting issues

## Building for Production

To build the project with PWA features enabled:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. The production build includes:

- Service worker registration
- Optimized assets and caching
- PWA manifest file
- Offline capabilities

## Testing PWA Features

To test PWA features locally:

1. Build the production version:

   ```bash
   ng build
   ```

2. Serve the built files using a local server:

   ```bash
   npx http-server dist/room-planner/browser -p 8080
   ```

3. Open `http://localhost:8080` in your browser
4. Test installation, offline functionality, and service worker features

## PWA Configuration Files

- `src/manifest.webmanifest` - App manifest with PWA metadata
- `ngsw-config.json` - Service worker configuration
- `src/app/services/pwa.service.ts` - PWA functionality service
- `src/app/components/pwa-install.component.ts` - Install prompt component

## Room Planner Features

### Layout Management

- Use the Export and Import buttons in the bottom left to save or load room layouts
- Drag and drop room elements to design your space
- Zoom and pan controls for detailed editing
- Room size controls for custom dimensions

### Element Properties

- Click on room elements to modify their properties
- Resize and reposition elements as needed
- Multiple element types available from the dropdown menu

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

For detailed product goals and features, see the [Product Requirements Document](docs/PRD.md).

## Browser Support

This PWA works best on modern browsers that support:

- Service Workers
- Web App Manifest
- IndexedDB/Local Storage
- ES6+ features

Recommended browsers:

- Chrome 67+
- Firefox 68+
- Safari 11.1+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test PWA functionality in production build
5. Submit a pull request

## License

This project is licensed under the MIT License.
