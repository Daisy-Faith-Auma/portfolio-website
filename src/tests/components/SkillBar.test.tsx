import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import SkillBar from '../../components/SkillBar';
import type { Skill } from '../../types';

// Mock React for createElement
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    createElement: vi.fn((type, props, ...children) => ({ type, props, children }))
  };
});

describe('SkillBar Component', () => {
  const mockSkill: Skill = {
    name: 'Technical Writing & Documentation',
    icon: { type: 'FileText', props: { className: 'w-6 h-6' }, children: [] },
    level: 95,
    color: 'from-blue-500 to-purple-600',
    description: 'Creating comprehensive documentation for Archetype AI and Cloudflare, including API references, setup guides, and developer tutorials.'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Content Rendering', () => {
    it('renders skill information correctly', () => {
      render(<SkillBar skill={mockSkill} />);
      
      expect(screen.getByText('Technical Writing & Documentation')).toBeInTheDocument();
      expect(screen.getByText('95%')).toBeInTheDocument();
      expect(screen.getByText(/Creating comprehensive documentation/)).toBeInTheDocument();
    });

    it('displays skill icon with proper styling', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const iconContainer = document.querySelector('.p-2, .sm\\:p-3');
      expect(iconContainer).toBeInTheDocument();
      expect(iconContainer).toHaveClass('rounded-lg', 'bg-gradient-to-r');
    });

    it('applies correct gradient color classes', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const gradientElements = document.querySelectorAll('.from-blue-500.to-purple-600');
      expect(gradientElements.length).toBeGreaterThan(0);
    });

    it('shows skill description with proper formatting', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const description = screen.getByText(/Creating comprehensive documentation/);
      expect(description).toHaveClass('text-gray-300', 'text-sm', 'sm:text-base');
    });
  });

  describe('Progress Bar Animation', () => {
    it('starts with 0% and animates to skill level', async () => {
      render(<SkillBar skill={mockSkill} />);
      
      // Initially should show 0%
      expect(screen.getByText('0%')).toBeInTheDocument();
      
      // Fast-forward timers to trigger animation
      vi.advanceTimersByTime(200);
      
      await waitFor(() => {
        expect(screen.getByText('95%')).toBeInTheDocument();
      });
    });

    it('animates progress bar width to match skill level', async () => {
      render(<SkillBar skill={mockSkill} />);
      
      // Fast-forward timers
      vi.advanceTimersByTime(200);
      
      await waitFor(() => {
        const progressBar = document.querySelector('[style*="width: 95%"]');
        expect(progressBar).toBeInTheDocument();
      });
    });

    it('applies animation delay when provided', async () => {
      render(<SkillBar skill={mockSkill} delay={500} />);
      
      // Should not animate immediately
      expect(screen.getByText('0%')).toBeInTheDocument();
      
      // Fast-forward to delay time
      vi.advanceTimersByTime(500);
      
      // Should still be 0% until animation starts
      expect(screen.getByText('0%')).toBeInTheDocument();
      
      // Fast-forward animation start
      vi.advanceTimersByTime(200);
      
      await waitFor(() => {
        expect(screen.getByText('95%')).toBeInTheDocument();
      });
    });

    it('includes shimmer animation effects', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const shimmerElements = document.querySelectorAll('[style*="animation"]');
      expect(shimmerElements.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes for progress bar', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '0'); // Initially 0
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
      expect(progressBar).toHaveAttribute('aria-label', 'Technical Writing & Documentation proficiency: 0%');
    });

    it('updates ARIA attributes when animation completes', async () => {
      render(<SkillBar skill={mockSkill} />);
      
      // Fast-forward animation
      vi.advanceTimersByTime(200);
      
      await waitFor(() => {
        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toHaveAttribute('aria-valuenow', '95');
        expect(progressBar).toHaveAttribute('aria-label', 'Technical Writing & Documentation proficiency: 95%');
      });
    });

    it('has proper heading structure with IDs', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveAttribute('id', 'skill-technical-writing-documentation-title');
    });

    it('connects description with aria-describedby', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const container = document.querySelector('[aria-describedby]');
      expect(container).toHaveAttribute('aria-describedby', 'skill-technical-writing-documentation-description');
      
      const description = document.getElementById('skill-technical-writing-documentation-description');
      expect(description).toBeInTheDocument();
    });

    it('provides proper region labeling', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const region = screen.getByRole('region');
      expect(region).toHaveAttribute('aria-labelledby', 'skill-technical-writing-documentation-title');
    });
  });

  describe('Responsive Design', () => {
    it('has responsive padding and spacing', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const container = document.querySelector('.p-4, .sm\\:p-6');
      expect(container).toBeInTheDocument();
    });

    it('applies responsive text sizing', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const heading = screen.getByText('Technical Writing & Documentation');
      expect(heading).toHaveClass('text-lg', 'sm:text-xl');
      
      const percentage = screen.getByText('0%');
      expect(percentage).toHaveClass('text-xl', 'sm:text-2xl');
    });

    it('has responsive icon sizing', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const iconContainer = document.querySelector('.w-5.h-5, .sm\\:w-6.sm\\:h-6');
      expect(iconContainer).toBeInTheDocument();
    });

    it('applies responsive progress bar height', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const progressBarContainer = document.querySelector('.h-1\\.5, .sm\\:h-2');
      expect(progressBarContainer).toBeInTheDocument();
    });
  });

  describe('Visual Effects and Styling', () => {
    it('applies dark theme styling', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const container = document.querySelector('.bg-gray-800\\/50');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('backdrop-blur-card', 'border-gray-700/50');
    });

    it('includes hover effects', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const container = document.querySelector('.card-hover-lift');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('hover:border-gray-600/50');
    });

    it('has gradient background effects', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const gradientElements = document.querySelectorAll('.bg-gradient-to-r');
      expect(gradientElements.length).toBeGreaterThan(0);
    });

    it('includes glow effects for progress bar', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const glowEffect = document.querySelector('.blur-sm');
      expect(glowEffect).toBeInTheDocument();
    });

    it('applies hover text gradient effects', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const heading = screen.getByText('Technical Writing & Documentation');
      expect(heading).toHaveClass('group-hover:text-transparent', 'group-hover:bg-gradient-to-r', 'group-hover:bg-clip-text');
    });
  });

  describe('Animation Timing and Performance', () => {
    it('handles different skill levels correctly', async () => {
      const lowSkill: Skill = { ...mockSkill, level: 25 };
      render(<SkillBar skill={lowSkill} />);
      
      vi.advanceTimersByTime(200);
      
      await waitFor(() => {
        expect(screen.getByText('25%')).toBeInTheDocument();
      });
    });

    it('handles maximum skill level', async () => {
      const maxSkill: Skill = { ...mockSkill, level: 100 };
      render(<SkillBar skill={maxSkill} />);
      
      vi.advanceTimersByTime(200);
      
      await waitFor(() => {
        expect(screen.getByText('100%')).toBeInTheDocument();
      });
    });

    it('handles zero skill level', async () => {
      const zeroSkill: Skill = { ...mockSkill, level: 0 };
      render(<SkillBar skill={zeroSkill} />);
      
      vi.advanceTimersByTime(200);
      
      await waitFor(() => {
        expect(screen.getByText('0%')).toBeInTheDocument();
      });
    });

    it('cleans up timers on unmount', () => {
      const { unmount } = render(<SkillBar skill={mockSkill} />);
      
      unmount();
      
      // Should not throw errors or cause memory leaks
      vi.advanceTimersByTime(1000);
    });
  });

  describe('Different Skill Types', () => {
    it('handles long skill names properly', () => {
      const longNameSkill: Skill = {
        ...mockSkill,
        name: 'Very Long Skill Name That Should Be Truncated Properly'
      };
      
      render(<SkillBar skill={longNameSkill} />);
      
      const heading = screen.getByText('Very Long Skill Name That Should Be Truncated Properly');
      expect(heading).toHaveClass('truncate');
    });

    it('handles different color schemes', () => {
      const differentColorSkill: Skill = {
        ...mockSkill,
        color: 'from-green-500 to-blue-600'
      };
      
      render(<SkillBar skill={differentColorSkill} />);
      
      const gradientElements = document.querySelectorAll('.from-green-500.to-blue-600');
      expect(gradientElements.length).toBeGreaterThan(0);
    });

    it('handles long descriptions', () => {
      const longDescSkill: Skill = {
        ...mockSkill,
        description: 'This is a very long description that should wrap properly and maintain readability across different screen sizes and devices while providing comprehensive information about the skill.'
      };
      
      render(<SkillBar skill={longDescSkill} />);
      
      const description = screen.getByText(/This is a very long description/);
      expect(description).toHaveClass('leading-relaxed');
    });
  });

  describe('Focus Management', () => {
    it('supports keyboard navigation', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const container = document.querySelector('[role="region"]');
      expect(container).toHaveClass('focus-within:border-purple-500/50');
    });

    it('maintains focus visibility', () => {
      render(<SkillBar skill={mockSkill} />);
      
      const focusableElement = document.querySelector('.focus-within\\:border-purple-500\\/50');
      expect(focusableElement).toBeInTheDocument();
    });
  });
});