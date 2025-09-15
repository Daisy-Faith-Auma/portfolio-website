import { useState, useEffect } from 'react';
import './styles/globals.css';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContentSection from './components/ContentSection';
import ContactSection from './components/ContactSection';

interface MousePosition {
  x: number;
  y: number;
}

function App() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Simulate initial loading time for critical resources
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(loadingTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Enhanced smooth scroll function
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed nav
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900" />
        
        {/* Mouse-following gradient effect */}
        <div 
          className="absolute w-96 h-96 bg-purple-500/15 rounded-full blur-3xl transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transform: `translate(${Math.sin(scrollY * 0.001) * 20}px, ${Math.cos(scrollY * 0.001) * 20}px)`,
          }}
        />
        
        {/* Additional mouse-following effect with different color */}
        <div 
          className="absolute w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl transition-all duration-500 ease-out"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
            transform: `translate(${Math.cos(scrollY * 0.002) * 15}px, ${Math.sin(scrollY * 0.002) * 15}px)`,
          }}
        />

        {/* Floating gradient orbs with enhanced animations */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Primary floating orbs */}
          <div 
            className="absolute top-20 left-20 w-72 h-72 bg-blue-500/8 rounded-full blur-3xl animate-float-slow"
            style={{ 
              animationDuration: '8s',
              animationDelay: '0s',
              transform: `translateY(${scrollY * 0.1}px)`
            }} 
          />
          <div 
            className="absolute bottom-20 right-20 w-64 h-64 bg-pink-500/8 rounded-full blur-3xl animate-float-slow"
            style={{ 
              animationDuration: '10s',
              animationDelay: '2s',
              transform: `translateY(${scrollY * -0.05}px)`
            }} 
          />
          <div 
            className="absolute top-1/2 left-1/4 w-48 h-48 bg-purple-500/6 rounded-full blur-2xl animate-float-slow"
            style={{ 
              animationDuration: '12s',
              animationDelay: '4s',
              transform: `translateY(${scrollY * 0.08}px)`
            }} 
          />
          <div 
            className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-cyan-500/6 rounded-full blur-2xl animate-float-slow"
            style={{ 
              animationDuration: '9s',
              animationDelay: '1s',
              transform: `translateY(${scrollY * -0.12}px)`
            }} 
          />
          
          {/* Smaller accent orbs */}
          <div 
            className="absolute top-1/4 right-1/4 w-32 h-32 bg-emerald-500/4 rounded-full blur-xl animate-float-slow"
            style={{ 
              animationDuration: '7s',
              animationDelay: '3s',
              transform: `translateY(${scrollY * 0.15}px)`
            }} 
          />
          <div 
            className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-indigo-500/4 rounded-full blur-xl animate-float-slow"
            style={{ 
              animationDuration: '11s',
              animationDelay: '5s',
              transform: `translateY(${scrollY * -0.08}px)`
            }} 
          />
        </div>
      </div>

      {/* Enhanced Fixed Navigation with improved backdrop blur */}
      <nav 
        className="fixed top-0 w-full z-50 transition-all duration-300"
        style={{
          backdropFilter: `blur(${Math.min(16 + scrollY * 0.02, 24)}px)`,
          backgroundColor: `rgba(31, 41, 55, ${Math.min(0.8 + scrollY * 0.001, 0.95)})`,
          borderBottom: `1px solid rgba(75, 85, 99, ${Math.min(0.3 + scrollY * 0.002, 0.5)})`
        }}
      >
        <div className="container-responsive py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div 
              className="text-lg sm:text-xl lg:text-2xl font-bold gradient-text-purple-pink transition-all duration-300 hover:scale-105"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.01) * 2}px)`
              }}
            >
              Daisy Faith Auma
            </div>
            
            {/* Enhanced Desktop Navigation */}
            <nav className="hidden md:flex space-x-4 lg:space-x-8" role="navigation" aria-label="Main navigation">
              {['Home', 'About', 'Skills', 'Projects', 'Content', 'Contact'].map((item, index) => (
                <button 
                  key={item} 
                  onClick={() => smoothScrollTo(item.toLowerCase())}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      smoothScrollTo(item.toLowerCase());
                    }
                  }}
                  className="text-gray-300 hover:text-purple-400 focus:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 nav-link-underline text-sm lg:text-base btn-touch relative group rounded-lg px-2 py-1"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                  aria-label={`Navigate to ${item} section`}
                >
                  {item}
                  <span className="absolute inset-0 rounded-lg bg-purple-500/10 scale-0 group-hover:scale-100 group-focus:scale-100 transition-transform duration-300 -z-10"></span>
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-300 hover:text-purple-400 focus:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors btn-touch rounded-lg"
              onClick={() => {
                const menu = document.getElementById('mobile-menu');
                const isHidden = menu?.classList.contains('hidden');
                menu?.classList.toggle('hidden');
                // Update aria-expanded for accessibility
                const button = document.querySelector('[aria-label="Toggle mobile menu"]') as HTMLButtonElement;
                if (button) {
                  button.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
                }
              }}
              aria-label="Toggle mobile menu"
              aria-expanded="false"
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Enhanced Mobile Navigation Menu */}
          <div 
            id="mobile-menu" 
            className="hidden md:hidden mt-4 pb-4 backdrop-blur-md bg-gray-800/90 rounded-lg border border-gray-700/50"
            role="menu"
            aria-labelledby="mobile-menu-button"
          >
            <nav className="flex flex-col space-y-3 p-4" role="navigation" aria-label="Mobile navigation">
              {['Home', 'About', 'Skills', 'Projects', 'Content', 'Contact'].map((item, index) => (
                <button 
                  key={item} 
                  onClick={() => {
                    smoothScrollTo(item.toLowerCase());
                    const menu = document.getElementById('mobile-menu');
                    menu?.classList.add('hidden');
                    // Update aria-expanded
                    const button = document.querySelector('[aria-label="Toggle mobile menu"]') as HTMLButtonElement;
                    if (button) {
                      button.setAttribute('aria-expanded', 'false');
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      smoothScrollTo(item.toLowerCase());
                      const menu = document.getElementById('mobile-menu');
                      menu?.classList.add('hidden');
                    }
                  }}
                  className="text-gray-300 hover:text-purple-400 focus:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 text-base font-medium py-2 px-4 rounded-lg hover:bg-gray-700/50 focus:bg-gray-700/50 btn-touch text-left transform hover:translate-x-2 focus:translate-x-2"
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                  role="menuitem"
                  aria-label={`Navigate to ${item} section`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </nav>
      {/* Skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      {/* Main Content Structure */}
      <main id="main-content" className="relative z-10">
        {/* Hero Section */}
        <section 
          id="home" 
          className="min-h-screen flex items-center justify-center relative pt-16 sm:pt-20"
          role="banner"
          aria-labelledby="hero-title"
          aria-describedby="hero-description"
        >
          <div className="container-responsive text-center relative z-10">
            <div className="mb-6 sm:mb-8">
              <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text-purple-pink">DA</span>
                </div>
              </div>
            </div>
            <h1 
              id="hero-title"
              className="text-responsive-2xl font-bold mb-4 sm:mb-6 gradient-text-white-purple animate-pulse"
            >
              Daisy Faith Auma
            </h1>
            <p className="text-responsive-lg text-gray-300 mb-3 sm:mb-4">
              Technical Writer at <span className="text-cyan-400 font-semibold">Archetype AI</span>
            </p>
            <p 
              id="hero-description"
              className="text-responsive-sm text-gray-400 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Currently Technical Writer at <span className="text-cyan-400 font-semibold">Archetype AI</span>. 
              Previously at <span className="text-orange-400 font-semibold">Cloudflare</span> documenting Workers AI & AI Gateway. 
              Building developer communities, creating AI content, and helping 20k+ learners through 
              <span className="text-purple-400 font-semibold"> Lux Tech Academy</span>. 
              Google Community Builder & Women Techmakers Ambassador.
            </p>
            
            {/* Enhanced Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12">
              <button 
                onClick={() => smoothScrollTo('projects')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    smoothScrollTo('projects');
                  }
                }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 focus:shadow-lg focus:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 focus:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 btn-touch text-sm sm:text-base relative overflow-hidden group"
                aria-label="Navigate to projects section"
              >
                <span className="relative z-10">View My Work</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button 
                onClick={() => smoothScrollTo('contact')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    smoothScrollTo('contact');
                  }
                }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-gray-600 rounded-full font-semibold hover:border-purple-500 hover:text-purple-400 focus:border-purple-500 focus:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 btn-touch text-sm sm:text-base relative overflow-hidden group backdrop-blur-sm"
                aria-label="Navigate to contact section"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Social Media Links */}
            <div className="flex justify-center space-x-4 sm:space-x-6 mb-8 sm:mb-12" role="list" aria-label="Social media links">
              <a 
                href="https://github.com/daisyfaithauma" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 sm:p-3 bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-110 focus:scale-110 hover:shadow-lg focus:shadow-lg btn-touch"
                aria-label="Visit GitHub profile (opens in new tab)"
                role="listitem"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/daisyfaithauma/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 sm:p-3 bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-blue-600 focus:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-110 focus:scale-110 hover:shadow-lg focus:shadow-lg btn-touch"
                aria-label="Visit LinkedIn profile (opens in new tab)"
                role="listitem"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com/daisyfaithauma" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 sm:p-3 bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-110 focus:scale-110 hover:shadow-lg focus:shadow-lg btn-touch"
                aria-label="Visit Twitter/X profile (opens in new tab)"
                role="listitem"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="mailto:daisyfaithauma@gmail.com" 
                className="p-2 sm:p-3 bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-red-600 focus:bg-red-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-110 focus:scale-110 hover:shadow-lg focus:shadow-lg btn-touch"
                aria-label="Send email to Daisy Faith Auma"
                role="listitem"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Enhanced Animated Chevron Down Indicator */}
          <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
            <button 
              onClick={() => smoothScrollTo('about')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  smoothScrollTo('about');
                }
              }}
              className="text-gray-400 hover:text-purple-400 focus:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 btn-touch p-2 group relative rounded-full"
              aria-label="Scroll to about section"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <div className="absolute inset-0 rounded-full bg-purple-500/20 scale-0 group-hover:scale-150 transition-transform duration-300 -z-10"></div>
            </button>
          </div>
        </section>

        {/* About Section */}
        <AboutSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Content Section */}
        <ContentSection />

        {/* Contact Section */}
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
