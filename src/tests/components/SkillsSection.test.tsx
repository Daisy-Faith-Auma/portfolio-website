import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import SkillsSection from '../../components/SkillsSection';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

// Mock SkillBar component
vi.mock('../../components/SkillBar', () => ({
  default: ({ skill, delay }: { skill: any; delay: number }) => (
    <div data-testid="skill-bar" data-delay={delay}>
      <h3>{skill.name}</h3>
      <div data-testid="skill-level">{skill.level}%</div>
      <p>{skill.description}</p>
      <div data-testid="skill-color" className={skill.color}></div>
    </div>
  )
}));

// Mock skills data
vi.mock('../../data/skills', () => ({
  skills: [
    {
      name: 'Technical Writing & Documentation',
      icon: 'FileText',
      level: 95,
      color: 'from-blue-500 to-purple-600',
      description: 'Creating comprehensive documentation for Archetype AI and Cloudflare, including API references, setup guides, and developer tutorials.'
    },
    {
      name: 'Developer Relations & Community',
      icon: 'Users',
      level: 98,
      color: 'from-green-500 to-blue-600',
      description: 'Scaled Lux Tech Academy to 20k+ learners, Google Community Builder Recognition, WTM Ambassador, DevRel at Kudan.'
    },
    {
      name: 'AI & Data Projects',
      icon: 'Brain',
      level: 88,
      color: 'from-purple-500 to-pink-600',
      description: 'ML models for F1 predictions, Spotify data visualization, music mood analysis. Python & ML, AI certificate.'
    },
    {
      name: 'Software & Systems Development',
      icon: 'Code',
      level: 92,
      color: 'from-orange-500 to-red-600',
      description: 'C++, Python, ROS, SLAM systems. MPESA Daraja API for 10k+ users. Android development certified, Robotics & AMR kits.'
    },
    {
      name: 'Content Creation & Education',
      icon: 'Video',
      level: 85,
      color: 'from-cyan-500 to-blue-600',
      description: 'YouTube & TikTok AI explainers, technical articles on Medium, Substack & Dev.to. 8 Twitter Spaces, 600+ listeners.'
    },
    {
      name: 'Leadership & Mentorship',
      icon: 'Award',
      level: 94,
      color: 'from-yellow-500 to-orange-600',
      description: 'Led 300+ bootcamp graduates, Co-founder LuxDev HQ. McKinsey Forward Program, Technovation Challenge mentor.'
    }
  ]
}));

describe('SkillsSection Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Content Rendering', () => {
    it('renders skills section with main heading', () => {
      render(<SkillsSection />);
      
      expect(screen.getByText('Skills & Expertise')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('displays section description', () => {
      render(<SkillsSection />);
      
      expect(screen.getByText(/comprehensive skill set spanning technical writing/)).toBeInTheDocument();
      expect(screen.getByText(/developer relations, AI projects, and community building/)).toBeInTheDocument();
    });

    it('renders all six skill categories', () => {
      render(<SkillsSection />);
      
      expect(screen.getByText('Technical Writing & Documentation')).toBeInTheDocument();
      expect(screen.getByText('Developer Relations & Community')).toBeInTheDocument();
      expect(screen.getByText('AI & Data Projects')).toBeInTheDocument();
      expect(screen.getByText('Software & Systems Development')).toBeInTheDocument();
      expect(screen.getByText('Content Creation & Education')).toBeInTheDocument();
      expect(screen.getByText('Leadership & Mentorship')).toBeInTheDocument();
    });

    it('displays correct skill levels as percentages', () => {
      render(<SkillsSection />);
      
      expect(screen.getByText('95%')).toBeInTheDocument(); // Technical Writing
      expect(screen.getByText('98%')).toBeInTheDocument(); // Developer Relations
      expect(screen.getByText('88%')).toBeInTheDocument(); // AI & Data
      expect(screen.getByText('92%')).toBeInTheDocument(); // Software Development
      expect(screen.getByText('85%')).toBeInTheDocument(); // Content Creation
      expect(screen.getByText('94%')).toBeInTheDocument(); // Leadership
    });

    it('shows detailed skill descriptions', () => {
      render(<SkillsSection />);
      
      expect(screen.getByText(/Creating comprehensive documentation for Archetype AI and Cloudflare/)).toBeInTheDocument();
      expect(screen.getByText(/Scaled Lux Tech Academy to 20k\+ learners/)).toBeInTheDocument();
      expect(screen.getByText(/ML models for F1 predictions/)).toBeInTheDocument();
      expect(screen.getByText(/C\+\+, Python, ROS, SLAM systems/)).toBeInTheDocument();
      expect(screen.getByText(/YouTube & TikTok AI explainers/)).toBeInTheDocument();
      expect(screen.getByText(/Led 300\+ bootcamp graduates/)).toBeInTheDocument();
    });
  });

  describe('SkillBar Components', () => {
    it('renders SkillBar component for each skill', () => {
      render(<SkillsSection />);
      
      const skillBars = screen.getAllByTestId('skill-bar');
      expect(skillBars).toHaveLength(6);
    });

    it('passes correct delay values for staggered animations', () => {
      render(<SkillsSection />);
      
      const skillBars = screen.getAllByTestId('skill-bar');
      
      expect(skillBars[0]).toHaveAttribute('data-delay', '0');
      expect(skillBars[1]).toHaveAttribute('data-delay', '200');
      expect(skillBars[2]).toHaveAttribute('data-delay', '400');
      expect(skillBars[3]).toHaveAttribute('data-delay', '600');
      expect(skillBars[4]).toHaveAttribute('data-delay', '800');
      expect(skillBars[5]).toHaveAttribute('data-delay', '1000');
    });

    it('passes correct skill data to SkillBar components', () => {
      render(<SkillsSection />);
      
      // Check that skill data is passed correctly
      expect(screen.getByText('Technical Writing & Documentation')).toBeInTheDocument();
      expect(screen.getByText('95%')).toBeInTheDocument();
      
      expect(screen.getByText('Developer Relations & Community')).toBeInTheDocument();
      expect(screen.getByText('98%')).toBeInTheDocument();
    });

    it('applies correct gradient colors for each skill', () => {
      render(<SkillsSection />);
      
      const colorElements = screen.getAllByTestId('skill-color');
      
      expect(colorElements[0]).toHaveClass('from-blue-500', 'to-purple-600');
      expect(colorElements[1]).toHaveClass('from-green-500', 'to-blue-600');
      expect(colorElements[2]).toHaveClass('from-purple-500', 'to-pink-600');
      expect(colorElements[3]).toHaveClass('from-orange-500', 'to-red-600');
      expect(colorElements[4]).toHaveClass('from-cyan-500', 'to-blue-600');
      expect(colorElements[5]).toHaveClass('from-yellow-500', 'to-orange-600');
    });
  });

  describe('Layout and Structure', () => {
    it('has proper section structure with dark theme', () => {
      render(<SkillsSection />);
      
      const section = document.querySelector('section');
      expect(section).toHaveClass('bg-gray-800', 'text-white');
    });

    it('uses responsive grid layout for skill bars', () => {
      render(<SkillsSection />);
      
      const skillGrid = document.querySelector('.grid');
      expect(skillGrid).toHaveClass('grid-cols-1', 'lg:grid-cols-2');
    });

    it('applies proper spacing and padding', () => {
      render(<SkillsSection />);
      
      const section = document.querySelector('section');
      expect(section).toHaveClass('py-12', 'sm:py-16', 'lg:py-20');
    });

    it('has responsive container with proper max width', () => {
      render(<SkillsSection />);
      
      const container = document.querySelector('.container-responsive');
      expect(container).toHaveClass('max-w-7xl', 'mx-auto', 'px-4');
    });

    it('sets correct section id for navigation', () => {
      render(<SkillsSection />);
      
      const section = document.querySelector('section');
      expect(section).toHaveAttribute('id', 'skills');
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<SkillsSection />);
      
      const h2 = screen.getByRole('heading', { level: 2 });
      expect(h2).toBeInTheDocument();
      expect(h2).toHaveTextContent('Skills & Expertise');
    });

    it('provides proper semantic structure', () => {
      render(<SkillsSection />);
      
      const section = screen.getByRole('region', { hidden: true }) || document.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('has readable text contrast for dark theme', () => {
      render(<SkillsSection />);
      
      const whiteText = document.querySelectorAll('.text-white');
      const grayText = document.querySelectorAll('.text-gray-300');
      
      expect(whiteText.length).toBeGreaterThan(0);
      expect(grayText.length).toBeGreaterThan(0);
    });

    it('maintains proper focus order for keyboard navigation', () => {
      render(<SkillsSection />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      
      // Skill bars should be in logical order
      const skillBars = screen.getAllByTestId('skill-bar');
      expect(skillBars).toHaveLength(6);
    });
  });

  describe('Responsive Design', () => {
    it('has responsive text sizing', () => {
      render(<SkillsSection />);
      
      const heading = screen.getByText('Skills & Expertise');
      expect(heading.closest('h2')).toHaveClass('text-responsive-xl');
      
      const description = screen.getByText(/comprehensive skill set/);
      expect(description.closest('p')).toHaveClass('text-responsive-sm');
    });

    it('adapts grid layout for different screen sizes', () => {
      render(<SkillsSection />);
      
      const grid = document.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'lg:grid-cols-2');
    });

    it('has responsive spacing and gaps', () => {
      render(<SkillsSection />);
      
      const grid = document.querySelector('.grid');
      expect(grid).toHaveClass('gap-6', 'lg:gap-8');
    });

    it('applies responsive padding for mobile and desktop', () => {
      render(<SkillsSection />);
      
      const section = document.querySelector('section');
      expect(section).toHaveClass('py-12', 'sm:py-16', 'lg:py-20');
    });
  });

  describe('Animation and Performance', () => {
    it('implements staggered animation delays', () => {
      render(<SkillsSection />);
      
      const skillBars = screen.getAllByTestId('skill-bar');
      
      // Check that delays increase by 200ms for each skill
      skillBars.forEach((bar, index) => {
        expect(bar).toHaveAttribute('data-delay', (index * 200).toString());
      });
    });

    it('handles animation timing correctly', async () => {
      render(<SkillsSection />);
      
      // Wait for initial render
      await waitFor(() => {
        expect(screen.getAllByTestId('skill-bar')).toHaveLength(6);
      });
      
      // All skill bars should be rendered
      const skillBars = screen.getAllByTestId('skill-bar');
      expect(skillBars).toHaveLength(6);
    });
  });

  describe('Content Accuracy', () => {
    it('displays accurate skill levels matching requirements', () => {
      render(<SkillsSection />);
      
      // Verify specific skill levels from requirements
      expect(screen.getByText('95%')).toBeInTheDocument(); // Technical Writing
      expect(screen.getByText('98%')).toBeInTheDocument(); // Developer Relations
      expect(screen.getByText('88%')).toBeInTheDocument(); // AI & Data
      expect(screen.getByText('92%')).toBeInTheDocument(); // Software Development
      expect(screen.getByText('85%')).toBeInTheDocument(); // Content Creation
      expect(screen.getByText('94%')).toBeInTheDocument(); // Leadership
    });

    it('includes specific company and project mentions', () => {
      render(<SkillsSection />);
      
      expect(screen.getByText(/Archetype AI and Cloudflare/)).toBeInTheDocument();
      expect(screen.getByText(/Lux Tech Academy/)).toBeInTheDocument();
      expect(screen.getByText(/MPESA Daraja API/)).toBeInTheDocument();
      expect(screen.getByText(/McKinsey Forward Program/)).toBeInTheDocument();
    });

    it('shows quantifiable achievements and metrics', () => {
      render(<SkillsSection />);
      
      expect(screen.getByText(/20k\+ learners/)).toBeInTheDocument();
      expect(screen.getByText(/300\+ bootcamp graduates/)).toBeInTheDocument();
      expect(screen.getByText(/10k\+ users/)).toBeInTheDocument();
      expect(screen.getByText(/600\+ listeners/)).toBeInTheDocument();
    });

    it('includes relevant technologies and tools', () => {
      render(<SkillsSection />);
      
      expect(screen.getByText(/C\+\+, Python, ROS/)).toBeInTheDocument();
      expect(screen.getByText(/YouTube & TikTok/)).toBeInTheDocument();
      expect(screen.getByText(/Medium, Substack & Dev\.to/)).toBeInTheDocument();
      expect(screen.getByText(/API references/)).toBeInTheDocument();
    });
  });
});