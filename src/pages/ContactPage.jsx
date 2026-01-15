import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Github, Linkedin, MessageSquare } from 'lucide-react';
import emailjs from 'emailjs-com';

export const ContactPage = () => {
    const { t } = useTranslation();
    const form = useRef();
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSending(true);

        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
            .then((result) => {
                console.log(result.text);
                setIsSent(true);
                setIsSending(false);
                form.current.reset();
            }, (error) => {
                console.log(error.text);
                alert("Failed to send message: " + error.text);
                setIsSending(false);
            });
    };

    return (
        <section id="contact" className="container" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>{t('contact.subtitle')}</p>
                <form ref={form} className="glass" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }} onSubmit={sendEmail}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label>{t('contact.name')}</label>
                        <input type="text" name="user_name" className="form-input" placeholder="Jo'rabek Egamov" required />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label>{t('contact.email')}</label>
                        <input type="email" name="user_email" className="form-input" placeholder="jurabek@example.com" required />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label>{t('contact.message')}</label>
                        <textarea name="message" rows="4" className="form-input" placeholder="Hello..." required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={isSending}>
                        {isSending ? 'Sending...' : (isSent ? 'Message Sent!' : t('contact.send'))} <Send size={18} />
                    </button>
                    {isSent && <p style={{ color: 'var(--accent)', marginTop: '0.5rem', textAlign: 'center' }}>Thank you! I will get back to you soon.</p>}
                </form>
                <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                    <a href="#" className="social-link"><Github size={24} /></a>
                    <a href="#" className="social-link"><Linkedin size={24} /></a>
                    <a href="#" className="social-link"><MessageSquare size={24} /></a>
                </div>
            </div>
        </section>
    );
};
