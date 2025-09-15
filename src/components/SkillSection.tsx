import React from 'react';
import { motion } from 'framer-motion';
import type { Skill } from '../types';

interface SkillSectionProps {
  skill: Skill;
  index: number;
}

const SkillSection: React.FC<SkillSectionProps> = ({ skill, index }) => {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center mb-4">
        <div className="mr-4 p-2 bg-gray-800 rounded-lg">
          {skill.icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
            <span className="text-sm text-gray-400">{skill.level}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed ml-16">
        {skill.description}
      </p>
    </motion.div>
  );
};

export default SkillSection;