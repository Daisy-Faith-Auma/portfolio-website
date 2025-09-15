import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export interface ContactLink {
  platform: string;
  url: string;
  icon: React.ReactElement;
  color: string;
}

export const contactLinks: ContactLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/daisyauma',
    icon: React.createElement(Github, { className: 'w-6 h-6' }),
    color: 'hover:text-gray-400'
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/daisyauma',
    icon: React.createElement(Linkedin, { className: 'w-6 h-6' }),
    color: 'hover:text-blue-500'
  },
  {
    platform: 'Twitter/X',
    url: 'https://twitter.com/daisyauma',
    icon: React.createElement(Twitter, { className: 'w-6 h-6' }),
    color: 'hover:text-blue-400'
  },
  {
    platform: 'Email',
    url: 'mailto:daisy@daisyauma.dev',
    icon: React.createElement(Mail, { className: 'w-6 h-6' }),
    color: 'hover:text-green-500'
  }
];