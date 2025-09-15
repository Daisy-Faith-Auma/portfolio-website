import React from 'react';

const ContactSection: React.FC = () => {
  const contactLinks = [
    {
      platform: 'GitHub',
      url: 'https://github.com/daisyfaithauma',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: 'hover:text-gray-300',
      description: 'Open source projects & code'
    },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/daisyfaithauma/',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: 'hover:text-blue-500',
      description: 'Professional networking'
    },
    {
      platform: 'Twitter/X',
      url: 'https://twitter.com/daisyfaithauma',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      color: 'hover:text-blue-400',
      description: 'Tech discussions & insights'
    },
    {
      platform: 'Email',
      url: 'mailto:daisyfaithauma@gmail.com',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'hover:text-red-500',
      description: 'Direct communication'
    }
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 relative">
      <div className="container-responsive max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-responsive-2xl font-bold mb-3 sm:mb-4 gradient-text-purple-pink">
            Let's Connect
          </h2>
          <p className="text-gray-400 text-responsive-sm mb-6 sm:mb-8 max-w-3xl mx-auto">
            Whether you're interested in collaboration, mentorship, or just want to chat about AI and developer tools, I'd love to hear from you.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-12 sm:mb-16">
          {contactLinks.map((link, index) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${link.platform} profile`}
              className={`group flex flex-col items-center p-3 sm:p-4 lg:p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-500/10 ${link.color} btn-touch`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-2 sm:mb-3 lg:mb-4 p-2 sm:p-3 bg-gray-700/50 rounded-lg group-hover:bg-gray-600/50 transition-all duration-300 transform group-hover:scale-110">
                <div className="w-5 h-5 sm:w-6 sm:h-6">
                  {link.icon}
                </div>
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-1 sm:mb-2 group-hover:text-current transition-colors text-center">
                {link.platform}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 text-center group-hover:text-gray-300 transition-colors line-clamp-2">
                {link.description}
              </p>
            </a>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="text-center bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
            Let's Build Something Amazing Together
          </h3>
          <p className="text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto">
            Whether you're looking for technical writing expertise, developer relations guidance, 
            AI documentation, or want to collaborate on innovative projects, I'm here to help.
          </p>
          
          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-4 sm:mb-6">
            <a
              href="mailto:daisyfaithauma@gmail.com"
              aria-label="Send email to daisyfaithauma@gmail.com"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 btn-touch text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Send Email</span>
            </a>
            <a
              href="https://www.linkedin.com/in/daisyfaithauma/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on LinkedIn"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-gray-600 rounded-full font-semibold hover:border-blue-500 hover:text-blue-400 transition-all duration-300 flex items-center justify-center space-x-2 btn-touch text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>Connect on LinkedIn</span>
            </a>
          </div>

          {/* Collaboration Areas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
              <span>Technical Writing</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0"></div>
              <span>Developer Relations</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0"></div>
              <span>AI Documentation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;