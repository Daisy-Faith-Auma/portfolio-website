import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectCard from '../../components/ProjectCard';
import type { Project } from '../../types';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
}));

describe('ProjectCard Component', () => {
  const user = userEvent.setup();

  const mockProject: Project = {
    title: 'Archetype AI Documentation',
    description: 'End-to-end customer documentation and API references for AI platform',
    tech: ['Technical Writing', 'API Documentation', 'Developer Experience'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
    github: 'https://github.com/archetype-ai/docs',
    live: 'https://docs.archetype.ai'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Content Rendering', () => {
    it('renders project information correctly', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      expect(screen.getByText('Archetype AI Documentation')).toBeInTheDocument();
      expect(screen.getByText(/End-to-end customer documentation/)).toBeInTheDocument();
    });

    it('displays project image with proper attributes', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c');
      expect(image).toHaveAttribute('alt', 'Archetype AI Documentation project screenshot');
    });

    it('shows all technology tags', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      expect(screen.getByText('Technical Writing')).toBeInTheDocument();
      expect(screen.getByText('API Documentation')).toBeInTheDocument();
      expect(screen.getByText('Developer Experience')).toBeInTheDocument();
    });

    it('renders GitHub and live demo links', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const githubLink = screen.getByLabelText('View Archetype AI Documentation source code on GitHub');
      const liveLink = screen.getByLabelText('View Archetype AI Documentation live demo');
      
      expect(githubLink).toBeInTheDocument();
      expect(liveLink).toBeInTheDocument();
    });
  });

  describe('Link Functionality', () => {
    it('has correct GitHub URL', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const githubLink = screen.getByLabelText('View Archetype AI Documentation source code on GitHub');
      expect(githubLink).toHaveAttribute('href', 'https://github.com/archetype-ai/docs');
    });

    it('has correct live demo URL', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const liveLink = screen.getByLabelText('View Archetype AI Documentation live demo');
      expect(liveLink).toHaveAttribute('href', 'https://docs.archetype.ai');
    });

    it('opens links in new tabs with proper security attributes', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const githubLink = screen.getByLabelText('View Archetype AI Documentation source code on GitHub');
      const liveLink = screen.getByLabelText('View Archetype AI Documentation live demo');
      
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(liveLink).toHaveAttribute('target', '_blank');
      expect(liveLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('handles missing GitHub link gracefully', () => {
      const projectWithoutGithub: Project = { ...mockProject, github: '' };
      render(<ProjectCard project={projectWithoutGithub} index={0} />);
      
      expect(screen.queryByLabelText(/source code on GitHub/)).not.toBeInTheDocument();
    });

    it('handles missing live demo link gracefully', () => {
      const projectWithoutLive: Project = { ...mockProject, live: '' };
      render(<ProjectCard project={projectWithoutLive} index={0} />);
      
      expect(screen.queryByLabelText(/live demo/)).not.toBeInTheDocument();
    });
  });

  describe('Visual Styling and Layout', () => {
    it('applies dark theme card styling', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const card = document.querySelector('.bg-gray-800\\/50');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('backdrop-blur-card', 'border-gray-700/50');
    });

    it('includes hover effects', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const card = document.querySelector('.card-hover-lift');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('hover:border-gray-600/50');
    });

    it('has gradient overlay on image', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const overlay = document.querySelector('.bg-gradient-to-t');
      expect(overlay).toBeInTheDocument();
    });

    it('applies proper rounded corners and shadows', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const card = document.querySelector('.rounded-xl');
      expect(card).toBeInTheDocument();
    });

    it('has responsive image sizing', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const imageContainer = document.querySelector('.aspect-video');
      expect(imageContainer).toBeInTheDocument();
    });
  });

  describe('Technology Tags', () => {
    it('renders technology tags with proper styling', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const tags = document.querySelectorAll('.bg-gray-700\\/50');
      expect(tags.length).toBeGreaterThan(0);
    });

    it('handles multiple technology tags', () => {
      const projectWithManyTags: Project = {
        ...mockProject,
        tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Docker', 'AWS']
      };
      
      render(<ProjectCard project={projectWithManyTags} index={0} />);
      
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
      expect(screen.getByText('MongoDB')).toBeInTheDocument();
      expect(screen.getByText('Docker')).toBeInTheDocument();
      expect(screen.getByText('AWS')).toBeInTheDocument();
    });

    it('handles empty technology array', () => {
      const projectWithNoTech: Project = { ...mockProject, tech: [] };
      render(<ProjectCard project={projectWithNoTech} index={0} />);
      
      // Should still render without errors
      expect(screen.getByText('Archetype AI Documentation')).toBeInTheDocument();
    });

    it('wraps technology tags properly', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const tagContainer = document.querySelector('.flex-wrap');
      expect(tagContainer).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('Archetype AI Documentation');
    });

    it('provides descriptive alt text for images', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'Archetype AI Documentation project screenshot');
    });

    it('has proper ARIA labels for links', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const githubLink = screen.getByLabelText('View Archetype AI Documentation source code on GitHub');
      const liveLink = screen.getByLabelText('View Archetype AI Documentation live demo');
      
      expect(githubLink).toBeInTheDocument();
      expect(liveLink).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const githubLink = screen.getByLabelText('View Archetype AI Documentation source code on GitHub');
      
      githubLink.focus();
      expect(document.activeElement).toBe(githubLink);
      
      await user.keyboard('{Tab}');
      
      const liveLink = screen.getByLabelText('View Archetype AI Documentation live demo');
      expect(document.activeElement).toBe(liveLink);
    });

    it('has readable text contrast for dark theme', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const title = screen.getByText('Archetype AI Documentation');
      const description = screen.getByText(/End-to-end customer documentation/);
      
      expect(title).toHaveClass('text-white');
      expect(description).toHaveClass('text-gray-300');
    });
  });

  describe('Responsive Design', () => {
    it('has responsive padding and spacing', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const contentArea = document.querySelector('.p-4, .sm\\:p-6');
      expect(contentArea).toBeInTheDocument();
    });

    it('applies responsive text sizing', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const title = screen.getByText('Archetype AI Documentation');
      expect(title).toHaveClass('text-lg', 'sm:text-xl');
    });

    it('has responsive button sizing', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const buttons = document.querySelectorAll('.p-2, .sm\\:p-3');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('adapts layout for different screen sizes', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const buttonContainer = document.querySelector('.gap-2, .sm\\:gap-3');
      expect(buttonContainer).toBeInTheDocument();
    });
  });

  describe('Interactive Elements', () => {
    it('includes proper button styling for links', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const githubLink = screen.getByLabelText('View Archetype AI Documentation source code on GitHub');
      const liveLink = screen.getByLabelText('View Archetype AI Documentation live demo');
      
      expect(githubLink).toHaveClass('btn-touch');
      expect(liveLink).toHaveClass('btn-touch');
    });

    it('has hover effects on interactive elements', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveClass('hover:bg-gray-600/50');
      });
    });

    it('includes icon buttons with proper sizing', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const icons = document.querySelectorAll('.w-4.h-4, .sm\\:w-5.sm\\:h-5');
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe('Different Project Types', () => {
    it('handles projects with long titles', () => {
      const longTitleProject: Project = {
        ...mockProject,
        title: 'Very Long Project Title That Should Be Handled Properly Across Different Screen Sizes'
      };
      
      render(<ProjectCard project={longTitleProject} index={0} />);
      
      expect(screen.getByText('Very Long Project Title That Should Be Handled Properly Across Different Screen Sizes')).toBeInTheDocument();
    });

    it('handles projects with long descriptions', () => {
      const longDescProject: Project = {
        ...mockProject,
        description: 'This is a very long project description that should wrap properly and maintain readability across different screen sizes while providing comprehensive information about the project and its features.'
      };
      
      render(<ProjectCard project={longDescProject} index={0} />);
      
      const description = screen.getByText(/This is a very long project description/);
      expect(description).toHaveClass('leading-relaxed');
    });

    it('handles different image URLs', () => {
      const differentImageProject: Project = {
        ...mockProject,
        image: 'https://example.com/different-image.jpg'
      };
      
      render(<ProjectCard project={differentImageProject} index={0} />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', 'https://example.com/different-image.jpg');
    });
  });

  describe('Animation and Effects', () => {
    it('includes card lift animation class', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const card = document.querySelector('.card-hover-lift');
      expect(card).toBeInTheDocument();
    });

    it('has gradient hover effects', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const hoverGradient = document.querySelector('.group-hover\\:opacity-10');
      expect(hoverGradient).toBeInTheDocument();
    });

    it('includes backdrop blur effects', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const blurElement = document.querySelector('.backdrop-blur-card');
      expect(blurElement).toBeInTheDocument();
    });
  });
});