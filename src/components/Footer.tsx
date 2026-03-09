import { motion } from 'framer-motion';
import { Linkedin, Github, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/software-engineerali', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/Alitariq-code', label: 'GitHub' },
  { icon: Mail, href: 'mailto:alitariqcode@gmail.com', label: 'Email' },
];

const quickLinks = ['About', 'Skills', 'Experience', 'Projects', 'Contact'];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t py-12"
      style={{
        backgroundColor: 'var(--bg-void)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3
              className="mb-2"
              style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)', fontSize: '1.1rem' }}
            >
              Ali Tariq
            </h3>
            <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Full Stack Developer specializing in IoT platforms and enterprise solutions.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2"
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-muted)',
                    '--tw-ring-color': 'var(--accent-primary)',
                  } as React.CSSProperties}
                  whileHover={{ y: -2, color: 'var(--accent-glow)', borderColor: 'var(--border-default)' }}
                  whileTap={{ scale: 0.93 }}
                  aria-label={label}
                >
                  <Icon size={16} aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <h4
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-muted)' }}
            >
              Navigation
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="nav-link text-sm transition-colors duration-200"
                    style={{ color: 'var(--text-muted)', display: 'inline-block' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            <h4
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-muted)' }}
            >
              Get In Touch
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:alitariqcode@gmail.com"
                  className="transition-colors duration-200"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  alitariqcode@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/software-engineerali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  LinkedIn Profile
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Alitariq-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  GitHub Profile
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
          style={{ borderTop: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}
        >
          <span>© {currentYear} Ali Tariq. All rights reserved.</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Built with React & Vite
          </span>
        </div>
      </div>
    </footer>
  );
}
