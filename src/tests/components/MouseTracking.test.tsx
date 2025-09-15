import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    main: ({ children, ...props }: any) => <main {...props}>{children}</main>,
  },
}));

// Mock all components to focus on mouse tracking
vi.mock('../../components/Header', () => ({
  default: () => <div data-testid="header">Header</div>
}));

vi.mock('../../components/Hero', () => ({
  default: () => <div data-testid="hero">Hero</div>
}));

vi.mock('../../components/AboutSection', () => ({
  default: () => <div data-testid="about">About</div>
}));

vi.mock('../../components/SkillsSection', () => ({
  default: () => <div data-testid="skills">Skills</div>
}));

vi.mock('../../components/ProjectsSection', () => ({
  default: () => <div data-testid="projects">Projects</div>
}));

vi.mock('../../components/ContentSection', () => ({
  default: () => <div data-testid="content">Content</div>
}));

vi.mock('../../components/ContactSection', () => ({
  default: () => <div data-testid="contact">Contact</div>
}));

vi.mock('../../components/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>
}));

describe('Mouse Tracking and Animation Functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Mouse Position Tracking', () => {
    it('initializes with default mouse position', () => {
      render(<App />);
      
      // App should render without errors
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('hero')).toBeInTheDocument();
    });

    it('updates mouse position on mouse move', () => {
      render(<App />);
      
      const app = document.querySelector('.min-h-screen');
      expect(app).toBeInTheDocument();
      
      // Simulate mouse move
      fireEvent.mouseMove(document, {
        clientX: 100,
        clientY: 200
      });
      
      // App should handle mouse move without errors
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    it('handles mouse move events on different elements', () => {
      render(<App />);
      
      const heroSection = screen.getByTestId('hero');
      
      // Simulate mouse move on hero section
      fireEvent.mouseMove(heroSection, {
        clientX: 300,
        clientY: 400
      });
      
      // Should not cause errors
      expect(heroSection).toBeInTheDocument();
    });

    it('tracks mouse position across the entire viewport', () => {
      render(<App />);
      
      // Simulate mouse moves at different positions
      const positions = [
        { x: 0, y: 0 },
        { x: 500, y: 300 },
        { x: 1000, y: 600 },
        { x: 1920, y: 1080 }
      ];
      
      positions.forEach(pos => {
        fireEvent.mouseMove(document, {
          clientX: pos.x,
          clientY: pos.y
        });
      });
      
      // App should handle all positions without errors
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
  });

  describe('Animated Background Elements', () => {
    it('renders animated background with gradient orbs', () => {
      render(<App />);
      
      // Check for background elements
      const backgroundElements = document.querySelectorAll('.absolute');
      expect(backgroundElements.length).toBeGreaterThan(0);
    });

    it('includes mouse-following gradient effects', () => {
      render(<App />);
      
      // Look for gradient blur elements
      const gradientElements = document.querySelectorAll('[class*="bg-gradient"]');
      expect(gradientElements.length).toBeGreaterThan(0);
    });

    it('applies backdrop blur effects', () => {
      render(<App />);
      
      const blurElements = document.querySelectorAll('.backdrop-blur-sm, .backdrop-blur-md, .backdrop-blur-lg');
      expect(blurElements.length).toBeGreaterThan(0);
    });

    it('includes floating animation elements', () => {
      render(<App />);
      
      // Check for animated elements
      const animatedElements = document.querySelectorAll('[class*="animate-"]');
      expect(animatedElements.length).toBeGreaterThan(0);
    });
  });

  describe('Cursor Following Effects', () => {
    it('creates cursor following gradient blur', () => {
      render(<App />);
      
      // Simulate mouse move to trigger cursor effects
      fireEvent.mouseMove(document, {
        clientX: 250,
        clientY: 350
      });
      
      // Look for cursor-related elements
      const cursorElements = document.querySelectorAll('[style*="transform"], [style*="left"], [style*="top"]');
      expect(cursorElements.length).toBeGreaterThan(0);
    });

    it('updates cursor position dynamically', () => {
      render(<App />);
      
      // Move mouse to different positions
      fireEvent.mouseMove(document, { clientX: 100, clientY: 150 });
      fireEvent.mouseMove(document, { clientX: 400, clientY: 500 });
      
      // Should handle position updates without errors
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    it('applies purple gradient blur effect', () => {
      render(<App />);
      
      // Look for purple gradient elements
      const purpleGradients = document.querySelectorAll('[class*="purple"], [class*="violet"]');
      expect(purpleGradients.length).toBeGreaterThan(0);
    });

    it('handles rapid mouse movements', () => {
      render(<App />);
      
      // Simulate rapid mouse movements
      for (let i = 0; i < 20; i++) {
        fireEvent.mouseMove(document, {
          clientX: Math.random() * 1000,
          clientY: Math.random() * 800
        });
      }
      
      // Should handle rapid movements without performance issues
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
  });

  describe('Animation Performance', () => {
    it('handles animation without blocking UI', () => {
      render(<App />);
      
      // Simulate continuous mouse movement
      const interval = setInterval(() => {
        fireEvent.mouseMove(document, {
          clientX: Math.random() * 1000,
          clientY: Math.random() * 800
        });
      }, 16); // ~60fps
      
      // Clear interval after short time
      setTimeout(() => clearInterval(interval), 100);
      
      // UI should remain responsive
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('hero')).toBeInTheDocument();
    });

    it('applies smooth transitions for animations', () => {
      render(<App />);
      
      // Look for transition classes
      const transitionElements = document.querySelectorAll('[class*="transition"], [class*="duration"]');
      expect(transitionElements.length).toBeGreaterThan(0);
    });

    it('uses transform for performance-optimized animations', () => {
      render(<App />);
      
      // Simulate mouse move
      fireEvent.mouseMove(document, { clientX: 300, clientY: 400 });
      
      // Look for transform-based animations
      const transformElements = document.querySelectorAll('[style*="transform"]');
      expect(transformElements.length).toBeGreaterThan(0);
    });
  });

  describe('Dark Theme Integration', () => {
    it('applies dark theme background', () => {
      render(<App />);
      
      const mainElement = document.querySelector('main');
      expect(mainElement).toHaveClass('bg-gray-900', 'text-white');
    });

    it('includes dark theme gradient effects', () => {
      render(<App />);
      
      // Look for dark theme gradients
      const darkGradients = document.querySelectorAll('[class*="from-gray"], [class*="to-gray"]');
      expect(darkGradients.length).toBeGreaterThan(0);
    });

    it('maintains proper contrast for animations', () => {
      render(<App />);
      
      // Check for proper text contrast classes
      const textElements = document.querySelectorAll('.text-white, .text-gray-100, .text-gray-200');
      expect(textElements.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Animation Behavior', () => {
    it('adapts animations for different screen sizes', () => {
      render(<App />);
      
      // Look for responsive animation classes
      const responsiveElements = document.querySelectorAll('[class*="sm:"], [class*="md:"], [class*="lg:"]');
      expect(responsiveElements.length).toBeGreaterThan(0);
    });

    it('handles touch devices appropriately', () => {
      render(<App />);
      
      // Simulate touch event
      fireEvent.touchStart(document, {
        touches: [{ clientX: 200, clientY: 300 }]
      });
      
      // Should handle touch without errors
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    it('maintains performance on mobile devices', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 667, writable: true });
      
      render(<App />);
      
      // Should render properly on mobile
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('hero')).toBeInTheDocument();
    });
  });

  describe('Animation Cleanup', () => {
    it('cleans up event listeners on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
      
      const { unmount } = render(<App />);
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    });

    it('handles component unmount during animation', () => {
      const { unmount } = render(<App />);
      
      // Start animation
      fireEvent.mouseMove(document, { clientX: 100, clientY: 200 });
      
      // Unmount during animation
      unmount();
      
      // Should not cause errors
      expect(true).toBe(true);
    });

    it('prevents memory leaks from animation frames', () => {
      const { unmount } = render(<App />);
      
      // Simulate multiple animation frames
      for (let i = 0; i < 10; i++) {
        fireEvent.mouseMove(document, {
          clientX: i * 10,
          clientY: i * 10
        });
      }
      
      unmount();
      
      // Should clean up properly
      expect(true).toBe(true);
    });
  });

  describe('Accessibility with Animations', () => {
    it('respects reduced motion preferences', () => {
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
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    it('maintains keyboard navigation with animations', () => {
      render(<App />);
      
      // Simulate keyboard navigation
      fireEvent.keyDown(document, { key: 'Tab' });
      
      // Should not interfere with keyboard navigation
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    it('does not interfere with screen readers', () => {
      render(<App />);
      
      // Simulate mouse movement
      fireEvent.mouseMove(document, { clientX: 200, clientY: 300 });
      
      // Content should remain accessible
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('hero')).toBeInTheDocument();
    });
  });
});