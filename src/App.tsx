import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Loading from './components/Loading';
import ReadingProgress from './components/ReadingProgress';
import BackToTop from './components/BackToTop';
import Analytics from './components/Analytics';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
// import Projects from './sections/Projects'; // add when personal projects are ready
// import Clients from './sections/Clients';
import Education from './sections/Education';
import Blog from './sections/Blog';
import Contact from './sections/Contact';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import AdminLogin from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';
import ProtectedRoute from './pages/admin/ProtectedRoute';
import BlogList from './pages/admin/BlogList';
import BlogForm from './pages/admin/BlogForm';

function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden="true" />
  );
}

function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Loading key="loading" />
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ backgroundColor: 'var(--bg-base)' }}
          className="min-h-screen"
        >
          <div className="noise-overlay" aria-hidden="true" />
          <Analytics />
          <ReadingProgress />
          <Navigation />
          <BackToTop />
          <main>
            <Hero />
            <SectionDivider />
            <div className="section-ambient"><About /></div>
            <SectionDivider />
            <div className="section-ambient"><Skills /></div>
            <SectionDivider />
            <div className="section-ambient"><Experience /></div>
            <SectionDivider />
            <div className="section-ambient"><Education /></div>
            <SectionDivider />
            <div className="section-ambient"><Blog /></div>
            <SectionDivider />
            <div className="section-ambient"><Contact /></div>
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="blogs" replace />} />
              <Route path="blogs" element={<BlogList />} />
              <Route path="blogs/new" element={<BlogForm mode="create" />} />
              <Route path="blogs/:id/edit" element={<BlogForm mode="edit" />} />
            </Route>
          </Route>
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App;
