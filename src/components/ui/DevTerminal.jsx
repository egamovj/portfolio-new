import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, ChevronRight } from 'lucide-react';

const commands = {
    help: "Available commands: bio, skills, projects, theme, download-cv, clear, exit",
    whoami: "Jo'rabek Egamov - Frontend Mentor & Developer.",
    bio: "Passionate about building scalable ERP systems and mentoring the next generation of developers at Al-Khwarizmi Heirs.",
    skills: "React, TypeScript, Tailwind CSS, Framer Motion, Node.js, Firebase.",
    projects: "Active projects: Esco Billiard (ERP), Cyber Quiz (Edu), Budget Mate (Finance).",
    theme: "Toggle light/dark theme (Use 'theme --toggle').",
    'download-cv': "Initiating download... (Check your browser downloads).",
    stats: "Lighthouse: 100 Performance | 100 SEO | 100 Accessibility.",
};

export const DevTerminal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState([
        { type: 'info', text: 'EGAMOV_OS [Version 2.0.4]' },
        { type: 'info', text: 'Type "help" to see available commands.' }
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === '`') {
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const newHistory = [...history, { type: 'input', text: input }];

            if (cmd === 'clear') {
                setHistory([]);
            } else if (cmd === 'exit') {
                setIsOpen(false);
            } else if (cmd === 'download-cv') {
                window.open('/resume.pdf', '_blank');
                newHistory.push({ type: 'output', text: commands['download-cv'] });
                setHistory(newHistory);
            } else if (commands[cmd]) {
                newHistory.push({ type: 'output', text: commands[cmd] });
                setHistory(newHistory);
            } else if (cmd) {
                newHistory.push({ type: 'error', text: `Command not found: ${cmd}. Type "help" for a list of commands.` });
                setHistory(newHistory);
            }

            setInput('');
        }
    };

    return (
        <>
            {/* Terminal Toggle Button (Visible in Footer or Hidden) */}
            <div
                onClick={() => setIsOpen(true)}
                style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100, cursor: 'pointer', opacity: 0.6 }}
                className="btn-icon glass hovered"
                title="Open Dev Terminal (Ctrl + `)"
            >
                <Terminal size={20} />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        style={{
                            position: 'fixed',
                            bottom: '5rem',
                            right: '2rem',
                            width: '450px',
                            height: '350px',
                            background: '#0a0a0b',
                            border: '1px solid var(--border-color)',
                            borderRadius: '0.75rem',
                            zIndex: 2000,
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '0.75rem 1rem', background: '#1a1a1b', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <Terminal size={14} className="accent-text" />
                                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>developer_terminal.exe</span>
                            </div>
                            <X size={16} onClick={() => setIsOpen(false)} style={{ cursor: 'pointer', opacity: 0.5 }} />
                        </div>

                        {/* Content */}
                        <div
                            ref={scrollRef}
                            style={{
                                flexGrow: 1,
                                padding: '1rem',
                                overflowY: 'auto',
                                fontFamily: 'monospace',
                                fontSize: '0.85rem',
                                color: '#d4d4d4'
                            }}
                        >
                            {history.map((line, i) => (
                                <div key={i} style={{ marginBottom: '0.4rem' }}>
                                    {line.type === 'input' && <span style={{ color: 'var(--accent)' }}><ChevronRight size={14} style={{ display: 'inline' }} /> {line.text}</span>}
                                    {line.type === 'output' && <span>{line.text}</span>}
                                    {line.type === 'error' && <span style={{ color: '#ef4444' }}>{line.text}</span>}
                                    {line.type === 'info' && <span style={{ color: 'var(--text-secondary)' }}>{line.text}</span>}
                                </div>
                            ))}
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}><ChevronRight size={14} /></span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleCommand}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        outline: 'none',
                                        color: '#fff',
                                        fontFamily: 'monospace',
                                        fontSize: '0.85rem',
                                        width: '100%'
                                    }}
                                    autoFocus
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
