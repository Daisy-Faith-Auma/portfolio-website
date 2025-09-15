import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectsSection from '../../components/ProjectsSection';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

// Mock ProjectCard component
vi.mock('../../components/ProjectCard', () => ({
  default: ({ project, index }: { project: any; index: number }) => (
    <div data-testid="project-card" data-index={index}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div data-testid="project-tech">
        {project.tech.map((tech: string) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <a href={project.github} data-testid="github-link">GitHub</a>
      <a href={project.live} data-testid="live-link">Live Demo</a>
    </div>
  )
}));

// Mock projects data
vi.mock('../../data/projects', () => ({
  projects: [
    {
      title: 'Archetype AI Documentation',
      description: 'End-to-end customer documentation and API references for AI platform',
      tech: ['Technical Writing', 'API Documentation', 'Developer Experience'],
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
      github: 'https://github.com/archetype-ai/docs',
      live: 'https://docs.archetype.ai'
    },
    {
      title: 'Cloudflare AI & Workers Documentation',
      description: '10+ tutorials and setup guides improving developer onboarding by 40%',
      tech: ['Workers AI', 'AI Gateway', 'Browser Rendering', 'Technical Writing'],
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
      github: 'https://github.com/cloudflare/workers-docs',
      live: 'https://developers.cloudflare.com'
    },
    {
      title: 'Kudan Robotics DevRel',
      description: 'Mobile Mapping and AMR Robot Kit evaluations and developer resources',
      tech: ['Robotics', 'SLAM', 'Mobile Mapping', 'Developer Relations'],
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
      github: 'https://github.com/kudan-eu/devrel',
      live: 'https://kudan.io/developers'
    },
    {
      title: 'Spotify Wrapped Clone',
      description: 'Data visualization project with Python and pandas for music analysis',
      tech: ['Python', 'Pandas', 'Data Visualization', 'Spotify API'],
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
      github: 'https://github.com/daisyauma/spotify-wrapped',
      live: 'https://spotify-wrapped-clone.vercel.app'
    },
    {
      title: 'F1 Prediction Model',
      description: 'Machine learning model using historical data for Formula 1 race predictions',
      tech: ['Machine Learning', 'Python', 'Scikit-learn', 'Data Analysis'],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64',
      github: 'https://github.com/daisyauma/f1-predictions',
      live: 'https://f1-predictions.streamlit.app'
    },
    {
      title: 'MPESA Daraja API Integration',
      description: 'Payment integration serving 10,000+ users with comprehensive documentation',
      tech: ['MPESA API', 'Node.js', 'Express', 'Payment Integration'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
      github: 'https://github.com/daisyauma/mpesa-integration',
      live: 'https://mpesa-integration-demo.vercel.app'
    }
  ]
}));

describe('ProjectsSection Component', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Content Rendering', () => {
    it('renders projects section with main heading', () => {
      render(<ProjectsSection />);
      
      expect(screen.getByText('Featured Projects')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('displays section description', () => {
      render(<ProjectsSection />);
      
      expect(screen.getByText(/showcase of my work across technical writing/)).toBeInTheDocument();
      expect(screen.getByText(/developer relations, AI projects, and software development/)).toBeInTheDocument();
    });

    it('renders all six featured projects', () => {
      render(<ProjectsSection />);
      
      expect(screen.getByText('Archetype AI Documentation')).toBeInTheDocument();
      expect(screen.getByText('Cloudflare AI & Workers Documentation')).toBeInTheDocument();
      expect(screen.getByText('Kudan Robotics DevRel')).toBeInTheDocument();
      expect(screen.getByText('Spotify Wrapped Clone')).toBeInTheDocument();
      expect(screen.getByText('F1 Prediction Model')).toBeInTheDocument();
      expect(screen.getByText('MPESA Daraja API Integration')).toBeInTheDocument();
    });

    it('displays project descriptions with key metrics', () => {
      render(<ProjectsSection />);
      
      expect(screen.getByText(/End-to-end customer documentation/)).toBeInTheDocument();
      expect(screen.getByText(/10\+ tutorials and setup guides/)).toBeInTheDocument();
      expect(screen.getByText(/improving developer onboarding by 40%/)).toBeInTheDocument();
      expect(screen.getByText(/serving 10,000\+ users/)).toBeInTheDocument();
    });

    it('shows technology stacks for each project', () => {
      render(<ProjectsSection />);
      
      expect(screen.getByText('Technical Writing')).toBeInTheDocument();
      expect(screen.getByText('API Documentation')).toBeInTheDocument();
      expect(screen.getByText('Workers AI')).toBeInTheDocument();
      expect(screen.getByText('Python')).toBeInTheDocument();
      expect(screen.getByText('Machine Learning')).toBeInTheDocument();
      expect(screen.getByText('MPESA API')).toBeInTheDocument();
    });
  });

  describe('ProjectCard Components', () => {
    it('renders ProjectCard component for each project', () => {
      render(<ProjectsSection />);
      
      const projectCards = screen.getAllByTestId('project-card');
      expect(projectCards).toHaveLength(6);
    });

    it('passes correct index values to ProjectCard components', () => {
      render(<ProjectsSection />);
      
      const projectCards = screen.getAllByTestId('project-card');
      
      projectCards.forEach((card, index) => {
        expect(card).toHaveAttribute('data-index', index.toString());
      });
    });

    it('passes correct project data to ProjectCard components', () => {
      render(<ProjectsSection />);
      
      // Check that project data is passed correctly
      expect(screen.getByText('Archetype AI Documentation')).toBeInTheDocument();
      expect(screen.getByText('Cloudflare AI & Workers Documentation')).toBeInTheDocument();
      expect(screen.getByText('Kudan Robotics DevRel')).toBeInTheDocument();
    });

    it('includes GitHub and live demo links for each project', () => {
      render(<ProjectsSection />);
      
      const githubLinks = screen.getAllByTestId('github-link');
      const liveLinks = screen.getAllByTestId('live-link');
      
      expect(githubLinks).toHaveLength(6);
      expect(liveLinks).toHaveLength(6);
    });
  });

  describe('Project Links and Navigation', () => {
    it('has correct GitHub URLs for all projects', () => {
      render(<ProjectsSection />);
      
      const githubLinks = screen.getAllByTestId('github-link');
      
      expect(githubLinks[0]).toHaveAttribute('href', 'https://github.com/archetype-ai/docs');
      expect(githubLinks[1]).toHaveAttribute('href', 'https://github.com/cloudflare/workers-docs');
      expect(githubLinks[2]).toHaveAttribute('href', 'https://github.com/kudan-eu/devrel');
      expect(githubLinks[3]).toHaveAttribute('href', 'https://github.com/daisyauma/spotify-wrapped');
      expect(githubLinks[4]).toHaveAttribute('href', 'https://github.com/daisyauma/f1-predictions');
      expect(githubLinks[5]).toHaveAttribute('href', 'https://github.com/daisyauma/mpesa-integration');
    });

    it('has correct live demo URLs for all projects', () => {
      render(<ProjectsSection />);
      
      const liveLinks = screen.getAllByTestId('live-link');
      
      expect(liveLinks[0]).toHaveAttribute('href', 'https://docs.archetype.ai');
      expect(liveLinks[1]).toHaveAttribute('href', 'https://developers.cloudflare.com');
      expect(liveLinks[2]).toHaveAttribute('href', 'https://kudan.io/developers');
      expect(liveLinks[3]).toHaveAttribute('href', 'https://spotify-wrapped-clone.vercel.app');
      expect(liveLinks[4]).toHaveAttribute('href', 'https://f1-predictions.streamlit.app');
      expect(liveLinks[5]).toHaveAttribute('href', 'https://mpesa-integration-demo.vercel.app');
    });

    it('opens external links in new tabs', () => {
      render(<ProjectsSection />);
      
      const githubLinks = screen.getAllByTestId('github-link');
      const liveLinks = screen.getAllByTestId('live-link');
      
      [...githubLinks, ...liveLinks].forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('Layout and Structure', () => {
    it('has proper section structure with dark theme', () => {
      render(<ProjectsSection />);
      
      const section = document.querySelector('section');
      expect(section).toHaveClass('bg-gray-900', 'text-white');
    });

    it('uses responsive grid layout for project cards', () => {
      render(<ProjectsSection />);
      
      const projectGrid = document.querySelector('.grid');
      expect(projectGrid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
    });

    it('applies proper spacing and padding', () => {
      render(<ProjectsSection />);
      
      const section = document.querySelector('section');
      expect(section).toHaveClass('py-12', 'sm:py-16', 'lg:py-20');
    });

    it('has responsive container with proper max width', () => {
      render(<ProjectsSection />);
      
      const container = document.querySelector('.container-responsive');
      expect(container).toHaveClass('max-w-7xl', 'mx-auto', 'px-4');
    });

    it('sets correct section id for navigation', () => {
      render(<ProjectsSection />);
      
      const section = document.querySelector('section');
      expect(section).toHaveAttribute('id', 'projects');
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<ProjectsSection />);
      
      const h2 = screen.getByRole('heading', { level: 2 });
      const h3Elements = screen.getAllByRole('heading', { level: 3 });
      
      expect(h2).toBeInTheDocument();
      expect(h3Elements.length).toBeGreaterThan(0);
    });

    it('provides proper semantic structure', () => {
      render(<ProjectsSection />);
      
      const section = screen.getByRole('region', { hidden: true }) || document.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('has readable text contrast for dark theme', () => {
      render(<ProjectsSection />);
      
      const whiteText = document.querySelectorAll('.text-white');
      const grayText = document.querySelectorAll('.text-gray-300');
      
      expect(whiteText.length).toBeGreaterThan(0);
      expect(grayText.length).toBeGreaterThan(0);
    });

    it('provides proper link accessibility', () => {
      render(<ProjectsSection />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
        // External links should have proper security attributes
        if (link.getAttribute('target') === '_blank') {
          expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        }
      });
    });
  });

  describe('Responsive Design', () => {
    it('has responsive text sizing', () => {
      render(<ProjectsSection />);
      
      const heading = screen.getByText('Featured Projects');
      expect(heading.closest('h2')).toHaveClass('text-responsive-xl');
      
      const description = screen.getByText(/showcase of my work/);
      expect(description.closest('p')).toHaveClass('text-responsive-sm');
    });

    it('adapts grid layout for different screen sizes', () => {
      render(<ProjectsSection />);
      
      const grid = document.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
    });

    it('has responsive spacing and gaps', () => {
      render(<ProjectsSection />);
      
      const grid = document.querySelector('.grid');
      expect(grid).toHaveClass('gap-6', 'lg:gap-8');
    });

    it('applies responsive padding for mobile and desktop', () => {
      render(<ProjectsSection />);
      
      const section = document.querySelector('section');
      expect(section).toHaveClass('py-12', 'sm:py-16', 'lg:py-20');
    });
  });

  describe('Content Accuracy', () => {
    it('displays accurate project information for current role', () => {
      render(<ProjectsSection />);
      
      expect(screen.getByText('Archetype AI Documentation')).toBeInTheDocument();
      expect(screen.getByText(/End-to-end customer documentation/)).toBeInTheDocument();
      expect(screen.getByText(/API references/)).toBeInTheDocument();
    });

    it('includes Cloudflare project with specific metrics', () => {
      render(<ProjectsSection />);
      
      expect(screen.getByText('Cloudflare AI & Workers Documentation')).toBeInTheDocument();
      expect(screen.getByText(/10\+ tutorials/)).toBeInTheDocument();
      expect(screen.getByText(/40%/)).toBeInTheDocument();
    });

    it('shows technical projects with relevant technologies', () => {
      render(<ProjectsSection />);
      
      expect(screen.getByText('Spotify Wrapped Clone')).toBeInTheDocument();
      expect(screen.getByText('Python')).toBeInTheDocument();
      expect(screen.getByText('Pandas')).toBeInTheDocument();
      
      expect(screen.getByText('F1 Prediction Model')).toBeInTheDocument();
      expect(screen.getByText('Machine Learning')).toBeInTheDocument();
    });

    it('includes MPESA project with user metrics', () => {
      render(<ProjectsSection />);
      
      expect(screen.getByText('MPESA Daraja API Integration')).toBeInTheDocument();
      expect(screen.getByText(/10,000\+ users/)).toBeInTheDocument();
      expect(screen.getByText('Payment Integration')).toBeInTheDocument();
    });

    it('displays DevRel project with robotics focus', () => {
      render(<ProjectsSection />);
      
      expect(screen.getByText('Kudan Robotics DevRel')).toBeInTheDocument();
      expect(screen.getByText(/Mobile Mapping/)).toBeInTheDocument();
      expect(screen.getByText(/AMR Robot Kit/)).toBeInTheDocument();
      expect(screen.getByText('SLAM')).toBeInTheDocument();
    });
  });

  describe('Interactive Elements', () => {
    it('handles project card interactions', async () => {
      render(<ProjectsSection />);
      
      const projectCards = screen.getAllByTestId('project-card');
      
      // Cards should be interactive
      projectCards.forEach(card => {
        expect(card).toBeInTheDocument();
      });
    });

    it('supports keyboard navigation for links', async () => {
      render(<ProjectsSection />);
      
      const firstGithubLink = screen.getAllByTestId('github-link')[0];
      
      firstGithubLink.focus();
      expect(document.activeElement).toBe(firstGithubLink);
      
      await user.keyboard('{Enter}');
      // Link should be accessible via keyboard
      expect(firstGithubLink).toHaveAttribute('href');
    });
  });
});