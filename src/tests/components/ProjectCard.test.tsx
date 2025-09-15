import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectCard from '../../components/ProjectCard';
import type { Project } from '../../types';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => {
      const testId = className?.includes('flex flex-wrap gap-2') ? 'project-tags' : 'project-card';
      const isReversed = className?.includes('lg:flex-row-reverse');
      return <div data-testid={testId} data-reversed={isReversed} className={className} {...props}>{children}</div>;
    },
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    h4: ({ children, ...props }: any) => <h4 {...props}>{children}</h4>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
}));

describe('ProjectCard Component', () => {
  const user = userEvent.setup();

  const mockProject: Project = {
    title: 'Cloudflare Developer Documentation',
    description: 'Comprehensive guides and tutorials for Cloudflare\'s developer platform, helping developers integrate and use Cloudflare services effectively.',
    impact: [
      'Improved developer onboarding experience by 40%',
      'Reduced support tickets by 25%',
      'Increased API adoption by 60%'
    ],
    tags: ['Technical Writing', 'API Documentation', 'Developer Experience', 'Cloudflare'],
    links: {
      demo: 'https://developers.cloudflare.com',
      repo: 'https://github.com/cloudflare/docs',
      article: 'https://blog.cloudflare.com/developer-docs'
    }
  };

  const mockProjectWithoutLinks: Project = {
    title: 'Internal Documentation Project',
    description: 'Internal project documentation for team processes.',
    impact: ['Improved team efficiency by 30%'],
    tags: ['Documentation', 'Internal'],
  };

  it('renders project title and description', () => {
    render(<ProjectCard project={mockProject} isReversed={false} />);
    
    expect(screen.getByText('Cloudflare Developer Documentation')).toBeInTheDocument();
    expect(screen.getByText(/Comprehensive guides and tutorials/)).toBeInTheDocument();
  });

  it('renders all impact metrics', () => {
    render(<ProjectCard project={mockProject} isReversed={false} />);
    
    expect(screen.getByText('Improved developer onboarding experience by 40%')).toBeInTheDocument();
    expect(screen.getByText('Reduced support tickets by 25%')).toBeInTheDocument();
    expect(screen.getByText('Increased API adoption by 60%')).toBeInTheDocument();
  });

  it('renders all technology tags', () => {
    render(<ProjectCard project={mockProject} isReversed={false} />);
    
    expect(screen.getByText('Technical Writing')).toBeInTheDocument();
    expect(screen.getByText('API Documentation')).toBeInTheDocument();
    expect(screen.getByText('Developer Experience')).toBeInTheDocument();
    expect(screen.getByText('Cloudflare')).toBeInTheDocument();
  });

  it('renders project links when available', () => {
    render(<ProjectCard project={mockProject} isReversed={false} />);
    
    expect(screen.getByLabelText('View live demo (opens in new tab)')).toBeInTheDocument();
    expect(screen.getByLabelText('View source code (opens in new tab)')).toBeInTheDocument();
    expect(screen.getByLabelText('Read article (opens in new tab)')).toBeInTheDocument();
  });

  it('does not render links section when no links are provided', () => {
    render(<ProjectCard project={mockProjectWithoutLinks} isReversed={false} />);
    
    expect(screen.queryByLabelText('View live demo (opens in new tab)')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('View source code (opens in new tab)')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Read article (opens in new tab)')).not.toBeInTheDocument();
  });

  it('opens links in new tabs with proper security attributes', () => {
    render(<ProjectCard project={mockProject} isReversed={false} />);
    
    const demoLink = screen.getByLabelText('View live demo (opens in new tab)');
    const repoLink = screen.getByLabelText('View source code (opens in new tab)');
    const articleLink = screen.getByLabelText('Read article (opens in new tab)');
    
    expect(demoLink).toHaveAttribute('target', '_blank');
    expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(repoLink).toHaveAttribute('target', '_blank');
    expect(repoLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(articleLink).toHaveAttribute('target', '_blank');
    expect(articleLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has correct URLs for links', () => {
    render(<ProjectCard project={mockProject} isReversed={false} />);
    
    const demoLink = screen.getByLabelText('View live demo (opens in new tab)');
    const repoLink = screen.getByLabelText('View source code (opens in new tab)');
    const articleLink = screen.getByLabelText('Read article (opens in new tab)');
    
    expect(demoLink).toHaveAttribute('href', 'https://developers.cloudflare.com');
    expect(repoLink).toHaveAttribute('href', 'https://github.com/cloudflare/docs');
    expect(articleLink).toHaveAttribute('href', 'https://blog.cloudflare.com/developer-docs');
  });

  it('applies reversed layout when isReversed is true', () => {
    render(<ProjectCard project={mockProject} isReversed={true} />);
    
    const container = screen.getByText('Cloudflare Developer Documentation').closest('div');
    expect(container?.parentElement).toHaveClass('lg:flex-row-reverse');
  });

  it('applies normal layout when isReversed is false', () => {
    render(<ProjectCard project={mockProject} isReversed={false} />);
    
    const container = screen.getByText('Cloudflare Developer Documentation').closest('div');
    expect(container?.parentElement).not.toHaveClass('lg:flex-row-reverse');
  });

  it('handles project with partial links', () => {
    const projectWithPartialLinks: Project = {
      ...mockProject,
      links: {
        demo: 'https://example.com'
        // No repo or article links
      }
    };
    
    render(<ProjectCard project={projectWithPartialLinks} isReversed={false} />);
    
    expect(screen.getByLabelText('View live demo (opens in new tab)')).toBeInTheDocument();
    expect(screen.queryByLabelText('View source code (opens in new tab)')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Read article (opens in new tab)')).not.toBeInTheDocument();
  });

  it('handles project with empty impact array', () => {
    const projectWithNoImpact: Project = {
      ...mockProject,
      impact: []
    };
    
    render(<ProjectCard project={projectWithNoImpact} isReversed={false} />);
    
    expect(screen.getByText('Cloudflare Developer Documentation')).toBeInTheDocument();
    // Should still render without errors
  });

  it('handles project with empty tags array', () => {
    const projectWithNoTags: Project = {
      ...mockProject,
      tags: []
    };
    
    render(<ProjectCard project={projectWithNoTags} isReversed={false} />);
    
    expect(screen.getByText('Cloudflare Developer Documentation')).toBeInTheDocument();
    // Should still render without errors
  });

  it('has proper responsive classes', () => {
    render(<ProjectCard project={mockProject} isReversed={false} />);
    
    const title = screen.getByText('Cloudflare Developer Documentation');
    expect(title.closest('h3')).toHaveClass('text-responsive-lg');
  });

  it('renders impact section with proper heading', () => {
    render(<ProjectCard project={mockProject} isReversed={false} />);
    
    expect(screen.getByText('Impact & Results')).toBeInTheDocument();
  });

  it('renders technology section with proper heading', () => {
    render(<ProjectCard project={mockProject} isReversed={false} />);
    
    expect(screen.getByText('Technologies')).toBeInTheDocument();
  });

  it('has proper accessibility structure', () => {
    render(<ProjectCard project={mockProject} isReversed={false} />);
    
    // Check that impact items are in a list
    const impactList = screen.getByRole('list');
    expect(impactList).toBeInTheDocument();
    
    // Check that there are list items
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBeGreaterThan(0);
  });
});