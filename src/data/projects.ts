import type { Project } from '../types';
import { skills } from './skills';

// Extract all projects from skills for easy access
export const projects: Project[] = skills.flatMap(skill => skill.projects);

// Featured projects for quick access
export const featuredProjects = {
  cloudflareDocumentation: projects.find(p => p.title === 'Cloudflare Documentation Projects'),
  luxTechAcademy: projects.find(p => p.title === 'Lux Tech Academy Community Growth'),
  spotifyWrapped: projects.find(p => p.title === 'Spotify Wrapped Clone'),
  f1Prediction: projects.find(p => p.title === 'F1 Prediction Model'),
  bootcampDesign: projects.find(p => p.title === 'Bootcamp Design & Execution')
};