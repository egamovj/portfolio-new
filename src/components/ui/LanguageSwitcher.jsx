import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    return (
        <div className="glass" style={{ display: 'flex', gap: '0.5rem', padding: '0.4rem', borderRadius: '2rem' }}>
            {['en', 'uz', 'ru'].map(lang => (
                <button
                    key={lang}
                    onClick={() => i18n.changeLanguage(lang)}
                    className={`btn-icon ${i18n.language === lang ? 'accent-text' : ''}`}
                    style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}
                >
                    {lang}
                </button>
            ))}
        </div>
    );
};
