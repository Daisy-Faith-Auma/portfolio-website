import type { Skill } from '../types';

export const skills: Skill[] = [
  {
    id: 'technical-writing',
    title: 'Technical Writing & Documentation',
    description: 'Creating comprehensive documentation and tutorials that improve developer experience and accelerate product adoption.',
    icon: 'FileText',
    projects: [
      {
        title: 'Cloudflare Documentation Projects',
        description: 'Led comprehensive documentation initiatives for Cloudflare products, creating developer-focused guides and API references.',
        impact: [
          'Improved developer onboarding experience',
          'Reduced support ticket volume by 30%',
          'Enhanced product adoption rates'
        ],
        tags: ['Technical Writing', 'API Documentation', 'Developer Experience', 'Cloudflare'],
        links: {
          article: 'https://developers.cloudflare.com'
        }
      },
      {
        title: 'Tutorial Creation & Developer Guides',
        description: 'Authored step-by-step tutorials and best practice guides for complex technical implementations.',
        impact: [
          'Created 50+ technical tutorials',
          'Reached 10,000+ developers monthly',
          'Improved documentation clarity scores by 40%'
        ],
        tags: ['Tutorial Writing', 'Best Practices', 'Developer Education'],
        links: {
          article: 'https://dev.to/daisyauma'
        }
      }
    ]
  },
  {
    id: 'developer-relations',
    title: 'Developer Relations & Community',
    description: 'Building and nurturing developer communities through engagement, education, and strategic partnerships.',
    icon: 'Users',
    projects: [
      {
        title: 'Lux Tech Academy Community Growth',
        description: 'Co-founded and led community initiatives that transformed Lux Tech Academy into a thriving developer ecosystem.',
        impact: [
          'Grew community from 0 to 5,000+ active members',
          'Achieved 85% engagement rate in programs',
          'Launched 12 successful bootcamp cohorts'
        ],
        tags: ['Community Building', 'Developer Relations', 'Education', 'Leadership'],
        links: {
          demo: 'https://luxtechacademy.com'
        }
      },
      {
        title: 'Event Hosting & Developer Engagement',
        description: 'Organized and hosted technical events, workshops, and mentorship programs for the developer community.',
        impact: [
          'Hosted 25+ technical workshops',
          'Mentored 100+ aspiring developers',
          'Achieved 95% participant satisfaction rate'
        ],
        tags: ['Event Management', 'Mentorship', 'Public Speaking', 'Community Engagement']
      }
    ]
  },
  {
    id: 'ai-data-projects',
    title: 'AI & Data Projects',
    description: 'Developing intelligent applications and data-driven solutions using modern AI/ML technologies and frameworks.',
    icon: 'Brain',
    projects: [
      {
        title: 'Spotify Wrapped Clone',
        description: 'Built a personalized music analytics application that recreates Spotify Wrapped functionality with enhanced insights.',
        impact: [
          'Processed 1M+ music data points',
          'Achieved 95% accuracy in music preference prediction',
          'Generated personalized insights for 500+ users'
        ],
        tags: ['Python', 'Data Analysis', 'Spotify API', 'Machine Learning', 'Visualization'],
        links: {
          repo: 'https://github.com/daisyauma/spotify-wrapped-clone',
          demo: 'https://spotify-wrapped-clone.netlify.app'
        }
      },
      {
        title: 'F1 Prediction Model',
        description: 'Developed a machine learning model to predict Formula 1 race outcomes using historical data and performance metrics.',
        impact: [
          'Achieved 78% prediction accuracy',
          'Analyzed 10+ years of F1 historical data',
          'Implemented real-time prediction updates'
        ],
        tags: ['Machine Learning', 'Python', 'Pandas', 'Scikit-learn', 'Data Visualization', 'Sports Analytics'],
        links: {
          repo: 'https://github.com/daisyauma/f1-prediction-model'
        }
      }
    ]
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    description: 'Creating engaging technical content across multiple platforms to educate and inspire the developer community.',
    icon: 'Video',
    projects: [
      {
        title: 'YouTube & TikTok Technical Content',
        description: 'Producing educational videos covering web development, AI, and career advice for developers.',
        impact: [
          '50,000+ total video views',
          '2,500+ subscribers across platforms',
          '90% positive engagement rate'
        ],
        tags: ['Video Production', 'Education', 'Social Media', 'Developer Content'],
        links: {
          demo: 'https://youtube.com/@daisyauma'
        }
      },
      {
        title: 'Substack & Dev.to Publications',
        description: 'Writing in-depth technical articles and career guidance for developers through newsletter and blog platforms.',
        impact: [
          'Published 30+ technical articles',
          '5,000+ newsletter subscribers',
          'Featured in Dev.to top posts 5 times'
        ],
        tags: ['Technical Writing', 'Newsletter', 'Career Advice', 'Developer Experience'],
        links: {
          article: 'https://daisyauma.substack.com'
        }
      }
    ]
  },
  {
    id: 'leadership-mentorship',
    title: 'Leadership & Mentorship',
    description: 'Leading teams and mentoring developers through structured programs and educational initiatives.',
    icon: 'Award',
    projects: [
      {
        title: 'Bootcamp Design & Execution',
        description: 'Designed and executed comprehensive coding bootcamps focusing on full-stack development and career readiness.',
        impact: [
          'Graduated 200+ developers',
          '85% job placement rate within 6 months',
          'Average salary increase of 150% for graduates'
        ],
        tags: ['Curriculum Design', 'Education', 'Career Development', 'Full-Stack Development'],
        links: {
          demo: 'https://luxtechacademy.com/bootcamp'
        }
      },
      {
        title: 'Co-founder & Strategic Leadership',
        description: 'Co-founded Lux Tech Academy and led strategic initiatives to scale educational programs and community impact.',
        impact: [
          'Scaled organization to 15+ team members',
          'Secured partnerships with 10+ tech companies',
          'Generated $500K+ in program revenue'
        ],
        tags: ['Leadership', 'Strategy', 'Business Development', 'Team Management']
      }
    ]
  }
];