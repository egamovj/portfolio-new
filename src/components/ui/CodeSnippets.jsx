import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Copy, Check, Terminal, Cpu, Layers } from 'lucide-react';

const snacks = [
    {
        title: "UseLocalStorage Hook",
        desc: "A custom React hook for persistent state management.",
        lang: "TypeScript",
        icon: <Layers size={20} />,
        code: `function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue] as const;
}`
    },
    {
        title: "Glassmorphism Container",
        desc: "Reusable CSS module for modern translucent UI.",
        lang: "CSS",
        icon: <Cpu size={20} />,
        code: `.glass-container {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}`
    },
    {
        title: "Animated Scroll Entrance",
        desc: "Framer Motion utility for smooth page transitions.",
        lang: "JavaScript",
        icon: <Terminal size={20} />,
        code: `export const FadeIn = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
);`
    }
];

export const CodeSnippets = () => {
    const [copiedIndex, setCopiedIndex] = useState(null);

    const handleCopy = (code, index) => {
        navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <section className="container" style={{ paddingTop: '5.5rem', minHeight: '100vh' }}>
            <h2 className="section-title"><span>{navigator.language === 'uz' ? 'Kod Namunalari' : 'Code Gallery'}</span>Useful Snippets</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px' }}>
                A collection of reusable hooks, utilities, and components I've built along the way.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                {snacks.map((snack, i) => (
                    <motion.div
                        key={i}
                        className="glass"
                        style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                        whileHover={{ y: -5 }}
                    >
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div className="accent-text">{snack.icon}</div>
                                <div>
                                    <div style={{ fontWeight: 600 }}>{snack.title}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{snack.lang}</div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleCopy(snack.code, i)}
                                className="btn-icon"
                                style={{ background: 'transparent' }}
                                title="Copy code"
                            >
                                {copiedIndex === i ? <Check size={18} className="accent-text" /> : <Copy size={18} />}
                            </button>
                        </div>
                        <div style={{ padding: '1.5rem', flexGrow: 1 }}>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{snack.desc}</p>
                            <pre style={{
                                background: 'black',
                                border: '1px solid var(--border-color)',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                fontSize: '0.85rem',
                                overflowX: 'auto',
                                color: '#d4d4d4',
                                fontFamily: 'monospace',
                                lineHeight: '1.5'
                            }}>
                                <code>{snack.code}</code>
                            </pre>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
