import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Terminal, Users, Briefcase, Code, Award, Target, Zap, Rocket } from 'lucide-react';
import { SkillTree } from '../components/ui/SkillTree';
import { QualityBadge } from '../components/ui/QualityBadge';
import { DynamicResume } from '../components/ui/DynamicResume';

export const AboutPage = () => {
    const { t } = useTranslation();

    const stats = [
        { icon: <Briefcase size={20} />, label: "Years Exp.", value: "3+" },
        { icon: <Target size={20} />, label: "Projects", value: "20+" },
        { icon: <Users size={20} />, label: "Students", value: "50+" },
        { icon: <Award size={20} />, label: "Certificates", value: "10+" }
    ];

    return (
        <section id="about" className="container" style={{ paddingTop: '5.5rem', minHeight: '100vh' }}>
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
                    <SkillTree />
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

            <QualityBadge />

            {/* Experience Timeline */}
            <div style={{ marginTop: '6rem' }}>
                <h3 className="section-title" style={{ fontSize: '2rem', marginBottom: '3rem' }}>Experience & Milestones</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {[
                        {
                            year: '2023 - Present',
                            title: 'Frontend Mentor',
                            company: '"Al-Khwarizmi Heirs"',
                            desc: 'Leading advanced frontend development tracks and mentoring students in React, TypeScript, and modern ecosystem.'
                        },
                        {
                            year: '2022 - 2023',
                            title: 'Frontend Developer',
                            company: 'Commercial Projects',
                            desc: 'Developed high-performance ERP systems and custom web solutions for local businesses.'
                        },
                        {
                            year: '2021',
                            title: 'Started Tech Journey',
                            company: 'Independent Learning',
                            desc: 'Deep dived into the JavaScript ecosystem, focusing on React and building scalable UI systems.'
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            style={{
                                display: 'flex',
                                gap: '2rem',
                                borderLeft: '2px solid var(--border-color)',
                                paddingLeft: '2rem',
                                paddingBottom: '3rem',
                                position: 'relative'
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                left: '-9px',
                                top: '0',
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                background: 'var(--accent)',
                                boxShadow: '0 0 10px var(--accent)'
                            }}></div>
                            <div style={{ minWidth: '120px', fontWeight: 700, color: 'var(--accent)' }}>{item.year}</div>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>{item.title}</h4>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>{item.company}</div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: '6rem' }}>
                <h3 className="section-title" style={{ fontSize: '2rem', marginBottom: '3rem' }}>Interactive Career Matrix</h3>
                <DynamicResume />
            </div>
        </section>
    );
};

