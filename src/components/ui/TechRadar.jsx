import React from 'react';
import { motion } from 'framer-motion';

export const TechRadar = () => {
    const skills = [
        { name: 'React', value: 95, category: 'Frontend' },
        { name: 'JavaScript', value: 90, category: 'Frontend' },
        { name: 'Node.js', value: 80, category: 'Backend' },
        { name: 'Firebase', value: 85, category: 'Backend' },
        { name: 'CSS/UI', value: 90, category: 'Frontend' },
        { name: 'Mentorship', value: 85, category: 'Soft' },
        { name: 'English', value: 75, category: 'Soft' },
    ];

    const levels = [20, 40, 60, 80, 100];
    const angleStep = (Math.PI * 2) / skills.length;
    const radius = 150;
    const centerX = 200;
    const centerY = 200;

    const points = skills.map((s, i) => {
        const x = centerX + radius * (s.value / 100) * Math.cos(i * angleStep - Math.PI / 2);
        const y = centerY + radius * (s.value / 100) * Math.sin(i * angleStep - Math.PI / 2);
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Technical Expertise Radar</h3>
            <svg width="400" height="400" viewBox="0 0 400 400" style={{ maxWidth: '100%', height: 'auto' }}>
                {levels.map(level => (
                    <polygon
                        key={level}
                        points={skills.map((_, i) => {
                            const x = centerX + radius * (level / 100) * Math.cos(i * angleStep - Math.PI / 2);
                            const y = centerY + radius * (level / 100) * Math.sin(i * angleStep - Math.PI / 2);
                            return `${x},${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="var(--border-color)"
                        strokeDasharray="4 4"
                    />
                ))}

                {skills.map((_, i) => {
                    const x = centerX + radius * Math.cos(i * angleStep - Math.PI / 2);
                    const y = centerY + radius * Math.sin(i * angleStep - Math.PI / 2);
                    return <line key={i} x1={centerX} y1={centerY} x2={x} y2={y} stroke="var(--border-color)" />;
                })}

                <motion.polygon
                    points={points}
                    fill="rgba(16, 185, 129, 0.2)"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />

                {skills.map((s, i) => {
                    const x = centerX + (radius + 20) * Math.cos(i * angleStep - Math.PI / 2);
                    const y = centerY + (radius + 20) * Math.sin(i * angleStep - Math.PI / 2);
                    return (
                        <text
                            key={i}
                            x={x}
                            y={y}
                            fill="var(--text-secondary)"
                            fontSize="12"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            style={{ fontWeight: 500 }}
                        >
                            {s.name}
                        </text>
                    );
                })}
            </svg>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>● Inner: Learning</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>● Outer: Expert</div>
            </div>
        </div>
    );
};
