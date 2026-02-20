import React, { useState } from 'react';
import { Plus, User, Trash2, ArrowRight, Settings, Gamepad2, Camera, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CosmicBackground from './CosmicBackground';
import GameSelectionScreen from './GameSelectionScreen';

export default function HomeScreen({
    onStartGame,
    allChallenges = [],
    disabledChallengeIds = [],
    onToggleChallenge,
    onAddChallenge,
    onUpdateChallengePoints,
    onUpdateChallengeDetails
}) {
    const [playerName, setPlayerName] = useState('');
    const [players, setPlayers] = useState([]);
    const [maxRounds, setMaxRounds] = useState(5);
    const [targetPoints, setTargetPoints] = useState(100);
    const [selectedCategories, setSelectedCategories] = useState(['Shot', 'Gage', 'Vérité', 'Dés', 'Règle', 'Défis', 'Chance']);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isSelectionOpen, setIsSelectionOpen] = useState(false);
    const fileInputRef = React.useRef(null);

    const categories = ['Shot', 'Gage', 'Vérité', 'Dés', 'Règle', 'Défis', 'Chance'];

    const activeTotal = allChallenges.filter(c =>
        selectedCategories.includes(c.category) && !disabledChallengeIds.includes(c.id)
    ).length;

    // Add missing import for GameSelectionScreen if needed (I'll add it to top)

    const toggleCategory = (cat) => {
        if (selectedCategories.includes(cat)) {
            if (selectedCategories.length > 1) {
                setSelectedCategories(selectedCategories.filter(c => c !== cat));
            }
        } else {
            setSelectedCategories([...selectedCategories, cat]);
        }
    };

    const addPlayer = () => {
        if (playerName.trim() && players.length < 8) {
            setPlayers([...players, {
                id: Date.now(),
                name: playerName.trim(),
                position: 0,
                points: 0,
                color: getRandomNeonColor(),
                image: selectedImage
            }]);
            setPlayerName('');
            setSelectedImage(null);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removePlayer = (id) => {
        setPlayers(players.filter(p => p.id !== id));
    };

    const getRandomNeonColor = () => {
        const colors = ['#00ffff', '#ff00a5', '#ffcc00', '#bc13fe', '#32cd32'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className="relative h-[100dvh] flex flex-col items-center justify-start pt-20 pb-20 p-6 bg-black overflow-y-auto font-sans custom-scrollbar touch-pan-y">
            <CosmicBackground />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16 z-10"
            >
                <h1 className="text-6xl font-black italic tracking-tighter text-white mb-2 uppercase">
                    ORBIT
                </h1>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Configuration</p>
            </motion.div>

            {/* Configuration Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md z-10 relative px-2"
            >
                <div className="relative mb-10 group">
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                                placeholder="Nom du joueur"
                                className="w-full h-16 bg-white/[0.05] border border-white/10 rounded-2xl px-6 outline-none focus:border-white/20 transition-all font-bold text-sm placeholder:text-white/22"
                            />
                            <button
                                onClick={addPlayer}
                                className="absolute right-2 top-2 bottom-2 aspect-square bg-white text-black rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl"
                            >
                                <Plus size={20} strokeWidth={3} />
                            </button>
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            capture="user"
                            className="hidden"
                        />

                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className={`w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center transition-all border ${selectedImage ? 'bg-cyan-500 border-cyan-400' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                        >
                            {selectedImage ? (
                                <img src={selectedImage} alt="Preview" className="w-12 h-12 rounded-lg object-cover shadow-lg" />
                            ) : (
                                <Camera size={24} className="text-white/40" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="space-y-4 mb-10 max-h-[25vh] overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence mode="popLayout">
                        {players.map((player) => (
                            <motion.div
                                key={player.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex items-center justify-between bg-white/[0.03] p-3 rounded-2xl border border-white/5 relative group"
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black italic text-white shadow-2xl relative overflow-hidden"
                                        style={{ backgroundColor: player.image ? 'transparent' : player.color }}
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
                                    <span className="font-bold text-base text-white/90 tracking-tight">{player.name}</span>
                                </div>
                                <button
                                    onClick={() => removePlayer(player.id)}
                                    className="bg-white/5 p-2 rounded-lg text-white/20 hover:text-white transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {players.length === 0 && (
                        <p className="text-center py-10 text-white/20 font-bold italic tracking-wide">Ajoutez vos fêtards</p>
                    )}
                </div>

                {/* Configuration Settings */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Tours</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={maxRounds}
                                onChange={(e) => setMaxRounds(Math.max(1, parseInt(e.target.value) || 0))}
                                className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/20 transition-all font-black text-center"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Points</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={targetPoints}
                                onChange={(e) => setTargetPoints(Math.max(10, parseInt(e.target.value) || 0))}
                                className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/20 transition-all font-black text-center"
                            />
                        </div>
                    </div>
                </div>

                {/* Game Selection */}
                <div className="mb-10">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 ml-2 mb-3 block">Choix des jeux</label>
                    <button
                        onClick={() => setIsSelectionOpen(true)}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex items-center justify-between group hover:border-white/20 transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:scale-110 transition-transform">
                                <Gamepad2 size={20} />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-bold text-white/90">{activeTotal} défis actifs</p>
                                <p className="text-[10px] font-black uppercase tracking-wider text-white/20">Cliquer pour régler</p>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white/20">
                            <ArrowRight size={20} />
                        </div>
                    </button>
                    {/* Tiny summary tags */}
                    <div className="flex flex-wrap gap-2 mt-3 ml-2">
                        {selectedCategories.map(cat => (
                            <span key={cat} className="text-[8px] font-black uppercase tracking-widest text-white/20">
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>

                <GameSelectionScreen
                    isOpen={isSelectionOpen}
                    onClose={() => setIsSelectionOpen(false)}
                    selectedCategories={selectedCategories}
                    onToggleCategory={toggleCategory}
                    allChallenges={allChallenges}
                    disabledChallengeIds={disabledChallengeIds}
                    onToggleChallenge={onToggleChallenge}
                    onAddChallenge={onAddChallenge}
                    onUpdateChallengePoints={onUpdateChallengePoints}
                    onUpdateChallengeDetails={onUpdateChallengeDetails}
                />

                <button
                    disabled={players.length < 2}
                    onClick={() => onStartGame(players, { maxRounds, targetPoints, selectedCategories })}
                    className={`
            w-full py-6 rounded-[2rem] font-black text-xl italic tracking-tighter flex items-center justify-center gap-4 transition-all
            ${players.length >= 2
                            ? 'bg-white text-black shadow-2xl hover:scale-[1.02] active:scale-95'
                            : 'bg-white/5 text-white/10 cursor-not-allowed border border-white/5'
                        }
          `}
                >
                    LANCER LA PARTIE <ArrowRight size={24} strokeWidth={3} />
                </button>
            </motion.div>

            {/* Footer */}
            <div className="mt-12 z-10 opacity-20 hover:opacity-100 transition-opacity cursor-default">
                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-center max-w-[200px] leading-relaxed">
                    Consommez avec <br /> modération
                </p>
            </div>
        </div>
    );
}
