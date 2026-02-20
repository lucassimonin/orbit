import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scroll } from 'lucide-react';
export default function TopHUD({ player, rankLabel, currentRound, maxRounds, targetPoints, activeRules = [] }) {
    if (!player) return null;

    const progress = Math.min(((player.points || 0) / (targetPoints || 100)) * 100, 100);

    return (
        <div className="hud-container z-20 relative">
            <div className="flex items-center justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div className="flex items-center" style={{ gap: '1rem', display: 'flex' }}>
                    {/* Avatar Container with Round Badge */}
                    <div className="relative">
                        <div
                            className="flex-center"
                            style={{
                                width: '3.5rem',
                                height: '3.5rem',
                                borderRadius: '1rem',
                                border: '1px solid rgba(255,255,255,0.2)',
                                background: player.image ? 'transparent' : player.color,
                                position: 'relative',
                                overflow: 'hidden',
                                fontSize: '1.25rem',
                                fontWeight: 900,
                                fontStyle: 'italic',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {player.image ? (
                                <img src={player.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" style={{ position: 'absolute', inset: 0 }} />
                                    {player.name[0].toUpperCase()}
                                </>
                            )}
                        </div>
                        {maxRounds && (
                            <div className="absolute -top-1.5 -left-1.5 bg-white text-black text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-lg border border-black/10 flex items-center gap-1 z-10">
                                <span className="opacity-40">RD</span>
                                {currentRound}/{maxRounds}
                            </div>
                        )}
                    </div>

                    {/* Info Container */}
                    <div className="flex flex-col items-start" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        {/* Name above the bar */}
                        <span style={{ fontSize: '1.25rem', fontWeight: 900, fontStyle: 'italic', letterSpacing: '-0.025em', marginBottom: '0.25rem' }}>
                            {player.name}
                        </span>

                        {/* Progress Bar */}
                        <div style={{ width: '10rem', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', overflow: 'hidden', marginBottom: '0.4rem' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ type: 'spring', damping: 20 }}
                                style={{ height: '100%', background: 'white' }}
                            />
                        </div>

                        {/* Points below the bar */}
                        <div className="flex items-center gap-1.5" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            <span style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.4 }}>Points</span>
                            <span style={{ fontSize: '10px', fontWeight: 900, color: 'white' }}>{player.points || 0} PTS</span>
                        </div>
                    </div>
                </div>

                {/* Large Rank on the Right */}
                <div className="flex flex-col items-end" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingRight: '1rem' }}>
                    <span style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.3, marginBottom: '-0.25rem' }}>Position</span>
                    <span style={{
                        fontSize: '2.2rem',
                        fontWeight: 900,
                        fontStyle: 'italic',
                        letterSpacing: '-0.05em',
                        background: 'linear-gradient(to bottom, #fff, rgba(255,255,255,0.4))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        paddingRight: '0.2em' // Preventive padding for italic clipping
                    }}>
                        {rankLabel}
                    </span>
                </div>
                {/* Active Rules List */}
                <AnimatePresence>
                    {activeRules.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-4 space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2"
                            style={{
                                marginTop: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                maxHeight: '200px',
                                overflowY: 'auto',
                                paddingRight: '0.5rem',
                                pointerEvents: 'auto' // Allow scrolling rules
                            }}
                        >
                            {activeRules.map((rule) => (
                                <motion.div
                                    key={rule.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2 relative overflow-hidden group shadow-lg"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '0.75rem',
                                        paddingLeft: '1rem',
                                        paddingRight: '1rem',
                                        paddingTop: '0.5rem',
                                        paddingBottom: '0.5rem',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div className="absolute inset-y-0 left-0 w-1 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                                    <div className="flex-1 min-w-0" style={{ flex: 1, minWidth: 0 }}>
                                        <p className="text-white font-bold italic truncate text-sm leading-tight" style={{ color: 'white', fontWeight: 700, fontStyle: 'italic', fontSize: '0.875rem' }}>
                                            {rule.text}
                                        </p>
                                        <p className="text-[8px] font-black uppercase opacity-40 mt-0.5" style={{ fontSize: '8px', fontWeight: 900, textTransform: 'uppercase', opacity: 0.4 }}>
                                            {rule.playerName} • {rule.remainingTurns === 999 ? '∞' : `${rule.remainingTurns} Tours restant`}
                                        </p>
                                    </div>
                                    <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-500">
                                        <Scroll size={12} />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
