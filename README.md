# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. This project showcases skills, projects, and professional experience through a clean, performance-optimized interface.

## Features

- **Skill-Centric Design**: Organized by five main skill categories with concrete examples
- **Responsive Layout**: Mobile-first design that works on all devices
- **Performance Optimized**: Code splitting, lazy loading, and optimized assets
- **Accessibility Compliant**: WCAG guidelines compliance with proper ARIA labels
- **Modern Tech Stack**: React 19, TypeScript, Tailwind CSS, and Framer Motion
- **Comprehensive Testing**: Unit, integration, and accessibility tests

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4.x
- **Build Tool**: Vite 7.x
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Testing**: Vitest, React Testing Library, Axe
- **Deployment**: Netlify (configured)

## Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd portfolio-website

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run preview          # Preview production build locally

# Building
npm run build            # Build for production
npm run build:prod       # Full production build with all checks
npm run clean            # Clean build directory

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors automatically
npm run type-check       # Run TypeScript type checking

# Testing
npm run test             # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:ui          # Run tests with UI interface
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── SkillSection.tsx # Skill category display
│   ├── ProjectCard.tsx # Individual project cards
│   ├── ContactSection.tsx # Contact information
│   └── Footer.tsx      # Site footer
├── data/               # Static data
│   ├── skills.ts       # Skills and projects data
│   ├── projects.ts     # Project information
│   └── contact.ts      # Contact links
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── tests/              # Test files
└── styles/             # Global styles
```

## Deployment

### Netlify (Recommended)

The project is pre-configured for Netlify deployment:

1. **Automatic Deployment**: Connect your Git repository to Netlify
2. **Manual Deployment**: Use the Netlify CLI or drag-and-drop the `dist` folder
3. **Configuration**: All settings are in `netlify.toml`

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Build Configuration

The project includes optimized build settings:
- **Code Splitting**: Vendor, animations, and icons are split into separate chunks
- **Asset Optimization**: Images, CSS, and JS are minified and cached
- **Source Maps**: Generated for production debugging
- **Security Headers**: Configured in `netlify.toml`

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Feature flags
VITE_ENABLE_ANIMATIONS=true
VITE_ENABLE_ANALYTICS=false

# Optional integrations
VITE_GOOGLE_ANALYTICS_ID=your_ga_id
VITE_PLAUSIBLE_DOMAIN=your_domain
```

## Performance

The website is optimized for performance:
- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Meets Google's recommended thresholds
- **Bundle Size**: Optimized with code splitting and tree shaking
- **Caching**: Aggressive caching for static assets

## Accessibility

- **WCAG AA Compliant**: Meets accessibility guidelines
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Compatible**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Meets contrast requirements

## Testing

Comprehensive test suite covering:
- **Unit Tests**: Component functionality and data transformations
- **Integration Tests**: Navigation, contact links, and responsive design
- **Accessibility Tests**: Automated accessibility compliance checking
- **Performance Tests**: Core Web Vitals and performance metrics

Run tests with:
```bash
npm run test           # All tests
npm run test:watch     # Watch mode
npm run test:ui        # Visual test interface
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run the test suite: `npm run test`
5. Check code quality: `npm run lint && npm run type-check`
6. Commit your changes: `git commit -m 'Add feature'`
7. Push to the branch: `git push origin feature-name`
8. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions or issues:
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
- Review the [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)
- Open an issue in the repository
