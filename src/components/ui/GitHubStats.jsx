import React, { useState, useEffect } from 'react';
import { Star, BookOpen, Users } from 'lucide-react';

export const GitHubStats = () => {
    const [stats, setStats] = useState({ stars: 0, repos: 0, followers: 0 });

    useEffect(() => {
        setStats({ stars: 12, repos: 24, followers: 56 });
    }, []);

    return (
        <div className="glass" style={{ padding: '1.5rem', marginTop: '2rem', display: 'flex', justifyContent: 'around', gap: '2rem', textAlign: 'center' }}>
            <div>
                <Star size={20} className="accent-text" />
                <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{stats.stars}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Stars</div>
            </div>
            <div>
                <BookOpen size={20} className="accent-text" />
                <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{stats.repos}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Repos</div>
            </div>
            <div>
                <Users size={20} className="accent-text" />
                <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{stats.followers}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Followers</div>
            </div>
        </div>
    );
};
