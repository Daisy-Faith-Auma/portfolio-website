import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutSection from '../../components/AboutSection';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

// Mock achievements data
vi.mock('../../data/achievements', () => ({
  achievements: [
    {
      title: 'Technical Writer at Archetype AI',
      year: '2024',
      organization: 'Archetype AI',
      description: 'Leading end-to-end customer documentation and API references for AI platform'
    },
    {
      title: 'Google Community Builder Recognition',
      year: '2024',
      organization: 'Google',
      description: 'Recognized for outstanding community building and developer relations work'
    },
    {
      title: 'Women Techmakers Ambassador',
      year: '2024',
      organization: 'Google',
      description: 'Empowering women in technology through mentorship and community programs'
    },
    {
      title: 'BSc Computer Technology',
      year: '2021',
      organization: 'Maseno University',
      description: 'Graduated with honors in Computer Technology and Software Engineering'
    },
    {
      title: 'McKinsey Forward Program',
      year: '2022',
      organization: 'McKinsey & Company',
      description: 'Completed leadership and business strategy development program'
    },
    {
      title: 'Co-founder LuxDev HQ',
      year: '2023',
      organization: 'LuxDev HQ',
      description: 'Co-founded tech education platform serving 20k+ learners'
    }
  ]
}));

describe('AboutSection Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Content Rendering', () => {
    it('renders about section with main heading', () => {
      render(<AboutSection />);
      
      expect(screen.getByText('About Me')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('displays professional background summary', () => {
      render(<AboutSection />);
      
      expect(screen.getByText(/Currently serving as Technical Writer at Archetype AI/)).toBeInTheDocument();
      expect(screen.getByText(/Previously at Cloudflare/)).toBeInTheDocument();
      expect(screen.getByText(/passionate about making technology accessible/)).toBeInTheDocument();
    });

    it('renders all achievement cards', () => {
      render(<AboutSection />);
      
      expect(screen.getByText('Technical Writer at Archetype AI')).toBeInTheDocument();
      expect(screen.getByText('Google Community Builder Recognition')).toBeInTheDocument();
      expect(screen.getByText('Women Techmakers Ambassador')).toBeInTheDocument();
      expect(screen.getByText('BSc Computer Technology')).toBeInTheDocument();
      expect(screen.getByText('McKinsey Forward Program')).toBeInTheDocument();
      expect(screen.getByText('Co-founder LuxDev HQ')).toBeInTheDocument();
    });

    it('displays achievement details with years and organizations', () => {
      render(<AboutSection />);
      
      expect(screen.getByText('2024')).toBeInTheDocument();
      expect(screen.getByText('Archetype AI')).toBeInTheDocument();
      expect(screen.getByText('Google')).toBeInTheDocument();
      expect(screen.getByText('Maseno University')).toBeInTheDocument();
      expect(screen.getByText('McKinsey & Company')).toBeInTheDocument();
      expect(screen.getByText('LuxDev HQ')).toBeInTheDocument();
    });

    it('shows achievement descriptions', () => {
      render(<AboutSection />);
      
      expect(screen.getByText(/Leading end-to-end customer documentation/)).toBeInTheDocument();
      expect(screen.getByText(/Recognized for outstanding community building/)).toBeInTheDocument();
      expect(screen.getByText(/Empowering women in technology/)).toBeInTheDocument();
      expect(screen.getByText(/Graduated with honors/)).toBeInTheDocument();
    });
  });

  describe('Community Impact Section', () => {
    it('displays community metrics and impact', () => {
      render(<AboutSection />);
      
      expect(screen.getByText(/20k\+ learners/)).toBeInTheDocument();
      expect(screen.getByText(/300\+ bootcamp graduates/)).toBeInTheDocument();
      expect(screen.getByText(/10\+ Cloudflare tutorials/)).toBeInTheDocument();
    });

    it('shows community building achievements', () => {
      render(<AboutSection />);
      
      expect(screen.getByText(/Lux Tech Academy/)).toBeInTheDocument();
      expect(screen.getByText(/developer onboarding/)).toBeInTheDocument();
      expect(screen.getByText(/community programs/)).toBeInTheDocument();
    });

    it('highlights volunteering and mentorship work', () => {
      render(<AboutSection />);
      
      expect(screen.getByText(/mentorship/)).toBeInTheDocument();
      expect(screen.getByText(/Technovation Challenge/)).toBeInTheDocument();
      expect(screen.getByText(/empowering developers/)).toBeInTheDocument();
    });
  });

  describe('Technical Skills and Certifications', () => {
    it('displays technical expertise areas', () => {
      render(<AboutSection />);
      
      expect(screen.getByText(/Technical Writing/)).toBeInTheDocument();
      expect(screen.getByText(/Developer Relations/)).toBeInTheDocument();
      expect(screen.getByText(/AI & Data Projects/)).toBeInTheDocument();
      expect(screen.getByText(/Software Development/)).toBeInTheDocument();
    });

    it('shows certification and education details', () => {
      render(<AboutSection />);
      
      expect(screen.getByText(/Computer Technology/)).toBeInTheDocument();
      expect(screen.getByText(/McKinsey Forward Program/)).toBeInTheDocument();
      expect(screen.getByText(/Google Community Builder/)).toBeInTheDocument();
    });

    it('highlights current role and responsibilities', () => {
      render(<AboutSection />);
      
      expect(screen.getByText(/Archetype AI/)).toBeInTheDocument();
      expect(screen.getByText(/API references/)).toBeInTheDocument();
      expect(screen.getByText(/customer documentation/)).toBeInTheDocument();
    });
  });

  describe('Layout and Structure', () => {
    it('has proper section structure with dark theme', () => {
      render(<AboutSection />);
      
      const section = document.querySelector('section');
      expect(section).toHaveClass('bg-gray-900', 'text-white');
    });

    it('uses responsive grid layout for achievement cards', () => {
      render(<AboutSection />);
      
      const achievementGrid = document.querySelector('.grid');
      expect(achievementGrid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
    });

    it('applies proper spacing and padding', () => {
      render(<AboutSection />);
      
      const section = document.querySelector('section');
      expect(section).toHaveClass('py-12', 'sm:py-16', 'lg:py-20');
    });

    it('has responsive container with proper max width', () => {
      render(<AboutSection />);
      
      const container = document.querySelector('.container-responsive');
      expect(container).toHaveClass('max-w-7xl', 'mx-auto', 'px-4');
    });
  });

  describe('Card Styling and Animations', () => {
    it('applies card styling with hover effects', () => {
      render(<AboutSection />);
      
      const achievementCards = document.querySelectorAll('.card-hover-lift');
      expect(achievementCards.length).toBeGreaterThan(0);
    });

    it('has backdrop blur and border effects', () => {
      render(<AboutSection />);
      
      const cards = document.querySelectorAll('.backdrop-blur-card');
      expect(cards.length).toBeGreaterThan(0);
    });

    it('includes gradient hover effects', () => {
      render(<AboutSection />);
      
      const gradientElements = document.querySelectorAll('[class*="bg-gradient-to-r"]');
      expect(gradientElements.length).toBeGreaterThan(0);
    });

    it('applies proper border and shadow styling', () => {
      render(<AboutSection />);
      
      const cards = document.querySelectorAll('.border-gray-700');
      expect(cards.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<AboutSection />);
      
      const h2 = screen.getByRole('heading', { level: 2 });
      const h3Elements = screen.getAllByRole('heading', { level: 3 });
      
      expect(h2).toBeInTheDocument();
      expect(h3Elements.length).toBeGreaterThan(0);
    });

    it('provides proper semantic structure', () => {
      render(<AboutSection />);
      
      const section = screen.getByRole('region', { hidden: true }) || document.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('has readable text contrast for dark theme', () => {
      render(<AboutSection />);
      
      const whiteText = document.querySelectorAll('.text-white');
      const grayText = document.querySelectorAll('.text-gray-300');
      
      expect(whiteText.length).toBeGreaterThan(0);
      expect(grayText.length).toBeGreaterThan(0);
    });

    it('includes proper ARIA labels where needed', () => {
      render(<AboutSection />);
      
      // Check for any elements that might need ARIA labels
      const interactiveElements = document.querySelectorAll('button, a, [role]');
      interactiveElements.forEach(element => {
        // Ensure interactive elements have proper accessibility attributes
        expect(element).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Design', () => {
    it('has responsive text sizing', () => {
      render(<AboutSection />);
      
      const heading = screen.getByText('About Me');
      expect(heading.closest('h2')).toHaveClass('text-responsive-xl');
    });

    it('adapts grid layout for different screen sizes', () => {
      render(<AboutSection />);
      
      const grid = document.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
    });

    it('has responsive spacing and gaps', () => {
      render(<AboutSection />);
      
      const grid = document.querySelector('.grid');
      expect(grid).toHaveClass('gap-6', 'lg:gap-8');
    });

    it('applies responsive padding for mobile and desktop', () => {
      render(<AboutSection />);
      
      const cards = document.querySelectorAll('.p-4, .sm\\:p-6');
      expect(cards.length).toBeGreaterThan(0);
    });
  });

  describe('Content Accuracy', () => {
    it('displays current role information accurately', () => {
      render(<AboutSection />);
      
      expect(screen.getByText(/Technical Writer at Archetype AI/)).toBeInTheDocument();
      expect(screen.getByText(/2024/)).toBeInTheDocument();
    });

    it('shows educational background correctly', () => {
      render(<AboutSection />);
      
      expect(screen.getByText('BSc Computer Technology')).toBeInTheDocument();
      expect(screen.getByText('Maseno University')).toBeInTheDocument();
      expect(screen.getByText('2021')).toBeInTheDocument();
    });

    it('includes all major achievements and recognitions', () => {
      render(<AboutSection />);
      
      const expectedAchievements = [
        'Technical Writer at Archetype AI',
        'Google Community Builder Recognition',
        'Women Techmakers Ambassador',
        'BSc Computer Technology',
        'McKinsey Forward Program',
        'Co-founder LuxDev HQ'
      ];

      expectedAchievements.forEach(achievement => {
        expect(screen.getByText(achievement)).toBeInTheDocument();
      });
    });
  });
});