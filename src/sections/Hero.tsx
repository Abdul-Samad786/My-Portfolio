import { motion } from 'framer-motion';
import { ChevronDown, Download, ArrowRight, Mouse } from 'lucide-react';
import { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import ProfileImage from '../components/ProfileImage';
import { trackButtonClick, trackDownload } from '../components/Analytics';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToExperience = () => {
    document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)' }}
      aria-label="Hero section"
    >
      {/* ── Aurora Background ─────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Sky-blue glow — top-left */}
        <motion.div
          className="aurora-layer"
          style={{
            width: '60vw',
            height: '60vw',
            maxWidth: 750,
            maxHeight: 750,
            top: '-20%',
            left: '-15%',
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.09) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.05, 0.97, 1], opacity: [0.8, 1, 0.85, 0.8] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Emerald glow — bottom-right */}
        <motion.div
          className="aurora-layer"
          style={{
            width: '50vw',
            height: '50vw',
            maxWidth: 650,
            maxHeight: 650,
            bottom: '-15%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.07) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 0.96, 1.06, 1], opacity: [0.75, 1, 0.80, 0.75] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut', delay: 9 }}
        />
        {/* Indigo glow — center-right */}
        <motion.div
          className="aurora-layer"
          style={{
            width: '40vw',
            height: '40vw',
            maxWidth: 500,
            maxHeight: 500,
            top: '20%',
            right: '5%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.08, 0.94, 1], opacity: [0.6, 0.9, 0.65, 0.6] }}
          transition={{ duration: 36, repeat: Infinity, ease: 'easeInOut', delay: 16 }}
        />

        {/* Dot grid */}
        <div className="hero-dot-grid" />

        {/* Light streaks */}
        <div className="streak" style={{ left: '15%', top: '20%', animationDuration: '4s', animationDelay: '0s' }} />
        <div className="streak" style={{ left: '45%', top: '5%', animationDuration: '6s', animationDelay: '2s' }} />
        <div className="streak" style={{ left: '70%', top: '30%', animationDuration: '5s', animationDelay: '4s' }} />
        <div className="streak" style={{ left: '85%', top: '10%', animationDuration: '7s', animationDelay: '1s' }} />
        <div className="streak" style={{ left: '30%', top: '40%', animationDuration: '5s', animationDelay: '3s' }} />
      </div>

      {/* ── Content ───────────────────────────────────────── */}
      <div className="relative z-10 section-container w-full pb-28 pt-28">
        <div className="grid md:grid-cols-[58%_42%] gap-10 lg:gap-16 items-center">

          {/* Left Column — Text */}
          <div className="order-2 md:order-1">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Eyebrow */}
              <motion.div variants={itemVariants} className="mb-6">
                <span
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest"
                  style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-muted)' }}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: 'var(--accent-secondary)' }}
                    aria-hidden="true"
                  />
                  Available for Work
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                variants={itemVariants}
                className="font-bold leading-none mb-3 tracking-tight"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  letterSpacing: '-0.03em',
                  color: 'var(--text-primary)',
                }}
              >
                Abdul Samad{' '}
                <span className="hero-name-gradient">Tariq</span>
              </motion.h1>

              {/* Animated Role */}
              <motion.div
                variants={itemVariants}
                className="mb-4 flex items-center gap-2 text-base sm:text-lg"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  color: 'var(--accent-glow)',
                }}
                aria-live="polite"
              >
                <span className="opacity-50">&gt;</span>
                <Typewriter
                  options={{
                    strings: ['Full Stack Developer', 'Machine Learning Engineer', 'AI Engineer'],
                    autoStart: true,
                    loop: true,
                    delay: 65,
                    deleteSpeed: 40,
                  }}
                />
              </motion.div>

              {/* Value proposition */}
              <motion.p
                variants={itemVariants}
                className="mb-8 max-w-xl"
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  lineHeight: 1.75,
                  color: 'var(--text-secondary)',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                I build AI/ML systems and backend architecture that turn complex problems into practical, production-ready software.
              </motion.p>

              {/* Stat Pills */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-3 mb-10"
                aria-label="Career highlights"
              >
                {[
                  { value: '3+', label: 'Years' },
                  { value: 'AI + Full Stack Engineering', label: 'Focus' },
                ].map(({ value, label }) => (
                  <div key={label} className="stat-pill">
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{value}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 sm:items-center"
              >
                {/* Primary — Download Resume */}
                <motion.a
                  href="/Abdul-Samad-Tariq-Resume.pdf"
                  download="Abdul-Samad-Tariq-Resume.pdf"
                  onClick={() => {
                    trackDownload('Abdul-Samad-Tariq-Resume.pdf');
                    trackButtonClick('Download Resume', 'Hero');
                  }}
                  className="btn-primary"
                  whileHover={{ translateY: -2, boxShadow: '0 0 40px rgba(14, 165, 233, 0.35)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  aria-label="Download resume PDF"
                >
                  <Download size={16} aria-hidden="true" />
                  Download Resume
                </motion.a>

                {/* Secondary — View Work */}
                <motion.button
                  onClick={() => {
                    trackButtonClick('View My Work', 'Hero');
                    scrollToExperience();
                  }}
                  className="btn-secondary"
                  whileHover={{ translateY: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  aria-label="View my experience"
                >
                  View Experience
                  <ArrowRight size={16} aria-hidden="true" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column — Profile */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <motion.div
              animate={{ translateY: [-4, 4, -4] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Gradient ring wrapper */}
              <div
                className="relative rounded-full p-0.5"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  boxShadow: '0 0 60px rgba(14, 165, 233, 0.2)',
                }}
              >
                <div
                  className="rounded-full overflow-hidden"
                  style={{ background: 'var(--bg-surface)' }}
                >
                  <ProfileImage size="large" showParticles={false} />
                </div>
                {/* Online indicator */}
                <div
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{
                    background: 'rgba(6, 13, 22, 0.85)',
                    border: '1px solid var(--border-default)',
                    backdropFilter: 'blur(8px)',
                  }}
                  aria-label="Online status"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: 'var(--accent-secondary)' }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--accent-secondary)', fontSize: '0.65rem' }}
                  >
                    ONLINE
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: showScrollIndicator ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          aria-hidden="true"
        >
          <span
            className="text-[10px] uppercase tracking-widest"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-muted)' }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Mouse size={16} style={{ color: 'var(--text-muted)' }} />
          </motion.div>
          <ChevronDown size={14} style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
        </motion.div>
      </div>
    </section>
  );
}
