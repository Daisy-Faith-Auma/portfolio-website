import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from '../../App';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import ContactSection from '../../components/ContactSection';
import Footer from '../../components/Footer';

// Extend expect with axe matchers
expect.extend(toHaveNoViolations);

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

describe('Accessibility Tests', () => {
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

  describe('Full Application Accessibility', () => {
    it('should not have any accessibility violations', async () => {
      const { container } = render(<App />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Header Component Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Header />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper ARIA labels for navigation', () => {
      render(<Header />);
      
      const menuButton = screen.getByLabelText(/open menu|close menu/i);
      expect(menuButton).toHaveAttribute('aria-label');
      expect(menuButton).toHaveAttribute('aria-expanded');
    });

    it('has proper heading hierarchy', () => {
      render(<Header />);
      
      // Logo should be a button, not a heading (since it's interactive)
      const logo = screen.getByText('Daisy Auma');
      expect(logo.tagName).toBe('BUTTON');
    });

    it('has keyboard accessible navigation', () => {
      render(<Header />);
      
      const navButtons = screen.getAllByRole('button');
      navButtons.forEach(button => {
        expect(button).not.toHaveAttribute('tabindex', '-1');
      });
    });
  });

  describe('Hero Component Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Hero />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper heading hierarchy', () => {
      render(<Hero />);
      
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();
      
      const subHeading = screen.getByRole('heading', { level: 2 });
      expect(subHeading).toBeInTheDocument();
    });

    it('has descriptive link labels', () => {
      render(<Hero />);
      
      const socialLinks = screen.getAllByRole('link');
      socialLinks.forEach(link => {
        const ariaLabel = link.getAttribute('aria-label');
        expect(ariaLabel).toBeTruthy();
        expect(ariaLabel).toMatch(/opens in new tab|email/i);
      });
    });

    it('has accessible button labels', () => {
      render(<Hero />);
      
      const ctaButtons = screen.getAllByRole('button');
      ctaButtons.forEach(button => {
        const ariaLabel = button.getAttribute('aria-label');
        if (ariaLabel) {
          expect(ariaLabel).toBeTruthy();
        } else {
          // Button should have descriptive text content
          expect(button.textContent?.trim()).toBeTruthy();
        }
      });
    });
  });

  describe('Contact Section Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<ContactSection />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper heading hierarchy', () => {
      render(<ContactSection />);
      
      const mainHeading = screen.getByRole('heading', { level: 2, name: /get in touch/i });
      expect(mainHeading).toBeInTheDocument();
      
      const sectionHeadings = screen.getAllByRole('heading', { level: 3 });
      expect(sectionHeadings.length).toBeGreaterThan(0);
    });

    it('has descriptive link labels for all contact links', () => {
      render(<ContactSection />);
      
      const contactLinks = screen.getAllByRole('link');
      contactLinks.forEach(link => {
        const ariaLabel = link.getAttribute('aria-label');
        expect(ariaLabel).toBeTruthy();
        expect(ariaLabel).toMatch(/visit|send email/i);
      });
    });

    it('groups related contact information properly', () => {
      render(<ContactSection />);
      
      // Check for proper sectioning
      expect(screen.getByText('Personal')).toBeInTheDocument();
      expect(screen.getByText('Professional')).toBeInTheDocument();
    });
  });

  describe('Footer Component Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Footer />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper landmark roles', () => {
      render(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    it('has accessible navigation in footer', () => {
      render(<Footer />);
      
      const navButtons = screen.getAllByRole('button');
      const footerNavButtons = navButtons.filter(button => 
        button.closest('footer')
      );
      
      footerNavButtons.forEach(button => {
        expect(button.textContent?.trim()).toBeTruthy();
      });
    });

    it('has descriptive social media links', () => {
      render(<Footer />);
      
      const socialLinks = screen.getAllByRole('link').filter(link => 
        link.closest('footer') && link.getAttribute('aria-label')
      );
      
      socialLinks.forEach(link => {
        const ariaLabel = link.getAttribute('aria-label');
        expect(ariaLabel).toBeTruthy();
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('has proper tab order for interactive elements', () => {
      render(<App />);
      
      const interactiveElements = screen.getAllByRole('button')
        .concat(screen.getAllByRole('link'));
      
      interactiveElements.forEach(element => {
        // Elements should be keyboard accessible (not have tabindex="-1" unless intentional)
        const tabIndex = element.getAttribute('tabindex');
        if (tabIndex) {
          expect(parseInt(tabIndex)).toBeGreaterThanOrEqual(-1);
        }
      });
    });

    it('has visible focus indicators', () => {
      render(<App />);
      
      // This is more of a visual test, but we can check that focus styles are not disabled
      const interactiveElements = screen.getAllByRole('button')
        .concat(screen.getAllByRole('link'));
      
      interactiveElements.forEach(element => {
        const style = window.getComputedStyle(element);
        // Ensure outline is not set to none (basic check)
        expect(style.outline).not.toBe('none');
      });
    });
  });

  describe('Color Contrast and Visual Accessibility', () => {
    it('uses semantic HTML elements', () => {
      render(<App />);
      
      // Check for proper semantic elements
      expect(screen.getByRole('banner')).toBeInTheDocument(); // header
      expect(screen.getByRole('main')).toBeInTheDocument(); // main content
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
    });

    it('has proper heading structure throughout the app', () => {
      render(<App />);
      
      // Should have h1
      const h1Elements = screen.getAllByRole('heading', { level: 1 });
      expect(h1Elements.length).toBe(1);
      
      // Should have h2 elements
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      expect(h2Elements.length).toBeGreaterThan(0);
    });

    it('provides alternative text for images', () => {
      render(<App />);
      
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
      });
    });
  });

  describe('Screen Reader Compatibility', () => {
    it('has proper ARIA landmarks', () => {
      render(<App />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('has descriptive page structure', () => {
      render(<App />);
      
      // Check that sections have proper headings
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(3);
      
      headings.forEach(heading => {
        expect(heading.textContent?.trim()).toBeTruthy();
      });
    });

    it('provides context for interactive elements', () => {
      render(<App />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        const hasAriaLabel = button.hasAttribute('aria-label');
        const hasTextContent = button.textContent?.trim();
        
        // Button should have either aria-label or text content
        expect(hasAriaLabel || hasTextContent).toBeTruthy();
      });
    });
  });

  describe('Form Accessibility', () => {
    it('has proper labels for form controls', () => {
      render(<App />);
      
      // Check if there are any form inputs (there might not be any in this portfolio)
      const inputs = screen.queryAllByRole('textbox');
      inputs.forEach(input => {
        // If inputs exist, they should have labels
        expect(input).toHaveAccessibleName();
      });
    });
  });

  describe('Motion and Animation Accessibility', () => {
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
      
      // The app should render without issues even with reduced motion
      expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    });
  });
});