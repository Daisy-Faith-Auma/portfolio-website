import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkillSection from '../../components/SkillSection';
import type { Skill } from '../../types';

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
  default: ({ project, isReversed }: { project: any; isReversed: boolean }) => (
    <div data-testid="project-card" data-reversed={isReversed}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div data-testid="project-tags">
        {project.tags.map((tag: string) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  )
}));

describe('SkillSection Component', () => {
  const mockSkill: Skill = {
    id: 'technical-writing',
    title: 'Technical Writing & Documentation',
    description: 'Creating clear, comprehensive documentation that helps developers understand and implement complex technologies.',
    icon: 'FileText',
    projects: [
      {
        title: 'Cloudflare Developer Documentation',
        description: 'Comprehensive guides and tutorials for Cloudflare\'s developer platform.',
        impact: [
          'Improved developer onboarding experience by 40%',
          'Reduced support tickets by 25%'
        ],
        tags: ['Technical Writing', 'API Documentation', 'Developer Experience'],
        links: {
          article: 'https://developers.cloudflare.com'
        }
      },
      {
        title: 'API Integration Tutorials',
        description: 'Step-by-step tutorials for integrating various APIs.',
        impact: [
          'Helped 1000+ developers implement integrations',
          'Featured in developer newsletters'
        ],
        tags: ['Tutorials', 'API', 'Integration'],
        links: {
          demo: 'https://example.com/demo'
        }
      }
    ]
  };

  it('renders skill section with title and description', () => {
    render(<SkillSection skill={mockSkill} index={0} />);
    
    expect(screen.getByText('Technical Writing & Documentation')).toBeInTheDocument();
    expect(screen.getByText(/Creating clear, comprehensive documentation/)).toBeInTheDocument();
  });

  it('renders skill icon with proper accessibility attributes', () => {
    render(<SkillSection skill={mockSkill} index={0} />);
    
    const iconContainer = screen.getByRole('img', { name: 'Technical Writing & Documentation section icon' });
    expect(iconContainer).toBeInTheDocument();
  });

  it('renders all projects for the skill', () => {
    render(<SkillSection skill={mockSkill} index={0} />);
    
    const projectCards = screen.getAllByTestId('project-card');
    expect(projectCards).toHaveLength(2);
    
    expect(screen.getByText('Cloudflare Developer Documentation')).toBeInTheDocument();
    expect(screen.getByText('API Integration Tutorials')).toBeInTheDocument();
  });

  it('alternates project card layout (reversed/normal)', () => {
    render(<SkillSection skill={mockSkill} index={0} />);
    
    const projectCards = screen.getAllByTestId('project-card');
    
    // First project should not be reversed (index 0)
    expect(projectCards[0]).toHaveAttribute('data-reversed', 'false');
    
    // Second project should be reversed (index 1)
    expect(projectCards[1]).toHaveAttribute('data-reversed', 'true');
  });

  it('applies correct background color based on index', () => {
    const { rerender } = render(<SkillSection skill={mockSkill} index={0} />);
    
    // Even index should have white background
    let section = screen.getByRole('region', { hidden: true }) || document.querySelector('section');
    expect(section).toHaveClass('bg-white');
    
    // Odd index should have gray background
    rerender(<SkillSection skill={mockSkill} index={1} />);
    section = screen.getByRole('region', { hidden: true }) || document.querySelector('section');
    expect(section).toHaveClass('bg-gray-50');
  });

  it('sets correct section id for navigation', () => {
    render(<SkillSection skill={mockSkill} index={0} />);
    
    const section = document.querySelector('section');
    expect(section).toHaveAttribute('id', 'technical-writing');
  });

  it('handles different icon types', () => {
    const skillWithDifferentIcon: Skill = {
      ...mockSkill,
      icon: 'Users',
      title: 'Developer Relations'
    };
    
    render(<SkillSection skill={skillWithDifferentIcon} index={0} />);
    
    const iconContainer = screen.getByRole('img', { name: 'Developer Relations section icon' });
    expect(iconContainer).toBeInTheDocument();
  });

  it('handles skills with no projects', () => {
    const skillWithNoProjects: Skill = {
      ...mockSkill,
      projects: []
    };
    
    render(<SkillSection skill={skillWithNoProjects} index={0} />);
    
    expect(screen.getByText('Technical Writing & Documentation')).toBeInTheDocument();
    expect(screen.queryAllByTestId('project-card')).toHaveLength(0);
  });

  it('handles skills with single project', () => {
    const skillWithOneProject: Skill = {
      ...mockSkill,
      projects: [mockSkill.projects[0]]
    };
    
    render(<SkillSection skill={skillWithOneProject} index={0} />);
    
    const projectCards = screen.getAllByTestId('project-card');
    expect(projectCards).toHaveLength(1);
    expect(projectCards[0]).toHaveAttribute('data-reversed', 'false');
  });

  it('uses fallback icon when icon is not found', () => {
    const skillWithUnknownIcon: Skill = {
      ...mockSkill,
      icon: 'UnknownIcon' as any
    };
    
    render(<SkillSection skill={skillWithUnknownIcon} index={0} />);
    
    // Should still render without errors and use FileText as fallback
    const iconContainer = screen.getByRole('img', { name: 'Technical Writing & Documentation section icon' });
    expect(iconContainer).toBeInTheDocument();
  });

  it('has proper responsive classes', () => {
    render(<SkillSection skill={mockSkill} index={0} />);
    
    const title = screen.getByText('Technical Writing & Documentation');
    const description = screen.getByText(/Creating clear, comprehensive documentation/);
    
    expect(title.closest('h2')).toHaveClass('text-responsive-xl');
    expect(description.closest('p')).toHaveClass('text-responsive-sm');
  });

  it('renders with proper spacing classes', () => {
    render(<SkillSection skill={mockSkill} index={0} />);
    
    const section = document.querySelector('section');
    expect(section).toHaveClass('py-12', 'sm:py-16', 'lg:py-20');
  });
});