import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useSpring(0, { damping: 20, stiffness: 250 });
    const cursorY = useSpring(0, { damping: 20, stiffness: 250 });
    const outlineX = useSpring(0, { damping: 25, stiffness: 150 });
    const outlineY = useSpring(0, { damping: 25, stiffness: 150 });

    useEffect(() => {
        const mouseMove = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            outlineX.set(e.clientX);
            outlineY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleHoverStart = (e) => {
            if (e.target.closest('a, button, .interactive, .social-link, .github-stat-item')) {
                setIsHovering(true);
            }
        };

        const handleHoverEnd = () => setIsHovering(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseover', handleHoverStart);
        window.addEventListener('mouseout', handleHoverEnd);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        if (window.innerWidth > 0) {
            setIsVisible(true);
        }

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseover', handleHoverStart);
            window.removeEventListener('mouseout', handleHoverEnd);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible, cursorX, cursorY, outlineX, outlineY]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            zIndex: 10000,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.3s ease'
        }}>
            <motion.div
                className="cursor-dot mobile-hide"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                }}
            />
            <motion.div
                className={`cursor-outline mobile-hide ${isHovering ? 'hovered' : ''}`}
                style={{
                    x: outlineX,
                    y: outlineY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
        </div>
    );
};
