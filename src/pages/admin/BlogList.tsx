import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchAdminBlogs, deleteAdminBlog, type AdminBlog } from '../../api/adminBlogs';

const LIMIT = 10;

export default function BlogList() {
  const [blogs, setBlogs] = useState<AdminBlog[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadBlogs = useCallback((targetPage: number) => {
    setIsLoading(true);
    setError(null);
    fetchAdminBlogs(targetPage, LIMIT)
      .then((data) => {
        setBlogs(data.blogs);
        setPage(data.page);
        setPages(data.pages);
        setTotal(data.total);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load blogs');
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    loadBlogs(1);
  }, [loadBlogs]);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await deleteAdminBlog(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      setTotal((prev) => prev - 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete blog');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}>
            Blog Posts
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {total} total
          </p>
        </div>
        <Link to="/admin/blogs/new" className="btn-primary text-sm">
          <Plus size={16} aria-hidden="true" />
          <span>New Blog</span>
        </Link>
      </div>

      {error && (
        <div
          className="mb-6 px-4 py-3 rounded-lg text-sm"
          style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171' }}
          role="alert"
        >
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--accent-primary)' }} />
        </div>
      ) : blogs.length === 0 ? (
        <div className="glass-card p-10 text-center">
          <p style={{ color: 'var(--text-secondary)' }}>No blog posts yet.</p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <th className="text-left px-5 py-3 font-semibold" style={{ color: 'var(--text-muted)' }}>Title</th>
                  <th className="text-left px-5 py-3 font-semibold" style={{ color: 'var(--text-muted)' }}>Status</th>
                  <th className="text-left px-5 py-3 font-semibold" style={{ color: 'var(--text-muted)' }}>Tags</th>
                  <th className="text-left px-5 py-3 font-semibold" style={{ color: 'var(--text-muted)' }}>Updated</th>
                  <th className="text-right px-5 py-3 font-semibold" style={{ color: 'var(--text-muted)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td className="px-5 py-4">
                      <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{blog.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>{blog.slug}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="px-2.5 py-1 text-xs font-semibold rounded-full"
                        style={
                          blog.status === 'published'
                            ? { background: 'rgba(16, 185, 129, 0.12)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }
                            : { background: 'rgba(148, 163, 184, 0.12)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)' }
                        }
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="tech-tag">{tag}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4" style={{ color: 'var(--text-secondary)' }}>
                      {new Date(blog.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/blogs/${blog._id}/edit`}
                          className="p-2 rounded-lg transition-colors duration-200"
                          style={{ color: 'var(--text-secondary)' }}
                          aria-label={`Edit ${blog.title}`}
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(blog._id, blog.title)}
                          disabled={deletingId === blog._id}
                          className="p-2 rounded-lg transition-colors duration-200"
                          style={{ color: '#f87171' }}
                          aria-label={`Delete ${blog.title}`}
                        >
                          {deletingId === blog._id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {pages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => loadBlogs(page - 1)}
            disabled={page <= 1}
            className="btn-secondary text-sm"
            style={{ opacity: page <= 1 ? 0.5 : 1, cursor: page <= 1 ? 'not-allowed' : 'pointer' }}
          >
            <ChevronLeft size={16} aria-hidden="true" />
            <span>Prev</span>
          </button>
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Page {page} of {pages}
          </span>
          <button
            type="button"
            onClick={() => loadBlogs(page + 1)}
            disabled={page >= pages}
            className="btn-secondary text-sm"
            style={{ opacity: page >= pages ? 0.5 : 1, cursor: page >= pages ? 'not-allowed' : 'pointer' }}
          >
            <span>Next</span>
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
