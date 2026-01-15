import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = ({ minimal = false }) => {
    const { i18n } = useTranslation();
    return (
        <div className={minimal ? "" : "glass"} style={{ display: 'flex', gap: '0.2rem', padding: minimal ? '0' : '0.4rem', borderRadius: '2rem' }}>
            {['en', 'uz', 'ru'].map(lang => (
                <button
                    key={lang}
                    onClick={() => i18n.changeLanguage(lang)}
                    className={`btn-icon ${i18n.language === lang ? 'accent-text' : ''}`}
                    style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', minWidth: '32px' }}
                >
                    {lang}
                </button>
            ))}
        </div>
    );
};

