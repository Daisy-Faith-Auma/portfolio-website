import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Code, Palette, Database, Globe, Smartphone, ArrowRight, Star, FileText, Users, Brain, Award, Youtube, BookOpen } from 'lucide-react';

const ModernPortfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = [
    { 
      name: 'Technical Writing & Documentation', 
      icon: <FileText className="w-6 h-6" />, 
      level: 95, 
      color: 'from-blue-500 to-cyan-400',
      description: 'Archetype AI & Cloudflare docs. Workers AI, AI Gateway, Browser Rendering. 10+ tutorials, setup guides, API references.'
    },
    { 
      name: 'Developer Relations & Community', 
      icon: <Users className="w-6 h-6" />, 
      level: 98, 
      color: 'from-purple-500 to-pink-400',
      description: 'Scaled Lux Tech Academy to 20k+ learners. Google Community Builder Recognition. WTM Ambassador. DevRel at Kudan.'
    },
    { 
      name: 'AI & Data Projects', 
      icon: <Brain className="w-6 h-6" />, 
      level: 88, 
      color: 'from-green-500 to-emerald-400',
      description: 'ML models for F1 predictions, Spotify data visualization, music mood analysis with Python & ML. AI certificate.'
    },
    { 
      name: 'Software & Systems Development', 
      icon: <Code className="w-6 h-6" />, 
      level: 92, 
      color: 'from-orange-500 to-red-400',
      description: 'C++, Python, ROS, SLAM systems. MPESA Daraja API for 10k+ users. Android development certified. Robotics & AMR kits.'
    },
    { 
      name: 'Content Creation & Education', 
      icon: <Youtube className="w-6 h-6" />, 
      level: 85, 
      color: 'from-red-500 to-pink-400',
      description: 'YouTube & TikTok AI explainers. Technical articles on Medium, Substack & Dev.to. 8 Twitter Spaces, 600+ listeners.'
    },
    { 
      name: 'Leadership & Mentorship', 
      icon: <Award className="w-6 h-6" />, 
      level: 94, 
      color: 'from-indigo-500 to-purple-400',
      description: 'Led 300+ bootcamp graduates. Co-founder LuxDev HQ. McKinsey Forward Program. Technovation Challenge mentor.'
    }
  ];

  const projects = [
    {
      title: 'Archetype AI Documentation',
      description: 'End-to-end customer-facing documentation including setup guides, API references, architecture overviews, and troubleshooting tutorials for AI/ML platform.',
      tech: ['Technical Writing', 'API Docs', 'Mintlify', 'ML Engineering'],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
      github: '#',
      live: 'https://archetype.ai'
    },
    {
      title: 'Cloudflare AI & Workers Documentation',
      description: 'Comprehensive documentation for Workers AI, AI Gateway, and Browser Rendering. 10+ tutorials improving developer onboarding by 40%. Complete brand overhaul.',
      tech: ['Technical Writing', 'API Docs', 'Tutorials', 'Developer Experience'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      github: 'https://github.com/cloudflare/cloudflare-docs/pulls?q=is%3Apr+author%3Adaisyfaithauma+is%3Aclosed',
      live: 'https://developers.cloudflare.com/workers-ai/'
    },
    {
      title: 'Kudan Robotics DevRel',
      description: 'Led Mobile Mapping and AMR Robot Kit evaluations for global clients. Created educational materials and customer-facing documentation for Intel AMR Robot Kit.',
      tech: ['DevRel', 'Robotics', 'SLAM', 'C++', 'ROS'],
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
      github: '#',
      live: 'https://www.kudan.io/'
    },
    {
      title: 'Spotify Wrapped Clone',
      description: 'Data visualization project analyzing Spotify listening patterns using Python, pandas, and interactive charts. Recreates the popular Spotify Wrapped experience.',
      tech: ['Python', 'Pandas', 'Matplotlib', 'Data Viz'],
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
      github: 'https://github.com/Daisy-Faith-Auma/spotify-wrapped',
      live: 'https://github.com/Daisy-Faith-Auma/spotify-wrapped'
    },
    {
      title: 'F1 Prediction Model',
      description: 'Machine learning model predicting Formula 1 race outcomes using historical data, driver performance metrics, and track conditions with Python and scikit-learn.',
      tech: ['Python', 'Scikit-learn', 'ML', 'Data Analysis'],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      github: 'https://github.com/Daisy-Faith-Auma/f1_prediction_model',
      live: 'https://github.com/Daisy-Faith-Auma/f1_prediction_model'
    },
    {
      title: 'MPESA Daraja API Integration',
      description: 'Managed MPESA Daraja API integration serving 10,000+ users at Safaricom. Provided DevOps support, participated in Daraja 2.0 launch and stabilization.',
      tech: ['API Integration', 'DevOps', 'Mobile Money', 'Scale', 'Java'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
      github: 'https://developer.safaricom.co.ke/daraja/apis/post/safaricom-sandbox',
      live: 'https://developer.safaricom.co.ke/daraja/apis/post/safaricom-sandbox'
    }
  ];

  const contentLinks = [
    {
      platform: 'YouTube',
      handle: '@daisy_codes',
      description: 'AI & data science tutorials',
      url: 'https://youtube.com/@daisy_codes',
      icon: <Youtube className="w-5 h-5" />,
      color: 'hover:text-red-400'
    },
    {
      platform: 'TikTok',
      handle: '@daisy_codes',
      description: 'Short-form AI explainers & tech tips',
      url: 'https://tiktok.com/@daisy_codes',
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.321 5.562a5.122 5.122 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.347-2.025-1.347-3.25V.5h-3.375v15.938c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3c.338 0 .663.056.969.156V10.25a6.963 6.963 0 0 0-.969-.094c-3.863 0-7 3.137-7 7s3.137 7 7 7 7-3.137 7-7V8.625c1.234.456 2.569.719 3.969.719v-3.375c-.338 0-.663-.056-.969-.156-.413-.119-.806-.281-1.169-.469z"/></svg>,
      color: 'hover:text-pink-400'
    },
    {
      platform: 'Medium',
      handle: 'Technical Writing',
      description: 'In-depth articles on AI & development',
      url: 'https://medium.com/@daisyfaithauma',
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>,
      color: 'hover:text-green-400'
    },
    {
      platform: 'Substack',
      handle: 'Newsletter',
      description: 'Weekly AI & tech insights',
      url: 'https://daisyfaithauma.substack.com',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'hover:text-orange-400'
    },
    {
      platform: 'Dev.to',
      handle: '@daisyauma',
      description: 'Developer community articles',
      url: 'https://dev.to/daisyauma',
      icon: <Code className="w-5 h-5" />,
      color: 'hover:text-purple-400'
    }
  ];

  const achievements = [
    {
      title: 'Technical Writer at Archetype AI',
      year: 'Sep 2025 - Present',
      organization: 'Archetype AI',
      description: 'End-to-end customer documentation, API references, architecture overviews. Working with ML engineers and product managers.'
    },
    {
      title: 'Google Community Builder Recognition',
      year: 'Jan 2024',
      organization: 'Google for Developers',
      description: 'Recognized for impactful developer community building and contributions'
    },
    {
      title: 'Women Techmakers Ambassador',
      year: 'Jan 2024-Present',
      organization: 'Google',
      description: 'Supporting women in technology through mentorship and advocacy programs'
    },
    {
      title: 'BSc Computer Technology',
      year: 'Sep 2017 - Nov 2021',
      organization: 'Maseno University',
      description: 'Bachelor of Science in Computer Technology with focus on software systems'
    },
    {
      title: 'Co-founder LuxDev HQ',
      year: 'May 2023-Present',
      organization: 'LuxDev HQ',
      description: 'Co-founded developer community hub. 20k+ learners, 300+ bootcamp graduates'
    },
    {
      title: 'McKinsey Forward Program',
      year: 'Aug 2022',
      organization: 'McKinsey & Company',
      description: 'Product Management & Leadership certification program graduate'
    }
  ];

  const SkillBar = ({ skill, index }) => (
    <div className="group mb-8 transform hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg bg-gradient-to-r ${skill.color} text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
            {skill.icon}
          </div>
          <div>
            <span className="text-gray-200 font-semibold text-lg">{skill.name}</span>
            <p className="text-gray-400 text-sm mt-1">{skill.description}</p>
          </div>
        </div>
        <span className="text-gray-300 font-bold text-lg">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
        <div 
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out transform group-hover:brightness-110`}
          style={{ width: `${skill.level}%`, animationDelay: `${index * 200}ms` }}
        />
      </div>
    </div>
  );

  const ProjectCard = ({ project, index }) => (
    <div className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20">
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 right-4 flex space-x-2">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-purple-600 transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-purple-600 transition-colors">
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{project.title}</h3>
        <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900" />
        <div 
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'all 0.3s ease'
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '8s', animationDelay: '2s' }} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Daisy Faith Auma
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Projects', 'Content', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-purple-400 transition-colors relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">DA</span>
              </div>
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent animate-pulse">
            Daisy Faith Auma
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">Technical Writer • Developer Relations Engineer • AI Enthusiast</p>
          <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Currently Technical Writer at <span className="text-cyan-400 font-semibold">Archetype AI</span>. 
            Previously at <span className="text-orange-400 font-semibold">Cloudflare</span> documenting Workers AI & AI Gateway. 
            Building developer communities, creating AI content, and helping 20k+ learners through 
            <span className="text-purple-400 font-semibold"> Lux Tech Academy</span>. 
            Google Community Builder & Women Techmakers Ambassador.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>View My Work</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a 
              href="https://daisy-auma.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 border border-gray-600 rounded-full font-semibold hover:border-purple-500 hover:text-purple-400 transition-all duration-300"
            >
              View Current Portfolio
            </a>
          </div>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/daisyfaithauma" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-purple-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/daisyfaithauma/" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://twitter.com/daisyfaithauma" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-blue-400 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="mailto:daisyfaithauma@gmail.com" className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-gray-400 text-lg max-w-4xl mx-auto leading-relaxed">
              I'm a Technical Writer at Archetype AI, previously at Cloudflare documenting AI products. 
              I have 4+ years of experience in robotics, developer content, and API integrations. 
              I've helped scale Lux Tech Academy to 20,000+ learners and received Google Community Builder Recognition.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {achievements.map((achievement, index) => (
              <div key={index} className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 text-center transform hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{achievement.title}</h3>
                <p className="text-purple-400 text-sm font-medium mb-2">{achievement.organization}</p>
                <p className="text-gray-400 text-sm">{achievement.description}</p>
                <span className="text-gray-500 text-xs">{achievement.year}</span>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
              From managing MPESA Daraja API integrations for 10,000+ users to documenting cutting-edge AI features, 
              I bridge the gap between complex technology and practical implementation. 
              Skilled in C++, Python, ROS, and SLAM systems, with expertise in robotics and mobile development.
            </p>
          </div>

          {/* Technical Skills & Certifications */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Technical Skills & Certifications
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50">
                <div className="w-12 h-12 mb-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold mb-2 text-cyan-400">Programming</h4>
                <p className="text-gray-300 text-sm">C++, Python, Java, Kotlin</p>
              </div>
              
              <div className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50">
                <div className="w-12 h-12 mb-4 bg-gradient-to-r from-green-500 to-emerald-400 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold mb-2 text-emerald-400">Frameworks & Tools</h4>
                <p className="text-gray-300 text-sm">ROS, SLAM, MongoDB, Android SDK, GCP</p>
              </div>
              
              <div className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50">
                <div className="w-12 h-12 mb-4 bg-gradient-to-r from-purple-500 to-pink-400 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold mb-2 text-pink-400">Documentation</h4>
                <p className="text-gray-300 text-sm">API Management, Technical Writing, Mintlify, GitHub</p>
              </div>
              
              <div className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50">
                <div className="w-12 h-12 mb-4 bg-gradient-to-r from-orange-500 to-red-400 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold mb-2 text-red-400">Certifications</h4>
                <p className="text-gray-300 text-sm">Android Dev (Andela), Women Dev Academy (Google), REST APIs</p>
              </div>
            </div>
          </div>

          {/* Volunteer Work */}
          <div>
            <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Community Impact & Volunteering
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 text-center transform hover:scale-105 transition-all duration-300">
                <Users className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                <h4 className="font-bold mb-2">Technovation Challenge Mentor</h4>
                <p className="text-gray-400 text-sm">Mentoring young women in tech entrepreneurship and app development</p>
              </div>
              
              <div className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 text-center transform hover:scale-105 transition-all duration-300">
                <Globe className="w-10 h-10 text-pink-400 mx-auto mb-3" />
                <h4 className="font-bold mb-2">NIGEE Volunteer</h4>
                <p className="text-gray-400 text-sm">Supporting Nyanza Initiative for Girls Education & Empowerment</p>
              </div>
              
              <div className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 text-center transform hover:scale-105 transition-all duration-300">
                <Star className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
                <h4 className="font-bold mb-2">LuxDev HQ Co-founder</h4>
                <p className="text-gray-400 text-sm">Building developer community hub and educational programs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <p className="text-gray-400 text-lg">My skill-based approach to building impactful technology solutions</p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            {skills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-lg">From AI models to developer tools, here's what I've been building</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Content Creation Section */}
      <section id="content" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Content & Community
            </h2>
            <p className="text-gray-400 text-lg">Teaching AI, data science, and developer tools to thousands</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {contentLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gray-700/50 rounded-full flex items-center justify-center group-hover:bg-purple-600/20 transition-colors ${link.color}`}>
                  {link.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{link.platform}</h3>
                <p className="text-purple-400 font-medium mb-2">{link.handle}</p>
                <p className="text-gray-400 text-sm">{link.description}</p>
              </a>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center space-x-6 p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">20k+</div>
                <div className="text-gray-400 text-sm">Lux Academy Learners</div>
              </div>
              <div className="w-px h-12 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">300+</div>
                <div className="text-gray-400 text-sm">Bootcamp Graduates</div>
              </div>
              <div className="w-px h-12 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">10+</div>
                <div className="text-gray-400 text-sm">Cloudflare Tutorials</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-gray-400 text-lg mb-12">
            Whether you're interested in collaboration, mentorship, or just want to chat about AI and developer tools, I'd love to hear from you.
          </p>
          
          <div className="p-8 bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 mb-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              <a href="mailto:daisyfaithauma@gmail.com" className="p-6 bg-gray-700/30 rounded-2xl hover:bg-red-600/20 transition-all duration-300 transform hover:scale-105 group">
                <Mail className="w-8 h-8 text-red-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-400 text-sm">daisyfaithauma@gmail.com</p>
              </a>
              <a href="tel:+447377966588" className="p-6 bg-gray-700/30 rounded-2xl hover:bg-green-600/20 transition-all duration-300 transform hover:scale-105 group">
                <svg className="w-8 h-8 text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-gray-400 text-sm">+44 7377 966588</p>
              </a>
              <a href="https://www.linkedin.com/in/daisyfaithauma/" target="_blank" rel="noopener noreferrer" className="p-6 bg-gray-700/30 rounded-2xl hover:bg-blue-600/20 transition-all duration-300 transform hover:scale-105 group">
                <Linkedin className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">LinkedIn</h3>
                <p className="text-gray-400 text-sm">Professional Network</p>
              </a>
              <a href="https://twitter.com/daisyfaithauma" target="_blank" rel="noopener noreferrer" className="p-6 bg-gray-700/30 rounded-2xl hover:bg-blue-400/20 transition-all duration-300 transform hover:scale-105 group">
                <svg className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <h3 className="font-semibold mb-2">Twitter/X</h3>
                <p className="text-gray-400 text-sm">Tech Thoughts</p>
              </a>
              <a href="https://github.com/daisyfaithauma" target="_blank" rel="noopener noreferrer" className="p-6 bg-gray-700/30 rounded-2xl hover:bg-purple-600/20 transition-all duration-300 transform hover:scale-105 group">
                <Github className="w-8 h-8 text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">GitHub</h3>
                <p className="text-gray-400 text-sm">View Code</p>
              </a>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-300 mb-6">
              Currently open to new opportunities and collaborations. Let's build something amazing together!
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="https://www.linkedin.com/company/lux-tech-academy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
              >
                Lux Tech Academy
              </a>
              <a 
                href="https://twitter.com/LuxTechAcademy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-600 rounded-full font-semibold hover:border-purple-500 hover:text-purple-400 transition-all duration-300"
              >
                @LuxTechAcademy
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Daisy Faith Auma. Crafted with 💜 using React & Tailwind CSS
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-500">
            <span>Technical Writer @ Cloudflare</span>
            <span>•</span>
            <span>Google Community Builder</span>
            <span>•</span>
            <span>Women Techmakers Ambassador</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernPortfolio;