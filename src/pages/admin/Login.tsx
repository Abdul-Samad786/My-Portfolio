import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LogIn, Loader2 } from 'lucide-react';
import { loginAdmin } from '../../api/adminAuth';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

export default function AdminLogin() {
  const { isAuthenticated, login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    const redirectTo = (location.state as { from?: string } | null)?.from ?? '/admin/blogs';
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const token = await loginAdmin(username, password);
      login(token);
      navigate('/admin/blogs', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="glass-card p-7">
          <h1
            className="text-xl font-bold mb-1"
            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
          >
            Admin Login
          </h1>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            Sign in to manage blog posts.
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="float-label-wrap">
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=" "
                autoComplete="username"
                className="float-label-input"
                required
              />
              <label htmlFor="username" className="float-label">Username</label>
            </div>

            <div className="float-label-wrap">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                autoComplete="current-password"
                className="float-label-input"
                required
              />
              <label htmlFor="password" className="float-label">Password</label>
            </div>

            {error && (
              <p role="alert" className="text-sm" style={{ color: '#f87171' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full justify-center"
              style={{ opacity: isSubmitting ? 0.8 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} aria-hidden="true" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn size={18} aria-hidden="true" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
