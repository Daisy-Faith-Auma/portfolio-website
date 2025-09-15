import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ExternalLink, Github, LinkedinIcon, Youtube, Mail, Code, Twitter } from 'lucide-react';
import { contactLinks } from '../data/contact';

const Hero: React.FC = () => {
  // Get key social media links for quick access
  const quickAccessLinks = contactLinks.filter(link => 
    ['LinkedIn', 'GitHub', 'YouTube', 'Twitter/X', 'Substack'].includes(link.platform)
  );

  // Icon mapping for social media platforms
  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
      'Linkedin': LinkedinIcon,
      'Github': Github,
      'Youtube': Youtube,
      'Twitter': Twitter,
      'Mail': Mail,
      'Code': Code
    };
    return iconMap[iconName] || ExternalLink;
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-accent-50 relative overflow-hidden" role="region" aria-label="Hero section">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-brand-400/20 to-accent-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent-400/20 to-brand-400/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-responsive py-20 sm:py-24 lg:py-32 relative z-10">
        <div className="text-center">
          {/* Main Introduction */}
          <motion.div 
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-responsive-2xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hi, I'm{' '}
              <motion.span 
                className="gradient-text-brand"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                Daisy Auma
              </motion.span>
            </motion.h1>
            <motion.h2 
              className="text-responsive-lg font-semibold text-gray-700 mb-6 sm:mb-8 px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Developer Relations Engineer & Technical Writer
            </motion.h2>
          </motion.div>

          {/* Value Proposition */}
          <motion.div 
            className="mb-8 sm:mb-12 max-w-4xl mx-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <p className="text-responsive-sm text-gray-600 leading-relaxed mb-4 sm:mb-6">
              I bridge the gap between complex technology and developer communities through 
              clear documentation, engaging content, and meaningful connections. 
              Passionate about making technology accessible and empowering developers to build amazing things.
            </p>
            <p className="text-responsive-xs text-gray-500">
              From AI projects to community building, I turn technical complexity into clear, actionable insights.
            </p>
          </motion.div>

          {/* Quick Access Social Media Links */}
          <motion.div 
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide">
              Connect with me
            </p>
            <div className="flex justify-center flex-wrap gap-2 sm:gap-3 px-4 sm:px-0">
              {quickAccessLinks.map((link, index) => {
                const IconComponent = getIcon(link.icon);
                return (
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-touch card-brand inline-flex items-center px-3 sm:px-4 py-2 transition-all duration-200"
                    aria-label={`Visit my ${link.platform} profile (opens in new tab)`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -2,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 hidden xs:inline">
                      {link.platform.replace('Twitter/X', 'Twitter')}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Call-to-Action Buttons */}
          <motion.div 
            className="flex flex-col xs:flex-row justify-center items-center gap-4 sm:gap-6 mb-12 sm:mb-16 px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <motion.button
              onClick={() => scrollToSection('skills')}
              className="btn-touch btn-brand w-full xs:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 font-semibold rounded-xl shadow-brand hover:shadow-brand-lg transition-all duration-200"
              aria-label="Navigate to skills and expertise section"
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 15px 30px rgba(37, 99, 235, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore My Work
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </motion.div>
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="btn-touch btn-brand-outline w-full xs:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 font-semibold rounded-xl shadow-brand hover:shadow-brand-lg transition-all duration-200"
              aria-label="Navigate to contact information section"
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
              <ExternalLink className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="hidden sm:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.0 }}
          >
            <motion.button
              onClick={() => scrollToSection('skills')}
              className="btn-touch text-gray-400 hover:text-blue-600 transition-colors duration-200"
              aria-label="Scroll to skills section"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ scale: 1.1 }}
            >
              <ArrowDown className="h-6 w-6 mx-auto" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;