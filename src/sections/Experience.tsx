import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Calendar } from 'lucide-react';
import {
  SiMongodb,
  SiPython,
  SiDjango,
  SiFlask,
  SiPytorch,
  SiScikitlearn,
  SiTensorflow,
} from 'react-icons/si';

interface Experience {
  company: string;
  role: string;
  subtitle?: string;
  period: string;
  location: string;
  achievements: string[];
  technologies: string[];
  logoColor: string;
  isCurrent?: boolean;
}

const experiences: Experience[] = [
  {
    company: 'Personal Projects',
    role: 'Independent Developer',
    period: 'March 2026 – Present',
    location: 'Bahawalpur, Pakistan',
    logoColor: '#10B981',
    isCurrent: true,
    achievements: [
      'Building and shipping AI-powered applications, including an eBay marketplace platform that integrates official APIs for product research, listing workflows, and AI-driven margin and market analysis',
'Developing a real-time professional networking platform with Flask, MongoDB, WebSockets, messaging, notifications, and AI-powered matching capabilities',
'Building practical LLM, RAG, and agentic AI systems that connect language models with tools, data, APIs, and workflows to solve real-world problems'
    ],
    technologies: ['Python', 'Django', 'Flask', 'MongoDB', 'Langchain', 'OpenAI API', 'WebSockets', 'REST APIs'],
  },
  {
    company: 'Holistic TLC',
    role: 'Backend Engineer',
    period: 'Feb 2025 – March 2026',
    location: 'Bahawalpur, Pakistan',
    logoColor: '#0ea5e9',
    achievements: [
      'Developed and maintained scalable backend applications using the <strong>Flask</strong> framework with <strong>MongoDB</strong> as the primary database, ensuring high performance and reliability under production workloads',
      'Designed backend architecture with scalability as a core principle, implementing modular and maintainable code structures to support growing application demands',
      'Led migration initiative from <strong>Flask to Django</strong>, demonstrating adaptability across Python web frameworks while maintaining continuity of backend services',
      'Built and documented <strong>RESTful APIs</strong> to support frontend integration and third-party service communication, following best practices for security and performance',
    ],
    technologies: ['Python', 'Flask', 'Django', 'MongoDB', 'REST APIs'],
  },
  {
    company: 'Enliven AI',
    role: 'Machine Learning Engineer',
    period: 'May 2023 – Jan 2025',
    location: 'Bahawalpur, Pakistan',
    logoColor: '#818cf8',
    achievements: [
      'Developed <strong>voice cloning agents</strong> integrating AI agents with voice synthesis models to automate voice-based generation and interaction workflows',
      'Engineered an <strong>Australia-based real-estate prediction system</strong> that combines business-question analysis, property data processing, and machine learning to predict house prices and support data-driven real-estate decisions',
      'Developed an <strong>AI-powered autograder</strong> that evaluates programming assignments against defined requirements, automating submission analysis and grading workflows',
      'Performed <strong>time-series analysis and forecasting</strong>, developing predictive models to identify temporal patterns and generate forecasts from historical data',
      'Worked on a <strong>Java language research project</strong> involving dataset analysis, machine learning model development, prediction, and validation to evaluate model performance'
    ],
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'scikit-learn', 'NLP', 'SHAP', 'LoRA', 'YourTTS'],
  },
];

const techIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'MongoDB': SiMongodb,
  'Python': SiPython,
  'Django': SiDjango,
  'Flask': SiFlask,
  'PyTorch': SiPytorch,
  'scikit-learn': SiScikitlearn,
  'TensorFlow': SiTensorflow,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const getCompanyInitials = (company: string) =>
    company.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();

  return (
    <section
      id="experience"
      ref={ref}
      className="section-spacing relative"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontFamily: 'Syne, sans-serif' }}>
            Work <span className="gradient-text-sky">Experience</span>
          </h2>
          <p className="mt-3" style={{ color: 'var(--text-secondary)' }}>
            Building ML systems and scalable Python backends — from research to production
          </p>
        </motion.div>

        {/* Cross-role Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-3 justify-center mb-14"
          aria-label="Career statistics"
        >
          {[
            { value: '3+', label: 'Years Experience' },
            { value: '2', label: 'Companies' },
            { value: 'AI + Full Stack Engineering', label: 'Focus' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="px-5 py-2.5 rounded-xl text-sm"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-secondary)',
              }}
            >
              <span style={{ color: 'var(--accent-primary)', fontWeight: 700, fontFamily: 'Syne, sans-serif', marginRight: '0.35rem' }}>
                {value}
              </span>
              {label}
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Gradient vertical line — desktop only */}
          <div
            className="hidden md:block absolute top-6 bottom-6 w-px"
            style={{
              left: '1.75rem',
              background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary), transparent)',
            }}
            aria-hidden="true"
          />
          {/* Traveling glow orb — desktop only */}
          <div className="hidden md:block timeline-glow-orb" style={{ left: '0.5rem', right: 'auto', width: '2.5rem' }} aria-hidden="true" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            {experiences.map((exp) => {
              const initials = getCompanyInitials(exp.company);
              return (
                <motion.article
                  key={exp.company}
                  variants={cardVariants}
                  className="relative md:pl-20"
                >
                  {/* Timeline Dot */}
                  <div
                    className="hidden md:flex absolute left-4 top-6 items-center justify-center"
                    aria-hidden="true"
                  >
                    <div
                      className="w-4 h-4 rounded-full border-2"
                      style={{
                        backgroundColor: exp.isCurrent ? exp.logoColor : 'var(--bg-elevated)',
                        borderColor: exp.logoColor,
                        boxShadow: `0 0 0 4px var(--bg-base), 0 0 16px ${exp.logoColor}40`,
                      }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className="glass-card p-6 sm:p-8 relative overflow-hidden"
                    style={{
                      borderColor: exp.isCurrent ? `${exp.logoColor}30` : 'var(--border-default)',
                      boxShadow: exp.isCurrent
                        ? `var(--glow-card), 0 0 30px ${exp.logoColor}15`
                        : 'var(--glow-card)',
                    }}
                  >
                    {/* Left accent line */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl"
                      style={{ backgroundColor: exp.logoColor }}
                      aria-hidden="true"
                    />

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-5">
                      {/* Company initials logo */}
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold"
                        style={{
                          background: `linear-gradient(135deg, ${exp.logoColor}25, ${exp.logoColor}10)`,
                          border: `1px solid ${exp.logoColor}35`,
                          color: exp.logoColor,
                          fontFamily: 'Syne, sans-serif',
                        }}
                        aria-hidden="true"
                      >
                        {initials}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <h3
                            className="text-lg font-bold"
                            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
                          >
                            {exp.company}
                          </h3>
                          {exp.isCurrent && (
                            <span
                              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium"
                              style={{
                                background: 'rgba(16, 185, 129, 0.12)',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                color: '#10b981',
                                fontFamily: 'JetBrains Mono, monospace',
                              }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#10b981' }} aria-hidden="true" />
                              Present
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                          {exp.role}
                        </p>
                        {exp.subtitle && (
                          <p className="text-xs mb-2 italic" style={{ color: 'var(--text-muted)' }}>
                            {exp.subtitle}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                          <span className="flex items-center gap-1">
                            <Calendar size={12} aria-hidden="true" />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} aria-hidden="true" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Achievements */}
                    <ul className="space-y-2.5 mb-5" aria-label="Key achievements">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm leading-relaxed"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <span
                            className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                            style={{ backgroundColor: exp.logoColor }}
                            aria-hidden="true"
                          />
                          <span dangerouslySetInnerHTML={{ __html: achievement }} />
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack */}
                    <div className="pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                      <p
                        className="text-xs mb-3 uppercase tracking-wider font-semibold"
                        style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        Stack
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => {
                          const TechIcon = techIcons[tech];
                          return (
                            <span key={tech} className="tech-tag inline-flex items-center gap-1.5">
                              {TechIcon && <TechIcon size={11} aria-hidden="true" />}
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
