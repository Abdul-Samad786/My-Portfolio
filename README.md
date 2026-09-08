# Abdul Samad Tariq — Portfolio

Machine Learning Engineer & Backend Developer portfolio built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Ultra-modern Design**: Glassmorphism effects, gradient accents, and smooth animations
- **Dark Theme**: Purple, blue, and cyan color scheme with gradient text effects
- **Fully Responsive**: Mobile-first approach with breakpoints for all devices
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Performance Optimized**: Fast load times and 60fps animations
- **SEO Friendly**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Modern icon library
- **React Router** - Navigation (configured for future use)

## 📦 Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navigation.tsx   # Glassmorphism navigation bar
│   ├── Button.tsx       # Custom button component
│   ├── Loading.tsx      # Loading animation
│   └── Footer.tsx       # Footer component
├── sections/            # Page sections
│   ├── Hero.tsx         # Hero section with animated background
│   ├── About.tsx        # About section with stats
│   ├── Skills.tsx       # Skills showcase
│   ├── Experience.tsx   # Work experience timeline
│   ├── Projects.tsx     # Projects showcase
│   └── Contact.tsx      # Contact form and info
├── assets/              # Static assets
├── utils/               # Utility functions
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 🎨 Design Features

### Sections

1. **Hero Section**
   - Full-screen animated gradient background
   - Floating particle effects
   - Call-to-action buttons
   - Smooth scroll indicator

2. **About Section**
   - Professional summary
   - Statistics cards with icons
   - Glassmorphism cards

3. **Skills Section**
   - Categorized skill cards
   - Animated progress bars
   - Color-coded categories

4. **Experience Timeline**
   - Vertical timeline layout
   - Company details and achievements
   - Technology tags

5. **Projects Showcase**
   - Grid layout with hover effects
   - Project cards with images
   - GitHub and live demo links

6. **Contact Section**
   - Contact form with validation
   - Contact information cards
   - Social media links

### Animations

- Scroll-triggered animations using Framer Motion
- Smooth page transitions
- Loading animation on initial load
- Hover effects and micro-interactions
- Parallax effects

## 🎯 Customization

The quickest way to swap in your own portfolio data is the new [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md).

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: { ... },
  purple: { ... },
  cyan: { ... },
}
```

### Content

Update the content in each section file:
- `src/sections/About.tsx` - Personal information
- `src/sections/Experience.tsx` - Work experience
- `src/sections/Projects.tsx` - Project details
- `src/sections/Contact.tsx` - Contact information

### Deployment

For Vercel, set these environment variables if you use the related integrations:

- `VITE_FORMSPREE_ID` for the contact form
- `VITE_GA_MEASUREMENT_ID` for analytics

### Images

Replace placeholder images in the Projects section with your own project screenshots.

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## ⚡ Performance

- Lazy loading for sections
- Optimized animations (60fps)
- Fast page load times
- Efficient bundle size

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Author

Abdul Samad Tariq — Machine Learning Engineer & Backend Developer

---

Built with React, TypeScript, and Tailwind CSS
