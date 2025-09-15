import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Hero from '../../components/Hero';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
}));

// Mock contact data
vi.mock('../../data/contact', () => ({
  contactLinks: [
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/daisyauma',
      icon: 'Linkedin',
      category: 'personal'
    },
    {
      platform: 'GitHub',
      url: 'https://github.com/daisyauma',
      icon: 'Github',
      category: 'personal'
    },
    {
      platform: 'YouTube',
      url: 'https://youtube.com/@daisyauma',
      icon: 'Youtube',
      category: 'personal'
    },
    {
      platform: 'Twitter/X',
      url: 'https://twitter.com/daisyauma',
      icon: 'Twitter',
      category: 'personal'
    },
    {
      platform: 'Substack',
      url: 'https://daisyauma.substack.com',
      icon: 'Mail',
      category: 'personal'
    }
  ]
}));

describe('Hero Component', () => {
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
  });

  it('renders hero section with main content', () => {
    render(<Hero />);
    
    expect(screen.getByText('Hi, I\'m')).toBeInTheDocument();
    expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    expect(screen.getByText('Developer Relations Engineer & Technical Writer')).toBeInTheDocument();
  });

  it('displays value proposition text', () => {
    render(<Hero />);
    
    expect(screen.getByText(/I bridge the gap between complex technology/)).toBeInTheDocument();
    expect(screen.getByText(/From AI projects to community building/)).toBeInTheDocument();
  });

  it('renders social media quick access links', () => {
    render(<Hero />);
    
    expect(screen.getByLabelText('Visit my LinkedIn profile (opens in new tab)')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit my GitHub profile (opens in new tab)')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit my YouTube profile (opens in new tab)')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit my Twitter/X profile (opens in new tab)')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit my Substack profile (opens in new tab)')).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(<Hero />);
    
    expect(screen.getByText('Explore My Work')).toBeInTheDocument();
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });

  it('has proper accessibility labels for CTA buttons', () => {
    render(<Hero />);
    
    const exploreButton = screen.getByLabelText('Navigate to skills and expertise section');
    const contactButton = screen.getByLabelText('Navigate to contact information section');
    
    expect(exploreButton).toBeInTheDocument();
    expect(contactButton).toBeInTheDocument();
  });

  it('scrolls to skills section when "Explore My Work" is clicked', async () => {
    render(<Hero />);
    
    const exploreButton = screen.getByText('Explore My Work');
    await user.click(exploreButton);
    
    expect(document.getElementById).toHaveBeenCalledWith('skills');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    });
  });

  it('scrolls to contact section when "Get In Touch" is clicked', async () => {
    render(<Hero />);
    
    const contactButton = screen.getByText('Get In Touch');
    await user.click(contactButton);
    
    expect(document.getElementById).toHaveBeenCalledWith('contact');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    });
  });

  it('opens social media links in new tabs', () => {
    render(<Hero />);
    
    const linkedinLink = screen.getByLabelText('Visit my LinkedIn profile (opens in new tab)');
    const githubLink = screen.getByLabelText('Visit my GitHub profile (opens in new tab)');
    
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has correct URLs for social media links', () => {
    render(<Hero />);
    
    const linkedinLink = screen.getByLabelText('Visit my LinkedIn profile (opens in new tab)');
    const githubLink = screen.getByLabelText('Visit my GitHub profile (opens in new tab)');
    
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/daisyauma');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/daisyauma');
  });

  it('renders scroll indicator for desktop', () => {
    render(<Hero />);
    
    const scrollButton = screen.getByLabelText('Scroll to skills section');
    expect(scrollButton).toBeInTheDocument();
  });

  it('scrolls to skills when scroll indicator is clicked', async () => {
    render(<Hero />);
    
    const scrollButton = screen.getByLabelText('Scroll to skills section');
    await user.click(scrollButton);
    
    expect(document.getElementById).toHaveBeenCalledWith('skills');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('displays "Connect with me" section header', () => {
    render(<Hero />);
    
    expect(screen.getByText('Connect with me')).toBeInTheDocument();
  });

  it('renders gradient background section', () => {
    render(<Hero />);
    
    const section = screen.getByRole('region', { hidden: true }) || 
                   document.querySelector('section');
    
    expect(section).toHaveClass('bg-gradient-to-br', 'from-blue-50', 'to-purple-50');
  });

  it('has responsive text classes', () => {
    render(<Hero />);
    
    const mainHeading = screen.getByText('Daisy Auma');
    const subHeading = screen.getByText('Developer Relations Engineer & Technical Writer');
    
    expect(mainHeading.closest('h1')).toHaveClass('text-responsive-2xl');
    expect(subHeading.closest('h2')).toHaveClass('text-responsive-lg');
  });
});