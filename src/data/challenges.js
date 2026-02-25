export const CHALLENGES = [
    { id: 1, type: 'Shot', title: 'CUL SEC', text: 'Prends un shot immédiatement.', color: '#ff00a5', icon: 'GlassWater', category: 'Shot', points: 10 },
    { id: 2, type: 'Give', title: 'GÉNÉREUX', text: 'Distribue 3 gorgées à qui tu veux.', color: '#00ffff', icon: 'Gift', category: 'Gage', points: 10 },
    { id: 3, type: 'Take', title: 'DÉLUGE', text: 'Prends 2 gorgées.', color: '#ffcc00', icon: 'Droplets', category: 'Gage', points: 10 },
    { id: 4, type: 'Rule', title: 'DICTATEUR', text: 'Invente une règle qui dure 3 tours.', color: '#bc13fe', icon: 'Crown', category: 'Règle', points: 10, duration: 3 },
    { id: 5, type: 'Game', title: 'DUEL', text: 'Choisis un adversaire, le premier qui rit boit.', color: '#32cd32', icon: 'Swords', category: 'Défis', points: 10 },
    { id: 6, type: 'Partner', title: 'BINÔME', text: 'Choisis un partenaire. Quand l\'un boit, l\'autre aussi.', color: '#ff6b00', icon: 'Users', category: 'Défis', points: 10 },
    { id: 7, type: 'Shot', title: 'SHAKING', text: 'Tout le monde prend un shot sauf toi.', color: '#ff00a5', icon: 'Zap', category: 'Shot', points: 10 },
    { id: 8, type: 'Give', title: 'CASCADE', text: 'Distribue 5 gorgées.', color: '#00ffff', icon: 'Waves', category: 'Gage', points: 10 },
    { id: 9, type: 'Lucky', title: 'SAUVÉ', text: 'Tu ne bois pas ce tour-ci.', color: '#ffff00', icon: 'Star', category: 'Chance', points: 10 },
    { id: 10, type: 'All', title: 'SANTÉ', text: 'Tout le monde boit une gorgée.', color: '#ffffff', icon: 'Beer', category: 'Gage', points: 10 },
    // Vérités - Standard
    { id: 11, type: 'Vérité', title: 'SECRET', text: 'Quel est ton plus gros dossier de soirée ?', color: '#ff6b00', icon: 'HelpCircle', category: 'Vérité', points: 15 },
    { id: 12, type: 'Vérité', title: 'AVOEUX', text: 'Qui dans cette pièce embrasserais-tu ?', color: '#ff6b00', icon: 'HelpCircle', category: 'Vérité', points: 15 },
    { id: 13, type: 'Vérité', title: 'MESSAGE', text: 'Montre le dernier message envoyé à ton ex.', color: '#ff6b00', icon: 'HelpCircle', category: 'Vérité', points: 20 },
    { id: 14, type: 'Vérité', title: 'HONNÊTE', text: 'Quelle est la chose la plus illégale que tu as faite ?', color: '#ff6b00', icon: 'HelpCircle', category: 'Vérité', points: 15 },
    // Vérités - Hot 🌶️
    { id: 15, type: 'Vérité', title: 'OSÉ 🌶️', text: 'Quelle est ta position préférée ?', color: '#ff0055', icon: 'HelpCircle', category: 'Vérité', points: 30 },
    { id: 16, type: 'Vérité', title: 'FANTASME 🌶️', text: 'Décris ton fantasme le plus inouavable.', color: '#ff0055', icon: 'HelpCircle', category: 'Vérité', points: 30 },
    { id: 17, type: 'Vérité', title: 'TABOU 🌶️', text: 'Quel est l\'endroit le plus insolite où tu l\'as fait ?', color: '#ff0055', icon: 'HelpCircle', category: 'Vérité', points: 30 },
    { id: 18, type: 'Vérité', title: 'DÉSIR 🌶️', text: 'Qui ici trouves-tu le plus sexy ? (Sois honnête !)', color: '#ff0055', icon: 'HelpCircle', category: 'Vérité', points: 40 },
    // Dés
    { id: 19, type: 'Dés', title: 'PAIRE ?', text: 'Lance le dé. Si c\'est pair, tu donnes 5 gorgées. Sinon, bois-les !', color: '#ffffff', icon: 'Dice6', category: 'Dés', points: 15, rollCount: 1 },
    { id: 20, type: 'Dés', title: 'LE 6 TUE', text: 'Lance le dé. Si tu fais 6, tout le monde boit sauf toi. Sinon, bois 2 gorgées.', color: '#ffffff', icon: 'Dice6', category: 'Dés', points: 20, rollCount: 1 },
    { id: 21, type: 'Dés', title: 'CHANCEUX', text: 'Lance le dé. Si tu fais plus de 4, gagne +30 PTS. Sinon, rien !', color: '#ffffff', icon: 'Dice6', category: 'Dés', points: 10, rollCount: 1 },
    { id: 22, type: 'Dés', title: 'DUEL DÉS', text: 'Choisis un adversaire. Lancez chacun un dé. Le plus petit score boit 3 gorgées.', color: '#ffffff', icon: 'Dice6', category: 'Dés', points: 20, rollCount: 2 },
    { id: 23, type: 'Dés', title: 'DICE MULTIPLIER', text: 'Lance le dé et multiplie le score par 2. C\'est le nombre de gorgées à distribuer.', color: '#ffffff', icon: 'Dice6', category: 'Dés', points: 25, rollCount: 1 },
];
