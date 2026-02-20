import React, { useState } from 'react';
import { RefreshCw, Star, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BottomDashboard({ onSpin, onEndGame, isSpinning, disabled, label = "LANCER LE SLOT" }) {
    return (
        <div className="bottom-dash-container z-20">
            <div className="space-y-6">
                <div className="flex flex-col items-center gap-4 mt-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                    <button
                        onClick={onSpin}
                        disabled={disabled || isSpinning}
                        className={`btn-premium btn-white w-full`}
                        style={{
                            opacity: (disabled || isSpinning) ? 0.5 : 1,
                            cursor: (disabled || isSpinning) ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.6rem',
                            padding: '0.75rem 1rem'
                        }}
                    >
                        <RefreshCw size={18} className={isSpinning ? 'animate-spin' : ''} />
                        <span className="text-sm font-black">{label}</span>
                    </button>

                    <button
                        onClick={onEndGame}
                        disabled={isSpinning}
                        className="w-full py-3 rounded-xl font-black uppercase tracking-[0.1em] text-[10px] text-red-500 transition-all border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 active:scale-95"
                        style={{ cursor: isSpinning ? 'not-allowed' : 'pointer', opacity: isSpinning ? 0.3 : 1 }}
                    >
                        Fin de partie
                    </button>
                </div>
            </div>
        </div>
    );
}
