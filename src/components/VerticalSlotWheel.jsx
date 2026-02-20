import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { CHALLENGES } from '../data/challenges';
import {
    GlassWater, Gift, Droplets, Crown, Swords,
    Users, Zap, Waves, Star, Beer, HelpCircle, Dice6
} from 'lucide-react';

const ICON_MAP = {
    GlassWater, Gift, Droplets, Crown, Swords,
    Users, Zap, Waves, Star, Beer, HelpCircle, Dice6
};

const ITEM_HEIGHT = 120; // Height of each challenge tile in pixels
const VISIBLE_ITEMS = 5; // Total visible items in the wheel

export default function VerticalSlotWheel({ isSpinning, resultIndex, challenges = [], onFinish }) {
    const controls = useAnimation();
    const [yOffset, setYOffset] = useState(-(20 * (challenges.length || CHALLENGES.length)) * ITEM_HEIGHT);
    const [lastResultIndex, setLastResultIndex] = useState(0);

    const activeChallenges = challenges.length > 0 ? challenges : CHALLENGES;
    const REPETITIONS = 60;
    const extendedChallenges = Array(REPETITIONS).fill(activeChallenges).flat();

    useEffect(() => {
        if (isSpinning) {
            // Consistent 10 full rotations
            const SPINS = 10;

            // Calculate relative distance to new result (always downwards)
            const diff = (resultIndex - lastResultIndex + activeChallenges.length) % activeChallenges.length;
            const distance = (SPINS * activeChallenges.length + diff) * ITEM_HEIGHT;

            // targetY is always lower than current yOffset
            const targetY = yOffset - distance;

            controls.start({
                y: targetY,
                transition: {
                    duration: 4,
                    ease: [0.15, 0.5, 0.15, 1],
                }
            }).then(() => {
                // Seamless teleportation: 
                const resetY = -(20 * activeChallenges.length + resultIndex) * ITEM_HEIGHT;

                // Set the visual control immediately without animation
                controls.set({ y: resetY });

                // Sync internal state
                setYOffset(resetY);
                setLastResultIndex(resultIndex);
                onFinish();
            });
        }
    }, [isSpinning, resultIndex, lastResultIndex, yOffset, controls, onFinish, activeChallenges]);

    return (
        <div className="relative w-full max-w-[400px] h-[400px] mx-auto overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl bg-black/20 backdrop-blur-md">
            {/* 3D Cylindrical Overlay - Top Shadow */}
            <div className="absolute top-0 left-0 right-0 h-32 z-30 pointer-events-none bg-gradient-to-b from-black/80 via-black/40 to-transparent" />

            {/* 3D Cylindrical Overlay - Bottom Shadow */}
            <div className="absolute bottom-0 left-0 right-0 h-32 z-30 pointer-events-none bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Central Winner Indicator */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[120px] z-20 pointer-events-none">
                {/* Horizontal Neon Lines */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)]" />

                {/* Side Pointers */}
                <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-6 h-6 bg-cyan-400 rotate-45 blur-[1px] shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
                <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-6 h-6 bg-cyan-400 rotate-45 blur-[1px] shadow-[0_0_20px_rgba(34,211,238,0.5)]" />

                {/* Subtle highlight center */}
                <div className="absolute inset-0 bg-white/5 backdrop-contrast-125" />
            </div>

            {/* The Reel */}
            <div className="absolute inset-0 flex flex-col items-center pt-[140px]"> {/* Offset to center first item in viewport */}
                <motion.div
                    animate={controls}
                    initial={{ y: yOffset }}
                    className="flex flex-col gap-0 w-full"
                >
                    {extendedChallenges.map((challenge, idx) => {
                        const Icon = ICON_MAP[challenge.icon];
                        return (
                            <div
                                key={`slot-${idx}`}
                                className="w-full flex flex-col items-center justify-center shrink-0 px-8"
                                style={{ height: ITEM_HEIGHT }}
                            >
                                <div className="flex items-center gap-6 w-full max-w-[280px]">
                                    {/* Icon Box */}
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border border-white/10"
                                        style={{ background: challenge.color }}
                                    >
                                        {Icon && <Icon size={32} className={challenge.category === 'Dés' ? "text-black" : "text-white drop-shadow-md"} />}
                                    </div>

                                    {/* Text Info */}
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/30">
                                            {challenge.type}
                                        </span>
                                        <span className="text-xl font-black italic uppercase tracking-tighter leading-tight">
                                            {challenge.title}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Outer Glass Bezel Effect */}
            <div className="absolute inset-0 rounded-[3rem] border-[12px] border-white/5 pointer-events-none z-40" />
            <div className="absolute inset-1 rounded-[2.8rem] border border-white/10 pointer-events-none z-40" />
        </div>
    );
}
