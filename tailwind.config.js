/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design system — Precision Futurism palette
        'bg-void': '#020408',
        'bg-base': '#060d16',
        'bg-surface': '#0a1628',
        'bg-elevated': '#0f1f35',
        'bg-overlay': '#162640',

        // Accent colors mapped for Tailwind usage
        sky: {
          400: '#38bdf8',
          500: '#0ea5e9',
          700: '#0369a1',
        },
        emerald: {
          DEFAULT: '#10b981',
          500: '#10b981',
          soft: '#064e3b',
        },
        indigo: {
          400: '#818cf8',
        },

        // Text hierarchy
        'text-primary': '#f0f9ff',
        'text-secondary': '#94a3b8',
        'text-muted': '#475569',
        'text-accent': '#38bdf8',

        // Legacy color names kept for backward compat
        navy: {
          DEFAULT: '#060d16',
          light: '#0a1628',
        },
        teal: {
          DEFAULT: '#0ea5e9',
          light: '#38bdf8',
          dark: '#0369a1',
          300: '#7dd3fc',
        },
        cyan: {
          DEFAULT: '#10b981',
          light: '#34d399',
          dark: '#059669',
        },
        gray: {
          light: '#94a3b8',
          lighter: '#cbd5e1',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        heading: ['Syne', 'system-ui', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.75rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.05' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '6xl': '72rem',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '20px',
        xl: '40px',
      },
      boxShadow: {
        'glow-sky': '0 0 40px rgba(14, 165, 233, 0.25)',
        'glow-sky-sm': '0 0 20px rgba(14, 165, 233, 0.15)',
        'glow-emerald': '0 0 30px rgba(16, 185, 129, 0.2)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(14, 165, 233, 0.15)',
        // Legacy shadows for backward compat
        'glow-blue': '0 0 20px rgba(14, 165, 233, 0.3)',
        'glow-cyan': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-soft': '0 4px 24px rgba(0, 0, 0, 0.3)',
        'glow-strong': '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-sky-emerald': 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)',
        'gradient-primary': 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)',
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'aurora': 'aurora 20s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        // Legacy
        'gradient': 'gradient 15s ease infinite',
        'float': 'floatSlow 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'glow-blue': 'glowBlue 3s ease-in-out infinite alternate',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        aurora: {
          '0%, 100%': { opacity: '0.12', transform: 'scale(1) rotate(0deg)' },
          '33%': { opacity: '0.18', transform: 'scale(1.05) rotate(2deg)' },
          '66%': { opacity: '0.14', transform: 'scale(0.97) rotate(-1deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        gradient: {
          '0%, 100%': { 'background-position': 'left center' },
          '50%': { 'background-position': 'right center' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(14, 165, 233, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(14, 165, 233, 0.5)' },
        },
        glowBlue: {
          '0%': { boxShadow: '0 0 10px rgba(56, 189, 248, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(56, 189, 248, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
