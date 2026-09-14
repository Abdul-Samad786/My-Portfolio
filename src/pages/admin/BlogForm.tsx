import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import { fetchAdminBlog, createAdminBlog, updateAdminBlog, type BlogInput } from '../../api/adminBlogs';

interface BlogFormProps {
  mode: 'create' | 'edit';
}

interface FormState {
  title: string;
  slug: string;
  content: string;
  excerpt: string;  badge: string;
  tags: string;
  status: 'draft' | 'published';
}

const EMPTY_FORM: FormState = {
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  badge: '',
  tags: '',
  status: 'draft',
};

export default function BlogForm({ mode }: BlogFormProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState(mode === 'edit');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === 'edit' && id) {
      setIsLoading(true);
      fetchAdminBlog(id)
        .then((blog) => {
          setForm({
            title: blog.title,
            slug: blog.slug,
            content: blog.content,
            excerpt: blog.excerpt ?? '',
            badge: blog.badge ?? '',
            tags: blog.tags.join(', '),
            status: blog.status,
          });
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : 'Failed to load blog');
        })
        .finally(() => setIsLoading(false));
    }
  }, [mode, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    const input: BlogInput = {
      title: form.title,
      content: form.content,
      excerpt: form.excerpt || undefined,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      badge: form.badge || undefined,
      status: form.status,
    };
    if (form.slug.trim()) {
      input.slug = form.slug.trim();
    }

    try {
      if (mode === 'create') {
        const created = await createAdminBlog(input);
        navigate(`/admin/blogs/${created._id}/edit`, { replace: true });
      } else if (id) {
        await updateAdminBlog(id, input);
        navigate('/admin/blogs');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save blog');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--accent-primary)' }} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <button
        type="button"
        onClick={() => navigate('/admin/blogs')}
        className="flex items-center gap-1.5 text-sm mb-6 transition-colors duration-200"
        style={{ color: 'var(--text-secondary)' }}
      >
        <ArrowLeft size={16} aria-hidden="true" />
        <span>Back to blogs</span>
      </button>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}>
          {mode === 'create' ? 'New Blog Post' : 'Edit Blog Post'}
        </h1>
        {mode === 'edit' && (
          <span
            className="px-2.5 py-1 text-xs font-semibold rounded-full"
            style={
              form.status === 'published'
                ? { background: 'rgba(16, 185, 129, 0.12)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }
                : { background: 'rgba(148, 163, 184, 0.12)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)' }
            }
          >
            {form.status}
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate className="glass-card p-7 space-y-5">
        <div className="float-label-wrap">
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder=" "
            className="float-label-input"
            required
          />
          <label htmlFor="title" className="float-label">Title</label>
        </div>

        <div className="float-label-wrap">
          <input
            type="text"
            id="slug"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder=" "
            className="float-label-input"
          />
          <label htmlFor="slug" className="float-label">Slug (auto-generated from title if left blank)</label>
        </div>

        <div className="float-label-wrap">
          <input
            type="text"
            id="badge"
            name="badge"
            value={form.badge}
            onChange={handleChange}
            placeholder=" "
            className="float-label-input"
          />
          <label htmlFor="badge" className="float-label">Badge</label>
        </div>

        <div className="float-label-wrap textarea">
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder=" "
            rows={16}
            className="float-label-textarea"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem', minHeight: '360px' }}
            required
          />
          <label htmlFor="content" className="float-label">Content (Markdown)</label>
        </div>

        <div className="float-label-wrap textarea">
          <textarea
            id="excerpt"
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            placeholder=" "
            rows={3}
            className="float-label-textarea"
          />
          <label htmlFor="excerpt" className="float-label">Excerpt</label>
        </div>

        <div className="float-label-wrap">
          <input
            type="text"
            id="tags"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder=" "
            className="float-label-input"
          />
          <label htmlFor="tags" className="float-label">Tags (comma-separated)</label>
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-xs uppercase tracking-wider mb-2"
            style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className="float-label-input"
            style={{ paddingTop: '0.75rem' }}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {error && (
          <p role="alert" className="text-sm" style={{ color: '#f87171' }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSaving}
          className="btn-primary"
          style={{ opacity: isSaving ? 0.8 : 1, cursor: isSaving ? 'not-allowed' : 'pointer' }}
        >
          {isSaving ? (
            <>
              <Loader2 className="animate-spin" size={18} aria-hidden="true" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save size={18} aria-hidden="true" />
              <span>{mode === 'create' ? 'Create Blog' : 'Save Changes'}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
