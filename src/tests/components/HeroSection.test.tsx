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
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}));

// Mock contact links data
vi.mock('../../data/contactLinks', () => ({
  contactLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/daisyauma',
      icon: 'Github',
      color: 'hover:text-gray-400'
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/daisyauma',
      icon: 'Linkedin',
      color: 'hover:text-blue-500'
    },
    {
      platform: 'Twitter/X',
      url: 'https://twitter.com/daisyauma',
      icon: 'Twitter',
      color: 'hover:text-blue-400'
    },
    {
      platform: 'Email',
      url: 'mailto:daisy@daisyauma.dev',
      icon: 'Mail',
      color: 'hover:text-green-500'
    }
  ]
}));

describe('HeroSection Component', () => {
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

  describe('Content Rendering', () => {
    it('renders hero section with main heading and current role', () => {
      render(<Hero />);
      
      expect(screen.getByText('Hi, I\'m')).toBeInTheDocument();
      expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
      expect(screen.getByText('Technical Writer at Archetype AI')).toBeInTheDocument();
    });

    it('displays professional summary and value proposition', () => {
      render(<Hero />);
      
      expect(screen.getByText(/I bridge the gap between complex technology/)).toBeInTheDocument();
      expect(screen.getByText(/From AI projects to community building/)).toBeInTheDocument();
    });

    it('renders gradient text for name with proper styling', () => {
      render(<Hero />);
      
      const nameElement = screen.getByText('Daisy Auma');
      expect(nameElement).toHaveClass('gradient-text-brand');
    });

    it('displays current role with Archetype AI and Cloudflare mentions', () => {
      render(<Hero />);
      
      expect(screen.getByText(/Technical Writer at Archetype AI/)).toBeInTheDocument();
      expect(screen.getByText(/previously at Cloudflare/)).toBeInTheDocument();
    });
  });

  describe('Social Media Links', () => {
    it('renders all social media quick access links', () => {
      render(<Hero />);
      
      expect(screen.getByLabelText('Visit my GitHub profile (opens in new tab)')).toBeInTheDocument();
      expect(screen.getByLabelText('Visit my LinkedIn profile (opens in new tab)')).toBeInTheDocument();
      expect(screen.getByLabelText('Visit my Twitter/X profile (opens in new tab)')).toBeInTheDocument();
      expect(screen.getByLabelText('Visit my Email profile (opens in new tab)')).toBeInTheDocument();
    });

    it('opens social media links in new tabs with proper security attributes', () => {
      render(<Hero />);
      
      const githubLink = screen.getByLabelText('Visit my GitHub profile (opens in new tab)');
      const linkedinLink = screen.getByLabelText('Visit my LinkedIn profile (opens in new tab)');
      
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('has correct URLs for all social platforms', () => {
      render(<Hero />);
      
      expect(screen.getByLabelText('Visit my GitHub profile (opens in new tab)'))
        .toHaveAttribute('href', 'https://github.com/daisyauma');
      expect(screen.getByLabelText('Visit my LinkedIn profile (opens in new tab)'))
        .toHaveAttribute('href', 'https://linkedin.com/in/daisyauma');
      expect(screen.getByLabelText('Visit my Twitter/X profile (opens in new tab)'))
        .toHaveAttribute('href', 'https://twitter.com/daisyauma');
      expect(screen.getByLabelText('Visit my Email profile (opens in new tab)'))
        .toHaveAttribute('href', 'mailto:daisy@daisyauma.dev');
    });

    it('applies platform-specific hover colors', () => {
      render(<Hero />);
      
      const githubLink = screen.getByLabelText('Visit my GitHub profile (opens in new tab)');
      const linkedinLink = screen.getByLabelText('Visit my LinkedIn profile (opens in new tab)');
      
      expect(githubLink).toHaveClass('hover:text-gray-400');
      expect(linkedinLink).toHaveClass('hover:text-blue-500');
    });
  });

  describe('Call-to-Action Buttons', () => {
    it('renders both CTA buttons with proper labels', () => {
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

    it('applies proper button styling classes', () => {
      render(<Hero />);
      
      const exploreButton = screen.getByText('Explore My Work');
      const contactButton = screen.getByText('Get In Touch');
      
      expect(exploreButton).toHaveClass('btn-brand');
      expect(contactButton).toHaveClass('btn-brand-outline');
    });
  });

  describe('Scroll Indicator', () => {
    it('renders scroll indicator for desktop with proper accessibility', () => {
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

    it('has animated chevron down indicator', () => {
      render(<Hero />);
      
      const scrollButton = screen.getByLabelText('Scroll to skills section');
      expect(scrollButton.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Background and Visual Effects', () => {
    it('renders with dark gradient background', () => {
      render(<Hero />);
      
      const section = screen.getByRole('region', { name: 'Hero section' });
      expect(section).toHaveClass('bg-gradient-to-br', 'from-gray-900', 'via-gray-800', 'to-purple-900');
    });

    it('includes animated background elements', () => {
      render(<Hero />);
      
      const backgroundElements = document.querySelectorAll('.absolute');
      expect(backgroundElements.length).toBeGreaterThan(0);
    });

    it('has proper section structure with overflow hidden', () => {
      render(<Hero />);
      
      const section = screen.getByRole('region', { name: 'Hero section' });
      expect(section).toHaveClass('min-h-screen', 'overflow-hidden');
    });
  });

  describe('Responsive Design', () => {
    it('has responsive text classes for different screen sizes', () => {
      render(<Hero />);
      
      const mainHeading = screen.getByText('Daisy Auma').closest('h1');
      const subHeading = screen.getByText(/Technical Writer at Archetype AI/).closest('h2');
      
      expect(mainHeading).toHaveClass('text-responsive-2xl');
      expect(subHeading).toHaveClass('text-responsive-lg');
    });

    it('applies responsive padding and spacing', () => {
      render(<Hero />);
      
      const container = document.querySelector('.container-responsive');
      expect(container).toHaveClass('py-20', 'sm:py-24', 'lg:py-32');
    });

    it('has responsive button layout for mobile and desktop', () => {
      render(<Hero />);
      
      const buttonContainer = screen.getByText('Explore My Work').closest('div');
      expect(buttonContainer).toHaveClass('flex-col', 'xs:flex-row');
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure with headings', () => {
      render(<Hero />);
      
      const h1 = screen.getByRole('heading', { level: 1 });
      const h2 = screen.getByRole('heading', { level: 2 });
      
      expect(h1).toBeInTheDocument();
      expect(h2).toBeInTheDocument();
    });

    it('provides proper ARIA labels for interactive elements', () => {
      render(<Hero />);
      
      const section = screen.getByRole('region', { name: 'Hero section' });
      expect(section).toHaveAttribute('aria-label', 'Hero section');
    });

    it('has proper focus management for keyboard navigation', async () => {
      render(<Hero />);
      
      const exploreButton = screen.getByText('Explore My Work');
      
      exploreButton.focus();
      expect(document.activeElement).toBe(exploreButton);
      
      await user.keyboard('{Enter}');
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    });
  });

  describe('Animation and Interactive Effects', () => {
    it('includes animated call-to-action buttons with hover effects', () => {
      render(<Hero />);
      
      const exploreButton = screen.getByText('Explore My Work');
      const contactButton = screen.getByText('Get In Touch');
      
      expect(exploreButton).toHaveClass('btn-touch');
      expect(contactButton).toHaveClass('btn-touch');
    });

    it('has animated chevron down with proper motion', () => {
      render(<Hero />);
      
      const scrollButton = screen.getByLabelText('Scroll to skills section');
      const chevron = scrollButton.querySelector('svg');
      
      expect(chevron).toBeInTheDocument();
    });

    it('includes social media links with hover animations', () => {
      render(<Hero />);
      
      const socialLinks = screen.getAllByRole('link');
      socialLinks.forEach(link => {
        if (link.getAttribute('target') === '_blank') {
          expect(link).toHaveClass('btn-touch');
        }
      });
    });
  });
});