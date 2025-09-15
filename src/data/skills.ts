import React from 'react';
import { FileText, Users, Brain, Code, Video, Award } from 'lucide-react';
import type { Skill } from '../types';

export const skills: Skill[] = [
  {
    name: 'Technical Writing & Documentation',
    icon: React.createElement(FileText, { className: 'w-8 h-8' }),
    level: 95,
    color: 'from-purple-500 to-pink-500',
    description: 'Expert in creating comprehensive documentation for Archetype AI and Cloudflare, including Workers AI, AI Gateway, and Browser Rendering tutorials. Authored 10+ tutorials, setup guides, and API references that improved developer onboarding by 40%.'
  },
  {
    name: 'Developer Relations & Community',
    icon: React.createElement(Users, { className: 'w-8 h-8' }),
    level: 98,
    color: 'from-blue-500 to-cyan-500',
    description: 'Scaled Lux Tech Academy to 20k+ learners and graduated 300+ bootcamp students. Google Community Builder Recognition and Women Techmakers Ambassador. Led DevRel initiatives at Kudan Robotics with Mobile Mapping and AMR Robot Kit evaluations.'
  },
  {
    name: 'AI & Data Projects',
    icon: React.createElement(Brain, { className: 'w-8 h-8' }),
    level: 88,
    color: 'from-green-500 to-emerald-500',
    description: 'Built ML models for F1 race predictions and Spotify data visualization with music mood analysis. Proficient in Python, pandas, scikit-learn, and TensorFlow. Completed AI certificate and developed intelligent applications with real-world impact.'
  },
  {
    name: 'Software & Systems Development',
    icon: React.createElement(Code, { className: 'w-8 h-8' }),
    level: 92,
    color: 'from-orange-500 to-red-500',
    description: 'Expert in C++, Python, ROS, and SLAM systems for robotics applications. Built MPESA Daraja API integration serving 10,000+ users at Safaricom. Android development certified with experience in mobile app development and system architecture.'
  },
  {
    name: 'Content Creation & Education',
    icon: React.createElement(Video, { className: 'w-8 h-8' }),
    level: 85,
    color: 'from-pink-500 to-rose-500',
    description: 'Created YouTube and TikTok AI explainers reaching thousands of developers. Published technical articles on Medium, Substack, and Dev.to. Hosted 8 Twitter Spaces with 600+ listeners, focusing on AI education and career development.'
  },
  {
    name: 'Leadership & Mentorship',
    icon: React.createElement(Award, { className: 'w-8 h-8' }),
    level: 94,
    color: 'from-indigo-500 to-purple-500',
    description: 'Led 300+ bootcamp graduates to successful tech careers. Co-founder of LuxDev HQ, completed McKinsey Forward Program. Active Technovation Challenge mentor, guiding young women in technology and entrepreneurship with measurable impact.'
  }
];