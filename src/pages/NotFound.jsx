import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';

export const NotFound = () => {
    const [score, setScore] = useState(0);
    const [bugPos, setBugPos] = useState({ top: '50%', left: '50%' });

    const catchBug = () => {
        setScore(s => s + 1);
        setBugPos({
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`
        });
    };

    return (
        <section className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <h1 style={{ fontSize: '8rem', color: 'var(--accent)', marginBottom: '1rem' }}>404</h1>
            <h2>Oops! Page not found.</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>While you're here, why not catch this bug?</p>

            <div className="glass" style={{ width: '100%', maxWidth: '600px', height: '300px', position: 'relative', overflow: 'hidden', cursor: 'crosshair' }}>
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontWeight: 600 }}>Score: {score}</div>
                <motion.div
                    animate={{ top: bugPos.top, left: bugPos.left }}
                    style={{ position: 'absolute', cursor: 'pointer', padding: '1rem' }}
                    onClick={catchBug}
                >
                    <Terminal size={32} className="accent-text" />
                </motion.div>
            </div>

            <Link to="/" className="btn btn-primary" style={{ marginTop: '3rem' }}>Back to Home</Link>
        </section>
    );
};
