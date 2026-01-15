import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Terminal, Users, Briefcase, Code, Award, Target, Zap, Rocket } from 'lucide-react';
import { TechRadar } from '../components/ui/TechRadar';

export const AboutPage = () => {
    const { t } = useTranslation();

    const stats = [
        { icon: <Briefcase size={20} />, label: "Years Exp.", value: "3+" },
        { icon: <Target size={20} />, label: "Projects", value: "20+" },
        { icon: <Users size={20} />, label: "Students", value: "50+" },
        { icon: <Award size={20} />, label: "Certificates", value: "10+" }
    ];

    return (
        <section id="about" className="container" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
            <h2 className="section-title"><span>{t('nav.about')}</span>Professional Journey</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.8' }}>
                        {t('about.bio') || t('about.p1')}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                        {stats.map((stat, i) => (
                            <div key={i} className="glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                <div className="accent-text" style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="glass" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <Zap size={24} className="accent-text" /> {t('about.focus')}
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'start', gap: '0.8rem' }}>
                                <Terminal size={20} className="accent-text" style={{ marginTop: '0.2rem' }} />
                                <div>
                                    <div style={{ fontWeight: 600 }}>{t('about.commercial')}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>High-performance UX</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'start', gap: '0.8rem' }}>
                                <Users size={20} className="accent-text" style={{ marginTop: '0.2rem' }} />
                                <div>
                                    <div style={{ fontWeight: 600 }}>{t('about.mentoring')}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Helping others grow</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'start', gap: '0.8rem' }}>
                                <Briefcase size={20} className="accent-text" style={{ marginTop: '0.2rem' }} />
                                <div>
                                    <div style={{ fontWeight: 600 }}>{t('about.scalable')}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Clean architecture</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'start', gap: '0.8rem' }}>
                                <Code size={20} className="accent-text" style={{ marginTop: '0.2rem' }} />
                                <div>
                                    <div style={{ fontWeight: 600 }}>{t('about.performance')}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Optimization focus</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <TechRadar />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass"
                        style={{ padding: '2rem', textAlign: 'center' }}
                    >
                        <Rocket size={40} className="accent-text" style={{ marginBottom: '1rem' }} />
                        <h3>Mentorship at "Al-Khwarizmi Heirs"</h3>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', fontSize: '0.9rem' }}>
                            Dedicated to guiding the next generation of engineers through modern frontend workflows and best practices.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

