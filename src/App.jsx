import React, { useState, useCallback, useMemo, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import VerticalSlotWheel from './components/VerticalSlotWheel';
import ActionModal from './components/ActionModal';
import CosmicBackground from './components/CosmicBackground';
import TopHUD from './components/TopHUD';
import BottomDashboard from './components/BottomDashboard';
import { CHALLENGES } from './data/challenges';
import { Trophy, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PodiumScreen from './components/PodiumScreen'; // Added import

function App() {
  const [gameState, setGameState] = useState('home');
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [resultIndex, setResultIndex] = useState(0);

  // Age Verification
  const [isAgeVerified, setIsAgeVerified] = useState(() => {
    return localStorage.getItem('orbit_age_verified') === 'true';
  });

  // Game Configuration State
  const [gameConfig, setGameConfig] = useState(() => {
    const saved = localStorage.getItem('orbit_game_config');
    return saved ? JSON.parse(saved) : { maxRounds: 5, targetPoints: 100 };
  });
  const [currentRound, setCurrentRound] = useState(1);

  const [allChallenges, setAllChallenges] = useState(() => {
    const saved = localStorage.getItem('orbit_challenges');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with default CHALLENGES to ensure new official challenges appear
        // but keep custom ones and modified ones
        const customChallenges = parsed.filter(pc => !CHALLENGES.find(oc => oc.id === pc.id));
        const modifiedOfficial = CHALLENGES.map(oc => {
          const stored = parsed.find(pc => pc.id === oc.id);
          return stored ? { ...oc, ...stored } : oc;
        });
        return [...modifiedOfficial, ...customChallenges];
      } catch (e) {
        return CHALLENGES;
      }
    }
    return CHALLENGES;
  });

  const [disabledChallengeIds, setDisabledChallengeIds] = useState(() => {
    const saved = localStorage.getItem('orbit_disabled_challenges');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeRules, setActiveRules] = useState([]);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('orbit_challenges', JSON.stringify(allChallenges));
  }, [allChallenges]);

  useEffect(() => {
    localStorage.setItem('orbit_disabled_challenges', JSON.stringify(disabledChallengeIds));
  }, [disabledChallengeIds]);

  useEffect(() => {
    localStorage.setItem('orbit_game_config', JSON.stringify(gameConfig));
  }, [gameConfig]);

  const startGame = (initialPlayers, config) => {
    setPlayers(initialPlayers);
    setGameConfig(config || { maxRounds: 5, targetPoints: 100, selectedCategories: ['Shot', 'Gage', 'Règle', 'Défis', 'Chance'] });
    setGameState('playing');
    setCurrentPlayerIndex(0);
    setCurrentRound(1);
    setActiveRules([]); // Reset active rules when starting a new game
  };

  const filteredChallenges = useMemo(() => {
    const cats = gameConfig.selectedCategories || ['Shot', 'Gage', 'Règle', 'Défis', 'Chance'];
    return allChallenges.filter(c =>
      cats.includes(c.category) && !disabledChallengeIds.includes(c.id)
    );
  }, [gameConfig.selectedCategories, allChallenges, disabledChallengeIds]);

  const toggleChallenge = (id) => {
    setDisabledChallengeIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const addCustomChallenge = (challenge) => {
    setAllChallenges(prev => [...prev, {
      ...challenge,
      id: Date.now(),
      points: challenge.points || 10
    }]);
  };

  const updateChallengePoints = (id, points) => {
    setAllChallenges(prev => prev.map(c =>
      c.id === id ? { ...c, points: parseInt(points) || 0 } : c
    ));
  };

  const updateChallengeDetails = (id, updates) => {
    setAllChallenges(prev => prev.map(c =>
      c.id === id ? { ...c, ...updates } : c
    ));
  };

  const handleSpin = useCallback(() => {
    if (isSpinning || isModalOpen || filteredChallenges.length === 0) return;

    // Pick a random result from filtered list
    const newResult = Math.floor(Math.random() * filteredChallenges.length);
    setResultIndex(newResult);
    setIsSpinning(true);
  }, [isSpinning, isModalOpen, filteredChallenges]);

  const onSpinFinish = () => {
    setIsSpinning(false);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 500);
  };

  const completeAction = (ruleText) => {
    let targetReached = false;
    const currentPointsToAdd = currentChallenge?.points || 10;

    // Handle Active Rules update
    setActiveRules(prevRules => {
      // 1. Decrement existing rules
      const updatedRules = prevRules.map(rule => ({
        ...rule,
        remainingTurns: rule.remainingTurns - 1
      })).filter(rule => rule.remainingTurns > 0);

      // 2. Add new rule if applicable
      if (currentChallenge?.category === 'Règle' && ruleText) {
        updatedRules.push({
          id: `rule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          text: ruleText,
          remainingTurns: currentChallenge.duration || 3, // Use configured duration
          playerName: players[currentPlayerIndex].name
        });
      }

      return updatedRules;
    });

    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers];
      const newPoints = (newPlayers[currentPlayerIndex].points || 0) + currentPointsToAdd;

      newPlayers[currentPlayerIndex] = {
        ...newPlayers[currentPlayerIndex],
        points: newPoints
      };

      if (newPoints >= gameConfig.targetPoints) {
        targetReached = true;
      }

      return newPlayers;
    });

    setIsModalOpen(false);

    // Check if game should end
    if (targetReached) {
      setTimeout(() => setGameState('podium'), 1000);
      return;
    }

    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;

    // Check if a new round started
    if (nextPlayerIndex === 0) {
      if (currentRound >= gameConfig.maxRounds) {
        setTimeout(() => setGameState('podium'), 1000);
        return;
      }
      setCurrentRound(prev => prev + 1);
    }

    setCurrentPlayerIndex(nextPlayerIndex);
  };

  const currentChallenge = filteredChallenges[resultIndex];

  const getPlayerRank = (player) => {
    if (!player) return 1;
    const morePoints = players.filter(p => (p.points || 0) > (player.points || 0)).length;
    return morePoints + 1;
  };

  const getRankLabel = (rank) => {
    if (rank === 1) return '1ER';
    return `${rank}ÈME`;
  };

  const currentRank = getPlayerRank(players[currentPlayerIndex]);
  const rankLabel = getRankLabel(currentRank);

  const resetGame = () => {
    setGameState('home');
    setPlayers([]);
    setActiveRules([]);
  };

  const handleEndGame = () => {
    setGameState('podium');
  };

  if (!isAgeVerified) {
    return (
      <div className="fixed inset-0 bg-[#05050a] text-white flex items-center justify-center p-6 z-50">
        <CosmicBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#0f0f15]/90 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <span className="text-3xl font-black italic text-red-500">-18</span>
          </div>

          <h2 className="text-3xl font-black italic mb-3">Attention</h2>
          <p className="text-white/60 mb-6 font-medium">
            L'abus d'alcool est dangereux pour la santé, à consommer avec modération.<br /><br />
            Avez-vous plus de 18 ans pour accéder à cette application ?
          </p>

          <div className="bg-black/30 border border-white/5 rounded-xl p-4 mb-8 text-left h-32 overflow-y-auto custom-scrollbar">
            <h3 className="text-white/80 font-bold text-[10px] uppercase tracking-wider mb-2">Clause de Non-Responsabilité</h3>
            <p className="text-white/40 text-[10px] leading-relaxed mb-3">
              Cette application est un divertissement. Ses créateurs ne sauraient être tenus responsables des conséquences liées à la consommation d'alcool des utilisateurs. Vos choix vous appartiennent.
            </p>
            <div className="bg-white/5 rounded-lg p-2.5 flex items-start gap-3 border border-white/5">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 text-cyan-500 font-black italic text-xs">
                SAM
              </div>
              <p className="text-white/60 text-[9px] leading-tight pt-0.5">
                <strong>Ne forcez personne à boire.</strong><br />Ne prenez jamais le volant après avoir consommé de l'alcool. Celui qui conduit, c'est celui qui ne boit pas.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                localStorage.setItem('orbit_age_verified', 'true');
                setIsAgeVerified(true);
              }}
              className="w-full bg-white text-black font-black italic rounded-xl py-4 uppercase transition-transform active:scale-95"
            >
              Oui, j'ai plus de 18 ans
            </button>
            <button
              onClick={() => window.location.href = 'https://www.google.com'}
              className="w-full bg-white/5 text-white/50 border border-white/10 font-bold italic rounded-xl py-4 transition-transform active:scale-95 hover:bg-white/10 hover:text-white"
            >
              Non, je suis mineur
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#05050a] text-white selection:bg-cyan-500/30 overflow-hidden font-sans select-none" style={{ position: 'fixed', inset: 0, background: '#05050a', color: 'white', overflow: 'hidden' }}>
      <CosmicBackground />

      <AnimatePresence mode="wait">
        {gameState === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-10"
            style={{ position: 'absolute', inset: 0, zIndex: 10 }}
          >
            <HomeScreen
              onStartGame={startGame}
              initialConfig={gameConfig}
              allChallenges={allChallenges}
              disabledChallengeIds={disabledChallengeIds}
              onToggleChallenge={toggleChallenge}
              onAddChallenge={addCustomChallenge}
              onUpdateChallengePoints={updateChallengePoints}
              onUpdateChallengeDetails={updateChallengeDetails}
            />
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10 flex flex-col"
            style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column' }}
          >
            <header
              className="w-full flex-shrink-0"
              style={{
                width: '100%',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.5rem)',
                paddingBottom: '0.5rem',
                flexShrink: 0
              }}
            >
              <TopHUD
                player={players[currentPlayerIndex]}
                rankLabel={rankLabel}
                currentRound={currentRound}
                maxRounds={gameConfig.maxRounds}
                targetPoints={gameConfig.targetPoints}
                activeRules={activeRules}
              />
            </header>

            {/* Main Interactive Center (Vertical Slot Machine) */}
            <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-6" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
              <div className="w-full max-w-[500px]" style={{ width: '100%', position: 'relative' }}>
                <VerticalSlotWheel
                  isSpinning={isSpinning}
                  resultIndex={resultIndex}
                  challenges={filteredChallenges}
                  onFinish={onSpinFinish}
                />
              </div>
            </main>

            {/* Bottom Section */}
            <footer
              className="w-full flex-shrink-0"
              style={{
                width: '100%',
                flexShrink: 0,
                paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)'
              }}
            >
              <BottomDashboard
                onSpin={handleSpin}
                disabled={isModalOpen}
                isSpinning={isSpinning}
                label="LANCER LE SLOT"
                onEndGame={handleEndGame}
              />
            </footer>

            <ActionModal
              isOpen={isModalOpen}
              challenge={currentChallenge}
              playerName={players[currentPlayerIndex].name}
              onComplete={(ruleText) => completeAction(ruleText)}
            />
          </motion.div>
        )}

        {gameState === 'podium' && (
          <motion.div
            key="podium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <PodiumScreen
              players={players}
              onHome={resetGame}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Prevention Message */}
      <div className="fixed bottom-0 inset-x-0 pb-1 pt-4 text-center pointer-events-none z-50 bg-gradient-to-t from-[#05050a] to-transparent">
        <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest px-4 leading-tight">
          L'abus d'alcool est dangereux pour la santé, à consommer avec modération.
        </p>
      </div>
    </div>
  );
}

export default App;

