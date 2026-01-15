import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe } from 'lucide-react';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { ThemeSwitcher } from '../ui/ThemeSwitcher';

export const Header = ({ isMenuOpen, setIsMenuOpen }) => {
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
