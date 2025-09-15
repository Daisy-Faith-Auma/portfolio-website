import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ScrollProgress from './components/ScrollProgress';
import LoadingSpinner from './components/LoadingSpinner';
import { skills } from './data/skills';
import './styles/globals.css';

// Lazy load components that are not immediately visible
const SkillSection = lazy(() => import('./components/SkillSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <Header />
      <main id="main-content" className="pt-16 sm:pt-18">
        <motion.section 
          id="hero"
          aria-label="Introduction and hero section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Hero />
        </motion.section>
        
        {/* Skills Overview Section */}
        <motion.section 
          id="skills" 
          className="py-12 sm:py-16 lg:py-20 bg-gradient-subtle"
          aria-label="Skills and expertise overview"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="container-responsive">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-responsive-xl font-bold text-neutral-900 mb-4 sm:mb-6">Skills & Expertise</h2>
              <p className="text-responsive-sm text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                Explore my expertise across technical writing, developer relations, AI projects, 
                content creation, and leadership through concrete examples and achievements.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Individual Skill Sections */}
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        }>
          {skills.map((skill, index) => (
            <SkillSection key={skill.id} skill={skill} index={index} />
          ))}
        </Suspense>
        
        <motion.section 
          id="contact"
          aria-label="Contact information and social links"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Suspense fallback={
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="md" />
            </div>
          }>
            <ContactSection />
          </Suspense>
        </motion.section>
      </main>
      <Suspense fallback={
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="sm" />
        </div>
      }>
        <Footer />
      </Suspense>
    </motion.div>
  );
}

export default App;
