import React, { useState, useEffect, useRef } from 'react';
import { achievements } from '../data/achievements';
import type { Achievement } from '../types';

const AboutSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-pink-900/5"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/3 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500/3 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }}></div>
      
      <div className="container-responsive relative z-10">
        <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-responsive-2xl font-bold mb-3 sm:mb-4 gradient-text-purple-pink">
            About Me
          </h2>
          <p className="text-gray-400 text-responsive-sm max-w-4xl mx-auto leading-relaxed">
            I'm a Technical Writer at Archetype AI, previously at Cloudflare documenting AI products. 
            I have 4+ years of experience in robotics, developer content, and API integrations. 
            I've helped scale Lux Tech Academy to 20,000+ learners and received Google Community Builder Recognition.
          </p>
        </div>

        {/* Professional Background */}
        <div className={`mb-12 sm:mb-16 transform transition-all duration-700 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h3 className="text-responsive-xl font-bold text-center mb-6 sm:mb-8 gradient-text-white-purple">
            Professional Journey
          </h3>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-300 text-responsive-sm leading-relaxed mb-4 sm:mb-6">
              Currently serving as Technical Writer at <span className="text-cyan-400 font-semibold">Archetype AI</span>, 
              where I lead end-to-end customer documentation initiatives. Previously, I documented AI products at 
              <span className="text-orange-400 font-semibold"> Cloudflare</span>, creating 10+ tutorials that improved 
              developer onboarding by 40%.
            </p>
            <p className="text-gray-300 text-responsive-sm leading-relaxed">
              As Co-founder of <span className="text-purple-400 font-semibold">LuxDev HQ</span>, I've scaled 
              Lux Tech Academy to 20,000+ learners and graduated 300+ bootcamp students with an 85% job placement rate. 
              I'm also a <span className="text-pink-400 font-semibold">Google Community Builder</span> and 
              <span className="text-green-400 font-semibold"> Women Techmakers Ambassador</span>.
            </p>
          </div>
        </div>

        {/* Technical Skills & Certifications */}
        <div className={`mb-12 sm:mb-16 transform transition-all duration-700 delay-400 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h3 className="text-responsive-xl font-bold text-center mb-6 sm:mb-8 gradient-text-white-purple">
            Technical Skills & Certifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            <div className={`bg-gray-800/50 backdrop-blur-card rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-400 card-hover-lift animate-fade-in-up animate-stagger-1`}>
              <div className="text-purple-400 mb-3">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">Technical Writing</h4>
              <p className="text-gray-400 text-xs sm:text-sm">API documentation, developer guides, tutorials, and end-to-end customer documentation</p>
            </div>
            
            <div className={`bg-gray-800/50 backdrop-blur-card rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-400 card-hover-lift animate-fade-in-up animate-stagger-2`}>
              <div className="text-cyan-400 mb-3">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">AI & Machine Learning</h4>
              <p className="text-gray-400 text-xs sm:text-sm">Python, ML models, data visualization, AI product documentation, and predictive analytics</p>
            </div>
            
            <div className={`bg-gray-800/50 backdrop-blur-card rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-green-500/50 transition-all duration-400 card-hover-lift animate-fade-in-up animate-stagger-3`}>
              <div className="text-green-400 mb-3">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">Software Development</h4>
              <p className="text-gray-400 text-xs sm:text-sm">C++, Python, ROS, Android development, API integrations, and systems programming</p>
            </div>
            
            <div className={`bg-gray-800/50 backdrop-blur-card rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-pink-500/50 transition-all duration-400 card-hover-lift animate-fade-in-up animate-stagger-4`}>
              <div className="text-pink-400 mb-3">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">Developer Relations</h4>
              <p className="text-gray-400 text-xs sm:text-sm">Community building, developer advocacy, content creation, and educational program development</p>
            </div>
            
            <div className={`bg-gray-800/50 backdrop-blur-card rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-400 card-hover-lift animate-fade-in-up animate-stagger-5`}>
              <div className="text-yellow-400 mb-3">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">Content Creation</h4>
              <p className="text-gray-400 text-xs sm:text-sm">YouTube tutorials, TikTok AI explainers, technical articles, and educational content</p>
            </div>
            
            <div className={`bg-gray-800/50 backdrop-blur-card rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-400 card-hover-lift animate-fade-in-up animate-stagger-6`}>
              <div className="text-indigo-400 mb-3">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">Leadership & Mentorship</h4>
              <p className="text-gray-400 text-xs sm:text-sm">Team leadership, mentorship programs, bootcamp instruction, and organizational development</p>
            </div>
          </div>
        </div>

        {/* Community Impact & Volunteering */}
        <div className={`mb-12 sm:mb-16 transform transition-all duration-700 delay-600 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h3 className="text-responsive-xl font-bold text-center mb-6 sm:mb-8 gradient-text-white-purple">
            Community Impact & Volunteering
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-card rounded-xl p-4 sm:p-6 lg:p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-400 card-hover-lift animate-scale-in animate-stagger-1">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-400 mb-2">20,000+</div>
                <div className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Lux Academy Learners</div>
                <p className="text-gray-300 text-xs sm:text-sm">Scaled Lux Tech Academy to serve over 20,000 learners across Africa, providing accessible technology education and career development opportunities.</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-card rounded-xl p-4 sm:p-6 lg:p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-400 card-hover-lift animate-scale-in animate-stagger-2">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-400 mb-2">300+</div>
                <div className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Bootcamp Graduates</div>
                <p className="text-gray-300 text-xs sm:text-sm">Led intensive bootcamp programs with 85% job placement rate, helping graduates transition into successful technology careers.</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-card rounded-xl p-4 sm:p-6 lg:p-8 border border-green-500/20 hover:border-green-500/40 transition-all duration-400 card-hover-lift animate-scale-in animate-stagger-3">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mb-2">8</div>
                <div className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Twitter Spaces Hosted</div>
                <p className="text-gray-300 text-xs sm:text-sm">Hosted educational Twitter Spaces reaching 600+ listeners, discussing AI, developer tools, and career development in tech.</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-900/20 to-rose-900/20 backdrop-blur-card rounded-xl p-4 sm:p-6 lg:p-8 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-400 card-hover-lift animate-scale-in animate-stagger-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pink-400 mb-2">10+</div>
                <div className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Cloudflare Tutorials</div>
                <p className="text-gray-300 text-xs sm:text-sm">Created comprehensive tutorials for Cloudflare's AI products, improving developer onboarding experience by 40%.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Achievements */}
        <div className={`transform transition-all duration-700 delay-800 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h3 className="text-responsive-xl font-bold text-center mb-8 sm:mb-12 gradient-text-white-purple">
            Professional Milestones
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {achievements.map((achievement, index) => (
              <AchievementCard key={index} achievement={achievement} index={index} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
  isVisible: boolean;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, index, isVisible }) => {
  const getGradientClass = (index: number) => {
    const gradients = [
      'from-purple-600/20 to-pink-600/20 border-purple-500/30 hover:border-purple-500/50',
      'from-cyan-600/20 to-blue-600/20 border-cyan-500/30 hover:border-cyan-500/50',
      'from-green-600/20 to-emerald-600/20 border-green-500/30 hover:border-green-500/50',
      'from-orange-600/20 to-red-600/20 border-orange-500/30 hover:border-orange-500/50',
      'from-indigo-600/20 to-purple-600/20 border-indigo-500/30 hover:border-indigo-500/50',
      'from-pink-600/20 to-rose-600/20 border-pink-500/30 hover:border-pink-500/50',
      'from-yellow-600/20 to-orange-600/20 border-yellow-500/30 hover:border-yellow-500/50',
      'from-teal-600/20 to-cyan-600/20 border-teal-500/30 hover:border-teal-500/50'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div 
      className={`bg-gradient-to-br ${getGradientClass(index)} backdrop-blur-card rounded-xl p-4 sm:p-6 border transition-all duration-400 card-hover-lift group animate-fade-in-up ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        animationDelay: `${0.8 + index * 0.1}s`
      }}
    >
      <div className="mb-3 sm:mb-4">
        <div className="text-xs sm:text-sm text-gray-400 mb-1">{achievement.year}</div>
        <h4 className="text-base sm:text-lg font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
          {achievement.title}
        </h4>
        <div className="text-xs sm:text-sm font-medium text-purple-400 mb-2 sm:mb-3">
          {achievement.organization}
        </div>
      </div>
      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
        {achievement.description}
      </p>
    </div>
  );
};

export default AboutSection;