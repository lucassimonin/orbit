import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, GlassWater, Gift, Droplets, Crown, Swords, Users, Zap, Waves, Star, Beer, HelpCircle, Dice6, Timer, Play, RotateCcw } from 'lucide-react';
import Dice3D from './Dice3D';

const ICON_MAP = {
    GlassWater, Gift, Droplets, Crown, Swords, Users, Zap, Waves, Star, Beer, HelpCircle, Dice6
};

export default function ActionModal({ isOpen, challenge, playerName, onComplete }) {
    const [diceResults, setDiceResults] = useState([]);
    const [ruleText, setRuleText] = useState('');
    const [timeLeft, setTimeLeft] = useState(challenge?.timer || 0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [isTimerFinished, setIsTimerFinished] = useState(false);
    if (!challenge) return null;

    React.useEffect(() => {
        if (isOpen) {
            setTimeLeft(challenge.timer || 0);
            setIsTimerActive(false);
            setIsTimerFinished(false);
            setRuleText('');
        }
    }, [isOpen, challenge]);

    React.useEffect(() => {
        let interval = null;
        if (isTimerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1);
            }, 1000);
        } else if (timeLeft === 0 && isTimerActive) {
            setIsTimerActive(false);
            setIsTimerFinished(true);
            if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timeLeft]);

    const Icon = ICON_MAP[challenge.icon] || Star;
    const isDiceChallenge = challenge.category === 'Dés';

    const handleComplete = () => {
        setDiceResults([]);
        setIsTimerActive(false);
        onComplete(ruleText);
    };

    const startTimer = () => setIsTimerActive(true);
    const resetTimer = () => {
        setTimeLeft(challenge.timer);
        setIsTimerActive(false);
        setIsTimerFinished(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6" style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
                        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(30px)' }}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="w-full max-w-sm glass-panel overflow-hidden"
                        style={{
                            borderRadius: '2.5rem',
                            position: 'relative',
                            zIndex: 10,
                            padding: 0
                        }}
                    >
                        {/* Header / Icon */}
                        {!isDiceChallenge && (
                            <div className="flex items-center justify-center relative h-32" style={{ height: '8rem', background: challenge.color, position: 'relative' }}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                <motion.div
                                    initial={{ scale: 0, rotate: -20 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring', damping: 12 }}
                                    style={{ zIndex: 1 }}
                                >
                                    <Icon size={64} className={challenge.category === 'Dés' ? "text-black" : "text-white drop-shadow-2xl"} />
                                </motion.div>
                            </div>
                        )}

                        <div className="p-8" style={{ padding: '2rem' }}>
                            <div className="flex justify-between items-start mb-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4 }}>
                                    {challenge.type} pour {playerName}
                                </span>
                                <div className="bg-white/10 px-2 py-0.5 rounded-lg border border-white/5">
                                    <span className="text-[9px] font-black italic text-white/80">GANNE +{challenge.points || 10} PTS</span>
                                </div>
                            </div>

                            <h2 className="text-4xl font-black italic tracking-tighter mb-6 uppercase" style={{ fontSize: '2.5rem', fontWeight: 900, fontStyle: 'italic', letterSpacing: '-0.05em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                                {challenge.title}
                            </h2>

                            {isDiceChallenge && (
                                <Dice3D
                                    onRollComplete={(vals) => setDiceResults(vals)}
                                    rollCount={challenge.rollCount}
                                />
                            )}

                            {challenge.timer && (
                                <div className="flex flex-col items-center justify-center mb-8 p-6 bg-white/5 rounded-[2rem] border border-white/5 relative overflow-hidden">
                                    <div className="relative w-32 h-32 flex items-center justify-center">
                                        <svg className="w-full h-full -rotate-90">
                                            <circle
                                                cx="64" cy="64" r="58"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                className="text-white/10"
                                            />
                                            <motion.circle
                                                cx="64" cy="64" r="58"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                strokeDasharray="364.4"
                                                initial={{ strokeDashoffset: 0 }}
                                                animate={{ strokeDashoffset: 364.4 * (1 - timeLeft / challenge.timer) }}
                                                transition={{ duration: 1, ease: "linear" }}
                                                className={isTimerFinished ? "text-red-500" : "text-white"}
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className={`text-4xl font-black italic ${isTimerFinished ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                                                {timeLeft}
                                            </span>
                                            <span className="text-[8px] font-black uppercase opacity-40">Secondes</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-6">
                                        {!isTimerActive && !isTimerFinished && (
                                            <button
                                                onClick={startTimer}
                                                className="px-6 py-2 bg-white text-black rounded-full font-black italic text-xs flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl"
                                            >
                                                <Play size={14} fill="currentColor" /> DÉMARRER
                                            </button>
                                        )}
                                        {(isTimerActive || isTimerFinished) && (
                                            <button
                                                onClick={resetTimer}
                                                className="px-6 py-2 bg-white/10 text-white rounded-full font-black italic text-xs flex items-center gap-2 hover:bg-white/20 transition-all border border-white/10"
                                            >
                                                <RotateCcw size={14} /> RÉINITIALISER
                                            </button>
                                        )}
                                    </div>

                                    {isTimerFinished && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute bottom-2 text-red-500 font-black italic text-[10px] uppercase tracking-widest"
                                        >
                                            TEMPS ÉCOULÉ !
                                        </motion.div>
                                    )}
                                </div>
                            )}

                            <div
                                className="text-lg leading-relaxed font-medium text-white/80 mb-10 p-6 bg-white/5 border border-white/5 rounded-3xl"
                                style={{
                                    fontSize: '1.125rem',
                                    lineHeight: 1.6,
                                    fontWeight: 500,
                                    color: 'rgba(255,255,255,0.8)',
                                    marginBottom: '2.5rem',
                                    padding: '1.5rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: '1.5rem',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                <p className="mb-4 italic">"{challenge.text}"</p>

                                {challenge.category === 'Règle' && (
                                    <div className="mt-4 pt-4 border-t border-white/10">
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Décris la règle :</p>
                                        <textarea
                                            value={ruleText}
                                            onChange={(e) => setRuleText(e.target.value)}
                                            placeholder="Ex: Interdit de dire 'Santé'..."
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-white/30 transition-all min-h-[60px]"
                                        />
                                    </div>
                                )}

                                {diceResults.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="pt-4 border-t border-white/10"
                                    >
                                        <div className="flex flex-wrap gap-4 justify-center">
                                            {diceResults.map((res, i) => (
                                                <div key={i} className="text-center">
                                                    <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-1">
                                                        {i === 0 ? '1er' : i === 1 ? '2ème' : '3ème'} Lancer
                                                    </p>
                                                    <p className="text-4xl font-black italic">{res}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Finish Button */}
                            {(() => {
                                const isFinished = (!isDiceChallenge || diceResults.length >= (challenge.rollCount || 1)) &&
                                    (challenge.category !== 'Règle' || ruleText.trim().length > 0);
                                return (
                                    <button
                                        onClick={handleComplete}
                                        disabled={!isFinished}
                                        className={`btn-premium btn-white w-full p-5 transition-all ${!isFinished ? 'opacity-20 grayscale cursor-not-allowed' : ''}`}
                                        style={{ width: '100%', padding: '1.25rem' }}
                                    >
                                        <Check size={24} strokeWidth={4} />
                                        {!isFinished && challenge.category === 'Règle' && !ruleText.trim() ? "ÉCRIS LA RÈGLE" :
                                            isFinished ? 'C\'EST FAIT' : `LANCE LE DÉ (${diceResults.length + 1}/${challenge.rollCount})`}
                                    </button>
                                );
                            })()}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
