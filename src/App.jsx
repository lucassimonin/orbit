import React, { useState, useCallback, useMemo } from 'react';
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

  // Game Configuration State
  const [gameConfig, setGameConfig] = useState({
    maxRounds: 5,
    targetPoints: 100
  });
  const [currentRound, setCurrentRound] = useState(1);
  const [allChallenges, setAllChallenges] = useState(CHALLENGES);
  const [disabledChallengeIds, setDisabledChallengeIds] = useState([]);
  const [activeRules, setActiveRules] = useState([]);

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

  // New function to handle ending the game and going to podium
  const handleEndGame = () => {
    setGameState('podium');
  };

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
            <header className="w-full p-4 flex-shrink-0" style={{ width: '100%', padding: '1rem', flexShrink: 0 }}>
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
            <footer className="w-full flex-shrink-0 pb-8" style={{ width: '100%', flexShrink: 0 }}>
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
    </div>
  );
}

export default App;

