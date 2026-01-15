import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    return (
        <div className="glass" style={{ display: 'flex', gap: '0.5rem', padding: '0.4rem', borderRadius: '2rem' }}>
            <button onClick={() => setTheme('light')} className={`btn-icon ${theme === 'light' ? 'accent-text' : ''}`}><Sun size={18} /></button>
            <button onClick={() => setTheme('dark')} className={`btn-icon ${theme === 'dark' ? 'accent-text' : ''}`}><Moon size={18} /></button>
        </div>
    );
};
