import { ShoppingCart, MessagesSquare, Network, HeartPulse, HandHeart, type LucideIcon } from 'lucide-react';

/**
 * Projects shown in the Projects section.
 * To add a project, append an object to `projects` below — no UI changes needed.
 * Category tabs are derived automatically from the `category` values used.
 */
export interface Project {
  title: string;
  description: string;
  /** Optional one-line highlight shown in a green callout. */
  result?: string;
  technologies: string[];
  github?: string;
  live?: string;
  /** Optional projectId from src/data/caseStudies.ts; shows a "Case Study" button. */
  caseStudy?: string;
  featured: boolean;
  flagship?: boolean;
  category: string;
  badge: string;
  badgeColor: 'gold' | 'green' | 'blue' | 'purple' | 'orange' | 'cyan';
  icon: LucideIcon;
  isCurrent?: boolean;
}

export const projects: Project[] = [
  {
    title: 'Marketplace Intelligence & AI Advisor Platform',
    description:
      'Multi-marketplace intelligence platform for online sellers that scans listings, normalizes marketplace data, tracks pricing and catalog signals over time, and supports listing creation and margin analysis. A plugin architecture (a shared marketplace interface plus a registry) isolates marketplace-specific code, so eBay is the first real integration (OAuth, Sell/Inventory and Trading APIs, taxonomy) and others plug in without touching the core apps. Includes an OpenAI-backed product research agent and an AI advisor layer.',
    result: 'Live eBay sandbox publishing · order polling · margin & analytics dashboard',
    technologies: ['Django', 'Django REST Framework', 'PostgreSQL', 'Redis', 'Celery', 'OpenAI API', 'React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Docker'],
    featured: true,
    flagship: true,
    category: 'Full Stack',
    badge: 'In Development',
    badgeColor: 'gold',
    icon: ShoppingCart,
    isCurrent: true,
  },
  {
    title: 'AI-Powered Professional Networking & Real-Time Messaging',
    description:
      'Professional networking backend that connects technology professionals through real-time WebSocket features. Flask-SocketIO serves separate /messaging and /notification namespaces with JWT-authenticated connections, per-user and per-thread rooms, live presence, and unread-count subscriptions. Users can chat in threads and follow each other, with follow notifications pushed instantly. REST APIs cover registration, login, email verification, password reset, and professional profiles with education and image upload. A call namespace for audio/video chat is scaffolded; WebRTC signaling and AI matchmaking are on the roadmap.',
    result: 'WebSocket messaging · live presence · real-time follow notifications',
    technologies: ['Python', 'Flask', 'Flask-SocketIO', 'WebSockets', 'MongoDB', 'MongoEngine', 'JWT', 'React', 'Socket.IO Client', 'Vite'],
    github: 'https://github.com/Abdul-Samad786/AI-Powered-Spontaneous-Professional-Networking-Platform',
    featured: true,
    flagship: true,
    category: 'Real-Time',
    badge: 'WebSockets',
    badgeColor: 'cyan',
    icon: MessagesSquare,
  },
  {
    title: 'Dockerized Flask Load Balancer',
    description:
      'Application-level load balancer built with Flask that spreads requests across three replicated backend instances. For each request it polls every backend\'s /api/stats endpoint (CPU and memory usage read from the system), adds the two figures into a single load score, and forwards the request to the least-loaded server. Unreachable backends are skipped, and a clear error is returned if none are available. The backend API exposes health stats and sample product endpoints, and a Docker Compose setup runs the balancer plus three backend containers.',
    result: 'Least-loaded routing by CPU + memory · 3 backend replicas',
    technologies: ['Python', 'Flask', 'Docker', 'Docker Compose', 'REST APIs', 'Requests'],
    github: 'https://github.com/Abdul-Samad786/Load_Balancer_Application',
    featured: true,
    category: 'Backend',
    badge: 'Docker',
    badgeColor: 'blue',
    icon: Network,
  },
  {
    title: 'CardioScan: Heart Disease Prediction',
    description:
      'Machine learning project that predicts the presence of heart disease from 13 clinical features (age, blood pressure, cholesterol, max heart rate, ST depression and more) using a 270-record patient dataset. In a notebook I cleaned and encoded the data, scaled numeric features with RobustScaler, and trained and compared Logistic Regression, Decision Tree and Random Forest classifiers on a stratified 80/20 split. The trained models are served by a Flask API with a /predict endpoint that validates input, returns each model\'s prediction and confidence, and combines them by majority vote. A single-page web form, CardioScan, lets users enter values and see the results.',
    result: 'Logistic Regression 85.2% · Random Forest 83.3% · Decision Tree 77.8% test accuracy',
    technologies: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Flask', 'Jupyter', 'JavaScript'],
    github: 'https://github.com/Abdul-Samad786/Heart_Disease_Prediction',
    featured: true,
    category: 'AI / ML',
    badge: 'Machine Learning',
    badgeColor: 'purple',
    icon: HeartPulse,
  },
  {
    title: 'Charity Donation System',
    description:
      'Full-stack web app for browsing charities, donating, and tracking fundraising progress, built as an Advanced DBMS project. A Flask REST API exposes full CRUD for charities, donation history and statistics endpoints (overview and top donors). Each donation inserts a record and updates the charity\'s raised amount inside a single MySQL transaction that rolls back on failure. The InnoDB schema uses foreign keys with cascading deletes, indexes, and three SQL views (charity progress, donation summary, category stats) built on JOINs and aggregate functions. The frontend is a single-page Bootstrap interface that calls the API with fetch.',
    result: 'Atomic donations via MySQL transactions · 3 SQL views · JOINs & aggregates',
    technologies: ['Python', 'Flask', 'MySQL', 'SQL Views', 'Transactions', 'REST APIs', 'JavaScript', 'Bootstrap'],
    github: 'https://github.com/Abdul-Samad786/Charity_Donation_System',
    featured: false,
    category: 'Full Stack',
    badge: 'Database',
    badgeColor: 'orange',
    icon: HandHeart,
  },
];
