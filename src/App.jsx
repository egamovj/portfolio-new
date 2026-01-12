import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronRight,
  Code,
  Users,
  Briefcase,
  Terminal,
  Send,
  Globe,
  Sun,
  Moon,
  X,
  MessageSquare,
  Star,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
  increment
} from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import emailjs from 'emailjs-com';
import { Eye } from 'lucide-react';

// --- Contexts ---
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

// --- Helpers ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};


const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem' }}>
    <motion.div
      style={{
        width: '50px',
        height: '50px',
        border: '3px solid var(--border-color)',
        borderTop: '3px solid var(--accent)',
        borderRadius: '50%',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          boxShadow: '0 0 20px var(--accent-glow)',
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  </div>
);

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const TechRadar = () => {
  const skills = [
    { name: 'React', value: 95, category: 'Frontend' },
    { name: 'JavaScript', value: 90, category: 'Frontend' },
    { name: 'Node.js', value: 80, category: 'Backend' },
    { name: 'Firebase', value: 85, category: 'Backend' },
    { name: 'CSS/UI', value: 90, category: 'Frontend' },
    { name: 'Mentorship', value: 85, category: 'Soft' },
    { name: 'English', value: 75, category: 'Soft' },
  ];

  const levels = [20, 40, 60, 80, 100];
  const angleStep = (Math.PI * 2) / skills.length;
  const radius = 150;
  const centerX = 200;
  const centerY = 200;

  const points = skills.map((s, i) => {
    const x = centerX + radius * (s.value / 100) * Math.cos(i * angleStep - Math.PI / 2);
    const y = centerY + radius * (s.value / 100) * Math.sin(i * angleStep - Math.PI / 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem' }}>
      <h3 style={{ marginBottom: '1.5rem' }}>Technical Expertise Radar</h3>
      <svg width="400" height="400" viewBox="0 0 400 400" style={{ maxWidth: '100%', height: 'auto' }}>
        {/* Background Grids */}
        {levels.map(level => (
          <polygon
            key={level}
            points={skills.map((_, i) => {
              const x = centerX + radius * (level / 100) * Math.cos(i * angleStep - Math.PI / 2);
              const y = centerY + radius * (level / 100) * Math.sin(i * angleStep - Math.PI / 2);
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke="var(--border-color)"
            strokeDasharray="4 4"
          />
        ))}

        {/* Axis Lines */}
        {skills.map((_, i) => {
          const x = centerX + radius * Math.cos(i * angleStep - Math.PI / 2);
          const y = centerY + radius * Math.sin(i * angleStep - Math.PI / 2);
          return <line key={i} x1={centerX} y1={centerY} x2={x} y2={y} stroke="var(--border-color)" />;
        })}

        {/* Data Area */}
        <motion.polygon
          points={points}
          fill="rgba(16, 185, 129, 0.2)"
          stroke="var(--accent)"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Labels */}
        {skills.map((s, i) => {
          const x = centerX + (radius + 20) * Math.cos(i * angleStep - Math.PI / 2);
          const y = centerY + (radius + 20) * Math.sin(i * angleStep - Math.PI / 2);
          return (
            <text
              key={i}
              x={x}
              y={y}
              fill="var(--text-secondary)"
              fontSize="12"
              textAnchor="middle"
              alignmentBaseline="middle"
              style={{ fontWeight: 500 }}
            >
              {s.name}
            </text>
          );
        })}
      </svg>
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>● Inner: Learning</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>● Outer: Expert</div>
      </div>
    </div>
  );
};

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(0, { damping: 20, stiffness: 250 });
  const cursorY = useSpring(0, { damping: 20, stiffness: 250 });
  const outlineX = useSpring(0, { damping: 25, stiffness: 150 });
  const outlineY = useSpring(0, { damping: 25, stiffness: 150 });

  useEffect(() => {
    const mouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      outlineX.set(e.clientX);
      outlineY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleHoverStart = (e) => {
      if (e.target.closest('a, button, .interactive, .social-link, .github-stat-item')) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => setIsHovering(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleHoverStart);
    window.addEventListener('mouseout', handleHoverEnd);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Check if mouse is already in window
    if (window.innerWidth > 0) {
      setIsVisible(true);
    }

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleHoverStart);
      window.removeEventListener('mouseout', handleHoverEnd);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, cursorX, cursorY, outlineX, outlineY]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      zIndex: 10000,
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.3s ease'
    }}>
      <motion.div
        className="cursor-dot mobile-hide"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
      />
      <motion.div
        className={`cursor-outline mobile-hide ${isHovering ? 'hovered' : ''}`}
        style={{
          x: outlineX,
          y: outlineY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  );
};

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="glass" style={{ display: 'flex', gap: '0.5rem', padding: '0.4rem', borderRadius: '2rem' }}>
      <button onClick={() => setTheme('light')} className={`btn-icon ${theme === 'light' ? 'accent-text' : ''}`}><Sun size={18} /></button>
      <button onClick={() => setTheme('dark')} className={`btn-icon ${theme === 'dark' ? 'accent-text' : ''}`}><Moon size={18} /></button>
    </div>
  );
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  return (
    <div className="glass" style={{ display: 'flex', gap: '0.5rem', padding: '0.4rem', borderRadius: '2rem' }}>
      {['en', 'uz', 'ru'].map(lang => (
        <button
          key={lang}
          onClick={() => i18n.changeLanguage(lang)}
          className={`btn-icon ${i18n.language === lang ? 'accent-text' : ''}`}
          style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="glass modal-content"
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}>
            <X size={24} />
          </button>
          <h2 style={{ marginBottom: '2rem' }}>{title}</h2>
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const GitHubStats = () => {
  const [stats, setStats] = useState({ stars: 0, repos: 0, followers: 0 });

  useEffect(() => {
    setStats({ stars: 12, repos: 24, followers: 56 });
  }, []);

  return (
    <div className="glass" style={{ padding: '1.5rem', marginTop: '2rem', display: 'flex', justifyContent: 'around', gap: '2rem', textAlign: 'center' }}>
      <div>
        <Star size={20} className="accent-text" />
        <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{stats.stars}</div>
        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Stars</div>
      </div>
      <div>
        <BookOpen size={20} className="accent-text" />
        <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{stats.repos}</div>
        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Repos</div>
      </div>
      <div>
        <Users size={20} className="accent-text" />
        <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{stats.followers}</div>
        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Followers</div>
      </div>
    </div>
  );
};

const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  const { t } = useTranslation();
  return (
    <header className="container" style={{ position: 'fixed', top: '1.5rem', width: '100%', left: '0', right: '0', zIndex: 1000, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
      <div className="glass navbar-container" style={{ display: 'flex', gap: '1.5rem', padding: '0.5rem 1.5rem', borderRadius: '3rem', pointerEvents: 'auto', alignItems: 'center', width: 'auto' }}>
        <nav className="desktop-nav">
          <ul style={{ display: 'flex', gap: '1.5rem', margin: 0 }}>
            <li><Link to="/" className="hover-link">{t('nav.home')}</Link></li>
            <li><Link to="/about" className="hover-link">{t('nav.about')}</Link></li>
            <li><Link to="/projects" className="hover-link">{t('nav.projects')}</Link></li>
            <li><Link to="/blog" className="hover-link">{t('nav.blog')}</Link></li>
            <li><Link to="/contact" className="hover-link">{t('nav.contact')}</Link></li>
          </ul>
        </nav>
        <div className="desktop-nav-separator" style={{ height: '24px', width: '1px', background: 'var(--border-color)' }}></div>
        <div className="desktop-controls" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>

        <button className="mobile-menu-toggle btn-icon" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'none' }}>
          {isMenuOpen ? <X size={24} /> : <Globe size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass mobile-menu-dropdown"
            style={{
              position: 'absolute',
              top: '4.5rem',
              width: 'calc(100% - 3rem)',
              padding: '2rem',
              pointerEvents: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              alignItems: 'center'
            }}
          >
            <nav>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', margin: 0, textAlign: 'center' }}>
                <li><Link to="/" className="hover-link" onClick={() => setIsMenuOpen(false)}>{t('nav.home')}</Link></li>
                <li><Link to="/about" className="hover-link" onClick={() => setIsMenuOpen(false)}>{t('nav.about')}</Link></li>
                <li><Link to="/projects" className="hover-link" onClick={() => setIsMenuOpen(false)}>{t('nav.projects')}</Link></li>
                <li><Link to="/blog" className="hover-link" onClick={() => setIsMenuOpen(false)}>{t('nav.blog')}</Link></li>
                <li><Link to="/contact" className="hover-link" onClick={() => setIsMenuOpen(false)}>{t('nav.contact')}</Link></li>
              </ul>
            </nav>
            <div style={{ width: '100%', height: '1px', background: 'var(--border-color)' }}></div>
            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'center' }}>
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- Pages ---

const HeroPage = () => {
  const { t } = useTranslation();
  return (
    <section id="home" className="container" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '8rem'
    }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="hero-content" style={{ width: '100%' }}>
        <span className="accent-text" style={{ letterSpacing: '2px', fontWeight: 600 }}>{t('hero.role')}</span>
        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginTop: '1rem', marginBottom: '1.5rem' }}>
          Jo'rabek <span className="accent-text">Egamov</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '2.5rem' }}>
          {t('hero.tagline')}
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/projects" className="btn btn-primary">{t('hero.view_projects')} <ChevronRight size={18} /></Link>
          <Link to="/contact" className="btn btn-secondary">{t('hero.contact_me')}</Link>
        </div>
        <GitHubStats />
      </motion.div>
    </section>
  );
};

const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="container" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.8' }}>{t('about.bio') || t('about.p1')}</p>
          <TechRadar />
          <div className="glass" style={{ padding: '1.5rem', marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>{t('about.focus')}</h3>
            <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Terminal size={16} className="accent-text" /> {t('about.commercial')}</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={16} className="accent-text" /> {t('about.mentoring')}</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Briefcase size={16} className="accent-text" /> {t('about.scalable')}</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Code size={16} className="accent-text" /> {t('about.performance')}</li>
            </ul>
          </div>
        </motion.div>
        <div className="glass" style={{ aspectRatio: '1', borderRadius: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Code size={120} className="accent-text" style={{ opacity: 0.3 }} />
          <div style={{ position: 'absolute', inset: '-1rem', border: '2px solid var(--accent)', borderRadius: '2rem', opacity: 0.5 }}></div>
        </div>
      </div>
    </section>
  );
};

const ProjectsPage = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      name: "Complex ERP System",
      desc: "A full-scale internal management system with advanced data visualization.",
      tech: ["React", "TypeScript", "Node.js"],
      problem: "Traditional ERPs were slow and lacked real-time synchronization between departments, causing data lag and inventory errors.",
      solution: "Implemented a WebSocket-driven architecture with a React frontend, reducing data updates from minutes to milliseconds and improving synchronization accuracy by 95%."
    },
    {
      id: 2,
      name: "Mentorship Platform",
      desc: "Learning management system for students and mentors to track progress.",
      tech: ["Next.js", "Firebase", "Tailwind CSS"],
      problem: "Mentors struggled to track the individual progress of 50+ students across different modules without manual spreadsheets.",
      solution: "Created a centralized dashboard with automated progress tracking and instant feedback loops, saving mentors 10+ hours per week on admin tasks."
    },
    {
      id: 3,
      name: "Billiard ERP",
      desc: "Specialized ERP for billiard clubs handling session management and thermal receipt printing.",
      tech: ["React", "Express", "PostgreSQL"],
      problem: "Manual session timing led to revenue loss and customer disputes over billing accuracy.",
      solution: "Developed an automated timing system integrated with a thermal printer utility, ensuring 100% billing accuracy and professional receipts."
    }
  ];

  return (
    <section id="projects" className="container" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
        {projects.map((proj, idx) => (
          <motion.div
            key={idx}
            className="glass"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }}
            onClick={() => setSelectedProject(proj)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <Terminal size={40} className="accent-text" />
              <ExternalLink size={24} style={{ opacity: 0.6 }} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{proj.name}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>{proj.desc}</p>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <span className="accent-text" style={{ fontSize: '0.8rem', fontWeight: 600 }}>{t('projects.view_case')} →</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {proj.tech.map(t => (
                <span key={t} className="tech-tag" style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.name}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h4 className="accent-text" style={{ marginBottom: '0.5rem' }}>{t('projects.problem')}</h4>
            <p style={{ color: 'var(--text-secondary)' }}>{selectedProject?.problem}</p>
          </div>
          <div>
            <h4 className="accent-text" style={{ marginBottom: '0.5rem' }}>{t('projects.solution')}</h4>
            <p style={{ color: 'var(--text-secondary)' }}>{selectedProject?.solution}</p>
          </div>
        </div>
      </Modal>
    </section>
  );
};

const BlogPage = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section id="blog" className="container" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <motion.div key={post.id} className="glass" style={{ padding: '2rem' }} whileHover={{ scale: 1.02 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{post.date}</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.6, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Eye size={14} /> {post.views || 0}
                  </span>
                </div>
                <h3 style={{ margin: '0 0 1rem' }}>{post.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{post.snippet}</p>
                <Link to={`/blog/${post.id}`} className="accent-text">Read more →</Link>
              </motion.div>
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      )}
    </section>
  );
};

const AdminPage = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [snippet, setSnippet] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'egamov_admin') { // Simple password gate
      setIsAuthenticated(true);
    } else {
      alert('Wrong password');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'posts'), {
        title,
        date,
        snippet,
        content,
        createdAt: serverTimestamp()
      });
      alert('Post added successfully!');
      setTitle(''); setDate(''); setSnippet(''); setContent('');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Error adding post. Check console and Firebase rules.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="container" style={{ paddingTop: '8rem', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <form className="glass" style={{ padding: '3rem', maxWidth: '400px', width: '100%' }} onSubmit={handleLogin}>
          <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Admin Access</h2>
          <input
            type="password"
            className="form-input"
            style={{ width: '100%', marginBottom: '1.5rem' }}
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Login</button>
        </form>
      </section>
    );
  }

  return (
    <section className="container" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
      <h2 className="section-title">Admin Dashboard</h2>
      <form className="glass" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label>Title</label>
            <input className="form-input" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label>Date</label>
            <input className="form-input" placeholder="Jan 12, 2026" value={date} onChange={e => setDate(e.target.value)} required />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label>Snippet</label>
          <input className="form-input" placeholder="Short description..." value={snippet} onChange={e => setSnippet(e.target.value)} required />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label>Content (Markdown)</label>
          <textarea className="form-input" rows="10" placeholder="Post content..." value={content} onChange={e => setContent(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '200px', alignSelf: 'center', justifyContent: 'center' }} disabled={submitting}>
          {submitting ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </section>
  );
};

const ContactPage = () => {
  const { t } = useTranslation();
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Note: User needs to replace these with their own EmailJS credentials
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
      .then((result) => {
        console.log(result.text);
        setIsSent(true);
        setIsSending(false);
        form.current.reset();
      }, (error) => {
        console.log(error.text);
        alert("Failed to send message: " + error.text);
        setIsSending(false);
      });
  };

  return (
    <section id="contact" className="container" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>{t('contact.subtitle')}</p>
        <form ref={form} className="glass" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }} onSubmit={sendEmail}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label>{t('contact.name')}</label>
            <input type="text" name="user_name" className="form-input" placeholder="Jo'rabek Egamov" required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label>{t('contact.email')}</label>
            <input type="email" name="user_email" className="form-input" placeholder="jurabek@example.com" required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label>{t('contact.message')}</label>
            <textarea name="message" rows="4" className="form-input" placeholder="Hello..." required></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={isSending}>
            {isSending ? 'Sending...' : (isSent ? 'Message Sent!' : t('contact.send'))} <Send size={18} />
          </button>
          {isSent && <p style={{ color: 'var(--accent)', marginTop: '0.5rem', textAlign: 'center' }}>Thank you! I will get back to you soon.</p>}
        </form>
        <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <a href="#" className="social-link"><Github size={24} /></a>
          <a href="#" className="social-link"><Linkedin size={24} /></a>
          <a href="#" className="social-link"><MessageSquare size={24} /></a>
        </div>
      </div>
    </section>
  );
};

const NotFound = () => {
  const [score, setScore] = useState(0);
  const [bugPos, setBugPos] = useState({ top: '50%', left: '50%' });

  const catchBug = () => {
    setScore(s => s + 1);
    setBugPos({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`
    });
  };

  return (
    <section className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <h1 style={{ fontSize: '8rem', color: 'var(--accent)', marginBottom: '1rem' }}>404</h1>
      <h2>Oops! Page not found.</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>While you're here, why not catch this bug?</p>

      <div className="glass" style={{ width: '100%', maxWidth: '600px', height: '300px', position: 'relative', overflow: 'hidden', cursor: 'crosshair' }}>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontWeight: 600 }}>Score: {score}</div>
        <motion.div
          animate={{ top: bugPos.top, left: bugPos.left }}
          style={{ position: 'absolute', cursor: 'pointer', padding: '1rem' }}
          onClick={catchBug}
        >
          <Terminal size={32} className="accent-text" />
        </motion.div>
      </div>

      <Link to="/" className="btn btn-primary" style={{ marginTop: '3rem' }}>Back to Home</Link>
    </section>
  );
};

const BlogPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost(docSnap.data());
          // Increment view count
          await updateDoc(docRef, {
            views: increment(1)
          });
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return (
    <section className="container" style={{ paddingTop: '8rem' }}>
      <LoadingSpinner />
    </section>
  );
  if (!post) return <section className="container" style={{ paddingTop: '8rem' }}>Post not found.</section>;

  return (
    <section className="container" style={{ paddingTop: '8rem', minHeight: '100vh', maxWidth: '800px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.9rem', opacity: 0.6 }}>{post.date}</span>
        <span style={{ fontSize: '0.9rem', opacity: 0.6, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Eye size={16} /> {post.views ? post.views + 1 : 1} views
        </span>
      </div>
      <h1 style={{ fontSize: '3rem', margin: '0 0 2rem' }}>{post.title}</h1>
      <div className="glass" style={{ padding: '3rem' }}>
        <div className="markdown-content">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
      <Link to="/blog" className="btn btn-secondary" style={{ marginTop: '2rem' }}>← Back to Blog</Link>
    </section>
  );
};


// --- Main App ---

export const AppContent = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><HeroPage /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
            <Route path="/projects" element={<PageWrapper><ProjectsPage /></PageWrapper>} />
            <Route path="/blog" element={<PageWrapper><BlogPage /></PageWrapper>} />
            <Route path="/blog/:id" element={<PageWrapper><BlogPostPage /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
            <Route path="/admin" element={<PageWrapper><AdminPage /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      <footer className="container" style={{ padding: '4rem 0', textAlign: 'center', borderTop: '1px solid var(--border-color)', marginTop: '4rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>
          © {new Date().getFullYear()} Jurabek Egamov. Built with React & Passion.
        </p>
      </footer>
    </>
  );
};

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Router>
        <div className={theme}>
          <CustomCursor />
          <ScrollToTop />
          <AppContent />
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}
export default App;
