import { describe, it, expect } from 'vitest';
import { contactLinks } from '../../data/contact';
import type { ContactLink } from '../../types';

describe('Contact Data', () => {
  it('exports an array of contact links', () => {
    expect(Array.isArray(contactLinks)).toBe(true);
    expect(contactLinks.length).toBeGreaterThan(0);
  });

  it('contains both personal and professional categories', () => {
    const personalLinks = contactLinks.filter(link => link.category === 'personal');
    const professionalLinks = contactLinks.filter(link => link.category === 'professional');
    
    expect(personalLinks.length).toBeGreaterThan(0);
    expect(professionalLinks.length).toBeGreaterThan(0);
  });

  it('has valid structure for each contact link', () => {
    contactLinks.forEach((link: ContactLink) => {
      expect(link).toHaveProperty('platform');
      expect(link).toHaveProperty('url');
      expect(link).toHaveProperty('icon');
      expect(link).toHaveProperty('category');
      
      expect(typeof link.platform).toBe('string');
      expect(typeof link.url).toBe('string');
      expect(typeof link.icon).toBe('string');
      expect(['personal', 'professional']).toContain(link.category);
    });
  });

  it('has valid URLs for all links', () => {
    contactLinks.forEach((link: ContactLink) => {
      expect(link.url).toMatch(/^https?:\/\/.+|^mailto:.+/);
    });
  });

  it('contains expected personal platforms', () => {
    const personalPlatforms = contactLinks
      .filter(link => link.category === 'personal')
      .map(link => link.platform);
    
    const expectedPersonalPlatforms = [
      'LinkedIn',
      'GitHub',
      'YouTube',
      'TikTok',
      'Substack',
      'Dev.to',
      'Twitter/X'
    ];
    
    expectedPersonalPlatforms.forEach(platform => {
      expect(personalPlatforms).toContain(platform);
    });
  });

  it('contains expected professional platforms', () => {
    const professionalPlatforms = contactLinks
      .filter(link => link.category === 'professional')
      .map(link => link.platform);
    
    const expectedProfessionalPlatforms = [
      'Lux Academy LinkedIn',
      'Lux Academy Twitter',
      'Portfolio'
    ];
    
    expectedProfessionalPlatforms.forEach(platform => {
      expect(professionalPlatforms).toContain(platform);
    });
  });

  it('has unique platforms within each category', () => {
    const personalPlatforms = contactLinks
      .filter(link => link.category === 'personal')
      .map(link => link.platform);
    
    const professionalPlatforms = contactLinks
      .filter(link => link.category === 'professional')
      .map(link => link.platform);
    
    const uniquePersonalPlatforms = [...new Set(personalPlatforms)];
    const uniqueProfessionalPlatforms = [...new Set(professionalPlatforms)];
    
    expect(personalPlatforms.length).toBe(uniquePersonalPlatforms.length);
    expect(professionalPlatforms.length).toBe(uniqueProfessionalPlatforms.length);
  });

  it('has appropriate icons for each platform', () => {
    const iconMappings = {
      'LinkedIn': 'Linkedin',
      'GitHub': 'Github',
      'YouTube': 'Youtube',
      'TikTok': 'Music',
      'Substack': 'Mail',
      'Dev.to': 'Code',
      'Twitter/X': 'Twitter',
      'Lux Academy LinkedIn': 'Building',
      'Lux Academy Twitter': 'Building2',
      'Portfolio': 'Globe'
    };
    
    contactLinks.forEach(link => {
      if (iconMappings[link.platform as keyof typeof iconMappings]) {
        expect(link.icon).toBe(iconMappings[link.platform as keyof typeof iconMappings]);
      }
    });
  });

  it('has valid domain names in URLs', () => {
    const expectedDomains = [
      'linkedin.com',
      'github.com',
      'youtube.com',
      'tiktok.com',
      'substack.com',
      'dev.to',
      'twitter.com',
      'daisyauma.dev',
      'luxtechacademy.com'
    ];
    
    contactLinks.forEach(link => {
      if (link.url.startsWith('http')) {
        const domain = new URL(link.url).hostname;
        const isValidDomain = expectedDomains.some(expectedDomain => 
          domain.includes(expectedDomain)
        );
        expect(isValidDomain).toBe(true);
      }
    });
  });

  it('has consistent URL patterns for similar platforms', () => {
    const linkedinLinks = contactLinks.filter(link => 
      link.platform.toLowerCase().includes('linkedin')
    );
    
    linkedinLinks.forEach(link => {
      expect(link.url).toMatch(/^https:\/\/linkedin\.com\//);
    });
    
    const twitterLinks = contactLinks.filter(link => 
      link.platform.toLowerCase().includes('twitter')
    );
    
    twitterLinks.forEach(link => {
      expect(link.url).toMatch(/^https:\/\/twitter\.com\//);
    });
  });

  it('maintains data integrity', () => {
    // Check that no links are duplicated
    const urls = contactLinks.map(link => link.url);
    const uniqueUrls = [...new Set(urls)];
    expect(urls.length).toBe(uniqueUrls.length);
    
    // Check that all required fields are non-empty
    contactLinks.forEach(link => {
      expect(link.platform.trim()).toBeTruthy();
      expect(link.url.trim()).toBeTruthy();
      expect(link.icon.trim()).toBeTruthy();
      expect(link.category.trim()).toBeTruthy();
    });
  });
});