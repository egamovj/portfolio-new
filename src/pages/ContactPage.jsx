import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Github, Linkedin, Mail, MessageCircle, MapPin, Phone } from 'lucide-react';
import emailjs from 'emailjs-com';

export const ContactPage = () => {
    const { t } = useTranslation();
    const form = useRef();
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSending(true);

        // Placeholder for EmailJS - normally you'd use real keys
        // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
        setTimeout(() => {
            setIsSent(true);
            setIsSending(false);
            form.current.reset();
        }, 2000);
    };

    const contactInfo = [
        { icon: <Mail size={20} />, label: "Email", value: "egamovj90@gmail.com", link: "mailto:egamovj@gmail.com" },
        { icon: <Phone size={20} />, label: "Phone", value: "+998 (93) 877-09-19", link: "tel:+998938770919" },
        { icon: <MapPin size={20} />, label: "Location", value: "Khorezm, Uzbekistan", link: "#" }
    ];

    const socials = [
        { icon: <Github size={24} />, link: "https://github.com/egamovj", label: "GitHub" },
        { icon: <Linkedin size={24} />, link: "https://linkedin.com/in/egamovj", label: "LinkedIn" },
        { icon: <MessageCircle size={24} />, link: "https://t.me/egamov_j", label: "Telegram" }
    ];

    return (
        <section id="contact" className="container" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
            <h2 className="section-title"><span>{t('nav.contact')}</span>Let's Collaborate</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginTop: '3rem' }}>
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
                        {t('contact.subtitle')}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {contactInfo.map((info, i) => (
                            <a key={i} href={info.link} className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', transition: 'var(--transition)' }}>
                                <div className="accent-text">{info.icon}</div>
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{info.label}</div>
                                    <div style={{ fontWeight: 600 }}>{info.value}</div>
                                </div>
                            </a>
                        ))}
                    </div>

                    <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem' }}>
                        {socials.map((social, i) => (
                            <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className="btn-icon" style={{ padding: '1rem', background: 'var(--bg-card)' }} title={social.label}>
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                    <form ref={form} className="glass" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={sendEmail}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t('contact.name')}</label>
                            <input type="text" name="user_name" className="form-input" placeholder="Your Name" required />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t('contact.email')}</label>
                            <input type="email" name="user_email" className="form-input" placeholder="your@email.com" required />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t('contact.message')}</label>
                            <textarea name="message" rows="5" className="form-input" placeholder="How can I help you?" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }} disabled={isSending}>
                            {isSending ? 'Sending Message...' : (isSent ? 'Message Sent!' : t('contact.send'))}
                            {!isSending && !isSent && <Send size={18} style={{ marginLeft: '0.5rem' }} />}
                        </button>

                        <AnimatePresence>
                            {isSent && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ color: 'var(--accent)', marginTop: '0.5rem', textAlign: 'center', fontSize: '0.9rem', fontWeight: 500 }}
                                >
                                    ✨ Success! Thank you for reaching out. I'll get back to you shortly.
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

