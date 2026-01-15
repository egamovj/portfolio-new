import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Terminal, ExternalLink, Github, Globe, Filter } from 'lucide-react';
import { Modal } from '../components/common/Modal';

import escoImg from '../assets/projects/esco_billiard.png';
import cyberImg from '../assets/projects/cyber_quiz.png';
import budgetImg from '../assets/projects/budget_mate.png';
import skillImg from '../assets/projects/skill_bridge.png';
import altverseImg from '../assets/projects/altverse.png';
import memoryImg from '../assets/projects/memory_game.png';
import stuffImg from '../assets/projects/stuff.png'
import itparkImg from '../assets/projects/itpark.png'

export const ProjectsPage = () => {
    const { t } = useTranslation();
    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter] = useState('All');

    const projects = useMemo(() => [
        {
            id: 1,
            name: "Esco Billiard",
            desc: "Professional ERP management system for billiard club operations.",
            tech: ["React", "Tailwind CSS", "Netlify"],
            category: "Commercial",
            image: escoImg,
            impact: ["+40% Efficiency", "Real-time Tracking", "Automated Reports"],
            problem: "Billiard clubs often rely on manual or fragmented systems for tracking table bookings, staff time, and financial performance.",
            solution: "Provides a centralized, secure ERP platform to manage all aspects of the business—from table occupancy to financial reporting."
        },
        {
            id: 2,
            name: "Cyber Quiz",
            desc: "Cyberpunk-themed gamified learning platform for mastering HTML and CSS.",
            tech: ["React", "Custom CSS", "Netlify"],
            category: "Education",
            image: cyberImg,
            impact: ["500+ Active Users", "95% Engagement", "Global Ranking"],
            github: "https://github.com/egamovj/quizapp-react",
            live: "https://cyberdsgn-quizapp.netlify.app/",
            problem: "Beginners often find learning web development (HTML/CSS) dry or unmotivating, leading to high drop-out rates.",
            solution: "Gamifies education through 'missions', international rankings, and certifications, making learning engaging and visually stimulating."
        },
        {
            id: 3,
            name: "Budget Mate",
            desc: "Intuitive personal finance application for tracking income, expenses, and real-time balances.",
            tech: ["React", "Tailwind CSS", "Lucide React"],
            category: "Finance",
            image: budgetImg,
            impact: ["Smart Insights", "Daily Tracking", "Save 20% Monthly"],
            github: "https://github.com/egamovj/budget-mate",
            live: "https://budgettmate.netlify.app/",
            problem: "Many individuals struggle to maintain financial discipline because they lack a simple way to record daily transactions and visualize spending.",
            solution: "Offers a user-friendly interface for logging transactions with categories, featuring a dashboard for high-level financial insights."
        },
        {
            id: 4,
            name: "Skill Bridge",
            desc: "Microlearning platform for short, specific skill lessons (under 5 minutes).",
            tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
            category: "Education",
            image: skillImg,
            impact: ["Micro-learning", "Community Driven", "Fast Skill-up"],
            github: "https://github.com/egamovj/skill-bridge",
            live: "",
            problem: "Learners and creators find long-form courses too time-consuming when they only need to master or share a specific, niche skill.",
            solution: "Dedicated platform for short-form educational content with a community-driven request system and gamification."
        },
        {
            id: 5,
            name: "Altverse",
            desc: "Interactive web application for exploring infinite realities and dimensional boundaries.",
            tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
            category: "Tool",
            image: altverseImg,
            github: "https://github.com/egamovj/altverse",
            live: "",
            problem: "Lack of immersive and interactive ways to visualize and learn about fictional or theoretical multiverses.",
            solution: "A visually stunning, animated explorer that categorizes various universes and characters with smooth navigational transitions."
        },
        {
            id: 6,
            name: "Memory Game",
            desc: "Classic browser-based matching game for training memory and cognitive focus.",
            tech: ["HTML5", "CSS3", "JavaScript"],
            category: "Game",
            image: memoryImg,
            github: "https://github.com/egamovj/memory-matching-game",
            live: "https://memory-game6.netlify.app/",
            problem: "People need simple and engaging ways to train their memory and cognitive focus.",
            solution: "A lightweight, easy-to-play game that provides instant visual feedback and a clean user interface."
        },
        {
            id: 7,
            name: "Stuff E-commerce",
            desc: "Modern e-commerce storefront focused on technology products and product discovery.",
            tech: ["React", "Redux", "CSS Modules"],
            category: "Commercial",
            image: stuffImg,
            github: "https://github.com/egamovj/stuff-ecommerce",
            live: "https://stuff-ecommerce.netlify.app/",
            problem: "Online shopping for tech gadgets is often cluttered, making it difficult to find and manage items.",
            solution: "Streamlined interface that prioritizes product discovery and a simple, intuitive shopping cart flow."
        },
        {
            id: 8,
            name: "IT Park Khorezm",
            desc: "Professional corporate landing page highlighting mission-driven software services.",
            tech: ["React", "Tailwind CSS", "Framer Motion"],
            category: "Commercial",
            image: itparkImg,
            github: "https://github.com/egamovj/it-park",
            live: "https://itpark-khorezm.netlify.app/",
            problem: "Local IT institutions often lack a professional online presence to communicate capabilities to local talent and global clients.",
            solution: "High-performance landing page with professional animations to establish a strong digital identity."
        }
    ], []);

    const categories = ['All', 'Commercial', 'Education', 'Finance', 'Game', 'Tool'];

    const filteredProjects = useMemo(() =>
        filter === 'All' ? projects : projects.filter(p => p.category === filter),
        [filter, projects]);

    return (
        <section id="projects" className="container" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
            <div style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                <h2 className="section-title"><span>{t('nav.projects')}</span>My Creative Work</h2>

                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`btn ${filter === cat ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div
                layout
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((proj) => (
                        <motion.div
                            layout
                            key={proj.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="glass"
                            whileHover={{ y: -10 }}
                            style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                        >
                            <div
                                style={{
                                    height: '200px',
                                    background: proj.image ? `url(${proj.image}) center/cover no-repeat` : 'var(--bg-card)',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderBottom: '1px solid var(--border-color)',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setSelectedProject(proj)}
                            >
                                {!proj.image && <Terminal size={60} className="accent-text" style={{ opacity: 0.2 }} />}
                            </div>

                            <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.3rem' }}>{proj.name}</h3>
                                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                                        {proj.github && (
                                            <a href={proj.github} target="_blank" rel="noopener noreferrer" className="btn-icon" title="View Code">
                                                <Github size={18} />
                                            </a>
                                        )}
                                        {proj.live && (
                                            <a href={proj.live} target="_blank" rel="noopener noreferrer" className="btn-icon" title="Live Demo">
                                                <ExternalLink size={18} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem', flexGrow: 1 }}>{proj.desc}</p>

                                {/* Impact Metrics */}
                                {proj.impact && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                        {proj.impact.map((imp, idx) => (
                                            <span key={idx} style={{
                                                fontSize: '0.75rem',
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '1rem',
                                                background: 'var(--accent-glow)',
                                                color: 'var(--accent)',
                                                border: '1px solid rgba(0, 191, 154, 0.2)'
                                            }}>
                                                {imp}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        {proj.tech.slice(0, 3).map(tech => (
                                            <span key={tech} style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{tech}</span>
                                        ))}
                                    </div>
                                    <button
                                        className="accent-text"
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
                                        onClick={() => setSelectedProject(proj)}
                                    >
                                        Case Study →
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <Modal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                title={selectedProject?.name}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {selectedProject?.image && (
                        <div style={{ width: '100%', height: '300px', borderRadius: '1rem', overflow: 'hidden' }}>
                            <img src={selectedProject.image} alt={selectedProject.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    )}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        <div>
                            <h4 className="accent-text" style={{ marginBottom: '0.5rem' }}>{t('projects.problem')}</h4>
                            <p style={{ color: 'var(--text-secondary)' }}>{selectedProject?.problem}</p>
                        </div>
                        <div>
                            <h4 className="accent-text" style={{ marginBottom: '0.5rem' }}>{t('projects.solution')}</h4>
                            <p style={{ color: 'var(--text-secondary)' }}>{selectedProject?.solution}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <a href={selectedProject?.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                            <Github size={18} /> Source Code
                        </a>
                        <a href={selectedProject?.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            <ExternalLink size={18} /> Live Demo
                        </a>
                    </div>
                </div>
            </Modal>
        </section>
    );
};


