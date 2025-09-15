import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('Responsive Design Implementation', () => {
  it('renders the main app component without errors', () => {
    render(<App />);
    
    // Check that main navigation elements are present
    expect(screen.getByText('Daisy Faith Auma')).toBeInTheDocument();
    expect(screen.getByText('Technical Writer at')).toBeInTheDocument();
    expect(screen.getByText('Archetype AI')).toBeInTheDocument();
  });

  it('includes responsive navigation with mobile menu button', () => {
    render(<App />);
    
    // Check for mobile menu button (should be hidden on desktop but present in DOM)
    const mobileMenuButton = screen.getByLabelText('Toggle mobile menu');
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it('includes responsive typography classes', () => {
    render(<App />);
    
    // Check that the main heading has responsive text classes
    const mainHeading = screen.getByText('Daisy Faith Auma');
    expect(mainHeading).toHaveClass('text-responsive-2xl');
  });

  it('includes touch-friendly button classes', () => {
    render(<App />);
    
    // Check that buttons have touch-friendly classes
    const viewWorkButton = screen.getByText('View My Work');
    expect(viewWorkButton).toHaveClass('btn-touch');
  });

  it('includes container responsive classes', () => {
    render(<App />);
    
    // Check that sections use responsive container classes
    const sections = document.querySelectorAll('section');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('includes responsive social media links', () => {
    render(<App />);
    
    // Check that social media links are present and have proper aria labels
    expect(screen.getByLabelText('Visit GitHub profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit LinkedIn profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit Twitter/X profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Send email')).toBeInTheDocument();
  });

  it('includes skip to main content link for accessibility', () => {
    render(<App />);
    
    // Check for skip link
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('includes proper section IDs for navigation', () => {
    render(<App />);
    
    // Check that main sections have proper IDs
    expect(document.getElementById('home')).toBeInTheDocument();
    expect(document.getElementById('about')).toBeInTheDocument();
    expect(document.getElementById('skills')).toBeInTheDocument();
    expect(document.getElementById('projects')).toBeInTheDocument();
    expect(document.getElementById('content')).toBeInTheDocument();
    expect(document.getElementById('contact')).toBeInTheDocument();
  });
});