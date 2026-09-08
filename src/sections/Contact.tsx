import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github, CheckCircle, X, Loader2, Clock } from 'lucide-react';

/**
 * Formspree integration.
 * 1. Sign up at https://formspree.io/
 * 2. Create a form and copy your form ID (e.g. "xpwzqdek")
 * 3. Replace VITE_FORMSPREE_ID in your .env:
 *    VITE_FORMSPREE_ID=xpwzqdek
 */
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID ?? 'YOUR_FORM_ID'}`;

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

const contactItems = [
  { icon: Mail, label: 'Email', value: 'abdulcode138@gmail.com', href: 'mailto:abdulcode138@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+92 327 7134238', href: 'tel:+923277134238' },
  { icon: MapPin, label: 'Location', value: 'Bahawalpur, Pakistan', href: '' },
  { icon: Clock, label: 'Response Time', value: '~24 hours', href: '' },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/abdul-samad-tariq-266b5631b/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/Abdul-Samad786', label: 'GitHub' },
  { icon: Mail, href: 'mailto:abdulcode138@gmail.com', label: 'Email' },
];

function FloatInput({
  id,
  name,
  type = 'text',
  label,
  value,
  onChange,
  onBlur,
  error,
}: {
  id: string;
  name: string;
  type?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <div>
      <div className="float-label-wrap relative">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder=" "
          className="float-label-input"
          style={error ? { borderColor: '#ef4444', boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.12)' } : {}}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <label htmlFor={id} className="float-label">{label}</label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-1.5 text-xs"
            style={{ color: '#f87171' }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatTextarea({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  error?: string;
}) {
  return (
    <div>
      <div className="float-label-wrap textarea relative">
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder=" "
          rows={5}
          className="float-label-textarea"
          style={error ? { borderColor: '#ef4444', boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.12)' } : {}}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <label htmlFor={id} className="float-label">{label}</label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-1.5 text-xs"
            style={{ color: '#f87171' }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'At least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email';
        return undefined;
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'At least 10 characters';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    (Object.keys(formData) as (keyof FormState)[]).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) { newErrors[key] = error; isValid = false; }
    });
    setErrors(newErrors);
    setTouched({ name: true, email: true, subject: true, message: true });
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitState('loading');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setSubmitState('success');
        setTimeout(() => {
          setFormData({ name: '', email: '', subject: '', message: '' });
          setErrors({});
          setTouched({});
          setSubmitState('idle');
        }, 4000);
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setSubmitState('error');
      setTimeout(() => setSubmitState('idle'), 4000);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="section-spacing relative contact-mesh"
      style={{ backgroundColor: 'var(--bg-surface)' }}
    >
      <div className="section-container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontFamily: 'Syne, sans-serif' }}>
            Get In <span className="gradient-text-sky">Touch</span>
          </h2>
          <p className="mt-3 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Open to freelance projects and full-time opportunities.
            Let's build something great together.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-[38%_62%] lg:grid-cols-[35%_65%] gap-6 lg:gap-10">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glass-card p-7 h-full">
              <h3
                className="text-lg font-bold mb-7"
                style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
              >
                Contact Information
              </h3>

              <div className="space-y-5 mb-8">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3.5 group">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        background: 'rgba(14, 165, 233, 0.08)',
                        border: '1px solid var(--border-default)',
                      }}
                    >
                      <Icon size={18} style={{ color: 'var(--accent-primary)' }} aria-hidden="true" />
                    </div>
                    <div>
                      <p
                        className="text-xs uppercase tracking-wider mb-0.5"
                        style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm font-medium transition-colors duration-200"
                          style={{ color: 'var(--text-secondary)' }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="pt-6" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                <p
                  className="text-xs uppercase tracking-wider mb-4"
                  style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Connect
                </p>
                <div className="flex gap-3">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target={href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2"
                      style={{
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-muted)',
                        '--tw-ring-color': 'var(--accent-primary)',
                      } as React.CSSProperties}
                      whileHover={{ y: -3, boxShadow: 'var(--glow-primary)', borderColor: 'var(--border-strong)', color: 'var(--text-accent)' }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={label}
                    >
                      <Icon size={18} aria-hidden="true" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass-card p-7"
              aria-label="Contact form"
            >
              {/* Success state overlay */}
              <AnimatePresence>
                {submitState === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl z-10"
                    style={{ background: 'rgba(6, 13, 22, 0.95)', backdropFilter: 'blur(12px)' }}
                    role="status"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                    >
                      <CheckCircle size={48} style={{ color: '#10b981' }} aria-hidden="true" />
                    </motion.div>
                    <p className="mt-4 text-lg font-bold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}>
                      Message Sent!
                    </p>
                    <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      I'll respond within 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-5 relative">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FloatInput
                    id="name"
                    name="name"
                    label="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name}
                  />
                  <FloatInput
                    id="email"
                    name="email"
                    type="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                  />
                </div>

                <FloatInput
                  id="subject"
                  name="subject"
                  label="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.subject}
                />

                <FloatTextarea
                  id="message"
                  name="message"
                  label="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.message}
                />

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={submitState === 'loading' || submitState === 'success'}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus-visible:ring-2"
                  style={{
                    background: submitState === 'error'
                      ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                      : 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                    color: '#fff',
                    opacity: submitState === 'loading' ? 0.8 : 1,
                    cursor: submitState === 'loading' ? 'not-allowed' : 'pointer',
                    fontFamily: 'DM Sans, sans-serif',
                    '--tw-ring-color': 'var(--accent-primary)',
                  } as React.CSSProperties}
                  whileHover={submitState === 'idle' ? { translateY: -2, boxShadow: '0 0 40px rgba(14, 165, 233, 0.35)' } : {}}
                  whileTap={submitState === 'idle' ? { scale: 0.98 } : {}}
                  aria-label={
                    submitState === 'loading' ? 'Sending message...'
                    : submitState === 'success' ? 'Message sent'
                    : submitState === 'error' ? 'Failed to send — try again'
                    : 'Send message'
                  }
                >
                  {submitState === 'loading' && <><Loader2 className="animate-spin" size={18} aria-hidden="true" /><span>Sending...</span></>}
                  {submitState === 'success' && <><CheckCircle size={18} aria-hidden="true" /><span>Sent!</span></>}
                  {submitState === 'error' && <><X size={18} aria-hidden="true" /><span>Failed — try again</span></>}
                  {submitState === 'idle' && <><Send size={18} aria-hidden="true" /><span>Send Message</span></>}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
