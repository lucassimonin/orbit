export const SQUARE_TYPES = {
    START: 'start',
    SHOT: 'shot',
    DISTRIBUTION: 'distribution',
    PARTNER: 'partner',
    THEME: 'theme',
    RIME: 'rime',
    RULE: 'rule',
    BACK: 'back',
    CHANCE: 'chance',
    FINISH: 'finish'
};

export const SQUARES = [
    {
        id: 0,
        type: SQUARE_TYPES.START,
        title: "Départ",
        description: "Tout le monde trinque ! La soirée commence ici.",
        color: "neon-blue"
    },
    {
        id: 1,
        type: SQUARE_TYPES.SHOT,
        title: "Petit Verre",
        description: "Bois 1 gorgée. C'est juste l'échauffement.",
        color: "neon-purple"
    },
    {
        id: 2,
        type: SQUARE_TYPES.DISTRIBUTION,
        title: "Générosité",
        description: "Donne 2 gorgées à la personne de ton choix.",
        color: "neon-pink"
    },
    {
        id: 3,
        type: SQUARE_TYPES.THEME,
        title: "Thème : Marques de Bière",
        description: "Cite une marque de bière. Le premier qui sèche boit 2 gorgées.",
        color: "neon-yellow"
    },
    {
        id: 4,
        type: SQUARE_TYPES.RIME,
        title: "Rime en 'OU'",
        description: "Fais une rime en 'OU'. Celui qui n'en trouve pas boit 2 gorgées.",
        color: "neon-lime"
    },
    {
        id: 5,
        type: SQUARE_TYPES.SHOT,
        title: "Double Shot",
        description: "Bois 2 gorgées. Ça commence à chauffer.",
        color: "neon-purple"
    },
    {
        id: 6,
        type: SQUARE_TYPES.PARTNER,
        title: "Le Binôme",
        description: "Choisis un partenaire. Quand l'un boit, l'autre boit aussi (pendant 3 tours).",
        color: "neon-blue"
    },
    {
        id: 7,
        type: SQUARE_TYPES.RULE,
        title: "Règle d'or",
        description: "Interdit de dire le mot 'MOI' jusqu'à ton prochain tour. Sinon, bois 1 gorgée par oubli.",
        color: "neon-pink"
    },
    {
        id: 8,
        type: SQUARE_TYPES.BACK,
        title: "Mauvaise Pioche",
        description: "Recule de 2 cases. Allez, on y retourne.",
        color: "neon-yellow"
    },
    {
        id: 9,
        type: SQUARE_TYPES.SHOT,
        title: "Le Cascadeur",
        description: "Bois 3 gorgées sans les mains. Challenge !",
        color: "neon-purple"
    },
    {
        id: 10,
        type: SQUARE_TYPES.CHANCE,
        title: "Chance",
        description: "Tout le monde boit sauf toi. Profite !",
        color: "neon-lime"
    },
    {
        id: 11,
        type: SQUARE_TYPES.THEME,
        title: "Thème : Cocktails",
        description: "Cite un cocktail. Tour de table, le perdant boit 3 gorgées.",
        color: "neon-yellow"
    },
    {
        id: 12,
        type: SQUARE_TYPES.DISTRIBUTION,
        title: "Le Père Noël",
        description: "Distribue 5 gorgées comme tu le souhaites.",
        color: "neon-pink"
    },
    {
        id: 13,
        type: SQUARE_TYPES.SHOT,
        title: "Shot de la Mort",
        description: "Bois 1 shot (ou 3 grosses gorgées). Courage !",
        color: "neon-purple"
    },
    {
        id: 14,
        type: SQUARE_TYPES.RULE,
        title: "Le Sourd-Muet",
        description: "Tu n'as plus le droit de parler jusqu'à la fin de ton prochain tour. 1 gorgée par mot dit.",
        color: "neon-pink"
    },
    {
        id: 15,
        type: SQUARE_TYPES.BACK,
        title: "Demi-tour",
        description: "Retourne sur la case 12. Pas de chance !",
        color: "neon-yellow"
    },
    {
        id: 16,
        type: SQUARE_TYPES.SHOT,
        title: "Petit Soif",
        description: "Bois 1 gorgée pour chaque joueur présent.",
        color: "neon-purple"
    },
    {
        id: 17,
        type: SQUARE_TYPES.THEME,
        title: "Thème : Séries TV",
        description: "Donne un nom de série. Le premier qui bug boit 2 gorgées.",
        color: "neon-yellow"
    },
    {
        id: 18,
        type: SQUARE_TYPES.PARTNER,
        title: "Changement de Partenaire",
        description: "Choisis un nouveau partenaire. L'ancien est libéré.",
        color: "neon-blue"
    },
    {
        id: 19,
        type: SQUARE_TYPES.CHANCE,
        title: "Bonus",
        description: "Avance de 3 cases sans faire le gage de la case d'arrivée.",
        color: "neon-lime"
    },
    {
        id: 20,
        type: SQUARE_TYPES.SHOT,
        title: "Hydratation",
        description: "Bois un grand verre d'eau. La sécurité d'abord !",
        color: "neon-purple"
    },
    {
        id: 21,
        type: SQUARE_TYPES.DISTRIBUTION,
        title: "Le Dictateur",
        description: "Choisis une personne qui boira pendant les 3 prochains tours à ta place.",
        color: "neon-pink"
    },
    {
        id: 22,
        type: SQUARE_TYPES.RULE,
        title: "Main Gauche",
        description: "Tu dois boire uniquement de la main gauche jusqu'à la fin. Sinon, 1 gorgée de pénalité.",
        color: "neon-pink"
    },
    {
        id: 23,
        type: SQUARE_TYPES.THEME,
        title: "Thème : Capitales",
        description: "Cite une capitale. Si tu te trompes ou bug, bois 3 gorgées.",
        color: "neon-yellow"
    },
    {
        id: 24,
        type: SQUARE_TYPES.SHOT,
        title: "Sanction",
        description: "Le dernier qui a parlé boit 2 gorgées.",
        color: "neon-purple"
    },
    {
        id: 25,
        type: SQUARE_TYPES.RIME,
        title: "Rime en 'ART'",
        description: "Fais une rime en 'ART'. Le perdant boit 2 gorgées.",
        color: "neon-lime"
    },
    {
        id: 26,
        type: SQUARE_TYPES.BACK,
        title: "Oups !",
        description: "Recule de 3 cases. On ne t'arrête plus !",
        color: "neon-yellow"
    },
    {
        id: 27,
        type: SQUARE_TYPES.SHOT,
        title: "Presque au bout",
        description: "Bois 2 gorgées pour fêter ça.",
        color: "neon-purple"
    },
    {
        id: 28,
        type: SQUARE_TYPES.DISTRIBUTION,
        title: "Le Barman",
        description: "Sers un verre à tout le monde. Ils te disent merci en buvant une gorgée.",
        color: "neon-pink"
    },
    {
        id: 29,
        type: SQUARE_TYPES.FINISH,
        title: "VICTOIRE !",
        description: "Félicitations ! Tu es l'Oie suprême. Tout le monde finit son verre pour t'honorer.",
        color: "neon-lime"
    }
];
