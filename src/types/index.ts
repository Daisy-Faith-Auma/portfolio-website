import React from 'react';

export interface Skill {
  name: string;
  icon: React.ReactElement;
  level: number; // Percentage (0-100)
  color: string; // Tailwind gradient classes
  description: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string; // Unsplash or project image URL
  github: string;
  live: string;
}

export interface ContentLink {
  platform: string;
  handle: string;
  description: string;
  url: string;
  icon: React.ReactElement;
  color: string; // Hover color class
}

export interface Achievement {
  title: string;
  year: string;
  organization: string;
  description: string;
}

export interface MousePosition {
  x: number;
  y: number;
}