import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { Eye } from 'lucide-react';
import { db } from '../firebase';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'posts'));
                const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPosts(postsData.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
            } catch (error) {
                console.error("Error fetching posts: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <section id="blog" className="container" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <motion.div key={post.id} className="glass" style={{ padding: '2rem' }} whileHover={{ scale: 1.02 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{post.date}</span>
                                    <span style={{ fontSize: '0.8rem', opacity: 0.6, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <Eye size={14} /> {post.views || 0}
                                    </span>
                                </div>
                                <h3 style={{ margin: '0 0 1rem' }}>{post.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{post.snippet}</p>
                                <Link to={`/blog/${post.id}`} className="accent-text">Read more →</Link>
                            </motion.div>
                        ))
                    ) : (
                        <p>No posts found.</p>
                    )}
                </div>
            )}
        </section>
    );
};
