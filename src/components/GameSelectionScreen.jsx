import React, { useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    Droplets,
    Crown,
    Swords,
    Star,
    Check,
    ArrowRight,
    ChevronDown,
    Plus,
    Edit3,
    Save,
    HelpCircle,
    Dice6
} from 'lucide-react';

const CATEGORY_DATA = [
    { id: 'Shot', icon: Zap, color: '#ff00a5', label: 'Shots', desc: 'Cul sec, Shaking, Défis flash' },
    { id: 'Gage', icon: Droplets, color: '#00ffff', label: 'Gages', desc: 'Généreux, Cascade, Déluge' },
    { id: 'Vérité', icon: HelpCircle, color: '#ff6b00', label: 'Vérités', desc: 'Secrets, Aveux, Hot 🌶️' },
    { id: 'Dés', icon: Dice6, color: '#ffffff', label: 'Dés', desc: 'Paire/Impair, Duel, Hasard' },
    { id: 'Règle', icon: Crown, color: '#bc13fe', label: 'Règles', desc: 'Dictateur, Lois du jeu' },
    { id: 'Défis', icon: Swords, color: '#32cd32', label: 'Défis', desc: 'Duels, Binômes, Action' },
    { id: 'Chance', icon: Star, color: '#ffcc00', label: 'Chance', desc: 'Sauvé, Bonus de tour' },
];

const CategoryCard = memo(({
    cat,
    isSelected,
    isExpanded,
    challenges,
    disabledChallengeIds,
    onToggleCategory,
    onExpand,
    onToggleChallenge,
    onAddChallenge,
    onUpdateChallengePoints,
    onUpdateChallengeDetails,
}) => {
    const [isAdding, setIsAdding] = React.useState(false);
    const [newChallenge, setNewChallenge] = React.useState({ title: '', text: '', points: 10, timer: null, duration: 3 });
    const [editingId, setEditingId] = React.useState(null);
    const [editValues, setEditValues] = React.useState({ title: '', text: '', rollCount: 1, timer: null, duration: 3 });
    const Icon = cat.icon;

    const handleAdd = () => {
        if (!newChallenge.title || !newChallenge.text) return;
        onAddChallenge({
            type: 'Custom',
            title: newChallenge.title.toUpperCase(),
            text: newChallenge.text,
            points: parseInt(newChallenge.points) || 10,
            rollCount: cat.id === 'Dés' ? (parseInt(newChallenge.rollCount) || 1) : undefined,
            timer: newChallenge.timer,
            duration: cat.id === 'Règle' ? (parseInt(newChallenge.duration) || 3) : undefined,
            color: cat.color,
            icon: 'Star',
            category: cat.id
        });
        setNewChallenge({ title: '', text: '', points: 10, timer: null, duration: 3 });
        setIsAdding(false);
    };

    const startEditing = (e, challenge) => {
        e.stopPropagation();
        setEditingId(challenge.id);
        setEditValues({
            title: challenge.title,
            text: challenge.text,
            rollCount: challenge.rollCount || 1,
            timer: challenge.timer || null,
            duration: challenge.duration || 3,
        });
    };

    const saveEditing = (e) => {
        e.stopPropagation();
        onUpdateChallengeDetails(editingId, {
            title: editValues.title.toUpperCase(),
            text: editValues.text,
            rollCount: cat.id === 'Dés' ? editValues.rollCount : undefined,
            timer: editValues.timer,
            duration: cat.id === 'Règle' ? editValues.duration : undefined,
        });
        setEditingId(null);
    };

    return (
        <div className="relative">
            <div
                className={`rounded-[2rem] border transition-all overflow-hidden ${isSelected
                    ? 'bg-white/10 border-white/20'
                    : 'bg-white/[0.02] border-white/5 opacity-40'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center gap-5 p-5 text-left relative overflow-hidden group">
                    <div onClick={() => onToggleCategory(cat.id)} className="absolute inset-0 z-0" />
                    <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform z-10"
                        style={{ backgroundColor: isSelected ? cat.color : 'rgba(255,255,255,0.05)' }}
                    >
                        <Icon size={28} className={isSelected ? (cat.id === 'Dés' ? 'text-black' : 'text-white') : 'text-white/20'} />
                    </div>
                    <div className="flex-1 z-10" onClick={() => onToggleCategory(cat.id)}>
                        <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">{cat.label}</h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-0.5">{challenges.length} défis dispos</p>
                    </div>
                    <button
                        onClick={() => onExpand(isExpanded ? null : cat.id)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all z-10 ${isExpanded ? 'bg-white/20 rotate-180' : 'bg-white/5'}`}
                    >
                        <ChevronDown size={20} />
                    </button>
                </div>

                {/* Content */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="px-5 pb-5 space-y-3 border-t border-white/5 pt-4 bg-black/20"
                        >

                            {challenges.map(challenge => (
                                <div
                                    key={challenge.id}
                                    className={`flex flex-col p-4 rounded-xl border border-white/5 transition-all ${!disabledChallengeIds.includes(challenge.id) ? 'bg-white/5 text-white/80' : 'bg-transparent text-white/20 grayscale'
                                        }`}
                                >
                                    {editingId === challenge.id ? (
                                        <div className="space-y-3">
                                            <input
                                                value={editValues.title}
                                                onChange={e => setEditValues(v => ({ ...v, title: e.target.value }))}
                                                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-black outline-none"
                                                placeholder="Titre"
                                            />
                                            <textarea
                                                value={editValues.text}
                                                onChange={e => setEditValues(v => ({ ...v, text: e.target.value }))}
                                                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] outline-none min-h-[50px]"
                                                placeholder="Texte du défi"
                                            />
                                            <div className="flex gap-2 p-2 bg-white/5 rounded-xl border border-white/5 mb-2">
                                                <div className="flex-1 flex flex-col gap-1">
                                                    <span className="text-[8px] font-black uppercase text-white/30 ml-1">Chronomètre (sec)</span>
                                                    <div className="flex gap-1 flex-wrap">
                                                        {[null, 5, 10, 15, 30, 60].map(s => (
                                                            <button
                                                                key={String(s)}
                                                                onClick={(e) => { e.stopPropagation(); setEditValues(v => ({ ...v, timer: s })); }}
                                                                className={`px-2 py-1 rounded text-[8px] font-black transition-all ${editValues.timer === s ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                                                            >
                                                                {s === null ? 'AUCUN' : `${s}s`}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            {cat.id === 'Règle' && (
                                                <div className="flex gap-2 p-2 bg-white/5 rounded-xl border border-white/5 mb-2">
                                                    <div className="flex-1 flex flex-col gap-1">
                                                        <span className="text-[8px] font-black uppercase text-white/30 ml-1">Durée (tours)</span>
                                                        <div className="flex gap-1 flex-wrap">
                                                            {[1, 2, 3, 5, 10, 999].map(t => (
                                                                <button
                                                                    key={String(t)}
                                                                    onClick={(e) => { e.stopPropagation(); setEditValues(v => ({ ...v, duration: t })); }}
                                                                    className={`px-2 py-1 rounded text-[8px] font-black transition-all ${editValues.duration === t ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                                                                >
                                                                    {t === 999 ? '∞' : `${t}T`}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {cat.id === 'Dés' && (
                                                <div className="flex flex-col gap-3 p-3 bg-white/5 rounded-xl border border-white/10 mb-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[9px] font-black uppercase text-white/40">Lancers</span>
                                                        <div className="flex gap-1">
                                                            {[1, 2, 3].map(num => (
                                                                <button
                                                                    key={num}
                                                                    onClick={(e) => { e.stopPropagation(); setEditValues(v => ({ ...v, rollCount: num })); }}
                                                                    className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-black ${editValues.rollCount === num ? 'bg-white text-black' : 'bg-white/5 text-white/40'}`}
                                                                >
                                                                    {num}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <button
                                                onClick={saveEditing}
                                                className="w-full bg-white text-black py-2 rounded-lg text-[10px] font-black uppercase flex items-center justify-center gap-2"
                                            >
                                                <Save size={14} /> Enregistrer
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3 flex-1 overflow-hidden" onClick={() => onToggleChallenge(challenge.id)}>
                                                    <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border transition-all ${!disabledChallengeIds.includes(challenge.id) ? 'bg-white border-white' : 'border-white/10'}`}>
                                                        {!disabledChallengeIds.includes(challenge.id) && <Check size={12} className="text-black" strokeWidth={4} />}
                                                    </div>
                                                    <span className="text-xs font-bold truncate">{challenge.title}</span>
                                                </div>
                                                <div className="flex items-center gap-2 ml-4">
                                                    <button
                                                        onClick={(e) => startEditing(e, challenge)}
                                                        className="w-7 h-7 bg-white/5 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-colors"
                                                    >
                                                        <Edit3 size={14} />
                                                    </button>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[8px] font-black uppercase tracking-tighter opacity-40">PTS</span>
                                                        <input
                                                            type="number"
                                                            value={challenge.points}
                                                            onChange={(e) => onUpdateChallengePoints(challenge.id, e.target.value)}
                                                            className="w-10 bg-white/5 border border-white/10 rounded-lg py-1 px-1 text-center text-[10px] font-black outline-none focus:border-white/20"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 pl-8 mt-1">
                                                <p className="text-[10px] italic opacity-40 overflow-hidden text-ellipsis line-clamp-1 flex-1">"{challenge.text}"</p>
                                                <div className="flex items-center gap-2">
                                                    {challenge.timer && (
                                                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                                                            <span className="text-[8px] font-black uppercase text-amber-500">{challenge.timer}s ⏱️</span>
                                                        </div>
                                                    )}
                                                    {challenge.category === 'Règle' && (
                                                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                                                            <span className="text-[8px] font-black uppercase text-cyan-500">{challenge.duration === 999 ? '∞' : challenge.duration}T 📜</span>
                                                        </div>
                                                    )}
                                                    {cat.id === 'Dés' && (
                                                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/5">
                                                            <span className="text-[8px] font-black uppercase text-white/40">{challenge.rollCount}L 🎲</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                            {isAdding ? (
                                <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                                    <input
                                        autoFocus
                                        placeholder="Titre"
                                        value={newChallenge.title}
                                        onChange={e => setNewChallenge(p => ({ ...p, title: e.target.value }))}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold outline-none"
                                    />
                                    <textarea
                                        placeholder="Instructions"
                                        value={newChallenge.text}
                                        onChange={e => setNewChallenge(p => ({ ...p, text: e.target.value }))}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs outline-none min-h-[60px]"
                                    />
                                    <div className="flex items-center justify-between px-1">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Points rapportés</span>
                                        <input
                                            type="number"
                                            value={newChallenge.points}
                                            onChange={e => setNewChallenge(p => ({ ...p, points: e.target.value }))}
                                            className="w-16 bg-white/5 border border-white/10 rounded-lg py-1.5 px-3 text-center text-xs font-black outline-none"
                                        />
                                    </div>
                                    <div className="flex gap-2 p-2 bg-white/5 rounded-xl border border-white/5 mb-1">
                                        <div className="flex-1 flex flex-col gap-1">
                                            <span className="text-[8px] font-black uppercase text-white/30 ml-1">Chronomètre (sec)</span>
                                            <div className="flex gap-1 flex-wrap">
                                                {[null, 5, 10, 15, 30, 60].map(s => (
                                                    <button
                                                        key={String(s)}
                                                        onClick={() => setNewChallenge(p => ({ ...p, timer: s }))}
                                                        className={`px-2 py-1 rounded text-[8px] font-black transition-all ${newChallenge.timer === s ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                                                    >
                                                        {s === null ? 'AUCUN' : `${s}s`}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {cat.id === 'Règle' && (
                                        <div className="flex gap-2 p-2 bg-white/5 rounded-xl border border-white/5 mb-1">
                                            <div className="flex-1 flex flex-col gap-1">
                                                <span className="text-[8px] font-black uppercase text-white/30 ml-1">Durée (tours)</span>
                                                <div className="flex gap-1 flex-wrap">
                                                    {[1, 2, 3, 5, 10, 999].map(t => (
                                                        <button
                                                            key={String(t)}
                                                            onClick={() => setNewChallenge(p => ({ ...p, duration: t }))}
                                                            className={`px-2 py-1 rounded text-[8px] font-black transition-all ${newChallenge.duration === t ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                                                        >
                                                            {t === 999 ? '∞' : `${t}T`}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {cat.id === 'Dés' && (
                                        <div className="flex gap-2 p-2 bg-white/5 rounded-xl border border-white/5">
                                            <div className="flex-1 flex flex-col gap-1">
                                                <span className="text-[8px] font-black uppercase text-white/30 ml-1">Nombre de lancers</span>
                                                <div className="flex gap-1">
                                                    {[1, 2, 3].map(num => (
                                                        <button
                                                            key={num}
                                                            onClick={() => setNewChallenge(p => ({ ...p, rollCount: num }))}
                                                            className={`flex-1 py-1 rounded text-[10px] font-black ${newChallenge.rollCount === num ? 'bg-white text-black' : 'bg-white/5 text-white/40'}`}
                                                        >
                                                            {num}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex gap-2 pt-2">
                                        <button onClick={() => setIsAdding(false)} className="flex-1 bg-white/5 py-2 rounded-xl text-[10px] font-black uppercase">Annuler</button>
                                        <button onClick={handleAdd} className="flex-1 bg-white text-black py-2 rounded-xl text-[10px] font-black uppercase">Ajouter</button>
                                    </div>
                                </div>
                            ) : (
                                <button onClick={() => setIsAdding(true)} className="w-full py-3 border border-dashed border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/20 flex items-center justify-center gap-2"><Plus size={14} /> Ajouter un défi</button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
});

export default function GameSelectionScreen({
    isOpen, onClose, selectedCategories, onToggleCategory,
    allChallenges = [], disabledChallengeIds = [], onToggleChallenge, onAddChallenge, onUpdateChallengePoints, onUpdateChallengeDetails
}) {
    const [expandedCategory, setExpandedCategory] = React.useState(null);

    // Memoize challenges by category
    const challengesByCategory = useMemo(() => {
        return CATEGORY_DATA.reduce((acc, cat) => {
            acc[cat.id] = allChallenges.filter(c => c.category === cat.id);
            return acc;
        }, {});
    }, [allChallenges]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-xl p-6"
                >
                    <div className="flex-1 overflow-y-auto max-w-sm mx-auto w-full pt-12 pb-32 custom-scrollbar">
                        <header className="mb-12 text-center">
                            <h2 className="text-4xl font-black italic tracking-tighter text-white mb-2 uppercase">L'Atelier</h2>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Personnalisez vos défis</p>
                        </header>

                        <div className="space-y-4">
                            {CATEGORY_DATA.map((cat) => (
                                <CategoryCard
                                    key={cat.id}
                                    cat={cat}
                                    isSelected={selectedCategories.includes(cat.id)}
                                    isExpanded={expandedCategory === cat.id}
                                    challenges={challengesByCategory[cat.id] || []}
                                    disabledChallengeIds={disabledChallengeIds}
                                    onToggleCategory={onToggleCategory}
                                    onExpand={setExpandedCategory}
                                    onToggleChallenge={onToggleChallenge}
                                    onAddChallenge={onAddChallenge}
                                    onUpdateChallengePoints={onUpdateChallengePoints}
                                    onUpdateChallengeDetails={onUpdateChallengeDetails}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="absolute bottom-10 left-6 right-6 z-10">
                        <button
                            onClick={onClose}
                            className="w-full max-w-sm mx-auto flex items-center justify-center gap-3 bg-white text-black py-6 rounded-[2rem] font-black text-xl italic uppercase tracking-tighter shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            Valider les jeux <ArrowRight size={24} strokeWidth={3} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

CategoryCard.displayName = 'CategoryCard';
