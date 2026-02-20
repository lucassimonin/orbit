import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Home, RotateCcw } from 'lucide-react';

export default function PodiumScreen({ players, onRestart, onHome }) {
    // Sort players by points descending
    const sortedPlayers = [...players].sort((a, b) => b.points - a.points);
    const winners = sortedPlayers.slice(0, 3);
    const rest = sortedPlayers.slice(3);

    return (
        <div className="podium-screen absolute inset-0 z-50 flex flex-col items-center justify-start pt-20 pb-12 px-8 bg-[#05050a]/95 backdrop-blur-2xl overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-20 flex-shrink-0"
            >
                <Trophy size={60} className="text-yellow-400 mx-auto mb-4" />
                <h1 className="text-4xl font-black italic tracking-tighter text-white">CLASSEMENT FINAL</h1>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mt-2">Félicitations aux champions</p>
            </motion.div>

            {/* Podium Blocks */}
            <div className="flex items-end justify-center gap-4 mb-20 flex-shrink-0">
                {/* 1st Place */}
                {winners[0] && (
                    <PodiumPlace
                        player={winners[0]}
                        rank={1}
                        height="h-56"
                        delay={0.1}
                        color="#FFD700"
                        label="1ER"
                    />
                )}
                {/* 2nd Place */}
                {winners[1] && (
                    <PodiumPlace
                        player={winners[1]}
                        rank={2}
                        height="h-40"
                        delay={0.2}
                        color="#C0C0C0"
                        label="2ÈME"
                    />
                )}
                {/* 3rd Place */}
                {winners[2] && (
                    <PodiumPlace
                        player={winners[2]}
                        rank={3}
                        height="h-32"
                        delay={0.3}
                        color="#CD7F32"
                        label="3ÈME"
                    />
                )}
            </div>

            {/* Other Ranks List */}
            {rest.length > 0 && (
                <div className="w-full max-w-sm space-y-3 mb-12">
                    {rest.map((player, idx) => (
                        <motion.div
                            key={player.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                            className="flex items-center justify-between bg-white/5 border border-white/5 p-4 rounded-2xl"
                        >
                            <div className="flex items-center gap-4">
                                <span className="font-black italic text-white/20 text-lg w-6">{idx + 4}</span>
                                <div className="w-8 h-8 rounded-lg overflow-hidden" style={{ background: player.image ? 'transparent' : player.color }}>
                                    {player.image ? (
                                        <img src={player.image} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-white/10" />
                                    )}
                                </div>
                                <span className="font-bold text-white">{player.name}</span>
                            </div>
                            <span className="font-black text-white/40">{player.points || 0} PTS</span>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-4 w-full max-w-sm">
                <button
                    onClick={onHome}
                    className="btn-premium btn-white w-full py-5 flex items-center justify-center gap-3"
                >
                    <Home size={20} /> RETOUR À L'ACCUEIL
                </button>
            </div>
        </div>
    );
}

function PodiumPlace({ player, rank, height, delay, color, label }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', delay, damping: 15 }}
            className={`flex flex-col items-center gap-3 w-28`}
        >
            <div className="relative">
                <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black italic text-white shadow-2xl relative overflow-hidden"
                    style={{ background: player.image ? 'transparent' : player.color }}
                >
                    {player.image ? (
                        <img src={player.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <>
                            <div className="absolute inset-0 bg-white/20" />
                            {player.name[0].toUpperCase()}
                        </>
                    )}
                </div>
                <div
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black italic text-black shadow-lg"
                    style={{ background: color }}
                >
                    {rank}
                </div>
            </div>

            <div className="text-center">
                <p className="text-white font-black truncate w-full px-2" style={{ fontSize: rank === 1 ? '1.1rem' : '0.9rem' }}>{player.name}</p>
                <p className="text-[10px] font-black text-white/40">{player.points || 0} PTS</p>
            </div>

            <div
                className={`w-full ${height} rounded-t-2xl relative overflow-hidden flex items-center justify-center pt-4`}
                style={{ background: `linear-gradient(to bottom, ${color}22, ${color}05)` }}
            >
                <div className="absolute inset-x-0 top-0 h-[1px]" style={{ background: color }} />
                <span className="font-black italic tracking-widest text-white/10 text-xl rotate-90" style={{ color: `${color}44` }}>{label}</span>
            </div>
        </motion.div>
    );
}
