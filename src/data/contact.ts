import React from 'react';
import { Youtube, Music, FileText, Mail, Code } from 'lucide-react';
import type { ContentLink } from '../types';

export const contentLinks: ContentLink[] = [
  {
    platform: 'YouTube',
    handle: '@daisy_codes',
    description: 'AI & data science tutorials, coding walkthroughs, and tech career advice for developers',
    url: 'https://youtube.com/@daisy_codes',
    icon: React.createElement(Youtube, { className: 'w-6 h-6' }),
    color: 'hover:text-red-500'
  },
  {
    platform: 'TikTok',
    handle: '@daisy_codes',
    description: 'Short-form AI explainers, tech tips, and quick coding tutorials for the developer community',
    url: 'https://tiktok.com/@daisy_codes',
    icon: React.createElement(Music, { className: 'w-6 h-6' }),
    color: 'hover:text-pink-500'
  },
  {
    platform: 'Medium',
    handle: 'Technical Writing',
    description: 'In-depth articles on AI, machine learning, developer relations, and technical documentation best practices',
    url: 'https://medium.com/@daisyauma',
    icon: React.createElement(FileText, { className: 'w-6 h-6' }),
    color: 'hover:text-green-500'
  },
  {
    platform: 'Substack',
    handle: 'Newsletter',
    description: 'Weekly AI & tech insights, industry trends, and career development advice for tech professionals',
    url: 'https://daisyauma.substack.com',
    icon: React.createElement(Mail, { className: 'w-6 h-6' }),
    color: 'hover:text-orange-500'
  },
  {
    platform: 'Dev.to',
    handle: '@daisyauma',
    description: 'Developer community articles covering web development, AI projects, and technical tutorials',
    url: 'https://dev.to/daisyauma',
    icon: React.createElement(Code, { className: 'w-6 h-6' }),
    color: 'hover:text-purple-500'
  }
];

// Community metrics for display
export const communityMetrics = {
  luxAcademyLearners: '20k+',
  bootcampGraduates: '300+',
  cloudflareTutorials: '10+',
  twitterSpaces: '8',
  twitterSpaceListeners: '600+'
};