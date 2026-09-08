import { Brain, Code, Cpu, Zap } from 'lucide-react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  tags: string[];
  icon: typeof Code;
  gradient: string;
  featured?: boolean;
}

const categoryIcons: Record<string, typeof Code> = {
  'Machine Learning': Brain,
  'AI': Cpu,
  'Backend': Zap,
  'Development': Code,
};

const categoryGradients: Record<string, string> = {
  'Machine Learning': 'from-teal to-cyan',
  'AI': 'from-cyan to-teal',
  'Backend': 'from-teal to-cyan',
  'Development': 'from-cyan to-teal',
};

interface BlogMetadata {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  tags: string[];
  featured?: boolean;
}

const blogMetadata: BlogMetadata[] = [
  {
    id: 'interpretable-ml-shap-housing',
    title: 'Interpretable ML for Housing Prices: NLP Embeddings, Ensembles, and SHAP',
    excerpt:
      'How I built an end-to-end housing price prediction pipeline combining NLP embeddings with Linear Regression, Random Forest, and DNNs — then used SHAP to explain why listings succeed.',
    category: 'Machine Learning',
    readTime: '12 min read',
    date: '2025-06-18',
    tags: ['SHAP', 'NLP', 'Random Forest', 'Regression', 'Interpretability'],
    featured: true,
  },
  {
    id: 'lora-finetuning-smollm2',
    title: 'Fine-Tuning Small LLMs with LoRA: Building a Precise Unit Conversion Reasoner',
    excerpt:
      'A practical walkthrough of in-context learning, LoRA fine-tuning, and reinforcement fine-tuning (RFT) on SmolLM2 to generate accurate unit conversions across diverse measurement systems.',
    category: 'AI',
    readTime: '14 min read',
    date: '2025-04-22',
    tags: ['LoRA', 'SmolLM2', 'Fine-Tuning', 'In-Context Learning', 'LLMs'],
    featured: true,
  },
  {
    id: 'yourtts-voice-cloning',
    title: 'Multilingual Voice Cloning with YourTTS on Google Colab',
    excerpt:
      'Designing a generalized text-to-speech voice cloning system with YourTTS — from WAV reference clips to multilingual synthesis, optimized for GPU-backed Colab workflows.',
    category: 'AI',
    readTime: '11 min read',
    date: '2025-02-10',
    tags: ['YourTTS', 'TTS', 'Voice Cloning', 'Colab', 'Speech Synthesis'],
    featured: true,
  },
  {
    id: 'flask-to-django-migration',
    title: 'Migrating a Production Flask API to Django Without Downtime',
    excerpt:
      'Lessons from leading a Flask → Django migration: mapping blueprints to apps, preserving MongoDB access patterns, and keeping REST contracts stable for frontend clients.',
    category: 'Backend',
    readTime: '10 min read',
    date: '2025-11-05',
    tags: ['Flask', 'Django', 'Migration', 'REST', 'Python'],
    featured: false,
  },
  {
    id: 'flask-mongodb-rest-apis',
    title: 'Building Scalable REST APIs with Flask and MongoDB',
    excerpt:
      'Patterns for modular Flask backends on MongoDB — schema design, indexing, error handling, and documenting APIs that stay reliable under production load.',
    category: 'Backend',
    readTime: '9 min read',
    date: '2025-09-14',
    tags: ['Flask', 'MongoDB', 'REST APIs', 'Python', 'Backend'],
    featured: false,
  },
  {
    id: 'nlp-embeddings-for-tabular-ml',
    title: 'When Text Meets Tables: Using NLP Embeddings in Regression Pipelines',
    excerpt:
      'Property listings are half numbers, half language. Here is how I fused sentence embeddings with classical and deep regression models to improve prediction quality.',
    category: 'Machine Learning',
    readTime: '8 min read',
    date: '2025-05-28',
    tags: ['NLP', 'Embeddings', 'Feature Engineering', 'scikit-learn', 'DNN'],
    featured: false,
  },
];

async function loadMarkdownContent(id: string): Promise<string> {
  try {
    const response = await fetch(`/content/blogs/${id}.md`);
    if (!response.ok) {
      throw new Error(`Failed to load blog: ${id}`);
    }
    const text = await response.text();

    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const content = text.replace(frontmatterRegex, '');

    return content.trim();
  } catch (error) {
    console.error(`Error loading blog ${id}:`, error);
    return '';
  }
}

export function getBlogPosts(): Omit<BlogPost, 'content'>[] {
  return blogMetadata.map((post): Omit<BlogPost, 'content'> => ({
    ...post,
    icon: categoryIcons[post.category] || Code,
    gradient: categoryGradients[post.category] || 'from-teal to-cyan',
  }));
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  const metadata = blogMetadata.find((post) => post.id === id);
  if (!metadata) {
    return null;
  }

  const content = await loadMarkdownContent(id);
  if (!content) {
    return null;
  }

  return {
    ...metadata,
    content,
    icon: categoryIcons[metadata.category] || Code,
    gradient: categoryGradients[metadata.category] || 'from-teal to-cyan',
  };
}
