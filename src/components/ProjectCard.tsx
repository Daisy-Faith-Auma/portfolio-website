import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import LazyImage from './LazyImage';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.article
      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 focus-within:border-purple-500/70 focus-within:shadow-2xl focus-within:shadow-purple-500/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.03, 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      viewport={{ once: true }}
      role="article"
      aria-labelledby={`project-title-${index}`}
      aria-describedby={`project-description-${index}`}
    >
      {/* Project Image with Enhanced Overlay */}
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <motion.div
          className="w-full h-full transition-transform duration-500 group-hover:scale-110"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <LazyImage
            src={project.image}
            alt={`Screenshot of ${project.title} project showing ${project.description.split('.')[0].toLowerCase()}`}
            className="w-full h-full"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating Action Buttons */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 bg-gray-900/80 backdrop-blur-sm text-white rounded-full hover:bg-gray-800 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors btn-touch"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`View source code for ${project.title} on GitHub`}
            >
              <Github className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.a>
          )}
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 focus:from-purple-600 focus:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all btn-touch"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`View live demo of ${project.title}`}
            >
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-4 sm:p-6">
        <motion.h3 
          id={`project-title-${index}`}
          className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300 line-clamp-2"
          whileHover={{ scale: 1.02 }}
        >
          {project.title}
        </motion.h3>
        <p 
          id={`project-description-${index}`}
          className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300 line-clamp-3"
        >
          {project.description}
        </p>

        {/* Enhanced Technology Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          {project.tech.slice(0, 4).map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              className="px-2 sm:px-3 py-1 bg-gray-700/50 backdrop-blur-sm text-gray-300 text-xs sm:text-sm rounded-full border border-gray-600/50 hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: techIndex * 0.1 }}
            >
              {tech}
            </motion.span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 sm:px-3 py-1 bg-gray-700/50 text-gray-400 text-xs sm:text-sm rounded-full">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Enhanced Project Links */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-gray-700/50 backdrop-blur-sm text-white rounded-lg border border-gray-600/50 hover:border-gray-500 hover:bg-gray-600/50 focus:border-gray-500 focus:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 btn-touch text-sm sm:text-base"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`View source code for ${project.title} on GitHub`}
            >
              <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Code
            </motion.a>
          )}
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 hover:shadow-lg hover:shadow-purple-500/25 focus:from-purple-600 focus:to-pink-600 focus:shadow-lg focus:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 btn-touch text-sm sm:text-base"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`View live demo of ${project.title}`}
            >
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Live Demo
            </motion.a>
          )}
        </div>
      </div>

      {/* Subtle Border Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.article>
  );
};

export default ProjectCard;