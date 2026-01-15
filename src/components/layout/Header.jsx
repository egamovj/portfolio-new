import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, FileText, Download, Menu } from 'lucide-react';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { ThemeSwitcher } from '../ui/ThemeSwitcher';

export const Header = ({ isMenuOpen, setIsMenuOpen }) => {
    const { t } = useTranslation();
    return (
        <header style={{ position: 'fixed', top: '1.5rem', left: '0', right: '0', zIndex: 1000, display: 'flex', justifyContent: 'center', pointerEvents: 'none', boxSizing: 'border-box' }}>
            <div className="glass navbar-container" style={{ display: 'flex', gap: '1.25rem', padding: '0.4rem 1.25rem', borderRadius: '3rem', pointerEvents: 'auto', alignItems: 'center', width: 'auto', justifyContent: 'space-between' }}>
                <Link to="/" className="hover-link" style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent)', display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>JE</div>
                </Link>
                <nav className="desktop-nav">
                    <ul style={{ display: 'flex', gap: '1.25rem', margin: 0 }}>
                        <li><Link to="/" className="hover-link" style={{ fontSize: '0.9rem', fontWeight: 500 }}>{t('nav.home')}</Link></li>
                        <li><Link to="/about" className="hover-link" style={{ fontSize: '0.9rem', fontWeight: 500 }}>{t('nav.about')}</Link></li>
                        <li><Link to="/projects" className="hover-link" style={{ fontSize: '0.9rem', fontWeight: 500 }}>{t('nav.projects')}</Link></li>
                        <li><Link to="/snippets" className="hover-link" style={{ fontSize: '0.9rem', fontWeight: 500 }}>Snippets</Link></li>
                        <li><Link to="/blog" className="hover-link" style={{ fontSize: '0.9rem', fontWeight: 500 }}>{t('nav.blog')}</Link></li>
                        <li><Link to="/contact" className="hover-link" style={{ fontSize: '0.9rem', fontWeight: 500 }}>{t('nav.contact')}</Link></li>
                    </ul>
                </nav>

                <div className="desktop-nav-separator" style={{ height: '20px', width: '1px', background: 'var(--border-color)', opacity: 0.5 }}></div>

                <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <a href="/resume.pdf" download className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', borderRadius: '2rem', gap: '0.4rem', border: '1px solid var(--accent)', color: 'var(--accent)' }}>
                        <Download size={14} /> Resume
                    </a>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <LanguageSwitcher minimal />
                        <div style={{ width: '1px', height: '14px', background: 'var(--border-color)', opacity: 0.3 }}></div>
                        <ThemeSwitcher minimal />
                    </div>
                </div>

                <button className="mobile-menu-toggle btn-icon" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'none' }}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                                <li><Link to="/snippets" className="hover-link" onClick={() => setIsMenuOpen(false)}>Snippets</Link></li>
                                <li><Link to="/blog" className="hover-link" onClick={() => setIsMenuOpen(false)}>{t('nav.blog')}</Link></li>
                                <li><Link to="/contact" className="hover-link" onClick={() => setIsMenuOpen(false)}>{t('nav.contact')}</Link></li>
                            </ul>
                        </nav>
                        <div className="resume-download-mobile">
                            <a href="/resume.pdf" download className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setIsMenuOpen(false)}>
                                <Download size={18} style={{ marginRight: '0.5rem' }} /> Resume CV
                            </a>
                        </div>
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
