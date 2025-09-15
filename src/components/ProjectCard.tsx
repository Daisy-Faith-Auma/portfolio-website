import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, FileText } from 'lucide-react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  isReversed?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isReversed = false }) => {
  return (
    <motion.div 
      className={`flex flex-col lg:flex-row items-start lg:items-center gap-6 sm:gap-8 ${isReversed ? 'lg:flex-row-reverse' : ''}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Project Content */}
      <motion.div 
        className="flex-1 space-y-4 sm:space-y-6"
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-responsive-md font-bold text-neutral-900 mb-3 sm:mb-4">{project.title}</h3>
          <p className="text-responsive-xs text-neutral-600 leading-relaxed">{project.description}</p>
        </motion.div>

        {/* Impact Metrics */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h4 className="text-responsive-sm font-semibold text-neutral-800">Key Achievements</h4>
          <ul className="space-y-2">
            {project.impact.map((achievement, index) => (
              <motion.li 
                key={index} 
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="w-2 h-2 bg-gradient-to-r from-brand-500 to-accent-500 rounded-full mt-2 mr-3 flex-shrink-0 shadow-brand"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                />
                <span className="text-sm sm:text-base text-neutral-700 leading-relaxed">{achievement}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Technology Tags */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h4 className="text-responsive-sm font-semibold text-neutral-800">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <motion.span
                key={index}
                className="px-2 sm:px-3 py-1 bg-gradient-to-r from-brand-100 to-accent-100 text-brand-800 text-xs sm:text-sm font-medium rounded-full border border-brand-200/50"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.05, boxShadow: "var(--shadow-brand)" }}
                viewport={{ once: true }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Project Links */}
        {project.links && (
          <motion.div 
            className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            {project.links.demo && (
              <motion.a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-touch btn-brand inline-flex items-center justify-center px-4 py-2 font-medium rounded-xl transition-all duration-300"
                aria-label={`View live demo of ${project.title} (opens in new tab)`}
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "var(--shadow-brand-lg)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </motion.a>
            )}
            {project.links.repo && (
              <motion.a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-touch inline-flex items-center justify-center px-4 py-2 bg-neutral-800 text-white font-medium rounded-xl hover:bg-neutral-900 transition-all duration-300 shadow-card hover:shadow-card-hover"
                aria-label={`View ${project.title} repository on GitHub (opens in new tab)`}
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4 mr-2" />
                Repository
              </motion.a>
            )}
            {project.links.article && (
              <motion.a
                href={project.links.article}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-touch inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-accent-600 to-accent-700 text-white font-medium rounded-xl hover:from-accent-700 hover:to-accent-800 transition-all duration-300 shadow-accent hover:shadow-accent-lg"
                aria-label={`Read article about ${project.title} (opens in new tab)`}
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "var(--shadow-accent-lg)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-4 h-4 mr-2" />
                Article
              </motion.a>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Visual Element Placeholder */}
      <motion.div 
        className="flex-shrink-0 w-full lg:w-80 h-48 sm:h-64 bg-gradient-to-br from-brand-100 via-white to-accent-100 rounded-xl flex items-center justify-center order-first lg:order-none border border-brand-200/30 shadow-card"
        initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "var(--shadow-brand-lg)"
        }}
        viewport={{ once: true }}
        role="img"
        aria-label={`Visual representation for ${project.title} project`}
      >
        <div className="text-center text-neutral-500">
          <motion.div 
            className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-brand border border-brand-200/30"
            whileHover={{ rotate: 360, boxShadow: "var(--shadow-glow)" }}
            transition={{ duration: 0.6 }}
            aria-hidden="true"
          >
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-brand-500" />
          </motion.div>
          <p className="text-xs sm:text-sm font-medium" aria-hidden="true">Project Visual</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;