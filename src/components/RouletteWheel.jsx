import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { CHALLENGES } from '../data/challenges';
import { GlassWater, Gift, Droplets, Crown, Swords, Users, Zap, Waves, Star, Beer } from 'lucide-react';

const ICON_MAP = {
    GlassWater, Gift, Droplets, Crown, Swords, Users, Zap, Waves, Star, Beer
};

export default function RouletteWheel({ onFinish, isSpinning, resultIndex }) {
    const controls = useAnimation();
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        if (isSpinning) {
            const segmentAngle = 360 / CHALLENGES.length;
            // Calculate target rotation to land the segment centered at the top (0 degrees)
            // The segments are offset by 90deg in the SVG drawing, and the pointer is at 0deg (top).
            // We want CHALLENGES[resultIndex] to be at the top indicator.
            const spins = 6 + Math.floor(Math.random() * 4);
            const newRotation = rotation + (spins * 360) + (360 - (resultIndex * segmentAngle) - (segmentAngle / 2));

            controls.start({
                rotate: newRotation,
                transition: { duration: 5, ease: [0.12, 0, 0.1, 1] }
            }).then(() => {
                setRotation(newRotation % 360);
                onFinish();
            });
        }
    }, [isSpinning, resultIndex]);

    return (
        <div className="relative w-full max-w-[500px] sm:max-w-[650px] aspect-square flex items-center justify-center mx-auto">
            {/* Triple Ring Decoration */}
            <div className="absolute inset-[-10px] rounded-full border border-white/5 opacity-50" />
            <div className="absolute inset-[-25px] rounded-full border border-dashed border-white/5 animate-[spin_120s_linear_infinite]" />
            <div className="absolute inset-[-45px] rounded-full border border-dotted border-white/5 animate-[spin_180s_linear_infinite] opacity-30" />

            {/* Pointer (Top Indicator) */}
            <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
                <div className="w-1 h-8 bg-gradient-to-t from-white to-transparent mb-[-8px] blur-[1px]" />
                <div className="w-6 h-6 bg-white rotate-45 border-r-2 border-b-2 border-black/20 shadow-[0_0_20px_rgba(255,255,255,0.4)] relative">
                    <div className="absolute inset-1 border border-black/5 " />
                </div>
            </div>

            {/* The Wheel */}
            <motion.div
                animate={controls}
                className="w-full h-full relative z-20"
                initial={{ rotate: rotation }}
            >
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                    <defs>
                        {CHALLENGES.map((c, i) => (
                            <linearGradient key={`grad-${i}`} id={`grad-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor={c.color} stopOpacity="0.8" />
                                <stop offset="100%" stopColor={c.color} stopOpacity="1" />
                            </linearGradient>
                        ))}
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {CHALLENGES.map((challenge, i) => {
                        const angle = 360 / CHALLENGES.length;
                        const startAngle = i * angle;
                        // Draw segments
                        const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
                        const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
                        const x2 = 50 + 50 * Math.cos((Math.PI * (startAngle + angle - 90)) / 180);
                        const y2 = 50 + 50 * Math.sin((Math.PI * (startAngle + angle - 90)) / 180);

                        const Icon = ICON_MAP[challenge.icon];

                        return (
                            <g key={challenge.id} className="cursor-pointer">
                                <path
                                    d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                                    fill={`url(#grad-${i})`}
                                    stroke="rgba(0,0,0,0.3)"
                                    strokeWidth="0.2"
                                />
                                <g transform={`rotate(${startAngle + angle / 2}, 50, 50)`}>
                                    {/* Title Text */}
                                    <text
                                        x="50"
                                        y="12"
                                        fill="white"
                                        fontSize="2.5"
                                        fontWeight="900"
                                        textAnchor="middle"
                                        className="italic uppercase tracking-tighter"
                                        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
                                    >
                                        {challenge.title}
                                    </text>

                                    {/* Small Circle with Icon */}
                                    <circle cx="50" cy="22" r="3" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                                    <g transform="translate(48.5, 20.5) scale(0.12)">
                                        <path d="M12 2v20M2 12h20" stroke="white" strokeWidth="2" opacity="0.3" />
                                    </g>
                                </g>
                            </g>
                        );
                    })}

                    {/* Inner Decorative Stroke */}
                    <circle cx="50" cy="50" r="49.5" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                </svg>

                {/* Center Cap (Crystalline Glass Look) */}
                <div className="absolute inset-[32%] bg-black/40 backdrop-blur-3xl rounded-full border border-white/20 shadow-[inset_0_5px_15px_rgba(255,255,255,0.2)] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center animate-pulse">
                        <RefreshCw size={24} className="text-white/40" />
                    </div>
                    {/* Light beams */}
                    <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,_transparent_0deg,_rgba(255,255,255,0.05)_45deg,_transparent_90deg)] animate-[spin_10s_linear_infinite]" />
                </div>
            </motion.div>
        </div>
    );
}

import { RefreshCw } from 'lucide-react';
