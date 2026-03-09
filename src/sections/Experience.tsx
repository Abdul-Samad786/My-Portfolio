import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Calendar } from 'lucide-react';
import {
  SiReact,
  SiNodedotjs,
  SiNestjs,
  SiMongodb,
  SiPostgresql,
  SiAmazon as SiAws,
  SiDocker,
  SiSocketdotio,
  SiGrafana,
  SiPython,
  SiDjango,
  SiFlask,
  SiRedis,
  SiKubernetes,
  SiRedux,
  SiInfluxdb,
  SiSqlite,
  SiNginx,
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
    company: 'Green Fuel Energy',
    role: 'Senior Full Stack Developer & IoT Platform Architect',
    subtitle: 'NeoTAQ Industrial IoT Ecosystem',
    period: 'May 2025 – Present',
    location: 'Lahore, Pakistan',
    logoColor: '#10B981',
    isCurrent: true,
    achievements: [
      'Architected NeoTAQ IoT platform — serving <strong>15+ enterprise clients</strong> with real-time energy management',
      'Built NeoLog datalogger with Modbus & OPC UA for multi-protocol industrial data collection',
      'Delivered NeoSphere SaaS analytics with <strong>99.9% uptime</strong> and 1,000+ concurrent connections',
    ],
    technologies: ['React.js', 'Redux Toolkit', 'Socket.IO', 'Node.js', 'NestJS', 'Python', 'NATS', 'InfluxDB', 'SQLite', 'PostgreSQL', 'Docker', 'Kubernetes', 'Grafana', 'Nginx', 'AWS'],
  },
  {
    company: 'Innovent Tech Solutions',
    role: 'Full Stack Developer',
    period: 'Feb 2024 – May 2025',
    location: 'Lahore, Pakistan',
    logoColor: '#0ea5e9',
    achievements: [
      'Led delivery for Gulf government clients — <strong>Abu Dhabi Civil Defence</strong> and Saudi MOI',
      'Built Inffini IoT platform with no-code API generation and dynamic schema builder',
      'Mentored <strong>4 engineers</strong> across cloud deployments and sprint planning',
    ],
    technologies: ['Node.js', 'React', 'MongoDB', 'AWS', 'Microservices'],
  },
  {
    company: 'EnlivenAi (Pvt) Ltd',
    role: 'Full Stack Developer | Cloud Engineer',
    period: 'May 2022 – Feb 2024',
    location: 'Bahawalpur, Pakistan',
    logoColor: '#818cf8',
    achievements: [
      'Built ShotPulse real-time analytics app integrating ML models for live sports data',
      'Reduced API latency by <strong>60%</strong> via Redis caching and connection pooling',
      'Managed AWS infrastructure with auto-scaling, CI/CD pipelines, and uptime monitoring',
    ],
    technologies: ['React', 'Django', 'Flask', 'AWS', 'PostgreSQL', 'Redis'],
  },
  {
    company: 'Digitalux',
    role: 'Backend Developer (Remote)',
    period: 'Jan 2024 – April 2024',
    location: 'Lahore, Pakistan',
    logoColor: '#38bdf8',
    achievements: [
      'Delivered real-time stock tracking for <strong>5,000+ concurrent users</strong> via Socket.IO',
      'Improved CRM query performance by <strong>70%</strong> through MongoDB index optimization',
      'Designed aggregation pipelines delivering millisecond-latency analytics reports',
    ],
    technologies: ['Node.js', 'Socket.IO', 'MongoDB', 'Express.js'],
  },
  {
    company: 'Enigmatix (Pvt) Ltd',
    role: 'MERN Stack Developer',
    period: 'Dec 2021 – Dec 2022',
    location: 'Bahawalpur, Pakistan',
    logoColor: '#F59E0B',
    achievements: [
      'Built responsive React.js interfaces increasing user engagement by <strong>35%</strong>',
      'Maintained <strong>95% sprint completion</strong> rate in a fast-paced Agile environment',
      'Delivered pixel-perfect Figma implementations across multiple product lines',
    ],
    technologies: ['React', 'Redux', 'Node.js', 'MongoDB', 'Express.js'],
  },
];

const techIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'React': SiReact,
  'React.js': SiReact,
  'Node.js': SiNodedotjs,
  'NestJS': SiNestjs,
  'MongoDB': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'AWS': SiAws,
  'Docker': SiDocker,
  'Socket.IO': SiSocketdotio,
  'Grafana': SiGrafana,
  'Python': SiPython,
  'Django': SiDjango,
  'Flask': SiFlask,
  'Redis': SiRedis,
  'Kubernetes': SiKubernetes,
  'Redux': SiRedux,
  'Redux Toolkit': SiRedux,
  'InfluxDB': SiInfluxdb,
  'SQLite': SiSqlite,
  'Nginx': SiNginx,
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
            5+ years building enterprise systems across IoT, fintech, and government sectors
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
            { value: '5+', label: 'Years Experience' },
            { value: '3', label: 'Companies' },
            { value: '15+', label: 'Enterprise Clients' },
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
