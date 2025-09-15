import React from 'react';
import { contentPlatforms, communityMetrics } from '../data/contentPlatforms';
import { ExternalLink } from 'lucide-react';

const ContentSection: React.FC = () => {
  return (
    <section id="content" className="py-12 sm:py-16 lg:py-20">
      <div className="container-responsive">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-responsive-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4 sm:mb-6">
            Content & Community
          </h2>
          <p className="text-responsive-sm text-gray-300 max-w-3xl mx-auto">
            Creating educational content and building communities across multiple platforms, 
            reaching thousands of developers and tech enthusiasts worldwide.
          </p>
        </div>

        {/* Community Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {communityMetrics.map((metric) => (
            <div
              key={metric.label}
              className="text-center p-4 sm:p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:scale-105"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                {metric.value}
              </div>
              <div className="text-base sm:text-lg font-semibold text-white mb-2">
                {metric.label}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">
                {metric.description}
              </div>
            </div>
          ))}
        </div>

        {/* Content Platforms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {contentPlatforms.map((platform) => (
            <a
              key={platform.platform}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group p-4 sm:p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 ${platform.hoverColor} btn-touch`}
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className={`${platform.color} group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-6 h-6 sm:w-8 sm:h-8">
                    {platform.icon}
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-white transition-colors duration-300">
                {platform.platform}
              </h3>
              
              <p className={`text-xs sm:text-sm font-medium mb-2 sm:mb-3 ${platform.color} group-hover:text-white transition-colors duration-300`}>
                {platform.handle}
              </p>
              
              <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
                {platform.description}
              </p>
            </a>
          ))}
        </div>

        {/* Additional Content Info */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20 backdrop-blur-sm">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              Join the Community
            </h3>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-4 sm:mb-6">
              Follow along for AI tutorials, technical writing insights, developer relations tips, 
              and behind-the-scenes content from my work at Archetype AI and beyond.
            </p>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
              <span>• 8 Twitter Spaces hosted</span>
              <span>• 600+ listeners reached</span>
              <span>• Weekly newsletter updates</span>
              <span>• Community-driven content</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;