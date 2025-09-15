import React, { useState, useEffect } from 'react';
import type { Skill } from '../types';

interface SkillBarProps {
  skill: Skill;
  delay?: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Animate the progress bar
      const animationTimer = setTimeout(() => {
        setAnimatedLevel(skill.level);
      }, 100);
      
      return () => clearTimeout(animationTimer);
    }, delay);

    return () => clearTimeout(timer);
  }, [skill.level, delay]);

  return (
    <div 
      className={`transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div 
        className="bg-gray-800/50 backdrop-blur-card rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-gray-600/50 focus-within:border-purple-500/50 transition-all duration-400 card-hover-lift group relative overflow-hidden"
        role="region"
        aria-labelledby={`skill-${skill.name.replace(/\s+/g, '-').toLowerCase()}-title`}
        aria-describedby={`skill-${skill.name.replace(/\s+/g, '-').toLowerCase()}-description`}
      >
        {/* Skill Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-r ${skill.color} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
            <div className="w-5 h-5 sm:w-6 sm:h-6">
              {skill.icon}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 
              id={`skill-${skill.name.replace(/\s+/g, '-').toLowerCase()}-title`}
              className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300 truncate"
            >
              {skill.name}
            </h3>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl font-bold text-white flex-shrink-0">
                {animatedLevel}%
              </span>
              <div 
                className="flex-1 bg-gray-700 rounded-full h-1.5 sm:h-2 overflow-hidden min-w-0 relative"
                role="progressbar"
                aria-valuenow={animatedLevel}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.name} proficiency: ${animatedLevel}%`}
              >
                <div 
                  className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1500 ease-out rounded-full relative`}
                  style={{ width: `${animatedLevel}%` }}
                >
                  {/* Enhanced animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    style={{
                      animation: 'shimmer 2s ease-in-out infinite',
                      animationDelay: `${delay}ms`
                    }}
                  ></div>
                </div>
                {/* Progress bar glow effect */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-30 blur-sm rounded-full transition-all duration-1500 ease-out`}
                  style={{ width: `${animatedLevel}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Description */}
        <p 
          id={`skill-${skill.name.replace(/\s+/g, '-').toLowerCase()}-description`}
          className="text-gray-300 text-sm sm:text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
        >
          {skill.description}
        </p>

        {/* Hover glow effect */}
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
      </div>
    </div>
  );
};

export default SkillBar;