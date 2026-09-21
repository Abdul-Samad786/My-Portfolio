import { normalizeMarkdownContent } from '../utils/markdown';

const API_URL = import.meta.env.VITE_API_URL;

export interface Article {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  badge?: string;
  tags: string[];
  status: string;
  created_at: string;
  updated_at: string;
  published_at: string;
}

function normalizeArticle(article: Article): Article {
  return {
    ...article,
    content: normalizeMarkdownContent(article.content),
    excerpt: article.excerpt ?? '',
  };
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

interface BlogListData {
  blogs: Article[];
  page?: number;
  pages?: number;
  limit?: number;
  total?: number;
}

export async function getArticles(): Promise<Article[] | null> {
  try {
    const response = await fetch(`${API_URL}/api/blogs`);
    if (!response.ok) {
      return null;
    }
    const body: ApiResponse<BlogListData | Article[]> = await response.json();
    const data = body.data;

    // API returns paginated { blogs: [...] }; keep a fallback if data is already an array
    if (Array.isArray(data)) {
      return data.map(normalizeArticle);
    }
    if (data && Array.isArray(data.blogs)) {
      return data.blogs.map(normalizeArticle);
    }
    return null;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return null;
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await fetch(`${API_URL}/api/blogs/${slug}`);
    if (!response.ok) {
      return null;
    }
    const body: ApiResponse<Article> = await response.json();
    return body.data ? normalizeArticle(body.data) : null;
  } catch (error) {
    console.error(`Error fetching article ${slug}:`, error);
    return null;
  }
}
