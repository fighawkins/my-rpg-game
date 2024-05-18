export type Stats = {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
};

export type Species = {
    name: string;
    image: string;
    baseStats: Stats;
    abilities: { name: string; description: string }[];
};

export const speciesOptions: Species[] = [
    {
        name: 'Mouse',
        image: '/images/mouse.webp',
        baseStats: {
            strength: 4,
            dexterity: 10,
            constitution: 4,
            intelligence: 6,
            wisdom: 6,
            charisma: 6,
        },
        abilities: [
            { name: 'Nimble Dodge', description: 'Quickly dodge an incoming attack.' }
        ],
    },
    {
        name: 'Badger',
        image: '/images/badger.webp',
        baseStats: {
            strength: 10,
            dexterity: 4,
            constitution: 8,
            intelligence: 5,
            wisdom: 5,
            charisma: 6,
        },
        abilities: [
            { name: 'Roar', description: 'A powerful roar that intimidates enemies.' }
        ],
    },
    {
        name: 'Rabbit',
        image: '/images/rabbit.webp',
        baseStats: {
            strength: 4,
            dexterity: 10,
            constitution: 4,
            intelligence: 7,
            wisdom: 5,
            charisma: 6,
        },
        abilities: [
            { name: 'Quick Reflexes', description: 'Instantly react to danger, gaining a temporary boost in dodge and initiative for one turn.' }
        ],
    },
];
