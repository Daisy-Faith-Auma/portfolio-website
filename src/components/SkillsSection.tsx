import React, { useState, useEffect, useRef } from 'react';
import SkillBar from './SkillBar';
import { skills } from '../data/skills';

const SkillsSection: React.FC = () => {
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
    <section 
      ref={sectionRef}
      id="skills" 
      className="py-12 sm:py-16 lg:py-20 relative overflow-hidden"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      
      <div className="container-responsive relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-responsive-2xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-responsive-sm text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise, from AI documentation and developer relations 
            to software development and community leadership, with quantified proficiency levels.
          </p>
        </div>

        {/* Skills Grid with enhanced staggered animations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`animate-fade-in-up ${
                index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <SkillBar
                skill={skill}
                delay={isVisible ? index * 150 : 0}
              />
            </div>
          ))}
        </div>

        {/* Skills Summary Stats */}
        <div className={`mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 transform transition-all duration-700 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">20k+</div>
            <div className="text-gray-400 text-xs sm:text-sm lg:text-base">Learners Reached</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">300+</div>
            <div className="text-gray-400 text-xs sm:text-sm lg:text-base">Bootcamp Graduates</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">10+</div>
            <div className="text-gray-400 text-xs sm:text-sm lg:text-base">Technical Tutorials</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">40%</div>
            <div className="text-gray-400 text-xs sm:text-sm lg:text-base">Onboarding Improvement</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`mt-12 sm:mt-16 text-center transform transition-all duration-700 delay-1200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <p className="text-responsive-sm text-gray-300 mb-4 sm:mb-6">
            Ready to collaborate on your next project?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 btn-touch text-sm sm:text-base"
          >
            Let's Work Together
            <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;