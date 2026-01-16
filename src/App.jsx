import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';

// --- Contexts ---
import { ThemeProvider } from './context/ThemeContext';

// --- Components ---
import { ScrollToTop } from './components/common/ScrollToTop';
import { CustomCursor } from './components/common/CustomCursor';
import { PageWrapper } from './components/common/PageWrapper';
import { LoadingSpinner } from './components/common/LoadingSpinner';

// --- Pages (Lazy Loaded) ---
const HeroPage = React.lazy(() => import('./pages/HeroPage').then(module => ({ default: module.HeroPage })));
const AboutPage = React.lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage').then(module => ({ default: module.ProjectsPage })));
const BlogPage = React.lazy(() => import('./pages/BlogPage').then(module => ({ default: module.BlogPage })));
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage').then(module => ({ default: module.BlogPostPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const AdminPage = React.lazy(() => import('./pages/AdminPage').then(module => ({ default: module.AdminPage })));
const SnippetsPage = React.lazy(() => import('./pages/SnippetsPage').then(module => ({ default: module.SnippetsPage })));
const NotFound = React.lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));
import { DevTerminal } from './components/ui/DevTerminal';

export const AppContent = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>
        <AnimatePresence mode="wait">
          <React.Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}><LoadingSpinner /></div>}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><HeroPage /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
              <Route path="/projects" element={<PageWrapper><ProjectsPage /></PageWrapper>} />
              <Route path="/blog" element={<PageWrapper><BlogPage /></PageWrapper>} />
              <Route path="/blog/:id" element={<PageWrapper><BlogPostPage /></PageWrapper>} />
              <Route path="/snippets" element={<PageWrapper><SnippetsPage /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
              <Route path="/admin" element={<PageWrapper><AdminPage /></PageWrapper>} />
              <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
            </Routes>
          </React.Suspense>
        </AnimatePresence>
      </main>
      <footer className="container" style={{ padding: '2rem 0', textAlign: 'center', borderTop: '1px solid var(--border-color)', marginTop: '4rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>
          © {new Date().getFullYear()} Jo'rabek Egamov. Built with React & Passion.
        </p>
      </footer>
      <DevTerminal />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <CustomCursor />
        <ScrollToTop />
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
