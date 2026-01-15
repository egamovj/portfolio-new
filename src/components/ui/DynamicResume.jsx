import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Code, Users, Briefcase, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const DynamicResume = () => {
    const { t } = useTranslation();
    const [activeFilter, setActiveFilter] = useState('all');

    const sections = {
        frontend: {
            title: "Frontend Engineering",
            items: [
                "Advanced React & Next.js Ecosystem",
                "Framer Motion & Interaction Design",
                "State Management (Redux, Zustand)",
                "Performance Optimization & SEO"
            ]
        },
        mentorship: {
            title: "Mentorship & Leadership",
            items: [
                "Mentor at IT Park",
                "Founder of Al-Khwarizmi Heirs",
                "Guided 60+ students into IT careers",
                "Curriculum Development for Advanced JS"
            ]
        },
        experience: {
            title: "Professional Milestones",
            items: [
                "3+ Years Professional Development",
                "Built Scalable ERP for Esco Billiard",
                "Cyber Quiz Edu Platform Lead",
                "Open Source Contributor"
            ]
        }
    };

    const filters = [
        { id: 'all', label: 'All-Rounder', icon: <FileText size={16} /> },
        { id: 'frontend', label: 'Specialist', icon: <Code size={16} /> },
        { id: 'mentorship', label: 'Mentor', icon: <Users size={16} /> }
    ];

    return (
        <div className="glass" style={{ padding: '2rem', borderRadius: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Briefcase className="accent-text" />
                    {activeFilter === 'all' ? "Dynamic Career View" : sections[activeFilter]?.title}
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {filters.map(f => (
                        <button
                            key={f.id}
                            onClick={() => setActiveFilter(f.id)}
                            className={`btn-icon ${activeFilter === f.id ? 'accent-text' : ''}`}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '2rem',
                                gap: '0.5rem',
                                background: activeFilter === f.id ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                                border: `1px solid ${activeFilter === f.id ? 'var(--accent)' : 'var(--border-color)'}`,
                                fontSize: '0.85rem'
                            }}
                        >
                            {f.icon} {f.label}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <AnimatePresence mode='wait'>
                    {Object.entries(sections)
                        .filter(([key]) => activeFilter === 'all' || activeFilter === key)
                        .map(([key, section]) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    padding: '1.5rem',
                                    borderRadius: '1rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--border-color)'
                                }}
                            >
                                <h4 style={{ marginBottom: '1.25rem', fontSize: '1rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <ChevronRight size={14} className="accent-text" /> {section.title}
                                </h4>
                                <ul style={{ margin: 0, padding: 0 }}>
                                    {section.items.map((item, i) => (
                                        <li key={i} style={{
                                            display: 'flex',
                                            alignItems: 'start',
                                            gap: '0.75rem',
                                            marginBottom: '0.75rem',
                                            fontSize: '0.9rem',
                                            lineHeight: '1.4'
                                        }}>
                                            <CheckCircle2 size={16} className="accent-text" style={{ marginTop: '2px', flexShrink: 0 }} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                </AnimatePresence>
            </div>

            {/* <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <a href="/resume.pdf" download className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.5rem 1.5rem', borderRadius: '2rem' }}>
                    Download Full Static Version (PDF)
                </a>
            </div> */}
        </div>
    );
};
