import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactSection from '../../components/ContactSection';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    h4: ({ children, ...props }: any) => <h4 {...props}>{children}</h4>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
}));

// Mock contact data
vi.mock('../../data/contact', () => ({
  contactLinks: [
    // Personal Links
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
      platform: 'TikTok',
      url: 'https://tiktok.com/@daisyauma',
      icon: 'Music',
      category: 'personal'
    },
    {
      platform: 'Substack',
      url: 'https://daisyauma.substack.com',
      icon: 'Mail',
      category: 'personal'
    },
    {
      platform: 'Dev.to',
      url: 'https://dev.to/daisyauma',
      icon: 'Code',
      category: 'personal'
    },
    {
      platform: 'Twitter/X',
      url: 'https://twitter.com/daisyauma',
      icon: 'Twitter',
      category: 'personal'
    },
    // Professional Links
    {
      platform: 'Lux Academy LinkedIn',
      url: 'https://linkedin.com/company/lux-tech-academy',
      icon: 'Building',
      category: 'professional'
    },
    {
      platform: 'Lux Academy Twitter',
      url: 'https://twitter.com/luxtechacademy',
      icon: 'Building2',
      category: 'professional'
    },
    {
      platform: 'Portfolio',
      url: 'https://daisyauma.dev',
      icon: 'Globe',
      category: 'professional'
    }
  ]
}));

describe('ContactSection Component', () => {
  const user = userEvent.setup();

  it('renders section header and description', () => {
    render(<ContactSection />);
    
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText(/Ready to collaborate\? Let's connect/)).toBeInTheDocument();
  });

  it('renders personal and professional section headers', () => {
    render(<ContactSection />);
    
    expect(screen.getByText('Personal')).toBeInTheDocument();
    expect(screen.getByText('Professional')).toBeInTheDocument();
  });

  it('renders all personal contact links', () => {
    render(<ContactSection />);
    
    expect(screen.getByLabelText('Visit my LinkedIn profile (opens in new tab)')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit my GitHub profile (opens in new tab)')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit my YouTube profile (opens in new tab)')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit my TikTok profile (opens in new tab)')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit my Substack profile (opens in new tab)')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit my Dev.to profile (opens in new tab)')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit my Twitter/X profile (opens in new tab)')).toBeInTheDocument();
  });

  it('renders all professional contact links', () => {
    render(<ContactSection />);
    
    expect(screen.getByLabelText('Visit Lux Academy LinkedIn (opens in new tab)')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit Lux Academy Twitter (opens in new tab)')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit Portfolio (opens in new tab)')).toBeInTheDocument();
  });

  it('opens all links in new tabs with proper security attributes', () => {
    render(<ContactSection />);
    
    const linkedinLink = screen.getByLabelText('Visit my LinkedIn profile (opens in new tab)');
    const githubLink = screen.getByLabelText('Visit my GitHub profile (opens in new tab)');
    
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has correct URLs for personal links', () => {
    render(<ContactSection />);
    
    const linkedinLink = screen.getByLabelText('Visit my LinkedIn profile (opens in new tab)');
    const githubLink = screen.getByLabelText('Visit my GitHub profile (opens in new tab)');
    const youtubeLink = screen.getByLabelText('Visit my YouTube profile (opens in new tab)');
    
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/daisyauma');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/daisyauma');
    expect(youtubeLink).toHaveAttribute('href', 'https://youtube.com/@daisyauma');
  });

  it('has correct URLs for professional links', () => {
    render(<ContactSection />);
    
    const luxLinkedinLink = screen.getByLabelText('Visit Lux Academy LinkedIn (opens in new tab)');
    const luxTwitterLink = screen.getByLabelText('Visit Lux Academy Twitter (opens in new tab)');
    const portfolioLink = screen.getByLabelText('Visit Portfolio (opens in new tab)');
    
    expect(luxLinkedinLink).toHaveAttribute('href', 'https://linkedin.com/company/lux-tech-academy');
    expect(luxTwitterLink).toHaveAttribute('href', 'https://twitter.com/luxtechacademy');
    expect(portfolioLink).toHaveAttribute('href', 'https://daisyauma.dev');
  });

  it('renders professional email contact section', () => {
    render(<ContactSection />);
    
    expect(screen.getByText('Professional Inquiries')).toBeInTheDocument();
    expect(screen.getByText(/For business opportunities, collaborations/)).toBeInTheDocument();
    expect(screen.getByLabelText('Send email to daisy@luxtechacademy.com')).toBeInTheDocument();
  });

  it('renders call to action section', () => {
    render(<ContactSection />);
    
    expect(screen.getByText('Let\'s Build Something Amazing Together')).toBeInTheDocument();
    expect(screen.getByText(/Whether you're looking for technical writing/)).toBeInTheDocument();
  });

  it('renders CTA buttons with correct links', () => {
    render(<ContactSection />);
    
    const linkedinCTA = screen.getByLabelText('Connect with me on LinkedIn (opens in new tab)');
    const emailCTAs = screen.getAllByLabelText(/Send.*email.*daisy@luxtechacademy.com/);
    
    expect(linkedinCTA).toHaveAttribute('href', 'https://linkedin.com/in/daisyauma');
    expect(emailCTAs[0]).toHaveAttribute('href', 'mailto:daisy@luxtechacademy.com');
  });

  it('displays platform descriptions for personal links', () => {
    render(<ContactSection />);
    
    expect(screen.getByText('Professional networking & career updates')).toBeInTheDocument();
    expect(screen.getByText('Open source projects & code repositories')).toBeInTheDocument();
    expect(screen.getByText('Technical tutorials & developer content')).toBeInTheDocument();
    expect(screen.getByText('Quick tech tips & coding insights')).toBeInTheDocument();
    expect(screen.getByText('In-depth technical articles & newsletters')).toBeInTheDocument();
    expect(screen.getByText('Developer community & technical blog posts')).toBeInTheDocument();
    expect(screen.getByText('Tech discussions & industry insights')).toBeInTheDocument();
  });

  it('displays platform descriptions for professional links', () => {
    render(<ContactSection />);
    
    expect(screen.getByText('Educational organization & community updates')).toBeInTheDocument();
    expect(screen.getByText('Academy news & educational content')).toBeInTheDocument();
    expect(screen.getByText('Complete portfolio & project showcase')).toBeInTheDocument();
  });

  it('has proper section background styling', () => {
    render(<ContactSection />);
    
    const section = document.querySelector('section');
    expect(section).toHaveClass('bg-gray-50');
  });

  it('has responsive text classes', () => {
    render(<ContactSection />);
    
    const mainHeading = screen.getByText('Get In Touch');
    const sectionHeadings = screen.getAllByText('Personal')[0];
    
    expect(mainHeading.closest('h2')).toHaveClass('text-responsive-xl');
    expect(sectionHeadings.closest('h3')).toHaveClass('text-responsive-md');
  });

  it('renders email links with mailto protocol', () => {
    render(<ContactSection />);
    
    const emailButtons = screen.getAllByLabelText('Send email to daisy@luxtechacademy.com');
    
    emailButtons.forEach(button => {
      expect(button).toHaveAttribute('href', 'mailto:daisy@luxtechacademy.com');
    });
  });

  it('has proper grid layout classes', () => {
    render(<ContactSection />);
    
    const gridContainer = document.querySelector('.grid');
    expect(gridContainer).toHaveClass('lg:grid-cols-2');
  });
});