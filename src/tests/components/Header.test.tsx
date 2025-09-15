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

describe('Header Component', () => {
  const user = userEvent.setup();

  beforeEach(() => {
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

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders header with logo and navigation items', () => {
    render(<Header />);
    
    expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders mobile menu button', () => {
    render(<Header />);
    
    const menuButton = screen.getByLabelText('Open menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('toggles mobile menu when menu button is clicked', async () => {
    render(<Header />);
    
    const menuButton = screen.getByLabelText('Open menu');
    
    // Click to open menu
    await user.click(menuButton);
    
    // Menu should be open, button should show close label
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
    
    // Click to close menu
    await user.click(screen.getByLabelText('Close menu'));
    
    // Menu should be closed, button should show open label
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('scrolls to section when navigation item is clicked', async () => {
    render(<Header />);
    
    const homeButton = screen.getByText('Home');
    await user.click(homeButton);
    
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

  it('closes mobile menu when navigation item is clicked', async () => {
    render(<Header />);
    
    // Open mobile menu
    const menuButton = screen.getByLabelText('Open menu');
    await user.click(menuButton);
    
    // Click on a navigation item in mobile menu
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

  it('has proper accessibility attributes', () => {
    render(<Header />);
    
    const menuButton = screen.getByLabelText('Open menu');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('updates aria-expanded when menu is toggled', async () => {
    render(<Header />);
    
    const menuButton = screen.getByLabelText('Open menu');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    
    await user.click(menuButton);
    
    const closeButton = screen.getByLabelText('Close menu');
    expect(closeButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('handles scroll events for active section tracking', () => {
    render(<Header />);
    
    // Mock scroll event
    const scrollEvent = new Event('scroll');
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    
    // Trigger scroll event
    window.dispatchEvent(scrollEvent);
    
    // Component should handle scroll without errors
    expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
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