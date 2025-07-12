# Restaurant Layout Planner PWA ✨

<div align="center">

![Angular](https://img.shields.io/badge/Angular-19.2-red?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)
![PWA](https://img.shields.io/badge/PWA-Ready-purple?style=flat-square)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-blue?style=flat-square&logo=tailwindcss)
![PNPM](https://img.shields.io/badge/PNPM-8.15-orange?style=flat-square&logo=pnpm)
![CI](https://github.com/ramiz4/room-planner/workflows/CI/badge.svg)
![Deploy](https://github.com/ramiz4/room-planner/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)
![PWA Validation](https://github.com/ramiz4/room-planner/workflows/PWA%20Validation/badge.svg)

A modern, responsive Progressive Web App for designing and managing restaurant floor layouts with an intuitive drag-and-drop interface. Perfect for restaurant owners, managers, and POS system administrators.

[🚀 Live Demo](https://ramiz4.github.io/room-planner/) | [📖 Documentation](docs/PRD.md) | [🐛 Report Bug](https://github.com/ramiz4/room-planner/issues) | [💡 Feature Request](https://github.com/ramiz4/room-planner/issues)

</div>

## 🌟 Overview

Restaurant Layout Planner is a cutting-edge PWA built with Angular 19 that empowers restaurant owners and managers to create optimized floor layouts through an intuitive drag-and-drop interface. Whether you're planning a new restaurant, optimizing an existing layout, or configuring your POS system, this tool provides everything you need to visualize and plan your perfect dining space.

**🎯 Target Audience:**

- Restaurant owners planning new establishments or renovations
- Restaurant managers optimizing seating arrangements and operational flow
- POS system administrators configuring table layouts for order management
- Hospitality consultants designing efficient restaurant spaces

## ✨ Key Features

### **Restaurant Floor Design & Layout**

- **Drag & Drop Interface**: Intuitive placement of tables, chairs, and restaurant elements
- **Custom Dining Room Dimensions**: Define exact floor sizes for accurate capacity planning
- **Multiple Floor Support**: Create layouts for different dining areas, private rooms, and outdoor seating
- **Restaurant Element Library**: Comprehensive catalog of tables, booths, bars, and static elements
- **Real-time Capacity Calculation**: Instant feedback on seating capacity as you design

### 🪑 **Table and Furniture Management**

- **Table Variety**: 2-top, 4-top, 6-top, 8-top tables, booths, and bar seating
- **Table Numbering**: Automatic or manual table numbering for POS integration
- **Rotation and Sizing**: Adjust table orientation and size for optimal space utilization
- **Seating Arrangements**: Flexible chair placement and booth configurations

### 🏢 **Static Elements Library**

- **Kitchen Elements**: Kitchen bars, service stations, prep areas
- **Infrastructure**: Entrance/exit doors, restrooms, host stands
- **Operational Elements**: Server stations, POS terminals, storage areas
- **Safety Features**: Emergency exits, fire extinguisher locations

### 📱 **Progressive Web App**

- **Install Anywhere**: One-click installation on any device for restaurant management
- **Offline Functionality**: Full design capabilities without internet connection
- **Cross-Platform**: Works seamlessly on tablets, desktop, and mobile for on-the-go planning
- **Auto-Updates**: Automatic background updates for latest restaurant management features
- **App-like Experience**: Native app feel optimized for restaurant operations

### 💾 **Data Management & POS Integration**

- **Import/Export**: Save and share your restaurant layouts as JSON files
- **Local Storage**: Layouts persist between sessions for continuous planning
- **Project Management**: Organize multiple restaurant locations or floor configurations
- **POS System Ready**: Export table configurations for seamless POS system integration
- **Backup & Restore**: Never lose your restaurant layout designs

### 🎯 **User Experience**

- **Responsive Design**: Optimized for tablets and desktop devices used in restaurant management
- **Theme Support**: Light and dark mode options for different lighting conditions
- **Zoom Controls**: Detailed editing with pan and zoom for precise table placement
- **Touch Friendly**: Optimized for tablet devices commonly used in restaurants
- **Accessibility**: WCAG compliant design for inclusive restaurant management

### 🔧 **Developer Features**

- **Modern Angular**: Built with Angular 19 and latest practices for restaurant management
- **TypeScript**: Fully typed codebase for reliable restaurant operations
- **TailwindCSS**: Utility-first styling for rapid restaurant interface development
- **Service Workers**: Advanced caching and offline strategies for uninterrupted service
- **Test Coverage**: Comprehensive unit and integration tests for restaurant-critical reliability

## 📱 PWA Features

### Installation

- **Install Button**: Automatic install prompt on supported browsers
- **Offline Access**: Full functionality without internet connection
- **App-like Experience**: Standalone app behavior when installed

### Offline Capabilities

- View and edit saved restaurant layouts
- Create new floor plans and table arrangements
- All data stored locally using browser storage
- Automatic sync when back online
- Continue restaurant planning without internet interruption

### Service Worker Features

- Asset caching for fast loading
- Background updates
- Offline fallback pages
- Data persistence

## 🚀 Quick Start

### Prerequisites

This project uses [pnpm](https://pnpm.io/) for efficient package management:

```bash
# Install pnpm globally
npm install -g pnpm

# Verify installation
pnpm --version
```

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ramiz4/room-planner.git
   cd room-planner
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

> **Note**: PWA features (service worker, install prompt) are only available in production builds.

## 📋 Available Scripts

| Command                      | Description               | Use Case               |
| ---------------------------- | ------------------------- | ---------------------- |
| `pnpm start`                 | Start development server  | Daily development      |
| `pnpm run build`             | Production build          | Deployment             |
| `pnpm run build:pwa`         | PWA production build      | PWA deployment         |
| `pnpm run build:pwa-dev`     | PWA development build     | PWA testing            |
| `pnpm run serve:pwa-dev`     | Serve PWA locally         | PWA development        |
| `pnpm run serve:pwa-express` | Serve with Express server | Advanced PWA testing   |
| `pnpm test`                  | Run unit tests            | Testing                |
| `pnpm run test:ci`           | Run tests in CI mode      | Continuous integration |
| `pnpm run lint`              | Check code quality        | Code review            |
| `pnpm run lint:fix`          | Fix linting issues        | Code cleanup           |
| `pnpm run format:fix`        | Format and fix code       | Code formatting        |

### 🏗️ Building for Production

**Standard Production Build:**

```bash
pnpm run build
```

**PWA Production Build:**

```bash
pnpm run build:pwa
```

**Local PWA Testing:**

```bash
# Option 1: Using http-server
pnpm run serve:pwa-dev

# Option 2: Using Express server (recommended)
pnpm run serve:pwa-express
```

The production build includes:

- ✅ Service worker registration
- ✅ Optimized asset caching
- ✅ PWA manifest configuration
- ✅ Offline functionality
- ✅ Code splitting and optimization

## 🧪 Testing PWA Features

### Local Testing Setup

1. **Build the PWA:**

   ```bash
   pnpm run build:pwa-dev
   ```

2. **Serve locally:**

   ```bash
   # Option A: Express server (handles DevTools endpoints)
   pnpm run serve:pwa-express

   # Option B: Simple HTTP server
   pnpm run serve:pwa-dev
   ```

3. **Test in browser:**
   - Open `http://localhost:8080`
   - Check for install prompt
   - Test offline functionality (disconnect network)
   - Verify service worker registration in DevTools

### PWA Testing Checklist

- [ ] **Installation**: App install prompt appears
- [ ] **Offline Mode**: App works without internet connection
- [ ] **Service Worker**: Caches resources properly
- [ ] **Manifest**: App metadata displays correctly
- [ ] **Updates**: New versions update automatically
- [ ] **Icons**: App icons appear in various contexts
- [ ] **Navigation**: App behaves like native app when installed

### Browser Testing

Test across different browsers for optimal PWA support:

| Browser      | Install Support | Offline Support | Service Worker |
| ------------ | --------------- | --------------- | -------------- |
| Chrome 67+   | ✅              | ✅              | ✅             |
| Firefox 68+  | ⚠️ Manual       | ✅              | ✅             |
| Safari 11.1+ | ✅              | ✅              | ✅             |
| Edge 79+     | ✅              | ✅              | ✅             |

## 📁 Project Structure

```
room-planner/
├── 📄 Configuration Files
│   ├── angular.json              # Angular CLI configuration
│   ├── ngsw-config.json         # Service Worker configuration
│   ├── package.json             # Dependencies and scripts
│   └── tsconfig.*.json          # TypeScript configurations
│
├── 📂 docs/
│   └── PRD.md                   # Product Requirements Document
│
├── 📂 public/                   # Static assets
│   ├── favicon.ico              # App favicon
│   ├── manifest.webmanifest     # PWA manifest
│   └── icons/                   # PWA icons (various sizes)
│
└── 📂 src/                      # Source code
    ├── index.html               # Main HTML file
    ├── main.ts                  # Application bootstrap
    ├── styles.scss              # Global styles
    │
    └── app/                     # Application modules
        ├── 🏠 room-planner/     # Core room planning feature
        │   ├── components/      # UI components
        │   ├── services/        # Business logic services
        │   ├── directives/      # Custom directives
        │   ├── interfaces/      # TypeScript interfaces
        │   └── constants/       # Application constants
        │
        ├── 📱 components/       # Shared components
        │   ├── pwa-install.component.ts    # PWA install prompt
        │   ├── notifications.component.ts  # User notifications
        │   └── offline.component.ts        # Offline indicator
        │
        └── 🔧 services/         # Core services
            ├── pwa.service.ts           # PWA functionality
            ├── network.service.ts       # Network detection
            └── notification.service.ts  # User notifications
```

### Key Configuration Files

| File                   | Purpose                 | Key Features                        |
| ---------------------- | ----------------------- | ----------------------------------- |
| `ngsw-config.json`     | Service Worker settings | Caching strategies, update policies |
| `manifest.webmanifest` | PWA metadata            | App name, icons, theme colors       |
| `pwa.service.ts`       | PWA functionality       | Install prompts, update checks      |
| `angular.json`         | Build configuration     | Asset handling, optimization        |

## 🎮 How to Use

### Getting Started

1. **Open the App**
   - Visit the web app or launch the installed PWA
   - The app will load with a default room layout

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

## 🧪 Testing

### Unit Tests

Run the test suite using Karma:

```bash
# Run tests in watch mode
pnpm test

# Run tests once (CI mode)
pnpm run test:ci

# Run tests with coverage
ng test --code-coverage
```

### E2E Tests

End-to-end testing setup:

```bash
# Install E2E framework (choose one)
ng add @cypress/schematic  # Cypress
ng add @playwright/test    # Playwright

# Run E2E tests
pnpm run e2e
```

### PWA Testing

Specific PWA functionality tests:

```bash
# Test service worker functionality
npm install -g lighthouse
lighthouse http://localhost:8080 --view

# Test PWA installation
# Use browser DevTools > Application > Manifest
```

### Code Quality

Maintain code quality with linting and formatting:

```bash
# Check code style
pnpm run lint

# Fix automatically fixable issues
pnpm run lint:fix

# Format all code
pnpm run format:fix
```

## 🛠️ Development

### Code Scaffolding

Angular CLI provides powerful scaffolding tools:

```bash
# Generate a new component
ng generate component feature/my-component

# Generate a service
ng generate service services/my-service

# Generate a directive
ng generate directive directives/my-directive

# Generate a pipe
ng generate pipe pipes/my-pipe

# See all available schematics
ng generate --help
```

### Development Workflow

1. **Create Feature Branch**

   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make Changes**
   - Write code following Angular style guide
   - Add/update tests for new functionality
   - Run linting and formatting

3. **Test Changes**

   ```bash
   pnpm test              # Unit tests
   pnpm run lint          # Code quality
   pnpm run build:pwa     # Production build test
   ```

4. **Test PWA Features**

   ```bash
   pnpm run serve:pwa-express
   # Test offline, installation, etc.
   ```

5. **Commit and Push**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/new-feature
   ```

## 🌐 Browser Support & Compatibility

### Minimum Requirements

| Feature                    | Requirement                             |
| -------------------------- | --------------------------------------- |
| **Service Workers**        | Required for offline functionality      |
| **Web App Manifest**       | Required for installation               |
| **IndexedDB/LocalStorage** | Required for data persistence           |
| **ES6+ Support**           | Required for modern JavaScript features |
| **CSS Grid & Flexbox**     | Required for responsive layout          |

### Recommended Browsers

| Browser              | Version | PWA Support | Notes               |
| -------------------- | ------- | ----------- | ------------------- |
| **Chrome**           | 67+     | ✅ Full     | Best PWA experience |
| **Firefox**          | 68+     | ✅ Full     | Excellent support   |
| **Safari**           | 11.1+   | ✅ Full     | iOS/macOS support   |
| **Edge**             | 79+     | ✅ Full     | Windows integration |
| **Samsung Internet** | 8.0+    | ✅ Full     | Android default     |
| **Opera**            | 54+     | ✅ Good     | Chromium-based      |

### Feature Support Matrix

| Feature            | Chrome | Firefox | Safari | Edge |
| ------------------ | ------ | ------- | ------ | ---- |
| Service Worker     | ✅     | ✅      | ✅     | ✅   |
| Web App Manifest   | ✅     | ✅      | ✅     | ✅   |
| Install Prompt     | ✅     | ⚠️      | ✅     | ✅   |
| Background Sync    | ✅     | ❌      | ❌     | ✅   |
| Push Notifications | ✅     | ✅      | ✅     | ✅   |
| Offline Support    | ✅     | ✅      | ✅     | ✅   |

> **Note**: ✅ Full Support, ⚠️ Partial Support, ❌ Not Supported

## 🚀 Deployment

### Automated Deployment (GitHub Pages)

This project includes automated CI/CD pipelines:

**🔄 Continuous Integration:**

- ✅ Automated testing on pull requests and main branch
- ✅ PWA build validation with service worker checks
- ✅ Lighthouse PWA auditing
- ✅ Code quality checks (linting, formatting)

**🚀 Continuous Deployment:**

- ✅ Automatic deployment to GitHub Pages on main branch
- ✅ PWA artifacts validation before deployment
- ✅ Service worker and manifest verification
- ✅ `.well-known` endpoints configuration

**Workflows:**

- `ci.yml` - Main CI pipeline with PWA build
- `deploy.yml` - GitHub Pages deployment
- `pwa-validation.yml` - PWA-specific testing on PRs

### Manual Build for Production

```bash
# PWA production build
pnpm run build:pwa

# Build artifacts will be in dist/room-planner/browser/
```

### Manual Deployment Options

#### **Netlify**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --dir=dist/room-planner/browser --prod
```

#### **Vercel**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### **GitHub Pages**

```bash
# Install Angular GitHub Pages tool
ng add angular-cli-ghpages

# Deploy
ng deploy --base-href=/room-planner/
```

#### **Firebase Hosting**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize and deploy
firebase init hosting
firebase deploy
```

### PWA Deployment Checklist

- [ ] **HTTPS**: Required for service workers and PWA features
- [ ] **Manifest**: Verify manifest.webmanifest is accessible
- [ ] **Service Worker**: Confirm SW registration and caching
- [ ] **Icons**: Test app icons on various devices/contexts
- [ ] **Performance**: Run Lighthouse audit (aim for 90+ PWA score)
- [ ] **Offline**: Test offline functionality after deployment
- [ ] **Updates**: Verify app update mechanism works

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
   - Write tests for new features
   - Update documentation as needed
   - Test PWA functionality in production build

4. **Testing Requirements**

   ```bash
   pnpm run lint          # Code quality
   pnpm test              # Unit tests
   pnpm run build:pwa     # Production build
   pnpm run serve:pwa-express  # PWA testing
   ```

5. **Submit Pull Request**
   - Provide clear description of changes
   - Include screenshots for UI changes
   - Reference any related issues
   - Ensure all checks pass

### Code Standards

- **TypeScript**: Strict mode enabled, full type coverage
- **Angular**: Follow official Angular coding standards
- **Testing**: Minimum 80% code coverage for new features
- **Accessibility**: WCAG 2.1 AA compliance
- **PWA**: Must maintain high Lighthouse PWA score

### Issue Reporting

When reporting bugs or requesting features:

1. **Check existing issues** first
2. **Use issue templates** when available
3. **Provide reproduction steps** for bugs
4. **Include browser/device info** for compatibility issues
5. **Test in production build** for PWA-related issues

## 📚 Additional Resources

### Documentation

- [📖 Product Requirements Document](docs/PRD.md)
- [🅰️ Angular CLI Overview](https://angular.dev/tools/cli)
- [📱 PWA Documentation](https://web.dev/progressive-web-apps/)
- [🎨 TailwindCSS Docs](https://tailwindcss.com/docs)

### Learning Resources

- [Angular PWA Guide](https://angular.io/guide/service-worker-intro)
- [PWA Best Practices](https://web.dev/pwa-checklist/)
- [Service Worker Cookbook](https://serviceworke.rs/)
- [Web App Manifest Guide](https://web.dev/add-manifest/)

### Tools & Extensions

- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - PWA auditing
- [Workbox](https://developers.google.com/web/tools/workbox) - Service worker utilities
- [PWA Builder](https://www.pwabuilder.com/) - PWA development tools

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**[⬆ Back to Top](#room-planner-pwa-)**

Made with ❤️ using Angular and modern web technologies

</div>
