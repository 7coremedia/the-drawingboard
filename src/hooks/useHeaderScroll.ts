import { useState, useEffect, useRef } from 'react';

export function useHeaderScroll() {
    const [isHidden, setIsHidden] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            const delta = currentY - lastScrollY.current;

            // Threshold for considering "at top" or "just started scrolling"
            if (currentY < 120) {
                setIsHidden(false);
            } else if (delta < -5) {
                // Scrolling UP - Hide to make room for main site header
                setIsHidden(true);
            } else if (delta > 5) {
                // Scrolling DOWN - Show actions as main site header hides
                setIsHidden(false);
            }

            lastScrollY.current = currentY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return isHidden;
}
