import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Heart, Code, Linkedin, Github, Youtube, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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

  const quickLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Skills', id: 'skills' },
    { label: 'Contact', id: 'contact' }
  ];

  const socialLinks = [
    { icon: Linkedin, url: 'https://linkedin.com/in/daisyauma', label: 'LinkedIn' },
    { icon: Github, url: 'https://github.com/daisyauma', label: 'GitHub' },
    { icon: Youtube, url: 'https://youtube.com/@daisyauma', label: 'YouTube' },
    { icon: Mail, url: 'mailto:daisy@luxtechacademy.com', label: 'Email' }
  ];

  return (
    <motion.footer 
      className="bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="container-responsive">
        {/* Main Footer Content */}
        <motion.div 
          className="py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div 
            className="space-y-4 sm:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Daisy Auma</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Developer Relations Engineer & Technical Writer
              </p>
            </motion.div>
            <motion.p 
              className="text-gray-300 text-sm sm:text-base leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Bridging the gap between complex technology and developer communities through 
              clear documentation, engaging content, and meaningful connections.
            </motion.p>
            <motion.div 
              className="flex space-x-3 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-touch w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -2,
                      backgroundColor: "#2563eb"
                    }}
                    whileTap={{ scale: 0.95 }}
                    viewport={{ once: true }}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-base sm:text-lg font-semibold text-white">Quick Links</h4>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="btn-touch block text-left text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Professional Info */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h4 className="text-base sm:text-lg font-semibold text-white">Professional</h4>
            <div className="space-y-2 text-sm sm:text-base">
              <p className="text-gray-300 leading-relaxed">
                Co-founder at{' '}
                <a 
                  href="https://luxtechacademy.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-touch text-blue-400 hover:text-blue-300 transition-colors underline"
                >
                  Lux Tech Academy
                </a>
              </p>
              <p className="text-gray-300 leading-relaxed">
                Technical Writer at{' '}
                <a 
                  href="https://developers.cloudflare.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-touch text-blue-400 hover:text-blue-300 transition-colors underline"
                >
                  Cloudflare
                </a>
              </p>
              <p className="text-gray-300 leading-relaxed">
                Available for consulting and collaborations
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-4 sm:py-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              <span>© {currentYear} Daisy Auma. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center">
                Built with <Heart className="w-3 h-3 sm:w-4 sm:h-4 mx-1 text-red-500" /> and <Code className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </span>
            </div>
            
            <button
              onClick={scrollToTop}
              className="btn-touch flex items-center space-x-2 text-xs sm:text-sm text-gray-400 hover:text-white transition-colors group"
              aria-label="Scroll to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 group-hover:transform group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;