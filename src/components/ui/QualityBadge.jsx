import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, Eye } from 'lucide-react';

const metrics = [
    { icon: <Zap size={20} />, label: "Performance", score: 100, color: "#10b981" },
    { icon: <Globe size={20} />, label: "SEO", score: 100, color: "#10b981" },
    { icon: <Eye size={20} />, label: "Accessibility", score: 100, color: "#10b981" },
    { icon: <ShieldCheck size={20} />, label: "Best Practices", score: 100, color: "#10b981" }
];

export const QualityBadge = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', marginTop: '3rem' }}>
            {metrics.map((m, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1.5rem',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '1.5rem',
                        minWidth: '140px'
                    }}
                    className="glass"
                >
                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `${m.color}15`,
                        color: m.color,
                        border: `2px solid ${m.color}30`
                    }}>
                        {m.icon}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: m.color }}>{m.score}%</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>{m.label}</div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
