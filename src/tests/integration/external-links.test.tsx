import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
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

describe('External Links Verification', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock window.open to track external link clicks
    global.open = vi.fn();
  });

  describe('Social Media Links', () => {
    it('opens GitHub profile in new tab with correct URL', () => {
      render(<App />);
      
      const githubLinks = screen.getAllByLabelText(/GitHub/i);
      expect(githubLinks.length).toBeGreaterThan(0);
      
      const githubLink = githubLinks[0];
      expect(githubLink).toHaveAttribute('href', 'https://github.com/daisyauma');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('opens LinkedIn profile in new tab with correct URL', () => {
      render(<App />);
      
      const linkedinLinks = screen.getAllByLabelText(/LinkedIn/i);
      expect(linkedinLinks.length).toBeGreaterThan(0);
      
      const linkedinLink = linkedinLinks[0];
      expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/daisyauma');
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('opens Twitter/X profile in new tab with correct URL', () => {
      render(<App />);
      
      const twitterLinks = screen.getAllByLabelText(/Twitter|X/i);
      expect(twitterLinks.length).toBeGreaterThan(0);
      
      const twitterLink = twitterLinks[0];
      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/daisyauma');
      expect(twitterLink).toHaveAttribute('target', '_blank');
      expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('opens email client with correct email address', () => {
      render(<App />);
      
      const emailLinks = screen.getAllByLabelText(/Email/i);
      expect(emailLinks.length).toBeGreaterThan(0);
      
      const emailLink = emailLinks[0];
      expect(emailLink).toHaveAttribute('href', 'mailto:daisy@daisyauma.dev');
    });
  });

  describe('Content Platform Links', () => {
    it('opens YouTube channel in new tab', () => {
      render(<App />);
      
      const youtubeLinks = screen.getAllByLabelText(/YouTube/i);
      if (youtubeLinks.length > 0) {
        const youtubeLink = youtubeLinks[0];
        expect(youtubeLink).toHaveAttribute('target', '_blank');
        expect(youtubeLink).toHaveAttribute('rel', 'noopener noreferrer');
        expect(youtubeLink.getAttribute('href')).toContain('youtube.com');
      }
    });

    it('opens TikTok profile in new tab', () => {
      render(<App />);
      
      const tiktokLinks = screen.getAllByLabelText(/TikTok/i);
      if (tiktokLinks.length > 0) {
        const tiktokLink = tiktokLinks[0];
        expect(tiktokLink).toHaveAttribute('target', '_blank');
        expect(tiktokLink).toHaveAttribute('rel', 'noopener noreferrer');
        expect(tiktokLink.getAttribute('href')).toContain('tiktok.com');
      }
    });

    it('opens Medium profile in new tab', () => {
      render(<App />);
      
      const mediumLinks = screen.getAllByLabelText(/Medium/i);
      if (mediumLinks.length > 0) {
        const mediumLink = mediumLinks[0];
        expect(mediumLink).toHaveAttribute('target', '_blank');
        expect(mediumLink).toHaveAttribute('rel', 'noopener noreferrer');
        expect(mediumLink.getAttribute('href')).toContain('medium.com');
      }
    });

    it('opens Substack newsletter in new tab', () => {
      render(<App />);
      
      const substackLinks = screen.getAllByLabelText(/Substack/i);
      if (substackLinks.length > 0) {
        const substackLink = substackLinks[0];
        expect(substackLink).toHaveAttribute('target', '_blank');
        expect(substackLink).toHaveAttribute('rel', 'noopener noreferrer');
        expect(substackLink.getAttribute('href')).toContain('substack.com');
      }
    });

    it('opens Dev.to profile in new tab', () => {
      render(<App />);
      
      const devtoLinks = screen.getAllByLabelText(/Dev\.to/i);
      if (devtoLinks.length > 0) {
        const devtoLink = devtoLinks[0];
        expect(devtoLink).toHaveAttribute('target', '_blank');
        expect(devtoLink).toHaveAttribute('rel', 'noopener noreferrer');
        expect(devtoLink.getAttribute('href')).toContain('dev.to');
      }
    });
  });

  describe('Project Links', () => {
    it('opens project GitHub repositories in new tabs', () => {
      render(<App />);
      
      const githubProjectLinks = screen.getAllByLabelText(/source code on GitHub/i);
      
      githubProjectLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        expect(link.getAttribute('href')).toContain('github.com');
      });
    });

    it('opens project live demos in new tabs', () => {
      render(<App />);
      
      const liveDemoLinks = screen.getAllByLabelText(/live demo/i);
      
      liveDemoLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        expect(link).toHaveAttribute('href');
      });
    });

    it('has correct URLs for featured projects', () => {
      render(<App />);
      
      // Check for specific project links
      const archetypeLinks = screen.getAllByLabelText(/Archetype AI/i);
      const cloudflareLinks = screen.getAllByLabelText(/Cloudflare/i);
      
      if (archetypeLinks.length > 0) {
        const archetypeLink = archetypeLinks[0];
        expect(archetypeLink.getAttribute('href')).toMatch(/archetype|docs\.archetype\.ai/);
      }
      
      if (cloudflareLinks.length > 0) {
        const cloudflareLink = cloudflareLinks[0];
        expect(cloudflareLink.getAttribute('href')).toMatch(/cloudflare|developers\.cloudflare\.com/);
      }
    });
  });

  describe('Link Security and Accessibility', () => {
    it('all external links have proper security attributes', () => {
      render(<App />);
      
      const externalLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('target') === '_blank'
      );
      
      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('all links have proper accessibility labels', () => {
      render(<App />);
      
      const allLinks = screen.getAllByRole('link');
      
      allLinks.forEach(link => {
        // Each link should have either aria-label or descriptive text content
        const hasAriaLabel = link.hasAttribute('aria-label');
        const hasTextContent = link.textContent && link.textContent.trim().length > 0;
        
        expect(hasAriaLabel || hasTextContent).toBe(true);
      });
    });

    it('email links do not open in new tabs', () => {
      render(<App />);
      
      const emailLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href')?.startsWith('mailto:')
      );
      
      emailLinks.forEach(link => {
        expect(link).not.toHaveAttribute('target', '_blank');
      });
    });

    it('internal navigation links do not open in new tabs', () => {
      render(<App />);
      
      const internalLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href')?.startsWith('#')
      );
      
      internalLinks.forEach(link => {
        expect(link).not.toHaveAttribute('target', '_blank');
      });
    });
  });

  describe('Link Interaction and Keyboard Support', () => {
    it('supports keyboard navigation for all links', async () => {
      render(<App />);
      
      const firstLink = screen.getAllByRole('link')[0];
      
      if (firstLink) {
        firstLink.focus();
        expect(document.activeElement).toBe(firstLink);
        
        await user.keyboard('{Enter}');
        
        // Link should be activated (no errors thrown)
        expect(firstLink).toBeInTheDocument();
      }
    });

    it('provides visual feedback on hover and focus', () => {
      render(<App />);
      
      const socialLinks = screen.getAllByLabelText(/GitHub|LinkedIn|Twitter|Email/i);
      
      socialLinks.forEach(link => {
        // Should have hover/focus styling classes
        const hasHoverClasses = link.className.includes('hover:') || 
                               link.className.includes('focus:') ||
                               link.className.includes('btn-touch');
        
        expect(hasHoverClasses).toBe(true);
      });
    });

    it('handles rapid link clicks without issues', async () => {
      render(<App />);
      
      const githubLinks = screen.getAllByLabelText(/GitHub/i);
      
      if (githubLinks.length > 0) {
        const githubLink = githubLinks[0];
        
        // Rapid clicks should not cause errors
        await user.click(githubLink);
        await user.click(githubLink);
        await user.click(githubLink);
        
        expect(githubLink).toBeInTheDocument();
      }
    });
  });

  describe('Platform-Specific Link Validation', () => {
    it('validates GitHub profile URL format', () => {
      render(<App />);
      
      const githubLinks = screen.getAllByLabelText(/GitHub/i);
      
      githubLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('github.com')) {
          expect(href).toMatch(/^https:\/\/github\.com\/[\w-]+/);
        }
      });
    });

    it('validates LinkedIn profile URL format', () => {
      render(<App />);
      
      const linkedinLinks = screen.getAllByLabelText(/LinkedIn/i);
      
      linkedinLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('linkedin.com')) {
          expect(href).toMatch(/^https:\/\/linkedin\.com\/in\/[\w-]+/);
        }
      });
    });

    it('validates email address format', () => {
      render(<App />);
      
      const emailLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href')?.startsWith('mailto:')
      );
      
      emailLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
          const email = href.replace('mailto:', '');
          expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        }
      });
    });
  });

  describe('Error Handling for Broken Links', () => {
    it('handles missing href attributes gracefully', () => {
      render(<App />);
      
      const allLinks = screen.getAllByRole('link');
      
      allLinks.forEach(link => {
        // All links should have href attribute
        expect(link).toHaveAttribute('href');
        
        const href = link.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href).not.toBe('');
      });
    });

    it('provides fallback for missing social media links', () => {
      render(<App />);
      
      // Even if some social media links are missing, the component should render
      expect(screen.getByText('Daisy Auma')).toBeInTheDocument();
    });

    it('handles network errors gracefully', async () => {
      render(<App />);
      
      const externalLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('target') === '_blank'
      );
      
      // Clicking external links should not cause JavaScript errors
      if (externalLinks.length > 0) {
        await user.click(externalLinks[0]);
        expect(externalLinks[0]).toBeInTheDocument();
      }
    });
  });
});