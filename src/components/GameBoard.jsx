import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SQUARES, SQUARE_TYPES } from '../data/squares';
import {
    Flame, Dumbbell, Skull, Heart, Lightbulb, Ghost,
    Rocket, GlassWater, Gift, Users, Music, Crown,
    RotateCcw, Star, Trophy
} from 'lucide-react';

const TYPE_ICONS = {
    [SQUARE_TYPES.START]: Rocket,
    [SQUARE_TYPES.SHOT]: GlassWater,
    [SQUARE_TYPES.DISTRIBUTION]: Gift,
    [SQUARE_TYPES.PARTNER]: Users,
    [SQUARE_TYPES.THEME]: Lightbulb,
    [SQUARE_TYPES.RIME]: Music,
    [SQUARE_TYPES.RULE]: Crown,
    [SQUARE_TYPES.BACK]: RotateCcw,
    [SQUARE_TYPES.CHANCE]: Star,
    [SQUARE_TYPES.FINISH]: Trophy
};

export default function GameBoard({ players, activePlayerIndex, children }) {
    const totalSquares = SQUARES.length;

    // Increased radius to accommodate more squares
    const radius = 280;

    return (
        <div className="relative w-full aspect-square max-w-[min(90vw,700px)] flex items-center justify-center overflow-visible select-none">

            {/* Central Anchor for the Dice and Orbitals */}
            <div className="relative z-30 flex items-center justify-center w-40 h-40">
                {/* Orbital animation lines */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-[-20px] rounded-full border border-dashed border-white/10"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-[-40px] rounded-full border border-dotted border-white/5 scale-125"
                />
                <div className="relative z-40 transform-gpu">
                    {children}
                </div>
            </div>

            {/* Connection Ring (Visual path) */}
            <div
                className="absolute rounded-full border border-white/5 pointer-events-none"
                style={{ width: radius * 2, height: radius * 2 }}
            />

            {/* Circular Tiles */}
            {SQUARES.map((square, index) => {
                // Calculate angle starting from top (-90 degrees)
                const angle = (index / totalSquares) * 2 * Math.PI - Math.PI / 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                const playersOnSquare = players.filter(p => p.position === square.id);
                const Icon = TYPE_ICONS[square.type] || Star;
                const isActive = playersOnSquare.length > 0;

                return (
                    <motion.div
                        key={square.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: isActive ? 1.15 : 1,
                            opacity: 1,
                            x, y,
                            borderColor: isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.05)'
                        }}
                        transition={{
                            type: 'spring',
                            damping: 15,
                            stiffness: 150,
                            delay: index * 0.01
                        }}
                        className={`
                            absolute w-12 h-12 rounded-2xl glass-panel flex items-center justify-center border transition-shadow duration-500 z-20
                            ${isActive ? 'shadow-[0_0_30px_rgba(255,255,255,0.15)] bg-white/10' : ''}
                        `}
                        style={{
                            left: 'calc(50% - 1.5rem)',
                            top: 'calc(50% - 1.5rem)'
                        }}
                    >
                        <div className="relative pointer-events-none">
                            <Icon
                                size={22}
                                className={`transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/20'}`}
                            />

                            {/* Dynamic Pulse for Active Tiles */}
                            {isActive && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1.5, opacity: 0 }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-[-8px] rounded-full border-2 border-white/10"
                                />
                            )}
                        </div>

                        {/* Player Markers */}
                        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
                            <AnimatePresence mode="popLayout">
                                {playersOnSquare.map((player, pIdx) => (
                                    <motion.div
                                        key={player.id}
                                        layoutId={`player-${player.id}`}
                                        initial={{ scale: 0, y: 10, opacity: 0 }}
                                        animate={{ scale: 1, y: 0, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        transition={{ type: 'spring', damping: 10 }}
                                        className="w-4 h-4 rounded-full border-2 border-white shadow-2xl absolute"
                                        style={{
                                            backgroundColor: player.color,
                                            // Spread markers if multiple players are on the same square
                                            transform: `translate(${Math.cos((pIdx / playersOnSquare.length) * 2 * Math.PI) * 12}px, ${Math.sin((pIdx / playersOnSquare.length) * 2 * Math.PI) * 12}px)`,
                                            boxShadow: `0 0 15px ${player.color}`,
                                            zIndex: 60 + pIdx
                                        }}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Square ID (Optional - small indicator) */}
                        <span className="absolute -bottom-6 text-[8px] font-black text-white/10">{index}</span>
                    </motion.div>
                );
            })}
        </div>
    );
}

