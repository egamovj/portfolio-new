import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const AdminPage = () => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [snippet, setSnippet] = useState('');
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'egamov_admin') {
            setIsAuthenticated(true);
        } else {
            alert('Wrong password');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await addDoc(collection(db, 'posts'), {
                title,
                date,
                snippet,
                content,
                createdAt: serverTimestamp()
            });
            alert('Post added successfully!');
            setTitle(''); setDate(''); setSnippet(''); setContent('');
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Error adding post. Check console and Firebase rules.');
        } finally {
            setSubmitting(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <section className="container" style={{ paddingTop: '8rem', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <form className="glass" style={{ padding: '3rem', maxWidth: '400px', width: '100%' }} onSubmit={handleLogin}>
                    <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Admin Access</h2>
                    <input
                        type="password"
                        className="form-input"
                        style={{ width: '100%', marginBottom: '1.5rem' }}
                        placeholder="Enter admin password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Login</button>
                </form>
            </section>
        );
    }

    return (
        <section className="container" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
            <h2 className="section-title">Admin Dashboard</h2>
            <form className="glass" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label>Title</label>
                        <input className="form-input" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label>Date</label>
                        <input className="form-input" placeholder="Jan 12, 2026" value={date} onChange={e => setDate(e.target.value)} required />
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label>Snippet</label>
                    <input className="form-input" placeholder="Short description..." value={snippet} onChange={e => setSnippet(e.target.value)} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label>Content (Markdown)</label>
                    <textarea className="form-input" rows="10" placeholder="Post content..." value={content} onChange={e => setContent(e.target.value)} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '200px', alignSelf: 'center', justifyContent: 'center' }} disabled={submitting}>
                    {submitting ? 'Publishing...' : 'Publish Post'}
                </button>
            </form>
        </section>
    );
};
