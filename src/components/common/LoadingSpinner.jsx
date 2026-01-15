import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem' }}>
        <motion.div
            style={{
                width: '50px',
                height: '50px',
                border: '3px solid var(--border-color)',
                borderTop: '3px solid var(--accent)',
                borderRadius: '50%',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
            <motion.div
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    boxShadow: '0 0 20px var(--accent-glow)',
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </motion.div>
    </div>
);
