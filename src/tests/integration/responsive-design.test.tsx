import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../App';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    footer: ({ children, ...props }: any) => <footer {...props}>{children}</footer>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    h4: ({ children, ...props }: any) => <h4 {...props}>{children}</h4>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock performance utilities
vi.mock('../../utils/performance', () => ({
  throttle: (fn: Function) => fn,
  debounce: (fn: Function) => fn,
  measurePerformance: (name: string, fn: Function) => fn(),
  reportWebVitals: () => {},
  createIntersectionObserver: () => null,
  preloadResource: () => {},
  prefersReducedMotion: () => false,
}));

describe('Responsive Design Tests', () => {
  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
    
    // Mock getElementById
    document.getElementById = vi.fn((id: string) => {
      const mockElement = document.createElement('div');
      mockElement.id = id;
      return mockElement;
    });
  });

  const setViewport = (width: number, height: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: height,
    });
    
    // Mock matchMedia for different breakpoints
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: 
          (query === '(min-width: 768px)' && width >= 768) ||
          (query === '(min-width: 1024px)' && width >= 1024) ||
          (query === '(max-width: 767px)' && width < 768) ||
          (query === '(max-width: 1023px)' && width < 1024),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  };

  describe('Mobile Breakpoint (320px - 767px)', () => {
    beforeEach(() => {
      setViewport(375, 667); // iPhone SE dimensions
    });

    it('renders mobile navigation correctly', () => {
      render(<App />);
      
      // Mobile menu button should be visible
      const menuButton = screen.getByLabelText(/open menu/i);
      expect(menuButton).toBeInTheDocument();
      
      // Desktop navigation should be hidden (we can't test visibility directly, but structure should be there)
      const navButtons = screen.getAllByRole('button');
      expect(navButtons.length).toBeGreaterThan(1); // Should have menu button + nav buttons
    });

    it('has proper mobile layout classes', () => {
      render(<App />);
      
      // Check for mobile-specific classes (these are applied via Tailwind)
      const container = document.querySelector('.container-responsive');
      expect(container).toBeTruthy();
    });

    it('renders mobile-friendly button sizes', () => {
      render(<App />);
      
      // All buttons should have touch-friendly classes
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveClass('btn-touch');
      });
    });

    it('stacks content vertically on mobile', () => {
      render(<App />);
      
      // Hero CTA buttons should stack on mobile
      const exploreButton = screen.getByText('Explore My Work');
      const contactButton = screen.getByText('Get In Touch');
      
      expect(exploreButton).toBeInTheDocument();
      expect(contactButton).toBeInTheDocument();
    });
  });

  describe('Tablet Breakpoint (768px - 1023px)', () => {
    beforeEach(() => {
      setViewport(768, 1024); // iPad dimensions
    });

    it('renders appropriate layout for tablet', () => {
      render(<App />);
      
      // Should still have mobile menu on smaller tablets
      const menuButton = screen.queryByLabelText(/open menu/i);
      expect(menuButton).toBeInTheDocument();
    });

    it('has proper tablet spacing and layout', () => {
      render(<App />);
      
      // Content should be properly spaced for tablet
      const mainContent = screen.getByRole('main');
      expect(mainContent).toBeInTheDocument();
    });
  });

  describe('Desktop Breakpoint (1024px+)', () => {
    beforeEach(() => {
      setViewport(1440, 900); // Desktop dimensions
    });

    it('renders desktop navigation correctly', () => {
      render(<App />);
      
      // Desktop navigation should be visible
      const homeButton = screen.getByRole('button', { name: /home/i });
      const skillsButton = screen.getByRole('button', { name: /skills/i });
      const contactButton = screen.getByRole('button', { name: /contact/i });
      
      expect(homeButton).toBeInTheDocument();
      expect(skillsButton).toBeInTheDocument();
      expect(contactButton).toBeInTheDocument();
    });

    it('has proper desktop layout', () => {
      render(<App />);
      
      // Desktop should have horizontal layout for certain elements
      const container = document.querySelector('.container-responsive');
      expect(container).toBeTruthy();
    });

    it('shows scroll indicator on desktop', () => {
      render(<App />);
      
      const scrollIndicator = screen.getByLabelText(/scroll to skills/i);
      expect(scrollIndicator).toBeInTheDocument();
    });
  });

  describe('Responsive Typography', () => {
    it('uses responsive text classes', () => {
      render(<App />);
      
      // Check for responsive text classes
      const mainHeading = screen.getByText('Daisy Auma');
      expect(mainHeading.closest('h1')).toHaveClass('text-responsive-2xl');
      
      const subHeading = screen.getByText('Developer Relations Engineer & Technical Writer');
      expect(subHeading.closest('h2')).toHaveClass('text-responsive-lg');
    });

    it('maintains readability across breakpoints', () => {
      const breakpoints = [
        { width: 320, height: 568 }, // Small mobile
        { width: 375, height: 667 }, // iPhone SE
        { width: 768, height: 1024 }, // iPad
        { width: 1440, height: 900 } // Desktop
      ];

      breakpoints.forEach(({ width, height }) => {
        setViewport(width, height);
        render(<App />);
        
        // Text should be readable at all breakpoints
        expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
        expect(screen.getByText('Developer Relations Engineer & Technical Writer')).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Images and Media', () => {
    it('handles images responsively', () => {
      render(<App />);
      
      // Check for any images and their responsive attributes
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        // Images should have alt text
        expect(img).toHaveAttribute('alt');
      });
    });
  });

  describe('Touch-Friendly Interactions', () => {
    beforeEach(() => {
      setViewport(375, 667); // Mobile viewport
    });

    it('has touch-friendly button sizes', () => {
      render(<App />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        // All buttons should have the touch-friendly class
        expect(button).toHaveClass('btn-touch');
      });
    });

    it('has touch-friendly link sizes', () => {
      render(<App />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        // Links should have touch-friendly class
        expect(link).toHaveClass('btn-touch');
      });
    });
  });

  describe('Container and Layout Responsiveness', () => {
    it('uses responsive container classes', () => {
      render(<App />);
      
      const containers = document.querySelectorAll('.container-responsive');
      expect(containers.length).toBeGreaterThan(0);
    });

    it('has proper grid layouts for different breakpoints', () => {
      render(<App />);
      
      // Check for responsive grid classes
      const gridContainers = document.querySelectorAll('.grid');
      gridContainers.forEach(grid => {
        // Should have responsive grid classes
        const classList = Array.from(grid.classList);
        const hasResponsiveGrid = classList.some(className => 
          className.includes('grid-cols') || 
          className.includes('lg:grid-cols') || 
          className.includes('sm:grid-cols')
        );
        expect(hasResponsiveGrid).toBe(true);
      });
    });
  });

  describe('Responsive Spacing and Padding', () => {
    it('uses responsive padding classes', () => {
      render(<App />);
      
      // Check for responsive padding on sections
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const classList = Array.from(section.classList);
        const hasResponsivePadding = classList.some(className => 
          className.includes('py-') || 
          className.includes('sm:py-') || 
          className.includes('lg:py-')
        );
        expect(hasResponsivePadding).toBe(true);
      });
    });

    it('has appropriate spacing for different screen sizes', () => {
      const breakpoints = [320, 768, 1024, 1440];
      
      breakpoints.forEach(width => {
        setViewport(width, 900);
        render(<App />);
        
        // Content should be properly spaced
        expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Navigation Behavior', () => {
    it('handles navigation appropriately on mobile', () => {
      setViewport(375, 667);
      render(<App />);
      
      const menuButton = screen.getByLabelText(/open menu/i);
      expect(menuButton).toBeInTheDocument();
    });

    it('handles navigation appropriately on desktop', () => {
      setViewport(1440, 900);
      render(<App />);
      
      // Desktop navigation should be available
      const navButtons = screen.getAllByRole('button');
      expect(navButtons.length).toBeGreaterThan(3);
    });
  });
});