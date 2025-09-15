import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
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

describe('Contact Links Integration Tests', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    // Mock window.open to track external link clicks
    window.open = vi.fn();
    
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
    
    // Mock getElementById
    document.getElementById = vi.fn((id: string) => {
      const mockElement = document.createElement('div');
      mockElement.id = id;
      return mockElement;
    });
  });

  it('opens all hero section social media links in new tabs', async () => {
    render(<App />);
    
    // Test LinkedIn link in hero
    const heroLinkedInLink = screen.getByLabelText('Visit my LinkedIn profile (opens in new tab)');
    expect(heroLinkedInLink).toHaveAttribute('target', '_blank');
    expect(heroLinkedInLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(heroLinkedInLink).toHaveAttribute('href', 'https://linkedin.com/in/daisyauma');
    
    // Test GitHub link in hero
    const heroGitHubLink = screen.getByLabelText('Visit my GitHub profile (opens in new tab)');
    expect(heroGitHubLink).toHaveAttribute('target', '_blank');
    expect(heroGitHubLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(heroGitHubLink).toHaveAttribute('href', 'https://github.com/daisyauma');
    
    // Test YouTube link in hero
    const heroYouTubeLink = screen.getByLabelText('Visit my YouTube profile (opens in new tab)');
    expect(heroYouTubeLink).toHaveAttribute('target', '_blank');
    expect(heroYouTubeLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(heroYouTubeLink).toHaveAttribute('href', 'https://youtube.com/@daisyauma');
  });

  it('opens all contact section personal links correctly', async () => {
    render(<App />);
    
    // Personal links in contact section
    const personalLinks = [
      { label: 'Visit my LinkedIn profile (opens in new tab)', url: 'https://linkedin.com/in/daisyauma' },
      { label: 'Visit my GitHub profile (opens in new tab)', url: 'https://github.com/daisyauma' },
      { label: 'Visit my YouTube profile (opens in new tab)', url: 'https://youtube.com/@daisyauma' },
      { label: 'Visit my TikTok profile (opens in new tab)', url: 'https://tiktok.com/@daisyauma' },
      { label: 'Visit my Substack profile (opens in new tab)', url: 'https://daisyauma.substack.com' },
      { label: 'Visit my Dev.to profile (opens in new tab)', url: 'https://dev.to/daisyauma' },
      { label: 'Visit my Twitter/X profile (opens in new tab)', url: 'https://twitter.com/daisyauma' }
    ];
    
    personalLinks.forEach(({ label, url }) => {
      const link = screen.getByLabelText(label);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('href', url);
    });
  });

  it('opens all contact section professional links correctly', async () => {
    render(<App />);
    
    // Professional links in contact section
    const professionalLinks = [
      { label: 'Visit Lux Academy LinkedIn (opens in new tab)', url: 'https://linkedin.com/company/lux-tech-academy' },
      { label: 'Visit Lux Academy Twitter (opens in new tab)', url: 'https://twitter.com/luxtechacademy' },
      { label: 'Visit Portfolio (opens in new tab)', url: 'https://daisyauma.dev' }
    ];
    
    professionalLinks.forEach(({ label, url }) => {
      const link = screen.getByLabelText(label);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('href', url);
    });
  });

  it('handles email links correctly', async () => {
    render(<App />);
    
    // Email links should use mailto protocol
    const emailLinks = screen.getAllByLabelText('Send email to daisy@luxtechacademy.com');
    
    emailLinks.forEach(link => {
      expect(link).toHaveAttribute('href', 'mailto:daisy@luxtechacademy.com');
      // Email links don't need target="_blank"
    });
  });

  it('opens footer social media links correctly', async () => {
    render(<App />);
    
    // Footer social media links
    const footerLinkedIn = screen.getByLabelText('LinkedIn');
    const footerGitHub = screen.getByLabelText('GitHub');
    const footerYouTube = screen.getByLabelText('YouTube');
    const footerEmail = screen.getByLabelText('Email');
    
    expect(footerLinkedIn).toHaveAttribute('href', 'https://linkedin.com/in/daisyauma');
    expect(footerLinkedIn).toHaveAttribute('target', '_blank');
    
    expect(footerGitHub).toHaveAttribute('href', 'https://github.com/daisyauma');
    expect(footerGitHub).toHaveAttribute('target', '_blank');
    
    expect(footerYouTube).toHaveAttribute('href', 'https://youtube.com/@daisyauma');
    expect(footerYouTube).toHaveAttribute('target', '_blank');
    
    expect(footerEmail).toHaveAttribute('href', 'mailto:daisy@luxtechacademy.com');
  });

  it('opens footer professional links correctly', async () => {
    render(<App />);
    
    const luxAcademyLink = screen.getByRole('link', { name: 'Lux Tech Academy' });
    const cloudflareLink = screen.getByRole('link', { name: 'Cloudflare' });
    
    expect(luxAcademyLink).toHaveAttribute('href', 'https://luxtechacademy.com');
    expect(luxAcademyLink).toHaveAttribute('target', '_blank');
    expect(luxAcademyLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    expect(cloudflareLink).toHaveAttribute('href', 'https://developers.cloudflare.com');
    expect(cloudflareLink).toHaveAttribute('target', '_blank');
    expect(cloudflareLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('opens contact section CTA links correctly', async () => {
    render(<App />);
    
    const linkedInCTA = screen.getByLabelText('Connect with me on LinkedIn (opens in new tab)');
    const emailCTA = screen.getAllByLabelText('Send email to daisy@luxtechacademy.com')[0];
    
    expect(linkedInCTA).toHaveAttribute('href', 'https://linkedin.com/in/daisyauma');
    expect(linkedInCTA).toHaveAttribute('target', '_blank');
    expect(linkedInCTA).toHaveAttribute('rel', 'noopener noreferrer');
    
    expect(emailCTA).toHaveAttribute('href', 'mailto:daisy@luxtechacademy.com');
  });

  it('handles project links when available', async () => {
    render(<App />);
    
    // Look for project links (these might be in project cards)
    const demoLinks = screen.queryAllByLabelText(/view live demo/i);
    const repoLinks = screen.queryAllByLabelText(/view source code/i);
    const articleLinks = screen.queryAllByLabelText(/read article/i);
    
    // Verify demo links
    demoLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link.getAttribute('href')).toMatch(/^https?:\/\/.+/);
    });
    
    // Verify repo links
    repoLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link.getAttribute('href')).toMatch(/^https?:\/\/.+/);
    });
    
    // Verify article links
    articleLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link.getAttribute('href')).toMatch(/^https?:\/\/.+/);
    });
  });

  it('ensures all external links have security attributes', async () => {
    render(<App />);
    
    // Get all external links (those with target="_blank")
    const externalLinks = Array.from(document.querySelectorAll('a[target="_blank"]'));
    
    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('validates URL formats for all links', async () => {
    render(<App />);
    
    // Get all links
    const allLinks = Array.from(document.querySelectorAll('a[href]'));
    
    allLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        // Should be either HTTP(S) URL or mailto
        expect(href).toMatch(/^(https?:\/\/.+|mailto:.+)$/);
      }
    });
  });

  it('handles link interactions without JavaScript errors', async () => {
    render(<App />);
    
    // Test clicking various links (they won't actually navigate in test environment)
    const testLinks = [
      screen.getByLabelText('Visit my LinkedIn profile (opens in new tab)'),
      screen.getByLabelText('Visit my GitHub profile (opens in new tab)'),
      screen.getAllByLabelText('Send email to daisy@luxtechacademy.com')[0]
    ];
    
    // Click each link - should not throw errors
    for (const link of testLinks) {
      await user.click(link);
      // No assertions needed - just ensuring no errors are thrown
    }
  });
});