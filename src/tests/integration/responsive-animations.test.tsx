import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    main: ({ children, ...props }: any) => <main {...props}>{children}</main>,
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Responsive Design and Animations Across Breakpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
    
    // Mock getElementById
    document.getElementById = vi.fn((id: string) => {
      const mockElement = document.createElement('div');
      mockElement.id = id;
      return mockElement;
    });
  });

  describe('Mobile Breakpoint (320px - 768px)', () => {
    beforeEach(() => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 667, writable: true });
      
      // Trigger resize event
      fireEvent(window, new Event('resize'));
    });

    it('displays mobile navigation with proper dark theme styling', () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText('Open menu');
      expect(menuButton).toBeInTheDocument();
      
      // Mobile menu button should be visible
      const mobileMenuContainer = menuButton.closest('div');
      expect(mobileMenuContainer).toHaveClass('md:hidden');
    });

    it('has responsive text sizing for mobile', () => {
      render(<App />);
      
      // Check for responsive text classes
      const responsiveTextElements = document.querySelectorAll('[class*="text-responsive"]');
      expect(responsiveTextElements.length).toBeGreaterThan(0);
      
      // Should have mobile-first responsive classes
      const mobileTextElements = document.querySelectorAll('[class*="text-sm"], [class*="text-base"]');
      expect(mobileTextElements.length).toBeGreaterThan(0);
    });

    it('adapts grid layouts for mobile screens', () => {
      render(<App />);
      
      // Grids should start with single column on mobile
      const gridElements = document.querySelectorAll('.grid');
      gridElements.forEach(grid => {
        expect(grid).toHaveClass('grid-cols-1');
      });
    });

    it('provides touch-friendly button sizes', () => {
      render(<App />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        // Should have touch-friendly classes
        expect(button).toHaveClass('btn-touch');
      });
    });

    it('maintains proper spacing on mobile', () => {
      render(<App />);
      
      // Should have mobile-appropriate padding
      const paddedElements = document.querySelectorAll('[class*="p-"], [class*="px-"], [class*="py-"]');
      expect(paddedElements.length).toBeGreaterThan(0);
    });
  });

  describe('Tablet Breakpoint (768px - 1024px)', () => {
    beforeEach(() => {
      // Mock tablet viewport
      Object.defineProperty(window, 'innerWidth', { value: 768, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 1024, writable: true });
      
      fireEvent(window, new Event('resize'));
    });

    it('shows transitional layout between mobile and desktop', () => {
      render(<App />);
      
      // Should have medium breakpoint classes
      const mediumElements = document.querySelectorAll('[class*="md:"]');
      expect(mediumElements.length).toBeGreaterThan(0);
    });

    it('adapts grid layouts for tablet screens', () => {
      render(<App />);
      
      // Grids should expand to 2 columns on tablet
      const gridElements = document.querySelectorAll('.grid');
      gridElements.forEach(grid => {
        const hasTabletLayout = grid.className.includes('md:grid-cols-2') ||
                               grid.className.includes('md:grid-cols-3');
        expect(hasTabletLayout).toBe(true);
      });
    });

    it('maintains readable text sizes on tablet', () => {
      render(<App />);
      
      // Text should scale appropriately for tablet
      const textElements = document.querySelectorAll('[class*="sm:text-"], [class*="md:text-"]');
      expect(textElements.length).toBeGreaterThan(0);
    });
  });

  describe('Desktop Breakpoint (1024px+)', () => {
    beforeEach(() => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', { value: 1440, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 900, writable: true });
      
      fireEvent(window, new Event('resize'));
    });

    it('displays full desktop navigation', () => {
      render(<App />);
      
      // Desktop navigation should be visible
      const desktopNav = screen.getByRole('navigation');
      expect(desktopNav).toHaveClass('hidden', 'md:flex');
    });

    it('uses full grid layouts on desktop', () => {
      render(<App />);
      
      // Grids should use full columns on desktop
      const gridElements = document.querySelectorAll('.grid');
      gridElements.forEach(grid => {
        const hasDesktopLayout = grid.className.includes('lg:grid-cols-') ||
                                grid.className.includes('xl:grid-cols-');
        expect(hasDesktopLayout).toBe(true);
      });
    });

    it('has larger text sizes for desktop', () => {
      render(<App />);
      
      // Should have large text classes for desktop
      const largeTextElements = document.querySelectorAll('[class*="lg:text-"], [class*="xl:text-"]');
      expect(largeTextElements.length).toBeGreaterThan(0);
    });

    it('shows desktop-specific elements', () => {
      render(<App />);
      
      // Desktop-only elements should be visible
      const desktopOnlyElements = document.querySelectorAll('.hidden.sm\\:block, .hidden.md\\:block, .hidden.lg\\:block');
      expect(desktopOnlyElements.length).toBeGreaterThan(0);
    });
  });

  describe('Animation Performance Across Breakpoints', () => {
    it('maintains smooth animations on mobile', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
      
      render(<App />);
      
      // Animations should be present but optimized for mobile
      const animatedElements = document.querySelectorAll('[class*="animate-"], [class*="transition-"]');
      expect(animatedElements.length).toBeGreaterThan(0);
    });

    it('handles mouse tracking on desktop', () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', { value: 1440, writable: true });
      
      render(<App />);
      
      // Simulate mouse movement
      fireEvent.mouseMove(document, {
        clientX: 500,
        clientY: 300
      });
      
      // Should handle mouse tracking without errors
      expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    });

    it('adapts animations for touch devices', () => {
      // Mock touch device
      Object.defineProperty(window, 'ontouchstart', { value: true, writable: true });
      
      render(<App />);
      
      // Touch interactions should work
      const touchElements = document.querySelectorAll('.btn-touch');
      expect(touchElements.length).toBeGreaterThan(0);
    });

    it('optimizes animations for reduced motion', () => {
      // Mock prefers-reduced-motion
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
      
      render(<App />);
      
      // Should still render properly with reduced motion
      expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    });
  });

  describe('Dark Theme Consistency Across Breakpoints', () => {
    it('maintains dark theme on mobile', () => {
      Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
      
      render(<App />);
      
      const main = document.querySelector('main');
      expect(main).toHaveClass('bg-gray-900', 'text-white');
    });

    it('maintains dark theme on tablet', () => {
      Object.defineProperty(window, 'innerWidth', { value: 768, writable: true });
      
      render(<App />);
      
      const main = document.querySelector('main');
      expect(main).toHaveClass('bg-gray-900', 'text-white');
    });

    it('maintains dark theme on desktop', () => {
      Object.defineProperty(window, 'innerWidth', { value: 1440, writable: true });
      
      render(<App />);
      
      const main = document.querySelector('main');
      expect(main).toHaveClass('bg-gray-900', 'text-white');
    });

    it('adapts dark theme elements responsively', () => {
      render(<App />);
      
      // Dark theme elements should have responsive classes
      const darkElements = document.querySelectorAll('.bg-gray-800, .bg-gray-900, .text-white');
      expect(darkElements.length).toBeGreaterThan(0);
    });
  });

  describe('Interactive Elements Across Breakpoints', () => {
    it('maintains hover effects on desktop', () => {
      Object.defineProperty(window, 'innerWidth', { value: 1440, writable: true });
      
      render(<App />);
      
      const hoverElements = document.querySelectorAll('[class*="hover:"]');
      expect(hoverElements.length).toBeGreaterThan(0);
    });

    it('provides touch interactions on mobile', () => {
      Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
      
      render(<App />);
      
      const touchElements = document.querySelectorAll('.btn-touch');
      expect(touchElements.length).toBeGreaterThan(0);
    });

    it('adapts button sizes across breakpoints', () => {
      render(<App />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        // Should have responsive padding
        const hasResponsivePadding = button.className.includes('sm:p-') ||
                                   button.className.includes('md:p-') ||
                                   button.className.includes('lg:p-');
        expect(hasResponsivePadding).toBe(true);
      });
    });
  });

  describe('Content Layout Responsiveness', () => {
    it('stacks content vertically on mobile', () => {
      Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
      
      render(<App />);
      
      // Flex containers should stack on mobile
      const flexElements = document.querySelectorAll('.flex');
      flexElements.forEach(element => {
        const hasVerticalStacking = element.className.includes('flex-col') ||
                                   element.className.includes('sm:flex-row') ||
                                   element.className.includes('md:flex-row');
        expect(hasVerticalStacking).toBe(true);
      });
    });

    it('uses horizontal layouts on desktop', () => {
      Object.defineProperty(window, 'innerWidth', { value: 1440, writable: true });
      
      render(<App />);
      
      // Should have horizontal layouts available
      const horizontalElements = document.querySelectorAll('[class*="flex-row"], [class*="lg:flex-row"]');
      expect(horizontalElements.length).toBeGreaterThan(0);
    });

    it('adapts container widths responsively', () => {
      render(<App />);
      
      // Containers should have responsive max-widths
      const containers = document.querySelectorAll('.container-responsive, [class*="max-w-"]');
      expect(containers.length).toBeGreaterThan(0);
    });
  });

  describe('Performance Optimization Across Devices', () => {
    it('handles rapid viewport changes', () => {
      render(<App />);
      
      // Simulate rapid viewport changes
      const viewports = [375, 768, 1024, 1440];
      
      viewports.forEach(width => {
        Object.defineProperty(window, 'innerWidth', { value: width, writable: true });
        fireEvent(window, new Event('resize'));
      });
      
      // Should handle changes without errors
      expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    });

    it('maintains performance with animations on different devices', () => {
      render(<App />);
      
      // Simulate device-specific interactions
      fireEvent.mouseMove(document, { clientX: 100, clientY: 200 });
      fireEvent.touchStart(document, { touches: [{ clientX: 150, clientY: 250 }] });
      
      // Should handle both interaction types
      expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    });

    it('optimizes resource usage on mobile', () => {
      Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
      
      render(<App />);
      
      // Should render efficiently on mobile
      expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    });
  });

  describe('Accessibility Across Breakpoints', () => {
    it('maintains keyboard navigation on all screen sizes', () => {
      const viewports = [375, 768, 1440];
      
      viewports.forEach(width => {
        Object.defineProperty(window, 'innerWidth', { value: width, writable: true });
        
        const { unmount } = render(<App />);
        
        // Should have focusable elements
        const focusableElements = screen.getAllByRole('button');
        expect(focusableElements.length).toBeGreaterThan(0);
        
        unmount();
      });
    });

    it('provides adequate touch targets on mobile', () => {
      Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
      
      render(<App />);
      
      const touchTargets = document.querySelectorAll('.btn-touch');
      expect(touchTargets.length).toBeGreaterThan(0);
    });

    it('maintains text readability across all breakpoints', () => {
      const viewports = [375, 768, 1440];
      
      viewports.forEach(width => {
        Object.defineProperty(window, 'innerWidth', { value: width, writable: true });
        
        const { unmount } = render(<App />);
        
        // Text should be readable
        expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
        
        unmount();
      });
    });
  });
});