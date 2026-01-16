import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeSwitcher = ({ minimal = false }) => {
    const { theme, setTheme } = useTheme();
    return (
        <div className={minimal ? "" : "glass"} style={{ display: 'flex', gap: '0.2rem', padding: minimal ? '0' : '0.4rem', borderRadius: '2rem' }}>
            <button onClick={() => setTheme('light')} className={`btn-icon ${theme === 'light' ? 'accent-text' : ''}`} aria-label="Switch to light mode"><Sun size={16} /></button>
            <button onClick={() => setTheme('dark')} className={`btn-icon ${theme === 'dark' ? 'accent-text' : ''}`} aria-label="Switch to dark mode"><Moon size={16} /></button>
        </div>
    );
};

