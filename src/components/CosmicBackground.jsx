import React from 'react';
import { motion } from 'framer-motion';

export default function CosmicBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#05050a]">
            {/* Base Deep Space Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0f0f1a_0%,_#05050a_100%)]" />

            {/* Nebula Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-purple-600/10 blur-[150px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute top-[30%] right-[-5%] w-[40vw] h-[40vw] bg-pink-600/5 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '4s' }} />

            {/* Interactive/Animated Stars Density 1 */}
            <div className="cosmic-bg" style={{ opacity: 0.4 }} />

            {/* Extra Stars Layer */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `radial-gradient(1px 1px at 10% 20%, #fff, transparent), 
                            radial-gradient(1.5px 1.5px at 30% 50%, #fff, transparent),
                            radial-gradient(1px 1px at 70% 80%, #fff, transparent),
                            radial-gradient(1px 1px at 90% 10%, #fff, transparent)`,
                    backgroundSize: '300px 300px'
                }}
            />

            {/* Shimmering Bokeh */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 0.2, 0],
                        scale: [0, 1, 0],
                        x: [Math.random() * 100 + 'vw', Math.random() * 100 + 'vw'],
                        y: [Math.random() * 100 + 'vh', Math.random() * 100 + 'vh'],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: Math.random() * 20
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
                />
            ))}
        </div>
    );
}
