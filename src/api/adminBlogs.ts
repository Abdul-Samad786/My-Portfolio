import { getAdminToken, clearAdminToken } from './adminAuth';
import { normalizeMarkdownContent } from '../utils/markdown';

const API_URL = import.meta.env.VITE_API_URL;

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export interface AdminBlog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  tags: string[];
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  published_at: string | null;
  badge?: string | null;
}

export interface AdminBlogListData {
  blogs: AdminBlog[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface BlogInput {
  title?: string;
  slug?: string;
  badge?: string;
  content?: string;
  excerpt?: string;
  cover_image?: string;
  tags?: string[];
  status?: 'draft' | 'published';
}

async function adminRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (response.status === 401) {
    clearAdminToken();
    window.location.href = '/admin/login';
    throw new ApiError('Session expired', 401);
  }

  const body: ApiResponse<T> = await response.json();
  if (!response.ok || !body.success) {
    throw new ApiError(body.message || 'Request failed', response.status);
  }
  return body.data;
}

function normalizeAdminBlog(blog: AdminBlog): AdminBlog {
  return {
    ...blog,
    content: normalizeMarkdownContent(blog.content),
  };
}

export async function fetchAdminBlogs(page = 1, limit = 10): Promise<AdminBlogListData> {
  const data = await adminRequest<AdminBlogListData>(
    `/api/admin/blogs?page=${page}&limit=${limit}`
  );
  return {
    ...data,
    blogs: data.blogs.map(normalizeAdminBlog),
  };
}

export async function fetchAdminBlog(id: string): Promise<AdminBlog> {
  const blog = await adminRequest<AdminBlog>(`/api/admin/blogs/${id}`);
  return normalizeAdminBlog(blog);
}

export function createAdminBlog(input: BlogInput): Promise<AdminBlog> {
  return adminRequest(`/api/admin/blogs`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateAdminBlog(id: string, input: BlogInput): Promise<AdminBlog> {
  return adminRequest(`/api/admin/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}

export async function deleteAdminBlog(id: string): Promise<void> {
  await adminRequest<null>(`/api/admin/blogs/${id}`, { method: 'DELETE' });
}
