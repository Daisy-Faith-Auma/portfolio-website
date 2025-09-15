export interface Skill {
  id: string;
  title: string;
  description: string;
  icon: string;
  projects: Project[];
}

export interface Project {
  title: string;
  description: string;
  impact: string[];
  tags: string[];
  links?: {
    demo?: string;
    repo?: string;
    article?: string;
  };
}

export interface ContactLink {
  platform: string;
  url: string;
  icon: string;
  category: 'personal' | 'professional';
}