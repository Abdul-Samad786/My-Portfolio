# Portfolio Customization Guide

Use this file as your edit map when you update portfolio content.

## 1. Personal Info

- [src/sections/Hero.tsx](src/sections/Hero.tsx) - name, headline, role text, resume button, and hero summary.
- [src/sections/About.tsx](src/sections/About.tsx) - summary, location, availability badge, and resume link.
- [src/components/Footer.tsx](src/components/Footer.tsx) - brand name, email, LinkedIn, GitHub, and footer text.
- [src/sections/Contact.tsx](src/sections/Contact.tsx) - contact details shown in the contact card.

## 2. Experience And Skills

- [src/sections/Experience.tsx](src/sections/Experience.tsx) - jobs, companies, dates, achievements, and tech stack.
- [src/sections/Skills.tsx](src/sections/Skills.tsx) - skills categories and skill labels.
- [src/sections/Education.tsx](src/sections/Education.tsx) - education details.

## 3. Projects And Case Studies

Projects and Clients are currently disabled in [src/App.tsx](src/App.tsx). When you add your own:

- [src/sections/Projects.tsx](src/sections/Projects.tsx) - project cards (currently commented out).
- [src/data/caseStudies.ts](src/data/caseStudies.ts) - longer case study text for the project modal.

## 4. Blog Content

- [src/utils/blogLoader.ts](src/utils/blogLoader.ts) - blog metadata, categories, featured flags.
- [public/content/blogs/](public/content/blogs) - markdown files served in production.
- [content/blogs/](content/blogs) - source copies to keep in sync.

## 5. Images And Files

- [public/Abdul-pic.png](public/Abdul-pic.png) - main profile image.
- [public/Abdul-Samad-Tariq-Resume.pdf](public/Abdul-Samad-Tariq-Resume.pdf) - downloadable resume.
- [public/favicon.svg](public/favicon.svg) - browser tab icon.

Orbiting tech icons: [src/components/ProfileImage.tsx](src/components/ProfileImage.tsx).

## 6. Contact And Tracking

- [src/sections/Contact.tsx](src/sections/Contact.tsx) - Formspree via `VITE_FORMSPREE_ID`.
- [src/components/Analytics.tsx](src/components/Analytics.tsx) - Google Analytics via `VITE_GA_MEASUREMENT_ID`.

### Environment variables for Vercel

- `VITE_FORMSPREE_ID`
- `VITE_GA_MEASUREMENT_ID`

## 7. Visual Theme

- [src/index.css](src/index.css)
- [tailwind.config.js](tailwind.config.js)
- Theme toggle: [src/components/ThemeToggle.tsx](src/components/ThemeToggle.tsx), [src/contexts/ThemeContext.tsx](src/contexts/ThemeContext.tsx)

## 8. Deployment Checklist

1. Confirm name, contacts, experience, and blogs match you.
2. Add environment variables in Vercel.
3. Run `npm install` if needed.
4. Run `npm run build` locally.
5. Push to GitHub and import the repo in Vercel.
