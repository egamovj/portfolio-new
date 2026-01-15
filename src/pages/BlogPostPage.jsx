import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { Eye } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { db } from '../firebase';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const BlogPostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const docRef = doc(db, 'posts', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setPost(docSnap.data());
                    await updateDoc(docRef, {
                        views: increment(1)
                    });
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) return (
        <section className="container" style={{ paddingTop: '8rem' }}>
            <LoadingSpinner />
        </section>
    );
    if (!post) return <section className="container" style={{ paddingTop: '8rem' }}>Post not found.</section>;

    return (
        <section className="container" style={{ paddingTop: '8rem', minHeight: '100vh', maxWidth: '800px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.9rem', opacity: 0.6 }}>{post.date}</span>
                <span style={{ fontSize: '0.9rem', opacity: 0.6, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Eye size={16} /> {post.views ? post.views + 1 : 1} views
                </span>
            </div>
            <h1 style={{ fontSize: '3rem', margin: '0 0 2rem' }}>{post.title}</h1>
            <div className="glass" style={{ padding: '3rem' }}>
                <div className="markdown-content">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </div>
            <Link to="/blog" className="btn btn-secondary" style={{ marginTop: '2rem' }}>← Back to Blog</Link>
        </section>
    );
};
