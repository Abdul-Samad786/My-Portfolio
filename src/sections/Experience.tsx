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
    period: 'February 2026 – Present',
    location: 'Bahawalpur, Pakistan',
    logoColor: '#10B981',
    isCurrent: true,
    achievements: [
      'Building and shipping personal projects spanning <strong>machine learning</strong> and <strong>backend development</strong>',
      'Deepening skills in NLP, model fine-tuning, and scalable Python web services through hands-on builds',
      'Exploring end-to-end product ideas — from data pipelines and APIs to deployment and documentation',
    ],
    technologies: ['Python', 'Django', 'Flask', 'MongoDB', 'PyTorch', 'scikit-learn'],
  },
  {
    company: 'Holistic TLC',
    role: 'Junior Backend Developer',
    period: 'August 2025 – February 2026',
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
    period: 'October 2024 – August 2025',
    location: 'Bahawalpur, Pakistan',
    logoColor: '#818cf8',
    achievements: [
      'Built an end-to-end ML solution for housing price prediction, integrating <strong>NLP embeddings</strong> and regression models (Linear Regression, Random Forest, DNN) with <strong>SHAP</strong> for interpretability, optimizing property listing success predictions',
      'Developed an advanced unit conversion system using <strong>SmolLM2</strong>, implementing in-context learning, <strong>LoRA</strong> fine-tuning, and RFT to enhance reasoning, achieving high accuracy in generating precise conversion answers across diverse units',
      'Designed a generalized text-to-speech voice cloning system using the <strong>YourTTS</strong> model, enabling multilingual speech synthesis from user-provided text and WAV files, optimized for Google Colab with GPU acceleration',
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
            { value: '2+', label: 'Years Experience' },
            { value: '2', label: 'Companies' },
            { value: 'ML + Backend', label: 'Focus' },
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
