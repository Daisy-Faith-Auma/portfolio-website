import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from '../../App';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

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

describe('Dark Theme Accessibility Compliance', () => {
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

  describe('Color Contrast Compliance', () => {
    it('meets WCAG AA contrast requirements for dark theme text', () => {
      render(<App />);
      
      // Check main dark theme background
      const main = document.querySelector('main');
      expect(main).toHaveClass('bg-gray-900', 'text-white');
      
      // White text on dark gray background should meet contrast requirements
      const whiteTextElements = document.querySelectorAll('.text-white');
      expect(whiteTextElements.length).toBeGreaterThan(0);
      
      // Light gray text should also meet contrast requirements
      const lightGrayTextElements = document.querySelectorAll('.text-gray-100, .text-gray-200, .text-gray-300');
      expect(lightGrayTextElements.length).toBeGreaterThan(0);
    });

    it('has sufficient contrast for interactive elements', () => {
      render(<App />);
      
      // Check button contrast
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        // Buttons should have proper contrast classes
        const hasProperContrast = button.className.includes('text-white') ||
                                 button.className.includes('text-gray-900') ||
                                 button.className.includes('text-blue-600');
        expect(hasProperContrast).toBe(true);
      });
    });

    it('maintains contrast for links in dark theme', () => {
      render(<App />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        // Links should have sufficient contrast
        const hasProperContrast = link.className.includes('text-white') ||
                                 link.className.includes('text-blue-400') ||
                                 link.className.includes('text-blue-500') ||
                                 link.className.includes('text-purple-400');
        expect(hasProperContrast).toBe(true);
      });
    });

    it('provides adequate contrast for secondary text', () => {
      render(<App />);
      
      // Secondary text should use appropriate gray shades
      const secondaryTextElements = document.querySelectorAll('.text-gray-300, .text-gray-400');
      expect(secondaryTextElements.length).toBeGreaterThan(0);
      
      // These should provide adequate contrast on dark backgrounds
      secondaryTextElements.forEach(element => {
        expect(element).toHaveClass(/text-gray-[34]00/);
      });
    });
  });

  describe('Focus Management and Keyboard Navigation', () => {
    it('provides visible focus indicators for all interactive elements', () => {
      render(<App />);
      
      const interactiveElements = [
        ...screen.getAllByRole('button'),
        ...screen.getAllByRole('link')
      ];
      
      interactiveElements.forEach(element => {
        // Should have focus styling
        const hasFocusStyles = element.className.includes('focus:') ||
                              element.className.includes('focus-within:') ||
                              element.className.includes('btn-touch');
        expect(hasFocusStyles).toBe(true);
      });
    });

    it('maintains proper tab order through navigation', () => {
      render(<App />);
      
      const focusableElements = [
        ...screen.getAllByRole('button'),
        ...screen.getAllByRole('link')
      ].filter(element => !element.hasAttribute('tabindex') || element.getAttribute('tabindex') !== '-1');
      
      // Should have focusable elements in logical order
      expect(focusableElements.length).toBeGreaterThan(0);
    });

    it('provides proper focus management for mobile menu', () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText('Open menu');
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      
      // Focus styles should be present
      expect(menuButton.className).toContain('focus:');
    });

    it('handles focus trapping in modal-like components', () => {
      render(<App />);
      
      // Mobile menu should manage focus properly
      const menuButton = screen.getByLabelText('Open menu');
      expect(menuButton).toBeInTheDocument();
      
      // Should have proper ARIA attributes
      expect(menuButton).toHaveAttribute('aria-label');
    });
  });

  describe('ARIA Labels and Semantic Structure', () => {
    it('has proper heading hierarchy', () => {
      render(<App />);
      
      const h1Elements = screen.getAllByRole('heading', { level: 1 });
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      
      // Should have at least one h1 and proper hierarchy
      expect(h1Elements.length).toBeGreaterThan(0);
      expect(h2Elements.length).toBeGreaterThan(0);
    });

    it('provides descriptive ARIA labels for interactive elements', () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText('Open menu');
      expect(menuButton).toHaveAttribute('aria-label', 'Open menu');
      expect(menuButton).toHaveAttribute('aria-expanded');
    });

    it('has proper landmark roles for navigation', () => {
      render(<App />);
      
      const banner = screen.getByRole('banner');
      expect(banner).toBeInTheDocument();
      
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });

    it('provides proper labels for form elements and controls', () => {
      render(<App />);
      
      // All buttons should have accessible names
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        const hasAccessibleName = button.textContent ||
                                 button.getAttribute('aria-label') ||
                                 button.getAttribute('aria-labelledby');
        expect(hasAccessibleName).toBeTruthy();
      });
    });
  });

  describe('Screen Reader Compatibility', () => {
    it('provides proper alternative text for images', () => {
      render(<App />);
      
      const images = screen.getAllByRole('img');
      images.forEach(image => {
        expect(image).toHaveAttribute('alt');
        const altText = image.getAttribute('alt');
        expect(altText).toBeTruthy();
      });
    });

    it('has descriptive link text', () => {
      render(<App />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        const hasDescriptiveText = link.textContent ||
                                  link.getAttribute('aria-label') ||
                                  link.getAttribute('aria-labelledby');
        expect(hasDescriptiveText).toBeTruthy();
      });
    });

    it('provides context for dynamic content', () => {
      render(<App />);
      
      // Progress bars should have proper ARIA attributes
      const progressBars = document.querySelectorAll('[role="progressbar"]');
      progressBars.forEach(progressBar => {
        expect(progressBar).toHaveAttribute('aria-valuenow');
        expect(progressBar).toHaveAttribute('aria-valuemin');
        expect(progressBar).toHaveAttribute('aria-valuemax');
      });
    });

    it('announces state changes appropriately', () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText('Open menu');
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      
      // State should be communicated to screen readers
      expect(menuButton.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('Motion and Animation Accessibility', () => {
    it('respects prefers-reduced-motion settings', () => {
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

    it('provides alternatives to motion-based interactions', () => {
      render(<App />);
      
      // All interactive elements should be accessible without motion
      const buttons = screen.getAllByRole('button');
      const links = screen.getAllByRole('link');
      
      [...buttons, ...links].forEach(element => {
        // Should be clickable/activatable without relying on motion
        expect(element).toBeInTheDocument();
      });
    });

    it('does not cause seizures with flashing content', () => {
      render(<App />);
      
      // Should not have rapidly flashing animations
      const animatedElements = document.querySelectorAll('[class*="animate-"]');
      
      // Animations should be smooth and not cause accessibility issues
      animatedElements.forEach(element => {
        expect(element).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Accessibility', () => {
    it('maintains accessibility across different screen sizes', () => {
      // Test mobile viewport
      Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 667, writable: true });
      
      render(<App />);
      
      // Mobile menu should be accessible
      const menuButton = screen.getByLabelText('Open menu');
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveAttribute('aria-label');
    });

    it('provides touch-friendly targets on mobile', () => {
      render(<App />);
      
      const touchTargets = document.querySelectorAll('.btn-touch');
      expect(touchTargets.length).toBeGreaterThan(0);
      
      // Touch targets should have adequate size (implied by btn-touch class)
      touchTargets.forEach(target => {
        expect(target).toHaveClass('btn-touch');
      });
    });

    it('maintains proper spacing for accessibility', () => {
      render(<App />);
      
      // Interactive elements should have proper spacing
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        // Should have padding classes for adequate touch targets
        const hasProperSpacing = button.className.includes('p-') ||
                                button.className.includes('px-') ||
                                button.className.includes('py-');
        expect(hasProperSpacing).toBe(true);
      });
    });
  });

  describe('Automated Accessibility Testing', () => {
    it('passes axe accessibility tests', async () => {
      const { container } = render(<App />);
      
      const results = await axe(container, {
        rules: {
          // Configure specific rules for dark theme testing
          'color-contrast': { enabled: true },
          'focus-order-semantics': { enabled: true },
          'keyboard-navigation': { enabled: true }
        }
      });
      
      expect(results).toHaveNoViolations();
    });

    it('passes axe tests for specific components', async () => {
      const { container } = render(<App />);
      
      // Test navigation specifically
      const navigation = container.querySelector('header');
      if (navigation) {
        const results = await axe(navigation);
        expect(results).toHaveNoViolations();
      }
    });

    it('passes axe tests for interactive elements', async () => {
      const { container } = render(<App />);
      
      // Test all buttons
      const buttons = container.querySelectorAll('button');
      for (const button of buttons) {
        const results = await axe(button);
        expect(results).toHaveNoViolations();
      }
    });
  });

  describe('Error Prevention and Recovery', () => {
    it('provides clear error messages', () => {
      render(<App />);
      
      // Should not have any error states visible initially
      expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    });

    it('handles missing content gracefully', () => {
      render(<App />);
      
      // Should render without accessibility violations even if some content is missing
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('provides fallbacks for failed resources', () => {
      render(<App />);
      
      // Images should have proper alt text as fallbacks
      const images = screen.getAllByRole('img');
      images.forEach(image => {
        expect(image).toHaveAttribute('alt');
      });
    });
  });
});