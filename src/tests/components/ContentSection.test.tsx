import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ContentSection from '../../components/ContentSection';

describe('ContentSection Component', () => {
  it('renders the section title', () => {
    render(<ContentSection />);
    expect(screen.getByText('Content & Community')).toBeInTheDocument();
  });

  it('displays community metrics', () => {
    render(<ContentSection />);
    expect(screen.getByText('20k+')).toBeInTheDocument();
    expect(screen.getByText('300+')).toBeInTheDocument();
    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByText('Lux Academy Learners')).toBeInTheDocument();
    expect(screen.getByText('Bootcamp Graduates')).toBeInTheDocument();
    expect(screen.getByText('Cloudflare Tutorials')).toBeInTheDocument();
  });

  it('displays all content platforms', () => {
    render(<ContentSection />);
    expect(screen.getByText('YouTube')).toBeInTheDocument();
    expect(screen.getByText('TikTok')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Substack')).toBeInTheDocument();
    expect(screen.getByText('Dev.to')).toBeInTheDocument();
  });

  it('displays platform handles', () => {
    render(<ContentSection />);
    expect(screen.getAllByText('@daisy_codes')).toHaveLength(2); // YouTube and TikTok
    expect(screen.getByText('Technical Writing')).toBeInTheDocument();
    expect(screen.getByText('Newsletter')).toBeInTheDocument();
    expect(screen.getByText('@daisyauma')).toBeInTheDocument();
  });

  it('displays platform descriptions', () => {
    render(<ContentSection />);
    expect(screen.getByText('AI & data science tutorials, tech explainers')).toBeInTheDocument();
    expect(screen.getByText('Short-form AI explainers & tech tips')).toBeInTheDocument();
    expect(screen.getByText('In-depth articles on AI & development')).toBeInTheDocument();
    expect(screen.getByText('Weekly AI & tech insights')).toBeInTheDocument();
    expect(screen.getByText('Developer community articles')).toBeInTheDocument();
  });

  it('has proper external links', () => {
    render(<ContentSection />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    
    // Check that links have proper attributes
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('displays additional community info', () => {
    render(<ContentSection />);
    expect(screen.getByText('Join the Community')).toBeInTheDocument();
    expect(screen.getByText(/8 Twitter Spaces hosted/)).toBeInTheDocument();
    expect(screen.getByText(/600\+ listeners reached/)).toBeInTheDocument();
  });
});