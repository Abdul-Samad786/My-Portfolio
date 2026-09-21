import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface TechIcon {
  name: string;
  src: string;
  /** Optional chip background for monochrome logos that need contrast against the dark theme. */
  bg?: string;
}

const techCategories = {
  frontend: {
    title: 'Frontend',
    description: 'Responsive React interfaces and dashboards for AI and backend-powered products.',
    icons: [
      { name: 'React.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Tailwind CSS', src: 'https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Redux Toolkit', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
      { name: 'HTML5', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    ] as TechIcon[],
  },
  backend: {
    title: 'Backend & APIs',
    description: 'Scalable Python backends with Flask, Django, and documented REST APIs on MongoDB.',
    icons: [
      { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Flask', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
      { name: 'Django', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
      { name: 'FastAPI', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    ] as TechIcon[],
  },
  mlAi: {
    title: 'Machine Learning & AI',
    description: 'End-to-end ML pipelines, NLP embeddings, model fine-tuning, interpretable AI, and LLM-powered systems — RAG pipelines and autonomous agents.',
    icons: [
      { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'PyTorch', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
      { name: 'TensorFlow', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'scikit-learn', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
      { name: 'Pandas', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
      { name: 'NumPy', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
      { name: 'OpenAI', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg', bg: '#ffffff' },
      { name: 'Hugging Face', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/huggingface.svg', bg: '#ffffff' },
      { name: 'LangChain', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/langchain.svg', bg: '#ffffff' },
    ] as TechIcon[],
  },
  database: {
    title: 'Databases',
    description: 'Document and relational data modeling for production APIs and ML feature stores.',
    icons: [
      { name: 'MongoDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MySQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'Redis', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
    ] as TechIcon[],
  },
  cloud: {
    title: 'Cloud & DevOps',
    description: 'Containerized deployments, Linux servers, and CI/CD for reliable shipping.',
    icons: [
      { name: 'AWS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg' },
      { name: 'Docker', src: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/docker/docker.png' },
      { name: 'Linux', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
      { name: 'Nginx', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg' },
      { name: 'GitHub Actions', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
      { name: 'GitLab CI/CD', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg' },
    ] as TechIcon[],
  },
};

type CategoryKey = keyof typeof techCategories;

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState<CategoryKey>('mlAi');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const category = techCategories[activeTab];

  return (
    <section
      id="skills"
      ref={ref}
      className="section-spacing relative"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontFamily: 'Syne, sans-serif' }}
          >
            Technical{' '}
            <span className="gradient-text-sky">Skills</span>
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            A practical toolkit across machine learning, Python backends, and modern web interfaces.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="mb-10 flex flex-wrap gap-2 justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          role="tablist"
          aria-label="Skill categories"
        >
          {(Object.keys(techCategories) as CategoryKey[]).map((key) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                aria-controls={`skills-panel-${key}`}
                id={`skills-tab-${key}`}
                onClick={() => setActiveTab(key)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-250 focus:outline-none focus-visible:ring-2"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  background: isActive
                    ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))'
                    : 'var(--bg-elevated)',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  border: isActive
                    ? 'none'
                    : '1px solid var(--border-subtle)',
                  transform: isActive ? 'scale(1.04)' : 'scale(1)',
                  boxShadow: isActive ? 'var(--glow-primary)' : 'none',
                  '--tw-ring-color': 'var(--accent-primary)',
                } as React.CSSProperties}
              >
                {techCategories[key].title}
              </button>
            );
          })}
        </motion.div>

        {/* Skills Panel */}
        <div className="skills-content-area">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`skills-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`skills-tab-${activeTab}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-6 sm:p-8"
          >
            {/* Category heading + description */}
            <div className="mb-6 border-b pb-5" style={{ borderColor: 'var(--border-subtle)' }}>
              <h3
                className="mb-1"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '1.15rem',
                  color: 'var(--accent-primary)',
                }}
              >
                {category.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                {category.description}
              </p>
            </div>

            {/* Icon grid */}
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-4">
              {category.icons.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  className="relative flex flex-col items-center gap-2 group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  onFocus={() => setHoveredTech(tech.name)}
                  onBlur={() => setHoveredTech(null)}
                  tabIndex={0}
                  role="img"
                  aria-label={tech.name}
                >
                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredTech === tech.name && (
                      <motion.div
                        className="absolute bottom-full mb-2 px-2.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap z-50 pointer-events-none"
                        style={{
                          background: 'var(--bg-overlay)',
                          border: '1px solid var(--border-default)',
                          color: 'var(--text-primary)',
                          fontFamily: 'DM Sans, sans-serif',
                          boxShadow: 'var(--glow-card)',
                        }}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                      >
                        {tech.name}
                        <span
                          className="absolute top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent w-0 h-0"
                          style={{ borderTopColor: 'var(--border-default)' }}
                          aria-hidden="true"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Icon container */}
                  <motion.div
                    className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl"
                    style={{
                      background: tech.bg ?? 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                    }}
                    whileHover={{
                      scale: 1.1,
                      borderColor: 'var(--border-strong)',
                      boxShadow: 'var(--glow-primary)',
                    }}
                    whileFocus={{
                      scale: 1.1,
                      borderColor: 'var(--border-strong)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      src={tech.src}
                      alt=""
                      aria-hidden="true"
                      className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.icon-fallback')) {
                          const fallback = document.createElement('span');
                          fallback.className = 'icon-fallback';
                          fallback.style.cssText = 'font-size:11px;font-weight:700;color:var(--text-secondary);font-family:JetBrains Mono,monospace;';
                          fallback.textContent = tech.name.substring(0, 2).toUpperCase();
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  </motion.div>

                  {/* Name label */}
                  <span
                    className="text-center leading-tight hidden sm:block"
                    style={{
                      fontSize: '0.62rem',
                      color: 'var(--text-muted)',
                      fontFamily: 'JetBrains Mono, monospace',
                      maxWidth: '56px',
                      wordBreak: 'break-word',
                    }}
                  >
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
