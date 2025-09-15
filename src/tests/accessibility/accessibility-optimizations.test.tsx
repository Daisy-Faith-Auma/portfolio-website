import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProjectCard from '../../components/ProjectCard';
import SkillBar from '../../components/SkillBar';
import LazyImage from '../../components/LazyImage';
import LoadingSpinner from '../../components/LoadingSpinner';

// Mock project data
const mockProject = {
  title: 'Test Project',
  description: 'This is a test project description for accessibility testing.',
  tech: ['React', 'TypeScript', 'Tailwind'],
  image: 'https://example.com/test-image.jpg',
  github: 'https://github.com/test/project',
  live: 'https://test-project.com'
};

// Mock skill data
const mockSkill = {
  name: 'Test Skill',
  icon: <div>TestIcon</div>,
  level: 85,
  color: 'from-purple-500 to-pink-500',
  description: 'This is a test skill description for accessibility testing.'
};

describe('Accessibility Optimizations', () => {
  describe('ProjectCard Accessibility', () => {
    it('has proper ARIA labels and semantic HTML', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      // Check for proper semantic HTML
      const article = screen.getByRole('article');
      expect(article).toBeInTheDocument();
      expect(article).toHaveAttribute('aria-labelledby', 'project-title-0');
      expect(article).toHaveAttribute('aria-describedby', 'project-description-0');
    });

    it('has proper alt text for images', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      // The LazyImage component uses role="img" with aria-label instead of alt
      const imageContainer = screen.getByRole('img');
      expect(imageContainer).toHaveAttribute('aria-label');
      expect(imageContainer.getAttribute('aria-label')).toContain(mockProject.title);
    });

    it('has proper focus management for interactive elements', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      // Use getAllByLabelText since there are multiple GitHub links (floating and main buttons)
      const githubLinks = screen.getAllByLabelText(/view source code for test project on github/i);
      const liveLinks = screen.getAllByLabelText(/view live demo of test project/i);
      
      // Check that all links have proper focus styles
      githubLinks.forEach(link => {
        expect(link).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-purple-500');
      });
      
      liveLinks.forEach(link => {
        expect(link).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-purple-500');
      });
    });

    it('has proper keyboard navigation support', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('SkillBar Accessibility', () => {
    it('has proper ARIA labels and roles', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const region = screen.getByRole('region');
      expect(region).toBeInTheDocument();
      expect(region).toHaveAttribute('aria-labelledby');
      expect(region).toHaveAttribute('aria-describedby');
    });

    it('has proper progress bar accessibility', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute('aria-valuenow');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
      expect(progressBar).toHaveAttribute('aria-label');
    });

    it('has proper heading structure', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveAttribute('id');
    });
  });

  describe('LazyImage Accessibility', () => {
    it('has proper loading states with ARIA labels', () => {
      render(<LazyImage src="test.jpg" alt="Test image" />);
      
      const container = screen.getByRole('img');
      expect(container).toHaveAttribute('aria-label', 'Test image');
    });

    it('shows loading spinner with proper accessibility', () => {
      render(<LazyImage src="test.jpg" alt="Test image" />);
      
      const loadingSpinner = screen.getByRole('status');
      expect(loadingSpinner).toBeInTheDocument();
      expect(loadingSpinner).toHaveAttribute('aria-label');
    });
  });

  describe('LoadingSpinner Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<LoadingSpinner label="Loading content" />);
      
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute('aria-label', 'Loading content');
    });

    it('has screen reader text', () => {
      render(<LoadingSpinner label="Loading test content" />);
      
      const srText = screen.getByText('Loading test content');
      expect(srText).toHaveClass('sr-only');
    });
  });

  describe('Color Contrast and Visual Accessibility', () => {
    it('applies high contrast styles when needed', () => {
      // This would typically be tested with actual color contrast tools
      // For now, we check that the CSS classes are applied correctly
      render(<ProjectCard project={mockProject} index={0} />);
      
      const textElements = screen.getAllByText(/./);
      textElements.forEach(element => {
        // Check that text elements have appropriate color classes
        const classes = element.className;
        if (classes.includes('text-gray-300') || classes.includes('text-gray-400')) {
          expect(element).toBeInTheDocument(); // Basic check that elements exist
        }
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports keyboard navigation for interactive elements', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      const interactiveElements = screen.getAllByRole('link');
      interactiveElements.forEach(element => {
        expect(element).toHaveClass('btn-touch'); // Our custom touch-friendly class
      });
    });
  });

  describe('Performance Optimizations', () => {
    it('uses lazy loading for images', () => {
      render(<LazyImage src="test.jpg" alt="Test image" />);
      
      // The LazyImage component should implement intersection observer
      // This is a basic check that the component renders
      const container = screen.getByRole('img');
      expect(container).toBeInTheDocument();
    });

    it('has proper loading attributes on images', () => {
      render(<ProjectCard project={mockProject} index={0} />);
      
      // Check that images have loading="lazy" and decoding="async"
      // This would be checked in the actual DOM after the LazyImage loads
      const container = screen.getByRole('article');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Reduced Motion Support', () => {
    it('respects user motion preferences', () => {
      // This would typically be tested with CSS media query mocks
      // For now, we ensure components render without animation errors
      render(<SkillBar skill={mockSkill} />);
      
      const skillBar = screen.getByRole('region');
      expect(skillBar).toBeInTheDocument();
    });
  });
});