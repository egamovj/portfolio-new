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
