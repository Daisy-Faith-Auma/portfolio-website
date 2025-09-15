import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../../components/Footer';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    footer: ({ children, ...props }: any) => <footer {...props}>{children}</footer>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    h4: ({ children, ...props }: any) => <h4 {...props}>{children}</h4>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
}));

describe('Footer Component', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    // Mock scrollTo
    window.scrollTo = vi.fn();
    
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
    
    // Mock getElementById
    document.getElementById = vi.fn((id: string) => {
      const mockElement = document.createElement('div');
      mockElement.id = id;
      return mockElement;
    });
  });

  it('renders footer with brand information', () => {
    render(<Footer />);
    
    expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    expect(screen.getByText('Developer Relations Engineer & Technical Writer')).toBeInTheDocument();
  });

  it('renders brand description', () => {
    render(<Footer />);
    
    expect(screen.getByText(/Bridging the gap between complex technology/)).toBeInTheDocument();
  });

  it('renders quick navigation links', () => {
    render(<Footer />);
    
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    
    const quickLinks = ['Home', 'Skills', 'Contact'];
    quickLinks.forEach(link => {
      expect(screen.getByRole('button', { name: link })).toBeInTheDocument();
    });
  });

  it('renders social media links', () => {
    render(<Footer />);
    
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('YouTube')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('opens social media links in new tabs', () => {
    render(<Footer />);
    
    const linkedinLink = screen.getByLabelText('LinkedIn');
    const githubLink = screen.getByLabelText('GitHub');
    
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has correct URLs for social media links', () => {
    render(<Footer />);
    
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute('href', 'https://linkedin.com/in/daisyauma');
    expect(screen.getByLabelText('GitHub')).toHaveAttribute('href', 'https://github.com/daisyauma');
    expect(screen.getByLabelText('YouTube')).toHaveAttribute('href', 'https://youtube.com/@daisyauma');
    expect(screen.getByLabelText('Email')).toHaveAttribute('href', 'mailto:daisy@luxtechacademy.com');
  });

  it('renders professional information section', () => {
    render(<Footer />);
    
    expect(screen.getByText('Professional')).toBeInTheDocument();
    expect(screen.getByText(/Co-founder at/)).toBeInTheDocument();
    expect(screen.getByText(/Technical Writer at/)).toBeInTheDocument();
    expect(screen.getByText('Available for consulting and collaborations')).toBeInTheDocument();
  });

  it('renders professional links with correct URLs', () => {
    render(<Footer />);
    
    const luxAcademyLink = screen.getByRole('link', { name: 'Lux Tech Academy' });
    const cloudflareLink = screen.getByRole('link', { name: 'Cloudflare' });
    
    expect(luxAcademyLink).toHaveAttribute('href', 'https://luxtechacademy.com');
    expect(luxAcademyLink).toHaveAttribute('target', '_blank');
    expect(cloudflareLink).toHaveAttribute('href', 'https://developers.cloudflare.com');
    expect(cloudflareLink).toHaveAttribute('target', '_blank');
  });

  it('displays current year in copyright', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Daisy Auma. All rights reserved.`)).toBeInTheDocument();
  });

  it('renders "Built with love and code" message', () => {
    render(<Footer />);
    
    expect(screen.getByText(/Built with.*and/)).toBeInTheDocument();
  });

  it('renders back to top button', () => {
    render(<Footer />);
    
    const backToTopButton = screen.getByLabelText('Scroll to top');
    expect(backToTopButton).toBeInTheDocument();
    expect(screen.getByText('Back to top')).toBeInTheDocument();
  });

  it('scrolls to top when back to top button is clicked', async () => {
    render(<Footer />);
    
    const backToTopButton = screen.getByLabelText('Scroll to top');
    await user.click(backToTopButton);
    
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
  });

  it('scrolls to sections when quick links are clicked', async () => {
    render(<Footer />);
    
    const homeButton = screen.getByRole('button', { name: 'Home' });
    await user.click(homeButton);
    
    expect(document.getElementById).toHaveBeenCalledWith('hero');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    });
  });

  it('scrolls to skills section when Skills link is clicked', async () => {
    render(<Footer />);
    
    const skillsButton = screen.getByRole('button', { name: 'Skills' });
    await user.click(skillsButton);
    
    expect(document.getElementById).toHaveBeenCalledWith('skills');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('scrolls to contact section when Contact link is clicked', async () => {
    render(<Footer />);
    
    const contactButton = screen.getByRole('button', { name: 'Contact' });
    await user.click(contactButton);
    
    expect(document.getElementById).toHaveBeenCalledWith('contact');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('has proper footer styling classes', () => {
    render(<Footer />);
    
    const footer = document.querySelector('footer');
    expect(footer).toHaveClass('bg-gray-900', 'text-white');
  });

  it('has proper grid layout for main content', () => {
    render(<Footer />);
    
    const gridContainer = document.querySelector('.grid');
    expect(gridContainer).toHaveClass('lg:grid-cols-3');
  });

  it('has border separator for bottom bar', () => {
    render(<Footer />);
    
    const bottomBar = document.querySelector('.border-t');
    expect(bottomBar).toHaveClass('border-gray-800');
  });

  it('handles missing elements gracefully in scroll functions', async () => {
    // Mock getElementById to return null
    document.getElementById = vi.fn(() => null);
    
    render(<Footer />);
    
    const homeButton = screen.getByRole('button', { name: 'Home' });
    await user.click(homeButton);
    
    // Should not throw error when element is not found
    expect(document.getElementById).toHaveBeenCalledWith('hero');
  });

  it('has responsive layout classes', () => {
    render(<Footer />);
    
    const mainGrid = document.querySelector('.grid');
    expect(mainGrid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
  });
});