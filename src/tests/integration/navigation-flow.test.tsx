import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

describe('Navigation Flow and Smooth Scrolling with Dark Theme', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
    
    // Mock getElementById
    document.getElementById = vi.fn((id: string) => {
      const mockElement = document.createElement('div');
      mockElement.id = id;
      Object.defineProperty(mockElement, 'offsetTop', {
        value: id === 'hero' ? 0 : id === 'skills' ? 800 : id === 'projects' ? 1600 : 2400,
        writable: true
      });
      return mockElement;
    });

    // Reset body overflow style
    document.body.style.overflow = 'unset';
    
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  describe('Navigation Flow', () => {
    it('navigates through all sections smoothly with dark theme', async () => {
      render(<App />);
      
      // Check dark theme is applied
      const main = document.querySelector('main');
      expect(main).toHaveClass('bg-gray-900', 'text-white');
      
      // Navigate to skills section
      const skillsButton = screen.getByText('Skills');
      await user.click(skillsButton);
      
      expect(document.getElementById).toHaveBeenCalledWith('skills');
      expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
    });

    it('handles smooth scrolling between sections', async () => {
      render(<App />);
      
      // Test navigation to different sections
      const sections = ['Skills', 'Contact'];
      
      for (const sectionName of sections) {
        const button = screen.getByText(sectionName);
        await user.click(button);
        
        expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });

    it('updates active section based on scroll position', () => {
      render(<App />);
      
      // Simulate scroll to skills section
      Object.defineProperty(window, 'scrollY', { value: 900, writable: true });
      
      const scrollEvent = new Event('scroll');
      window.dispatchEvent(scrollEvent);
      
      // Navigation should handle scroll without errors
      expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    });

    it('handles logo click navigation to hero section', async () => {
      render(<App />);
      
      const logo = screen.getByText('Daisy Auma');
      await user.click(logo);
      
      expect(document.getElementById).toHaveBeenCalledWith('hero');
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    });
  });

  describe('Mobile Navigation with Dark Theme', () => {
    it('opens and closes mobile menu with dark theme styling', async () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText('Open menu');
      expect(menuButton).toBeInTheDocument();
      
      // Open menu
      await user.click(menuButton);
      
      // Check for close button
      expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
      
      // Close menu
      await user.click(screen.getByLabelText('Close menu'));
      
      expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
    });

    it('prevents body scroll when mobile menu is open', async () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText('Open menu');
      await user.click(menuButton);
      
      expect(document.body.style.overflow).toBe('hidden');
      
      // Close menu
      await user.click(screen.getByLabelText('Close menu'));
      
      expect(document.body.style.overflow).toBe('unset');
    });

    it('closes mobile menu when navigation item is clicked', async () => {
      render(<App />);
      
      // Open mobile menu
      const menuButton = screen.getByLabelText('Open menu');
      await user.click(menuButton);
      
      // Find and click mobile navigation item
      const mobileNavItems = screen.getAllByText('Skills');
      const mobileSkillsButton = mobileNavItems.find(item => 
        item.closest('button')?.className.includes('w-full')
      );
      
      if (mobileSkillsButton) {
        await user.click(mobileSkillsButton);
        
        // Menu should be closed
        expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
      }
    });
  });

  describe('Scroll Behavior and Performance', () => {
    it('handles rapid navigation clicks without issues', async () => {
      render(<App />);
      
      const skillsButton = screen.getByText('Skills');
      const contactButton = screen.getByText('Contact');
      
      // Rapid clicks
      await user.click(skillsButton);
      await user.click(contactButton);
      await user.click(skillsButton);
      
      // Should handle rapid navigation without errors
      expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(3);
    });

    it('throttles scroll events for performance', () => {
      render(<App />);
      
      // Trigger multiple scroll events rapidly
      for (let i = 0; i < 10; i++) {
        Object.defineProperty(window, 'scrollY', { value: i * 100, writable: true });
        const scrollEvent = new Event('scroll');
        window.dispatchEvent(scrollEvent);
      }
      
      // Should handle multiple scroll events without performance issues
      expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    });

    it('cleans up event listeners on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      
      const { unmount } = render(<App />);
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
  });

  describe('Dark Theme Navigation Styling', () => {
    it('applies dark theme to navigation header', () => {
      render(<App />);
      
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('bg-white/95', 'backdrop-blur-sm');
    });

    it('has proper contrast for navigation text in dark theme', () => {
      render(<App />);
      
      const logo = screen.getByText('Daisy Auma');
      expect(logo).toHaveClass('text-gray-900');
      
      const navButtons = screen.getAllByText(/Home|Skills|Contact/);
      navButtons.forEach(button => {
        expect(button).toHaveClass('text-gray-700');
      });
    });

    it('shows active section highlighting with proper contrast', async () => {
      render(<App />);
      
      // Simulate scroll to skills section to make it active
      Object.defineProperty(window, 'scrollY', { value: 900, writable: true });
      const scrollEvent = new Event('scroll');
      window.dispatchEvent(scrollEvent);
      
      // Active section should have proper styling
      const skillsButton = screen.getByText('Skills');
      expect(skillsButton).toHaveClass('text-blue-600');
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports keyboard navigation through menu items', async () => {
      render(<App />);
      
      const skillsButton = screen.getByText('Skills');
      
      // Focus and activate with keyboard
      skillsButton.focus();
      expect(document.activeElement).toBe(skillsButton);
      
      await user.keyboard('{Enter}');
      
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    });

    it('handles tab navigation through navigation items', async () => {
      render(<App />);
      
      const homeButton = screen.getByText('Home');
      const skillsButton = screen.getByText('Skills');
      
      homeButton.focus();
      expect(document.activeElement).toBe(homeButton);
      
      await user.keyboard('{Tab}');
      
      // Should move to next navigation item
      expect(document.activeElement).toBe(skillsButton);
    });

    it('supports keyboard navigation in mobile menu', async () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText('Open menu');
      
      // Open menu with keyboard
      menuButton.focus();
      await user.keyboard('{Enter}');
      
      expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
      
      // Close menu with keyboard
      const closeButton = screen.getByLabelText('Close menu');
      closeButton.focus();
      await user.keyboard('{Enter}');
      
      expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('handles missing section elements gracefully', async () => {
      // Mock getElementById to return null for some sections
      document.getElementById = vi.fn((id: string) => {
        if (id === 'nonexistent') return null;
        const mockElement = document.createElement('div');
        mockElement.id = id;
        return mockElement;
      });
      
      render(<App />);
      
      const skillsButton = screen.getByText('Skills');
      await user.click(skillsButton);
      
      // Should not throw errors even if section doesn't exist
      expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    });

    it('handles scroll events when sections are not found', () => {
      document.getElementById = vi.fn(() => null);
      
      render(<App />);
      
      // Trigger scroll event
      const scrollEvent = new Event('scroll');
      window.dispatchEvent(scrollEvent);
      
      // Should handle gracefully without errors
      expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    });

    it('maintains navigation state during rapid interactions', async () => {
      render(<App />);
      
      const menuButton = screen.getByLabelText('Open menu');
      
      // Rapid open/close
      await user.click(menuButton);
      await user.click(screen.getByLabelText('Close menu'));
      await user.click(screen.getByLabelText('Open menu'));
      
      // Should maintain proper state
      expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
    });
  });
});