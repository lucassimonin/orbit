import React from 'react';
import { motion } from 'framer-motion';

export default function Dice({ onRoll, disabled, isRolling, value }) {
    const displayValue = value || 1;

    return (
        <div
            className="relative w-24 h-24 preserve-3d cursor-pointer active:scale-95 transition-transform"
            onClick={() => !disabled && !isRolling && onRoll()}
        >
            {/* Outer Glow */}
            <div className={`absolute inset-[-20px] rounded-full blur-[40px] opacity-40 transition-all duration-500 ${isRolling ? 'bg-purple-500 scale-125 animate-pulse' : 'bg-blue-400 opacity-20'}`} />

            {/* 3D Cube */}
            <motion.div
                animate={isRolling ? {
                    rotateX: [0, 360, 720],
                    rotateY: [0, 360, 720],
                    scale: [1, 1.2, 1],
                } : {
                    rotateY: [0, 20, -20, 0],
                    rotateX: [0, 10, -10, 0],
                }}
                transition={isRolling ? { duration: 0.6, repeat: Infinity, ease: 'linear' } : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full h-full preserve-3d"
            >
                {/* Front Face */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/40 rounded-2xl flex items-center justify-center text-4xl font-black text-white shadow-[0_0_30px_rgba(255,255,255,0.3)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-white/20 to-purple-500/20" />
                    <span className="relative z-10 drop-shadow-2xl">{displayValue}</span>
                    <div className="absolute top-2 right-2 flex gap-1">
                        <div className="w-1 h-1 bg-white/40 rounded-full" />
                        <div className="w-1 h-1 bg-white/40 rounded-full" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
