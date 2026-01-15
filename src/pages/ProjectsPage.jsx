import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Terminal, ExternalLink } from 'lucide-react';
import { Modal } from '../components/common/Modal';

export const ProjectsPage = () => {
    const { t } = useTranslation();
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            id: 1,
            name: "Esco Billiard",
            desc: "Professional ERP management system for billiard club operations.",
            tech: ["React", "Tailwind CSS", "Netlify"],
            problem: "Billiard clubs often rely on manual or fragmented systems for tracking table bookings, staff time, and financial performance.",
            solution: "Provides a centralized, secure ERP platform to manage all aspects of the business—from table occupancy to financial reporting."
        },
        {
            id: 2,
            name: "Cyber Quiz",
            desc: "Cyberpunk-themed gamified learning platform for mastering HTML and CSS.",
            tech: ["React", "Custom CSS", "Netlify"],
            problem: "Beginners often find learning web development (HTML/CSS) dry or unmotivating, leading to high drop-out rates.",
            solution: "Gamifies education through 'missions', international rankings, and certifications, making learning engaging and visually stimulating."
        },
        {
            id: 3,
            name: "Budget Mate",
            desc: "Intuitive personal finance application for tracking income, expenses, and real-time balances.",
            tech: ["React", "Tailwind CSS", "Lucide React"],
            problem: "Many individuals struggle to maintain financial discipline because they lack a simple way to record daily transactions and visualize spending.",
            solution: "Offers a user-friendly interface for logging transactions with categories, featuring a dashboard for high-level financial insights."
        },
        {
            id: 4,
            name: "Skill Bridge",
            desc: "Microlearning platform for short, specific skill lessons (under 5 minutes).",
            tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
            problem: "Learners and creators find long-form courses too time-consuming when they only need to master or share a specific, niche skill.",
            solution: "Dedicated platform for short-form educational content with a community-driven request system and gamification."
        },
        {
            id: 5,
            name: "Altverse",
            desc: "Interactive web application for exploring infinite realities and dimensional boundaries.",
            tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
            problem: "Lack of immersive and interactive ways to visualize and learn about fictional or theoretical multiverses.",
            solution: "A visually stunning, animated explorer that categorizes various universes and characters with smooth navigational transitions."
        },
        {
            id: 6,
            name: "Memory Game",
            desc: "Classic browser-based matching game for training memory and cognitive focus.",
            tech: ["HTML5", "CSS3", "JavaScript"],
            problem: "People need simple and engaging ways to train their memory and cognitive focus.",
            solution: "A lightweight, easy-to-play game that provides instant visual feedback and a clean user interface."
        },
        {
            id: 7,
            name: "Stuff E-commerce",
            desc: "Modern e-commerce storefront focused on technology products and product discovery.",
            tech: ["React", "Redux", "CSS Modules"],
            problem: "Online shopping for tech gadgets is often cluttered, making it difficult to find and manage items.",
            solution: "Streamlined interface that prioritizes product discovery and a simple, intuitive shopping cart flow."
        },
        {
            id: 8,
            name: "IT Park Khorezm",
            desc: "Professional corporate landing page highlighting mission-driven software services.",
            tech: ["React", "Tailwind CSS", "Framer Motion"],
            problem: "Local IT institutions often lack a professional online presence to communicate capabilities to local talent and global clients.",
            solution: "High-performance landing page with professional animations to establish a strong digital identity."
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
                        style={{ padding: '2rem', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
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
