import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Terminal, Cpu, Database, Globe, ChevronRight } from 'lucide-react';

const skillTree = [
    {
        id: 'frontend',
        title: 'Frontend Architecture',
        icon: < Globe size={24} />,
        skills: [
            { name: 'HTML5 / CSS3', level: 95, color: '#f06529' },
            { name: 'JavaScript (ES6+)', level: 90, color: '#f7df1e' },
            { name: 'React / Redux', level: 92, color: '#61dafb' },
            { name: 'Next.js', level: 65, color: '#ffffff' },
            { name: 'TypeScript', level: 60, color: '#3178c6' }
        ]
    },
    {
        id: 'uiux',
        title: 'Design & UX',
        icon: <Cpu size={24} />,
        skills: [
            { name: 'Tailwind CSS', level: 95, color: '#06b6d4' },
            { name: 'Framer Motion', level: 80, color: '#ff0055' },
            { name: 'Glassmorphism', level: 85, color: '#7dd3fc' },
            { name: 'Responsive Design', level: 98, color: '#34d399' }
        ]
    },
    {
        id: 'tools',
        title: 'Tools & Ecosystem',
        icon: <Terminal size={24} />,
        skills: [
            { name: 'Git / GitHub', level: 90, color: '#f05032' },
            { name: 'Vite / Webpack', level: 85, color: '#646cff' },
            { name: 'Jest / Testing', level: 80, color: '#c21325' },
            { name: 'CI/CD Pipelines', level: 60, color: '#2088ff' }
        ]
    }
];

export const SkillTree = () => {
    const [activeNode, setActiveNode] = useState('frontend');

    return (
        <div style={{ marginTop: '6rem' }}>
            <h3 className="section-title" style={{ fontSize: '2rem', marginBottom: '3rem' }}>Skill Progression</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', minHeight: '400px' }}>
                {/* Node Selector */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {skillTree.map((node) => (
                        <button
                            key={node.id}
                            onClick={() => setActiveNode(node.id)}
                            className={`glass ${activeNode === node.id ? 'active-node' : ''}`}
                            style={{
                                padding: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.5rem',
                                width: '100%',
                                textAlign: 'left',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                border: activeNode === node.id ? '1px solid var(--accent)' : '1px solid var(--border-color)',
                                background: activeNode === node.id ? 'var(--accent-glow)' : 'rgba(255,255,255,0.02)'
                            }}
                        >
                            <div className={activeNode === node.id ? 'accent-text' : ''}>{node.icon}</div>
                            <div style={{ flexGrow: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{node.title}</div>
                            </div>
                            <ChevronRight size={18} style={{ opacity: activeNode === node.id ? 1 : 0.3 }} />
                        </button>
                    ))}
                </div>

                {/* Skills Visualizer */}
                <div className="glass" style={{ padding: '2.5rem', overflow: 'hidden' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeNode}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {skillTree.find(n => n.id === activeNode).skills.map((skill, i) => (
                                <div key={i} style={{ marginBottom: '2rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{skill.name}</span>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{skill.level}% Mastery</span>
                                    </div>
                                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${skill.level}%` }}
                                            transition={{ duration: 0.8, delay: i * 0.1 }}
                                            style={{ height: '100%', background: `linear-gradient(90deg, var(--accent), ${skill.color})` }}
                                        ></motion.div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
