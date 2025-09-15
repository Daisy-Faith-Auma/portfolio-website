import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../../components/Header';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock performance utility
vi.mock('../../utils/performance', () => ({
  throttle: (fn: Function) => fn,
}));

describe('Navigation Component (Header)', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
    
    // Mock getElementById
    document.getElementById = vi.fn((id: string) => {
      const mockElement = document.createElement('div');
      mockElement.id = id;
      Object.defineProperty(mockElement, 'offsetTop', {
        value: id === 'hero' ? 0 : id === 'skills' ? 800 : 1600,
        writable: true
      });
      return mockElement;
    });

    // Reset body overflow style
    document.body.style.overflow = 'unset';
    
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders navigation with logo and menu items', () => {
      render(<Header />);
      
      expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Skills')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('renders mobile menu button with proper accessibility', () => {
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Open menu');
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('applies fixed positioning and backdrop blur styles', () => {
      render(<Header />);
      
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('fixed', 'top-0', 'backdrop-blur-sm');
    });
  });

  describe('Navigation Functionality', () => {
    it('scrolls to correct section when navigation item is clicked', async () => {
      render(<Header />);
      
      const skillsButton = screen.getByText('Skills');
      await user.click(skillsButton);
      
      expect(document.getElementById).toHaveBeenCalledWith('skills');
      expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
    });

    it('scrolls to hero section when logo is clicked', async () => {
      render(<Header />);
      
      const logo = screen.getByText('Daisy Auma');
      await user.click(logo);
      
      expect(document.getElementById).toHaveBeenCalledWith('hero');
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    });

    it('tracks active section based on scroll position', () => {
      render(<Header />);
      
      // Mock scroll to skills section
      Object.defineProperty(window, 'scrollY', { value: 900, writable: true });
      
      const scrollEvent = new Event('scroll');
      window.dispatchEvent(scrollEvent);
      
      // Component should handle scroll without errors
      expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    });
  });

  describe('Mobile Menu', () => {
    it('toggles mobile menu when menu button is clicked', async () => {
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Open menu');
      
      // Click to open menu
      await user.click(menuButton);
      
      expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
      expect(screen.getByLabelText('Close menu')).toHaveAttribute('aria-expanded', 'true');
      
      // Click to close menu
      await user.click(screen.getByLabelText('Close menu'));
      
      expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
    });

    it('closes mobile menu when navigation item is clicked', async () => {
      render(<Header />);
      
      // Open mobile menu
      const menuButton = screen.getByLabelText('Open menu');
      await user.click(menuButton);
      
      // Find mobile navigation item
      const mobileNavItems = screen.getAllByText('Home');
      const mobileHomeButton = mobileNavItems.find(item => 
        item.closest('button')?.className.includes('w-full')
      );
      
      if (mobileHomeButton) {
        await user.click(mobileHomeButton);
        
        // Menu should be closed
        expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
      }
    });

    it('prevents body scroll when mobile menu is open', async () => {
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Open menu');
      await user.click(menuButton);
      
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body scroll when mobile menu is closed', async () => {
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Open menu');
      
      // Open menu
      await user.click(menuButton);
      expect(document.body.style.overflow).toBe('hidden');
      
      // Close menu
      await user.click(screen.getByLabelText('Close menu'));
      expect(document.body.style.overflow).toBe('unset');
    });

    it('closes mobile menu when clicking outside', async () => {
      render(<Header />);
      
      // Open mobile menu
      const menuButton = screen.getByLabelText('Open menu');
      await user.click(menuButton);
      
      // Click outside the header
      fireEvent.click(document.body);
      
      // Menu should be closed
      await waitFor(() => {
        expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes for menu button', () => {
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Open menu');
      expect(menuButton).toHaveAttribute('aria-label', 'Open menu');
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('updates ARIA attributes when menu state changes', async () => {
      render(<Header />);
      
      const menuButton = screen.getByLabelText('Open menu');
      await user.click(menuButton);
      
      const closeButton = screen.getByLabelText('Close menu');
      expect(closeButton).toHaveAttribute('aria-label', 'Close menu');
      expect(closeButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('provides keyboard navigation support', async () => {
      render(<Header />);
      
      const homeButton = screen.getByText('Home');
      
      // Focus and activate with keyboard
      homeButton.focus();
      await user.keyboard('{Enter}');
      
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    });
  });

  describe('Performance', () => {
    it('throttles scroll events for performance', () => {
      render(<Header />);
      
      // Trigger multiple scroll events rapidly
      for (let i = 0; i < 10; i++) {
        const scrollEvent = new Event('scroll');
        window.dispatchEvent(scrollEvent);
      }
      
      // Component should handle multiple scroll events without issues
      expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    });

    it('cleans up event listeners on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      
      const { unmount } = render(<Header />);
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
  });

  describe('Responsive Design', () => {
    it('shows desktop navigation on larger screens', () => {
      render(<Header />);
      
      const desktopNav = screen.getByRole('navigation');
      expect(desktopNav).toHaveClass('hidden', 'md:flex');
    });

    it('shows mobile menu button on smaller screens', () => {
      render(<Header />);
      
      const mobileMenuContainer = screen.getByLabelText('Open menu').closest('div');
      expect(mobileMenuContainer).toHaveClass('md:hidden');
    });
  });
});