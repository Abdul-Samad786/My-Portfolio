import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LogOut, Code2 } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

export default function AdminLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-base)' }}>
      <header
        className="border-b"
        style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/admin/blogs" className="flex items-center gap-2.5">
            <div
              className="p-1.5 rounded-lg border"
              style={{ background: 'rgba(14, 165, 233, 0.08)', borderColor: 'var(--border-default)' }}
            >
              <Code2 size={18} style={{ color: 'var(--accent-primary)' }} />
            </div>
            <span className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>
              Blog Admin
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="btn-secondary text-sm"
            type="button"
          >
            <LogOut size={16} aria-hidden="true" />
            <span>Log out</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
