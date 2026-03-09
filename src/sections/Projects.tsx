import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Building2, Globe, ChevronDown, FileText, Radio, Shield, Briefcase, Code2, Star } from 'lucide-react';
import CaseStudyModal from '../components/CaseStudyModal';
import { caseStudies, type CaseStudy } from '../data/caseStudies';

type ProjectCategory = 'All' | 'IoT' | 'Government' | 'Enterprise' | 'Open Source';

interface Project {
  title: string;
  description: string;
  result?: string;
  technologies: string[];
  github?: string;
  live?: string;
  caseStudy?: string;
  featured: boolean;
  flagship?: boolean;
  category: ProjectCategory;
  badge: string;
  badgeColor: 'gold' | 'green' | 'blue' | 'purple' | 'orange' | 'cyan';
  icon: typeof Building2;
  isCurrent?: boolean;
  isLive?: boolean;
}

const projects: Project[] = [
  {
    title: 'NeoTAQ IoT Platform',
    description: 'Industrial IoT platform enabling real-time energy management for enterprise clients. Built with distributed microservices architecture serving 15+ clients managing 100+ energy assets. Provides multi-protocol data acquisition (Modbus, OPC UA), cloud analytics, and predictive maintenance.',
    result: '99.9% uptime · 100+ assets · 15+ clients',
    technologies: ['React', 'Node.js', 'NestJS', 'NATS', 'InfluxDB', 'Modbus', 'OPC UA', 'Docker', 'Kubernetes'],
    github: '',
    live: '',
    caseStudy: '',
    featured: true,
    flagship: true,
    category: 'IoT',
    badge: 'Flagship',
    badgeColor: 'gold',
    icon: Radio,
    isCurrent: true,
  },
  {
    title: 'KubeArchitect Microservices',
    description: 'Production-ready microservices architecture with Kubernetes orchestration and automated CI/CD pipeline from GitHub to cluster. Demonstrates service mesh patterns, containerization best practices, and scalable infrastructure design.',
    result: 'Open source · GitHub published',
    technologies: ['Kubernetes', 'Docker', 'Microservices', 'CI/CD', 'GitHub Actions'],
    github: 'https://github.com/Alitariq-code/KubeArchitect-Microservices',
    live: '',
    caseStudy: '',
    featured: true,
    flagship: true,
    category: 'Open Source',
    badge: 'Flagship',
    badgeColor: 'purple',
    icon: Code2,
  },
  {
    title: 'Flowtopia Options Trading Platform',
    description: 'Real-time options activity tracking system monitoring institutional trading patterns with live market sentiment analysis. Advanced analytics dashboard for traders and financial institutions.',
    technologies: ['React', 'Node.js', 'Socket.IO', 'Real-time Analytics'],
    github: '',
    live: 'https://flowtopia.co',
    caseStudy: '',
    featured: true,
    category: 'Enterprise',
    badge: 'Live',
    badgeColor: 'green',
    icon: Globe,
    isLive: true,
  },
  {
    title: 'Abu Dhabi Civil Defence - Asset Tracking',
    description: 'Offline-capable ambulance asset tracking system ensuring emergency equipment readiness with real-time monitoring. Secure government healthcare asset management with tamper-proof tracking and compliance reporting.',
    technologies: ['React', 'Node.js', 'Offline-First Architecture'],
    github: '',
    live: '',
    caseStudy: '',
    featured: true,
    category: 'Government',
    badge: 'Government',
    badgeColor: 'blue',
    icon: Shield,
  },
  {
    title: 'Saudi MOI - Evidence Tracking',
    description: 'Evidence chain-of-custody system with hardware integration providing tamper-proof tracking and real-time location updates. RFID-based evidence management ensuring legal compliance and audit trails.',
    technologies: ['Node.js', 'RFID Integration', 'Hardware APIs'],
    github: '',
    live: '',
    caseStudy: '',
    featured: false,
    category: 'Government',
    badge: 'Government',
    badgeColor: 'blue',
    icon: Shield,
  },
  {
    title: 'Dubai Municipality Smart Parks POC',
    description: 'Multi-park IoT management system with centralized monitoring dashboard and remote sensor control via APIs. Enables real-time environmental monitoring and automated park management.',
    technologies: ['IoT', 'MQTT', 'Node.js', 'React Dashboard'],
    github: '',
    live: '',
    caseStudy: '',
    featured: false,
    category: 'IoT',
    badge: 'IoT',
    badgeColor: 'cyan',
    icon: Radio,
  },
  {
    title: 'Inffini IoT Platform',
    description: 'No-code IoT platform enabling dynamic API generation and real-time data pipelines with custom schema builder. Empowers non-technical users to create IoT integrations without coding.',
    technologies: ['Node.js', 'React', 'MongoDB', 'Real-time Data'],
    github: '',
    live: '',
    caseStudy: '',
    featured: false,
    category: 'IoT',
    badge: 'Enterprise',
    badgeColor: 'orange',
    icon: Radio,
  },
  {
    title: 'RAK Ceramics Reporting System',
    description: 'High-volume transaction reporting system processing thousands of daily transactions with automated file generation. Enterprise-grade reporting solution with real-time data processing and compliance features.',
    technologies: ['Node.js', 'PostgreSQL', 'Automated Reporting'],
    github: '',
    live: '',
    caseStudy: '',
    featured: false,
    category: 'Enterprise',
    badge: 'Enterprise',
    badgeColor: 'orange',
    icon: Briefcase,
  },
];

const categories: ProjectCategory[] = ['All', 'IoT', 'Government', 'Enterprise', 'Open Source'];

const badgeStyles: Record<string, { bg: string; color: string }> = {
  gold: { bg: 'linear-gradient(135deg, #F59E0B, #FBBF24)', color: '#fff' },
  green: { bg: 'linear-gradient(135deg, #10B981, #34D399)', color: '#fff' },
  blue: { bg: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', color: '#fff' },
  purple: { bg: 'linear-gradient(135deg, #818cf8, #a5b4fc)', color: '#fff' },
  orange: { bg: 'linear-gradient(135deg, #F97316, #FB923C)', color: '#fff' },
  cyan: { bg: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', color: '#fff' },
};

const accordionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

  const projectToCaseStudyMap: Record<string, string> = {
    'NeoTAQ IoT Platform': 'neotaq-iot-platform',
    'KubeArchitect Microservices': 'kubearchitect-microservices',
    'Flowtopia Options Trading Platform': 'flowtopia-options-trading',
  };

  const handleViewCaseStudy = (projectTitle: string) => {
    const caseStudyId = projectToCaseStudyMap[projectTitle];
    const caseStudy = caseStudies.find(cs => cs.projectId === caseStudyId);
    if (caseStudy) {
      setSelectedCaseStudy(caseStudy);
      setIsCaseStudyOpen(true);
    }
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (a.flagship && !b.flagship) return -1;
    if (!a.flagship && b.flagship) return 1;
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    if (a.isCurrent && !b.isCurrent) return -1;
    if (!a.isCurrent && b.isCurrent) return 1;
    return 0;
  });

  const filteredProjects = selectedCategory === 'All'
    ? sortedProjects
    : sortedProjects.filter(p => p.category === selectedCategory);

  const handleCategoryChange = (category: ProjectCategory) => {
    setExpandedIndex(null);
    setSelectedCategory(category);
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="section-spacing relative"
      style={{ backgroundColor: 'var(--bg-surface)' }}
    >
      <div className="section-container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontFamily: 'Syne, sans-serif' }}>
            Featured <span className="gradient-text-sky">Projects</span>
          </h2>
          <p className="mt-3 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            A showcase of enterprise products, IoT platforms, and open-source work
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
          role="tablist"
          aria-label="Project categories"
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleCategoryChange(category)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2"
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))'
                    : 'var(--bg-elevated)',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  border: isActive ? 'none' : '1px solid var(--border-subtle)',
                  transform: isActive ? 'scale(1.04)' : 'scale(1)',
                  boxShadow: isActive ? 'var(--glow-primary)' : 'none',
                  '--tw-ring-color': 'var(--accent-primary)',
                } as React.CSSProperties}
              >
                {category}
              </button>
            );
          })}
        </motion.div>

        {/* Projects accordion */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <FileText className="mx-auto mb-4" size={40} style={{ color: 'var(--text-muted)' }} />
                <p style={{ color: 'var(--text-muted)' }}>No projects in this category</p>
              </motion.div>
            ) : (
              <motion.div
                key={`${selectedCategory}`}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                exit="hidden"
                variants={{ visible: { transition: { staggerChildren: 0.06 } }, hidden: {} }}
                className="space-y-3"
              >
                {filteredProjects.map((project, index) => {
                  const Icon = project.icon;
                  const isExpanded = expandedIndex === index;
                  const badge = badgeStyles[project.badgeColor];

                  return (
                    <motion.article
                      key={project.title}
                      variants={accordionVariants}
                    >
                      {/* Accordion Header */}
                      <motion.button
                        onClick={() => setExpandedIndex(isExpanded ? null : index)}
                        className="w-full glass-card px-5 py-4 flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2"
                        style={{
                          borderRadius: isExpanded ? '16px 16px 0 0' : '16px',
                          '--tw-ring-color': 'var(--accent-primary)',
                        } as React.CSSProperties}
                        whileHover={{ borderColor: 'var(--border-strong)' }}
                        aria-expanded={isExpanded}
                        aria-controls={`project-${index}-content`}
                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${project.title}`}
                      >
                        {/* Icon */}
                        <div
                          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
                          aria-hidden="true"
                        >
                          <Icon size={16} style={{ color: 'var(--accent-primary)' }} />
                        </div>

                        {/* Title + flagship icon */}
                        <h3
                          className="flex-1 text-base sm:text-lg font-semibold flex items-center gap-2"
                          style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
                        >
                          {project.flagship && (
                            <Star size={14} style={{ color: '#F59E0B', fill: '#F59E0B' }} aria-label="Flagship project" />
                          )}
                          {project.title}
                        </h3>

                        {/* Static badge — no infinite animation */}
                        {project.badge && (
                          <span
                            className="px-2.5 py-0.5 rounded-full text-xs font-semibold flex-shrink-0"
                            style={{ background: badge.bg, color: badge.color, fontFamily: 'DM Sans, sans-serif' }}
                          >
                            {project.badge}
                          </span>
                        )}

                        {/* Chevron */}
                        <motion.span
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="flex-shrink-0"
                          aria-hidden="true"
                        >
                          <ChevronDown size={18} style={{ color: 'var(--text-muted)' }} />
                        </motion.span>
                      </motion.button>

                      {/* Accordion Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            id={`project-${index}-content`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                            role="region"
                          >
                            <div
                              className="px-5 pt-4 pb-6 rounded-b-2xl"
                              style={{
                                background: 'rgba(10, 22, 40, 0.7)',
                                border: '1px solid var(--border-default)',
                                borderTop: 'none',
                              }}
                            >
                              {/* Description */}
                              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                                {project.description}
                              </p>

                              {/* Result highlight */}
                              {project.result && (
                                <div
                                  className="mb-4 px-3 py-2 rounded-lg text-sm font-medium"
                                  style={{
                                    background: 'rgba(16, 185, 129, 0.08)',
                                    border: '1px solid rgba(16, 185, 129, 0.2)',
                                    color: '#10b981',
                                    fontFamily: 'JetBrains Mono, monospace',
                                    fontSize: '0.75rem',
                                  }}
                                >
                                  ↳ {project.result}
                                </div>
                              )}

                              {/* Tech stack — pure CSS hover */}
                              <div className="mb-5">
                                <p
                                  className="text-xs uppercase tracking-wider mb-2"
                                  style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                                >
                                  Stack
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {project.technologies.slice(0, 8).map((tech) => (
                                    <span key={tech} className="tech-tag">
                                      {tech}
                                    </span>
                                  ))}
                                  {project.technologies.length > 8 && (
                                    <span className="tech-tag">+{project.technologies.length - 8} more</span>
                                  )}
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex flex-wrap gap-2">
                                {project.live && (
                                  <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary text-sm px-4 py-2"
                                    style={{ borderRadius: '8px', fontSize: '0.8125rem' }}
                                  >
                                    <ExternalLink size={14} aria-hidden="true" />
                                    View Live
                                  </a>
                                )}
                                {project.github && (
                                  <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary text-sm px-4 py-2"
                                    style={{ borderRadius: '8px', fontSize: '0.8125rem' }}
                                  >
                                    <Github size={14} aria-hidden="true" />
                                    View Code
                                  </a>
                                )}
                                {projectToCaseStudyMap[project.title] && (
                                  <button
                                    onClick={() => handleViewCaseStudy(project.title)}
                                    className="btn-secondary text-sm px-4 py-2"
                                    style={{ borderRadius: '8px', fontSize: '0.8125rem' }}
                                    aria-label={`View case study for ${project.title}`}
                                  >
                                    <FileText size={14} aria-hidden="true" />
                                    Case Study
                                  </button>
                                )}
                                {!project.live && !project.github && !projectToCaseStudyMap[project.title] && (
                                  <span
                                    className="px-4 py-2 rounded-lg text-xs"
                                    style={{
                                      background: 'var(--bg-elevated)',
                                      border: '1px solid var(--border-subtle)',
                                      color: 'var(--text-muted)',
                                    }}
                                  >
                                    Details available on request
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.article>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
        caseStudy={selectedCaseStudy}
      />
    </section>
  );
}
