import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('Navigation Integration Tests', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
    
    // Mock getElementById to return elements with proper IDs
    document.getElementById = vi.fn((id: string) => {
      const mockElement = document.createElement('div');
      mockElement.id = id;
      Object.defineProperty(mockElement, 'offsetTop', {
        value: id === 'hero' ? 0 : id === 'skills' ? 800 : 1600,
        writable: true
      });
      return mockElement;
    });

    // Mock window.scrollTo
    window.scrollTo = vi.fn();
    
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true
    });
  });

  it('navigates through all main sections using header navigation', async () => {
    render(<App />);
    
    // Test navigation to Skills section
    const skillsNavButton = screen.getByRole('button', { name: /skills/i });
    await user.click(skillsNavButton);
    
    expect(document.getElementById).toHaveBeenCalledWith('skills');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    });
    
    // Test navigation to Contact section
    const contactNavButton = screen.getByRole('button', { name: /contact/i });
    await user.click(contactNavButton);
    
    expect(document.getElementById).toHaveBeenCalledWith('contact');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    
    // Test navigation back to Home
    const homeNavButton = screen.getByRole('button', { name: /home/i });
    await user.click(homeNavButton);
    
    expect(document.getElementById).toHaveBeenCalledWith('hero');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('navigates using hero section call-to-action buttons', async () => {
    render(<App />);
    
    // Test "Explore My Work" button
    const exploreButton = screen.getByText('Explore My Work');
    await user.click(exploreButton);
    
    expect(document.getElementById).toHaveBeenCalledWith('skills');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    
    // Test "Get In Touch" button
    const contactButton = screen.getByText('Get In Touch');
    await user.click(contactButton);
    
    expect(document.getElementById).toHaveBeenCalledWith('contact');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('navigates using footer quick links', async () => {
    render(<App />);
    
    // Find footer navigation buttons
    const footerButtons = screen.getAllByRole('button');
    const footerHomeButton = footerButtons.find(button => 
      button.textContent === 'Home' && 
      button.closest('footer')
    );
    const footerSkillsButton = footerButtons.find(button => 
      button.textContent === 'Skills' && 
      button.closest('footer')
    );
    const footerContactButton = footerButtons.find(button => 
      button.textContent === 'Contact' && 
      button.closest('footer')
    );
    
    if (footerHomeButton) {
      await user.click(footerHomeButton);
      expect(document.getElementById).toHaveBeenCalledWith('hero');
    }
    
    if (footerSkillsButton) {
      await user.click(footerSkillsButton);
      expect(document.getElementById).toHaveBeenCalledWith('skills');
    }
    
    if (footerContactButton) {
      await user.click(footerContactButton);
      expect(document.getElementById).toHaveBeenCalledWith('contact');
    }
  });

  it('handles mobile menu navigation flow', async () => {
    render(<App />);
    
    // Open mobile menu
    const menuButton = screen.getByLabelText(/open menu/i);
    await user.click(menuButton);
    
    // Verify menu is open
    expect(screen.getByLabelText(/close menu/i)).toBeInTheDocument();
    
    // Navigate using mobile menu
    const mobileNavButtons = screen.getAllByRole('button');
    const mobileSkillsButton = mobileNavButtons.find(button => 
      button.textContent === 'Skills' && 
      button.className.includes('w-full')
    );
    
    if (mobileSkillsButton) {
      await user.click(mobileSkillsButton);
      
      // Menu should close after navigation
      await waitFor(() => {
        expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();
      });
      
      expect(document.getElementById).toHaveBeenCalledWith('skills');
    }
  });

  it('navigates using scroll indicator', async () => {
    render(<App />);
    
    const scrollIndicator = screen.getByLabelText(/scroll to skills/i);
    await user.click(scrollIndicator);
    
    expect(document.getElementById).toHaveBeenCalledWith('skills');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('navigates back to top using footer button', async () => {
    render(<App />);
    
    const backToTopButton = screen.getByLabelText(/scroll to top/i);
    await user.click(backToTopButton);
    
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
  });

  it('handles logo click navigation', async () => {
    render(<App />);
    
    const logo = screen.getByText('Daisy Auma');
    await user.click(logo);
    
    expect(document.getElementById).toHaveBeenCalledWith('hero');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('maintains navigation state consistency', async () => {
    render(<App />);
    
    // Navigate to different sections and verify consistent behavior
    const sections = ['skills', 'contact', 'hero'];
    
    for (const sectionId of sections) {
      const navButton = screen.getByRole('button', { 
        name: new RegExp(sectionId === 'hero' ? 'home' : sectionId, 'i') 
      });
      
      await user.click(navButton);
      expect(document.getElementById).toHaveBeenCalledWith(sectionId);
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    }
  });

  it('handles navigation with keyboard interactions', async () => {
    render(<App />);
    
    // Test keyboard navigation
    const skillsButton = screen.getByRole('button', { name: /skills/i });
    
    // Focus and activate with keyboard
    skillsButton.focus();
    await user.keyboard('{Enter}');
    
    expect(document.getElementById).toHaveBeenCalledWith('skills');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('handles rapid navigation clicks gracefully', async () => {
    render(<App />);
    
    const skillsButton = screen.getByRole('button', { name: /skills/i });
    const contactButton = screen.getByRole('button', { name: /contact/i });
    
    // Rapid clicks
    await user.click(skillsButton);
    await user.click(contactButton);
    await user.click(skillsButton);
    
    // Should handle all clicks without errors
    expect(document.getElementById).toHaveBeenCalledWith('skills');
    expect(document.getElementById).toHaveBeenCalledWith('contact');
  });
});