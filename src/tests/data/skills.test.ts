import { describe, it, expect } from 'vitest';
import { skills } from '../../data/skills';
import type { Skill, Project } from '../../types';

describe('Skills Data', () => {
  it('exports an array of skills', () => {
    expect(Array.isArray(skills)).toBe(true);
    expect(skills.length).toBeGreaterThan(0);
  });

  it('contains exactly 5 skill categories as per requirements', () => {
    expect(skills.length).toBe(5);
  });

  it('has valid structure for each skill', () => {
    skills.forEach((skill: Skill) => {
      expect(skill).toHaveProperty('id');
      expect(skill).toHaveProperty('title');
      expect(skill).toHaveProperty('description');
      expect(skill).toHaveProperty('icon');
      expect(skill).toHaveProperty('projects');
      
      expect(typeof skill.id).toBe('string');
      expect(typeof skill.title).toBe('string');
      expect(typeof skill.description).toBe('string');
      expect(typeof skill.icon).toBe('string');
      expect(Array.isArray(skill.projects)).toBe(true);
    });
  });

  it('contains all required skill categories', () => {
    const skillIds = skills.map(skill => skill.id);
    const expectedSkillIds = [
      'technical-writing',
      'developer-relations',
      'ai-data-projects',
      'content-creation',
      'leadership-mentorship'
    ];
    
    expectedSkillIds.forEach(expectedId => {
      expect(skillIds).toContain(expectedId);
    });
  });

  it('has unique skill IDs', () => {
    const skillIds = skills.map(skill => skill.id);
    const uniqueSkillIds = [...new Set(skillIds)];
    expect(skillIds.length).toBe(uniqueSkillIds.length);
  });

  it('has appropriate icons for each skill category', () => {
    const expectedIcons = {
      'technical-writing': 'FileText',
      'developer-relations': 'Users',
      'ai-data-projects': 'Brain',
      'content-creation': 'Video',
      'leadership-mentorship': 'Award'
    };
    
    skills.forEach(skill => {
      expect(skill.icon).toBe(expectedIcons[skill.id as keyof typeof expectedIcons]);
    });
  });

  it('has valid project structure for each skill', () => {
    skills.forEach(skill => {
      expect(skill.projects.length).toBeGreaterThan(0);
      
      skill.projects.forEach((project: Project) => {
        expect(project).toHaveProperty('title');
        expect(project).toHaveProperty('description');
        expect(project).toHaveProperty('impact');
        expect(project).toHaveProperty('tags');
        
        expect(typeof project.title).toBe('string');
        expect(typeof project.description).toBe('string');
        expect(Array.isArray(project.impact)).toBe(true);
        expect(Array.isArray(project.tags)).toBe(true);
        
        // Links are optional
        if (project.links) {
          expect(typeof project.links).toBe('object');
        }
      });
    });
  });

  it('has meaningful impact metrics for projects', () => {
    skills.forEach(skill => {
      skill.projects.forEach(project => {
        expect(project.impact.length).toBeGreaterThan(0);
        
        project.impact.forEach(impactItem => {
          expect(typeof impactItem).toBe('string');
          expect(impactItem.trim()).toBeTruthy();
        });
      });
    });
  });

  it('has relevant technology tags for projects', () => {
    skills.forEach(skill => {
      skill.projects.forEach(project => {
        expect(project.tags.length).toBeGreaterThan(0);
        
        project.tags.forEach(tag => {
          expect(typeof tag).toBe('string');
          expect(tag.trim()).toBeTruthy();
        });
      });
    });
  });

  it('has valid URLs when links are provided', () => {
    skills.forEach(skill => {
      skill.projects.forEach(project => {
        if (project.links) {
          Object.values(project.links).forEach(url => {
            if (url) {
              expect(url).toMatch(/^https?:\/\/.+/);
            }
          });
        }
      });
    });
  });

  it('contains expected skill titles', () => {
    const skillTitles = skills.map(skill => skill.title);
    const expectedTitles = [
      'Technical Writing & Documentation',
      'Developer Relations & Community',
      'AI & Data Projects',
      'Content Creation',
      'Leadership & Mentorship'
    ];
    
    expectedTitles.forEach(expectedTitle => {
      expect(skillTitles).toContain(expectedTitle);
    });
  });

  it('has comprehensive descriptions for each skill', () => {
    skills.forEach(skill => {
      expect(skill.description.length).toBeGreaterThan(50);
      expect(skill.description).toMatch(/[.!?]$/); // Ends with punctuation
    });
  });

  it('contains specific projects mentioned in requirements', () => {
    // Check for Cloudflare documentation
    const technicalWritingSkill = skills.find(skill => skill.id === 'technical-writing');
    expect(technicalWritingSkill).toBeDefined();
    
    const cloudflareProject = technicalWritingSkill?.projects.find(project => 
      project.title.toLowerCase().includes('cloudflare')
    );
    expect(cloudflareProject).toBeDefined();
    
    // Check for Lux Tech Academy
    const devRelSkill = skills.find(skill => skill.id === 'developer-relations');
    expect(devRelSkill).toBeDefined();
    
    const luxProject = devRelSkill?.projects.find(project => 
      project.title.toLowerCase().includes('lux')
    );
    expect(luxProject).toBeDefined();
    
    // Check for AI projects
    const aiSkill = skills.find(skill => skill.id === 'ai-data-projects');
    expect(aiSkill).toBeDefined();
    
    const spotifyProject = aiSkill?.projects.find(project => 
      project.title.toLowerCase().includes('spotify')
    );
    const f1Project = aiSkill?.projects.find(project => 
      project.title.toLowerCase().includes('f1')
    );
    expect(spotifyProject).toBeDefined();
    expect(f1Project).toBeDefined();
  });

  it('has quantifiable metrics in impact statements', () => {
    const hasQuantifiableMetrics = (impact: string[]): boolean => {
      return impact.some(item => 
        /\d+/.test(item) || // Contains numbers
        /%/.test(item) ||   // Contains percentages
        /\$/.test(item)     // Contains dollar amounts
      );
    };
    
    skills.forEach(skill => {
      skill.projects.forEach(project => {
        expect(hasQuantifiableMetrics(project.impact)).toBe(true);
      });
    });
  });

  it('maintains consistent data quality', () => {
    skills.forEach(skill => {
      // Check that all required fields are non-empty
      expect(skill.id.trim()).toBeTruthy();
      expect(skill.title.trim()).toBeTruthy();
      expect(skill.description.trim()).toBeTruthy();
      expect(skill.icon.trim()).toBeTruthy();
      
      skill.projects.forEach(project => {
        expect(project.title.trim()).toBeTruthy();
        expect(project.description.trim()).toBeTruthy();
        expect(project.impact.length).toBeGreaterThan(0);
        expect(project.tags.length).toBeGreaterThan(0);
      });
    });
  });

  it('has appropriate project distribution across skills', () => {
    // Each skill should have at least 2 projects for good showcase
    skills.forEach(skill => {
      expect(skill.projects.length).toBeGreaterThanOrEqual(2);
    });
  });
});