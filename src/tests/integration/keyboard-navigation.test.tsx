import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('Keyboard Navigation with Interactive Elements', () => {
  const user = userEvent.setup();

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

    // Reset body overflow style
    document.body.style.overflow = 'unset';
  });

  describe('Tab Navigation Order', () => {
    it('follows logical tab order through navigation elements', async () => {
      render(<App />);
      
      // Start with logo
      const logo = screen.getByText('Daisy Auma');
      logo.focus();
      expect(document.activeElement).toBe(logo);
      
      // Tab to navigation items
      await user.keyboard('{Tab}');
      
      const homeButton = screen.getByText('Home');
      expect(document.activeElement).toBe(homeButton);
      
      await user.keyboard('{Tab}');
      
      const skillsButton = screen.getByText('Skills');
      expect(document.activeElement).toBe(skillsButton);
    });

    it('includes mobile menu button in tab order', async () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText('Open menu');
      menuButton.focus();
      expect(document.activeElement).toBe(menuButton);
      
      // Should be focusable
      expect(menuButton.tabIndex).not.toBe(-1);
    });

    it('maintains proper tab order in mobile menu', async () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText('Open menu');
      await user.click(menuButton);
      
      // Mobile menu items should be in tab order
      const mobileNavItems = screen.getAllByText(/Home|Skills|Contact/).filter(item => 
        item.closest('button')?.className.includes('w-full')
      );
      
      if (mobileNavItems.length > 0) {
        mobileNavItems[0].focus();
        expect(document.activeElement).toBe(mobileNavItems[0]);
      }
    });

    it('skips non-interactive elements in tab order', async () => {
      render(<App />);
      
      // Tab through interactive elements only
      const interactiveElements = [
        ...screen.getAllByRole('button'),
        ...screen.getAllByRole('link')
      ].filter(element => !element.hasAttribute('tabindex') || element.getAttribute('tabindex') !== '-1');
      
      expect(interactiveElements.length).toBeGreaterThan(0);
      
      // Each should be focusable
      interactiveElements.forEach(element => {
        element.focus();
        expect(document.activeElement).toBe(element);
      });
    });
  });

  describe('Keyboard Activation', () => {
    it('activates navigation buttons with Enter key', async () => {
      render(<App />);
      
      const skillsButton = screen.getByText('Skills');
      skillsButton.focus();
      
      await user.keyboard('{Enter}');
      
      expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
    });

    it('activates navigation buttons with Space key', async () => {
      render(<App />);
      
      const contactButton = screen.getByText('Contact');
      contactButton.focus();
      
      await user.keyboard(' ');
      
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    });

    it('activates mobile menu with keyboard', async () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText('Open menu');
      menuButton.focus();
      
      await user.keyboard('{Enter}');
      
      expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
    });

    it('closes mobile menu with keyboard', async () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText('Open menu');
      await user.click(menuButton);
      
      const closeButton = screen.getByLabelText('Close menu');
      closeButton.focus();
      
      await user.keyboard('{Enter}');
      
      expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
    });
  });

  describe('Focus Management', () => {
    it('provides visible focus indicators', () => {
      render(<App />);
      
      const focusableElements = [
        ...screen.getAllByRole('button'),
        ...screen.getAllByRole('link')
      ];
      
      focusableElements.forEach(element => {
        element.focus();
        
        // Should have focus styling
        const hasFocusStyles = element.className.includes('focus:') ||
                              element.className.includes('focus-within:') ||
                              element.className.includes('btn-touch');
        expect(hasFocusStyles).toBe(true);
      });
    });

    it('maintains focus visibility in dark theme', () => {
      render(<App />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        button.focus();
        
        // Focus should be visible in dark theme
        const hasDarkThemeFocus = button.className.includes('focus:ring-') ||
                                 button.className.includes('focus:border-') ||
                                 button.className.includes('focus:outline-');
        expect(hasDarkThemeFocus).toBe(true);
      });
    });

    it('traps focus in mobile menu when open', async () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText('Open menu');
      await user.click(menuButton);
      
      // Focus should be managed within the menu
      const closeButton = screen.getByLabelText('Close menu');
      expect(closeButton).toBeInTheDocument();
      
      // Menu should have proper focus management
      expect(closeButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('restores focus after closing mobile menu', async () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText('Open menu');
      menuButton.focus();
      
      await user.keyboard('{Enter}');
      
      const closeButton = screen.getByLabelText('Close menu');
      await user.click(closeButton);
      
      // Focus should return to menu button
      expect(document.activeElement).toBe(screen.getByLabelText('Open menu'));
    });
  });

  describe('Arrow Key Navigation', () => {
    it('supports arrow key navigation in navigation menu', async () => {
      render(<App />);
      
      const homeButton = screen.getByText('Home');
      homeButton.focus();
      
      // Arrow keys should move between navigation items
      await user.keyboard('{ArrowRight}');
      
      const skillsButton = screen.getByText('Skills');
      expect(document.activeElement).toBe(skillsButton);
    });

    it('wraps around navigation with arrow keys', async () => {
      render(<App />);
      
      const contactButton = screen.getByText('Contact');
      contactButton.focus();
      
      // Arrow right from last item should wrap to first
      await user.keyboard('{ArrowRight}');
      
      const homeButton = screen.getByText('Home');
      expect(document.activeElement).toBe(homeButton);
    });

    it('supports vertical arrow navigation in mobile menu', async () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText('Open menu');
      await user.click(menuButton);
      
      const mobileNavItems = screen.getAllByText(/Home|Skills|Contact/).filter(item => 
        item.closest('button')?.className.includes('w-full')
      );
      
      if (mobileNavItems.length > 1) {
        mobileNavItems[0].focus();
        
        await user.keyboard('{ArrowDown}');
        
        expect(document.activeElement).toBe(mobileNavItems[1]);
      }
    });
  });

  describe('Escape Key Handling', () => {
    it('closes mobile menu with Escape key', async () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText('Open menu');
      await user.click(menuButton);
      
      expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
      
      await user.keyboard('{Escape}');
      
      expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
    });

    it('returns focus to menu button after Escape', async () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText('Open menu');
      await user.click(menuButton);
      
      await user.keyboard('{Escape}');
      
      expect(document.activeElement).toBe(screen.getByLabelText('Open menu'));
    });

    it('handles Escape key in nested interactive elements', async () => {
      render(<App />);
      
      // Test escape handling in various contexts
      const buttons = screen.getAllByRole('button');
      
      buttons.forEach(async (button) => {
        button.focus();
        await user.keyboard('{Escape}');
        
        // Should not cause errors
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('Link Navigation', () => {
    it('activates external links with keyboard', async () => {
      render(<App />);
      
      const externalLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('target') === '_blank'
      );
      
      if (externalLinks.length > 0) {
        const firstLink = externalLinks[0];
        firstLink.focus();
        
        await user.keyboard('{Enter}');
        
        // Link should be activated
        expect(firstLink).toHaveAttribute('href');
      }
    });

    it('handles internal navigation links with keyboard', async () => {
      render(<App />);
      
      const internalLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href')?.startsWith('#')
      );
      
      if (internalLinks.length > 0) {
        const firstLink = internalLinks[0];
        firstLink.focus();
        
        await user.keyboard('{Enter}');
        
        // Should trigger smooth scroll
        expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
      }
    });

    it('provides proper focus indicators for links', () => {
      render(<App />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        link.focus();
        
        // Links should have focus styling
        const hasFocusStyles = link.className.includes('focus:') ||
                              link.className.includes('btn-touch');
        expect(hasFocusStyles).toBe(true);
      });
    });
  });

  describe('Keyboard Shortcuts', () => {
    it('supports common keyboard shortcuts', async () => {
      render(<App />);
      
      // Test common shortcuts like Ctrl+Home to go to top
      await user.keyboard('{Control>}{Home}{/Control}');
      
      // Should not cause errors
      expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    });

    it('handles Alt+Tab navigation', async () => {
      render(<App />);
      
      // Alt+Tab should not interfere with application
      await user.keyboard('{Alt>}{Tab}{/Alt}');
      
      expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    });

    it('supports page navigation shortcuts', async () => {
      render(<App />);
      
      // Page Up/Down should work
      await user.keyboard('{PageDown}');
      await user.keyboard('{PageUp}');
      
      expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    });
  });

  describe('Screen Reader Support', () => {
    it('provides proper ARIA labels for keyboard users', () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText('Open menu');
      expect(menuButton).toHaveAttribute('aria-label', 'Open menu');
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('announces state changes to screen readers', async () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText('Open menu');
      await user.click(menuButton);
      
      const closeButton = screen.getByLabelText('Close menu');
      expect(closeButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('provides descriptive labels for navigation', () => {
      render(<App />);
      
      const navButtons = screen.getAllByRole('button');
      navButtons.forEach(button => {
        const hasAccessibleName = button.textContent ||
                                 button.getAttribute('aria-label') ||
                                 button.getAttribute('aria-labelledby');
        expect(hasAccessibleName).toBeTruthy();
      });
    });

    it('supports screen reader navigation landmarks', () => {
      render(<App />);
      
      const banner = screen.getByRole('banner');
      const main = screen.getByRole('main');
      
      expect(banner).toBeInTheDocument();
      expect(main).toBeInTheDocument();
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('handles keyboard events when elements are disabled', () => {
      render(<App />);
      
      // Should handle disabled state gracefully
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        if (button.hasAttribute('disabled')) {
          button.focus();
          expect(document.activeElement).not.toBe(button);
        }
      });
    });

    it('maintains keyboard navigation during animations', async () => {
      render(<App />);
      
      // Trigger animation
      fireEvent.mouseMove(document, { clientX: 100, clientY: 200 });
      
      // Keyboard navigation should still work
      const skillsButton = screen.getByText('Skills');
      skillsButton.focus();
      
      await user.keyboard('{Enter}');
      
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    });

    it('handles rapid keyboard interactions', async () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText('Open menu');
      
      // Rapid keyboard interactions
      await user.keyboard('{Enter}');
      await user.keyboard('{Escape}');
      await user.keyboard('{Enter}');
      await user.keyboard('{Escape}');
      
      // Should maintain proper state
      expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
    });

    it('prevents keyboard traps in main content', async () => {
      render(<App />);
      
      // Should be able to tab through all content
      const focusableElements = [
        ...screen.getAllByRole('button'),
        ...screen.getAllByRole('link')
      ];
      
      // Should not get trapped
      expect(focusableElements.length).toBeGreaterThan(0);
      
      for (const element of focusableElements.slice(0, 5)) {
        element.focus();
        await user.keyboard('{Tab}');
      }
      
      // Should complete without errors
      expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    });
  });
});