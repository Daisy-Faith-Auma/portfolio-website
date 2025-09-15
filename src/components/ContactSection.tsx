import React from 'react';
import { motion } from 'framer-motion';
import { 
  LinkedinIcon, 
  Github, 
  Youtube, 
  Mail, 
  Code, 
  Twitter, 
  Music, 
  Building, 
  Building2, 
  Globe,
  ExternalLink 
} from 'lucide-react';
import { contactLinks } from '../data/contact';

const ContactSection: React.FC = () => {
  // Icon mapping for contact platforms
  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
      'Linkedin': LinkedinIcon,
      'Github': Github,
      'Youtube': Youtube,
      'Twitter': Twitter,
      'Mail': Mail,
      'Code': Code,
      'Music': Music,
      'Building': Building,
      'Building2': Building2,
      'Globe': Globe
    };
    return iconMap[iconName] || ExternalLink;
  };

  // Separate links by category
  const personalLinks = contactLinks.filter(link => link.category === 'personal');
  const professionalLinks = contactLinks.filter(link => link.category === 'professional');

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container-responsive">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-responsive-xl font-bold text-gray-900 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            className="text-responsive-sm text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Ready to collaborate? Let's connect and explore opportunities to work together. 
            I'm always excited to discuss new projects, share insights, or help fellow developers.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Personal Links */}
          <motion.div 
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-responsive-md font-bold text-gray-900 mb-4">Personal</h3>
              <p className="text-responsive-xs text-gray-600 mb-6 leading-relaxed">
                Connect with me on social platforms where I share insights, tutorials, and engage with the developer community.
              </p>
            </motion.div>
            
            <div className="space-y-3 sm:space-y-4">
              {personalLinks.map((link, index) => {
                const IconComponent = getIcon(link.icon);
                return (
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-touch group flex items-center p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-blue-300"
                    aria-label={`Visit my ${link.platform} profile (opens in new tab)`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -2,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors"
                      whileHover={{ rotate: 5 }}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </motion.div>
                    <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                        {link.platform}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                        {link.platform === 'LinkedIn' && 'Professional networking & career updates'}
                        {link.platform === 'GitHub' && 'Open source projects & code repositories'}
                        {link.platform === 'YouTube' && 'Technical tutorials & developer content'}
                        {link.platform === 'TikTok' && 'Quick tech tips & coding insights'}
                        {link.platform === 'Substack' && 'In-depth technical articles & newsletters'}
                        {link.platform === 'Dev.to' && 'Developer community & technical blog posts'}
                        {link.platform === 'Twitter/X' && 'Tech discussions & industry insights'}
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ x: 2 }}
                    >
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                    </motion.div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Professional Links */}
          <motion.div 
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center lg:text-left">
              <h3 className="text-responsive-md font-bold text-gray-900 mb-4">Professional</h3>
              <p className="text-responsive-xs text-gray-600 mb-6 leading-relaxed">
                Explore my professional work and the organizations I'm involved with in the tech education space.
              </p>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {professionalLinks.map((link) => {
                const IconComponent = getIcon(link.icon);
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-touch group flex items-center p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 border border-gray-200 hover:border-purple-300"
                    aria-label={`Visit ${link.platform} (opens in new tab)`}
                  >
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                    </div>
                    <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors truncate">
                        {link.platform}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                        {link.platform === 'Lux Academy LinkedIn' && 'Educational organization & community updates'}
                        {link.platform === 'Lux Academy Twitter' && 'Academy news & educational content'}
                        {link.platform === 'Portfolio' && 'Complete portfolio & project showcase'}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                  </a>
                );
              })}
            </div>

            {/* Professional Email Contact */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="text-center">
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-3" />
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Professional Inquiries</h4>
                <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                  For business opportunities, collaborations, or speaking engagements
                </p>
                <a
                  href="mailto:daisy@luxtechacademy.com"
                  className="btn-touch inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  aria-label="Send professional inquiry email to daisy@luxtechacademy.com"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Send Email
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-responsive-md font-bold text-gray-900 mb-4 sm:mb-6">Let's Build Something Amazing Together</h3>
            <p className="text-responsive-xs text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Whether you're looking for technical writing, developer relations expertise, 
              or want to collaborate on innovative projects, I'd love to hear from you.
            </p>
            <div className="flex flex-col xs:flex-row justify-center gap-3 sm:gap-4">
              <a
                href="https://linkedin.com/in/daisyauma"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-touch inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                aria-label="Connect with me on LinkedIn (opens in new tab)"
              >
                <LinkedinIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Connect on LinkedIn
              </a>
              <a
                href="mailto:daisy@luxtechacademy.com"
                className="btn-touch inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                aria-label="Send email to daisy@luxtechacademy.com"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;