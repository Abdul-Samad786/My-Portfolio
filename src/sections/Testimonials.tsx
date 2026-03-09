import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Linkedin, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  relationship: string;
  date: string;
  highlight?: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: 'Anjum Zaki',
    role: 'Lead Solutions Architect',
    company: 'FinTech | RFID & IoT Solutions Expert',
    text: 'I had the pleasure of working with Ali Tariq as his direct supervisor for over a year. What impressed me most was his remarkable versatility and willingness to step outside his comfort zone. Whether I assigned him DevOps tasks, IoT integrations, or full stack development, Ali would dive in with enthusiasm. He\'s reliable, communicates well, and actively looks for ways to contribute to project success.',
    relationship: 'Managed Ali directly',
    date: 'August 2025',
    highlight: true,
  },
  {
    name: 'Hamza Afzal',
    role: 'Founder & AI/AR Lead',
    company: 'EnlivenAI',
    text: 'Ali\'s deep expertise in CI/CD processes, combined with his proficiency in both frontend and backend development, has significantly accelerated our project timelines while ensuring the highest quality standards. His ability to diagnose and resolve complex issues rapidly has been crucial.',
    relationship: 'Managed Ali directly',
    date: 'March 2024',
    highlight: true,
  },
  {
    name: 'Maria Naz',
    role: 'SQA Engineer',
    company: 'IoT & RFID | Web & Mobile Testing',
    text: 'I had the pleasure of working with Ali for over a year on a large-scale project, and he consistently impressed the team with his problem-solving skills and steady approach under pressure. His strong grip on development, especially in fast-paced sprints, made a real difference.',
    relationship: 'Worked on the same team',
    date: 'August 2025',
  },
  {
    name: 'Haris Ejaz',
    role: 'Founder & Solopreneur',
    company: 'Quickevent.app | Creator of F1IQ.com',
    text: 'Ali is Mr. Dependable. Throw any tech stack at him: backend, frontend, IoT; and he\'ll just figure it out without making a fuss. I\'ve seen him go from zero to shipping in areas most devs would hesitate to touch. No ego, no drama. Just solid execution.',
    relationship: 'Worked on the same team',
    date: 'June 2025',
  },
  {
    name: 'Syed Muhammad Usama',
    role: 'Frontend Lead — Senior Software Engineer',
    company: 'React.js / Next.js Specialist',
    text: 'I had the pleasure of closely collaborating with Ali Tariq, a true problem solver in full-stack development. His expertise spans frontend and backend tasks, showcasing versatility and skill. His mastery of JavaScript, especially in backend API design and optimization, is impressive.',
    relationship: 'Worked on the same team',
    date: 'July 2024',
  },
  {
    name: 'Bilal Shabbir',
    role: 'React Native Developer',
    company: 'Node.js | MongoDB',
    text: 'I had the pleasure of working with Ali, a true team player with excellent problem-solving skills. His expertise spans both frontend and backend development, with a strong grasp of scalable system design. Ali effortlessly adapts to different architectures.',
    relationship: 'Worked on the same team',
    date: 'December 2024',
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [expanded, setExpanded] = useState(false);
  const initials = testimonial.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div
      className="scroll-snap-item glass-card flex flex-col p-5"
      style={{ width: 'min(320px, 85vw)', flexShrink: 0 }}
    >
      {/* Quote decoration */}
      <span
        className="text-5xl leading-none mb-2 select-none"
        style={{ color: 'var(--accent-primary)', opacity: 0.25, fontFamily: 'Georgia, serif' }}
        aria-hidden="true"
      >
        "
      </span>

      {/* Highlight badge */}
      {testimonial.highlight && (
        <div className="mb-3">
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
            style={{
              background: 'rgba(14, 165, 233, 0.1)',
              border: '1px solid var(--border-default)',
              color: 'var(--accent-primary)',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            <Star size={10} fill="currentColor" aria-hidden="true" />
            Supervisor
          </span>
        </div>
      )}

      {/* Quote text */}
      <div className="flex-1 mb-4">
        <p
          className={expanded ? '' : 'line-clamp-3'}
          style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7 }}
        >
          {testimonial.text}
        </p>
        {testimonial.text.length > 140 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-xs font-medium focus:outline-none focus-visible:underline"
            style={{ color: 'var(--accent-primary)', fontFamily: 'DM Sans, sans-serif' }}
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Author */}
      <div className="pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="flex items-center gap-3">
          <div
            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              color: '#fff',
              fontFamily: 'Syne, sans-serif',
            }}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>
              {testimonial.name}
            </p>
            <p className="text-xs truncate" style={{ color: 'var(--accent-glow)' }}>
              {testimonial.role}
            </p>
          </div>
        </div>
        <p className="mt-2 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
          {testimonial.relationship} · {testimonial.date}
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="section-spacing relative"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="section-container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontFamily: 'Syne, sans-serif' }}>
            What People <span className="gradient-text-sky">Say</span>
          </h2>
          <p className="mt-3" style={{ color: 'var(--text-secondary)' }}>
            From supervisors, colleagues, and collaborators
          </p>
        </motion.div>

        {/* Desktop: horizontal scroll — Mobile: single column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Horizontal scroll (all viewports, scrollable) */}
          <div
            className="scroll-snap-container pb-4"
            aria-label="Testimonials — scroll horizontally"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="scroll-snap-item"
                style={{ width: 'min(320px, 85vw)', flexShrink: 0 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>

          {/* Mobile fallback: single column at small screens */}
          <div className="md:hidden mt-6 space-y-4">
            {/* Mobile layout handled by scroll above — hidden on md+ */}
          </div>
        </motion.div>

        {/* LinkedIn CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-10"
        >
          <motion.a
            href="https://www.linkedin.com/in/software-engineerali"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
            whileHover={{ translateY: -2, boxShadow: '0 0 40px rgba(14, 165, 233, 0.3)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <Linkedin size={16} aria-hidden="true" />
            View All on LinkedIn
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
