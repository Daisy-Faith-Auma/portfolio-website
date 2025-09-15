import React, { useState, useRef, useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  className?: string;
  threshold?: number;
}

const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback,
  rootMargin = '100px',
  className = '',
  threshold = 0.1
}) => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  const defaultFallback = (
    <motion.div 
      className="flex items-center justify-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <LoadingSpinner size="lg" />
    </motion.div>
  );

  return (
    <div ref={sectionRef} className={className}>
      {isInView ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      ) : (
        fallback || defaultFallback
      )}
    </div>
  );
};

export default LazySection;