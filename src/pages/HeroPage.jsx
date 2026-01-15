import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { GitHubStats } from '../components/ui/GitHubStats';

export const HeroPage = () => {
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
