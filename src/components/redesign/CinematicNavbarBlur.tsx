import React from 'react';

/**
 * CinematicNavbarBlur
 * implements a "Progressive Masked Blur" effect at the top of the viewport.
 * This creates a high-end, smooth distortion effect for elements scrolling under the navigation.
 */
export default function CinematicNavbarBlur() {
    // 7 layers of progressive stacking for a mathematically smooth 'liquid' distortion.
    // By stacking layers that all start at 0% but fade at different depths, 
    // we eliminate visible "bands" and create a truly cinematic lens effect.
    const layers = [
        { blur: '1px', mask: 'linear-gradient(to bottom, black 0%, transparent 100%)' },
        { blur: '2px', mask: 'linear-gradient(to bottom, black 0%, transparent 80%)' },
        { blur: '4px', mask: 'linear-gradient(to bottom, black 0%, transparent 60%)' },
        { blur: '8px', mask: 'linear-gradient(to bottom, black 0%, transparent 45%)' },
        { blur: '16px', mask: 'linear-gradient(to bottom, black 0%, transparent 30%)' },
        { blur: '32px', mask: 'linear-gradient(to bottom, black 0%, transparent 15%)' },
        { blur: '64px', mask: 'linear-gradient(to bottom, black 0%, transparent 5%)' },
    ];

    return (
        <div
            className="fixed top-0 left-0 right-0 h-32 pointer-events-none z-[45]"
            aria-hidden="true"
        >
            {/* Physical Glass Highlight - Adds that premium white 'gleam' from your screenshot */}
            <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-white/[0.05] via-transparent to-transparent opacity-100" />

            {/* Stacking Blur Engine */}
            <div className="absolute inset-0">
                {layers.map((layer, i) => (
                    <div
                        key={i}
                        className="absolute inset-0"
                        style={{
                            backdropFilter: `blur(${layer.blur})`,
                            WebkitBackdropFilter: `blur(${layer.blur})`,
                            maskImage: layer.mask,
                            WebkitMaskImage: layer.mask,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
