import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Terminal, Users, Briefcase, Code } from 'lucide-react';
import { TechRadar } from '../components/ui/TechRadar';

export const AboutPage = () => {
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
