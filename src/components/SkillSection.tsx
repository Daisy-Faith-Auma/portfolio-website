import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, Brain, Video, Award } from 'lucide-react';
import type { Skill } from '../types';
import ProjectCard from './ProjectCard';

interface SkillSectionProps {
  skill: Skill;
  index: number;
}

const iconMap = {
  FileText,
  Users,
  Brain,
  Video,
  Award,
};

const SkillSection: React.FC<SkillSectionProps> = ({ skill, index }) => {
  const IconComponent = iconMap[skill.icon as keyof typeof iconMap] || FileText;
  const isEven = index % 2 === 0;
  const bgColor = isEven ? 'bg-white' : 'bg-gradient-subtle';

  return (
    <motion.section 
      id={skill.id} 
      className={`py-12 sm:py-16 lg:py-20 ${bgColor}`}
      role="region"
      aria-label={`${skill.title} section`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container-responsive">
        {/* Skill Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex justify-center mb-4 sm:mb-6"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="p-3 sm:p-4 bg-gradient-to-br from-brand-100 to-accent-100 rounded-full shadow-brand"
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                boxShadow: "var(--shadow-glow)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
              role="img"
              aria-label={`${skill.title} section icon`}
            >
              <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-brand-600" aria-hidden="true" />
            </motion.div>
          </motion.div>
          <motion.h2 
            className="text-responsive-xl font-bold text-neutral-900 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {skill.title}
          </motion.h2>
          <motion.p 
            className="text-responsive-sm text-neutral-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {skill.description}
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {skill.projects.map((project, projectIndex) => (
            <motion.div
              key={`${skill.id}-${projectIndex}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + projectIndex * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <ProjectCard 
                project={project} 
                isReversed={projectIndex % 2 === 1}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SkillSection;