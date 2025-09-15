import React from 'react';
import { Youtube, MessageCircle, FileText, Mail, Code } from 'lucide-react';

export interface ContentPlatform {
  platform: string;
  handle: string;
  description: string;
  url: string;
  icon: React.ReactElement;
  color: string;
  hoverColor: string;
}

export const contentPlatforms: ContentPlatform[] = [
  {
    platform: 'YouTube',
    handle: '@daisy_codes',
    description: 'AI & data science tutorials, tech explainers',
    url: 'https://youtube.com/@daisy_codes',
    icon: React.createElement(Youtube, { className: 'w-8 h-8' }),
    color: 'text-red-500',
    hoverColor: 'hover:bg-red-500/10 hover:border-red-500/30'
  },
  {
    platform: 'TikTok',
    handle: '@daisy_codes',
    description: 'Short-form AI explainers & tech tips',
    url: 'https://tiktok.com/@daisy_codes',
    icon: React.createElement(MessageCircle, { className: 'w-8 h-8' }),
    color: 'text-pink-500',
    hoverColor: 'hover:bg-pink-500/10 hover:border-pink-500/30'
  },
  {
    platform: 'Medium',
    handle: 'Technical Writing',
    description: 'In-depth articles on AI & development',
    url: 'https://medium.com/@daisyauma',
    icon: React.createElement(FileText, { className: 'w-8 h-8' }),
    color: 'text-green-500',
    hoverColor: 'hover:bg-green-500/10 hover:border-green-500/30'
  },
  {
    platform: 'Substack',
    handle: 'Newsletter',
    description: 'Weekly AI & tech insights',
    url: 'https://daisyauma.substack.com',
    icon: React.createElement(Mail, { className: 'w-8 h-8' }),
    color: 'text-orange-500',
    hoverColor: 'hover:bg-orange-500/10 hover:border-orange-500/30'
  },
  {
    platform: 'Dev.to',
    handle: '@daisyauma',
    description: 'Developer community articles',
    url: 'https://dev.to/daisyauma',
    icon: React.createElement(Code, { className: 'w-8 h-8' }),
    color: 'text-purple-500',
    hoverColor: 'hover:bg-purple-500/10 hover:border-purple-500/30'
  }
];

export interface CommunityMetric {
  label: string;
  value: string;
  description: string;
}

export const communityMetrics: CommunityMetric[] = [
  {
    label: 'Lux Academy Learners',
    value: '20k+',
    description: 'Students reached through educational programs'
  },
  {
    label: 'Bootcamp Graduates',
    value: '300+',
    description: 'Developers mentored to completion'
  },
  {
    label: 'Cloudflare Tutorials',
    value: '10+',
    description: 'Technical guides and documentation'
  }
];