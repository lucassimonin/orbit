import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Cube = ({ value, controls }) => {
    return (
        <div className="perspective-1000 w-24 h-24 relative">
            <motion.div
                animate={controls}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                }}
                className="dice-cube"
            >
                {/* Face 1 (Front) */}
                <div className="dice-face front">
                    <div className="dot" />
                </div>
                {/* Face 2 (Back) */}
                <div className="dice-face back">
                    <div className="dot" />
                    <div className="dot" />
                </div>
                {/* Face 3 (Right) */}
                <div className="dice-face right">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                </div>
                {/* Face 4 (Left) */}
                <div className="dice-face left">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                </div>
                {/* Face 5 (Top) */}
                <div className="dice-face top">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                </div>
                {/* Face 6 (Bottom) */}
                <div className="dice-face bottom">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                </div>
            </motion.div>
        </div>
    );
};

const Dice3D = ({ onRollComplete, rollCount = 1 }) => {
    const [isRolling, setIsRolling] = useState(false);
    const [results, setResults] = useState([]);
    const [currentRotation, setCurrentRotation] = useState({ x: 0, y: 0, z: 0 });

    const controls = useAnimation();

    const getRotationForValue = (value) => {
        switch (value) {
            case 1: return { x: 0, y: 0 };
            case 2: return { x: 0, y: 180 };
            case 3: return { x: 0, y: -90 };
            case 4: return { x: 0, y: 90 };
            case 5: return { x: -90, y: 0 };
            case 6: return { x: 90, y: 0 };
            default: return { x: 0, y: 0 };
        }
    };

    const roll = async () => {
        if (isRolling || results.length >= rollCount) return;
        setIsRolling(true);

        const result = Math.floor(Math.random() * 6) + 1;
        const targetRotation = getRotationForValue(result);

        // Calculate a rotation that feels like it's spinning randomly but ends on the target
        const extraSpins = {
            x: (Math.floor(Math.random() * 3) + 2) * 360,
            y: (Math.floor(Math.random() * 3) + 2) * 360,
            z: (Math.floor(Math.random() * 2) + 1) * 360
        };

        const finalRotation = {
            x: targetRotation.x + extraSpins.x,
            y: targetRotation.y + extraSpins.y,
            z: extraSpins.z
        };

        await controls.start({
            rotateX: [currentRotation.x, finalRotation.x],
            rotateY: [currentRotation.y, finalRotation.y],
            rotateZ: [currentRotation.z, finalRotation.z],
            scale: [1, 1.2, 1],
            transition: {
                duration: 1.2,
                ease: "easeOut"
            }
        });

        const newResults = [...results, result];
        setResults(newResults);
        setCurrentRotation(targetRotation); // Reset to base rotation for next logic (simplified)
        // Actually, we should keep the absolute rotation to avoid "snapping" back to 0
        setCurrentRotation(finalRotation);

        setIsRolling(false);
        if (onRollComplete) {
            onRollComplete(newResults);
        }
    };

    const finished = results.length >= rollCount;

    return (
        <div className="flex flex-col items-center gap-10 py-8">
            <div className="flex justify-center">
                <Cube controls={controls} />
            </div>

            <div className="space-y-4 w-full">
                <button
                    onClick={roll}
                    disabled={isRolling || finished}
                    className={`w-full py-4 rounded-2xl font-black uppercase italic tracking-tighter transition-all shadow-2xl ${isRolling || finished
                        ? 'bg-white/5 text-white/20 cursor-not-allowed'
                        : 'bg-white text-black hover:scale-105 active:scale-95'
                        }`}
                >
                    {isRolling ? 'Lancement...' : finished ? 'Lancers terminés' : results.length > 0 ? `Lancer le dé (${results.length + 1}/${rollCount}) 🎲` : 'Lancer le dé 🎲'}
                </button>

                {results.length > 0 && (
                    <div className="flex justify-center gap-3">
                        {results.map((res, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0, y: 10 }}
                                animate={{ scale: 1, y: 0 }}
                                className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-black italic text-lg"
                            >
                                {res}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dice3D;
