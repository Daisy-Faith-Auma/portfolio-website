import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactSection from '../../components/ContactSection';

describe('ContactSection Basic Tests', () => {
  it('renders the contact section with main heading', () => {
    render(<ContactSection />);
    
    expect(screen.getByText("Let's Connect")).toBeInTheDocument();
  });

  it('renders contact cards with proper links', () => {
    render(<ContactSection />);
    
    // Check that GitHub link exists
    const githubLink = screen.getByLabelText('Visit GitHub profile');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/daisyfaithauma');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Check that LinkedIn link exists
    const linkedinLink = screen.getByLabelText('Visit LinkedIn profile');
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/daisyfaithauma/');
    
    // Check that email link exists
    const emailLink = screen.getByLabelText('Send email to daisyfaithauma@gmail.com');
    expect(emailLink).toHaveAttribute('href', 'mailto:daisyfaithauma@gmail.com');
  });

  it('renders call-to-action section', () => {
    render(<ContactSection />);
    
    expect(screen.getByText("Let's Build Something Amazing Together")).toBeInTheDocument();
    expect(screen.getByText(/Whether you're looking for technical writing expertise/)).toBeInTheDocument();
  });

  it('renders collaboration areas', () => {
    render(<ContactSection />);
    
    expect(screen.getByText('Technical Writing')).toBeInTheDocument();
    expect(screen.getByText('Developer Relations')).toBeInTheDocument();
    expect(screen.getByText('AI Documentation')).toBeInTheDocument();
  });

  it('has proper section structure', () => {
    render(<ContactSection />);
    
    const section = document.querySelector('section#contact');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('py-20', 'relative');
  });
});