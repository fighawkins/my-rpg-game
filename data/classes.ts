import { Stats } from "./species";

// src/data/classes.ts
export type Ability = {
    name: string;
    description: string;
};

export type Spell = {
    name: string;
    description: string;
};

export type Class = {
    name: string;
    description: string; // Added description property
    startingHP: number;
    startingMP: number;
    abilities: Ability[];
    spells: Spell[];
    species: {
        [key: string]: {
            maleImage: string;
            femaleImage: string;
        };
    };
    statModifiers: Stats;
    startingItems: string[];
};

export const classOptions: Class[] = [
    {
        name: 'Warrior',
        startingHP: 20,
        startingMP: 10,
        description: 'Warriors are the frontline defenders, known for their strength and bravery. They excel in combat and are equipped to handle the toughest foes with sheer power and resilience.',
        abilities: [
            { name: 'Extra Attack', description: 'Perform an additional attack.' },
        ],
        spells: [],
        species: {
            Mouse: {
                maleImage: '/images/mouse_warrior_male.webp',
                femaleImage: '/images/mouse_warrior_female.webp',
            },
            Badger: {
                maleImage: '/images/badger_warrior_male.webp',
                femaleImage: '/images/badger_warrior_female.webp',
            },
            Rabbit: {
                maleImage: '/images/rabbit_warrior_male.webp',
                femaleImage: '/images/rabbit_warrior_female.webp',
            },
        },
        statModifiers: {
            strength: 3,
            dexterity: 1,
            constitution: 2,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
        },
        startingItems: ['Sword', 'Shield', 'Leather Armor'],
    },
    {
        name: 'Healer',
        startingHP: 15,
        startingMP: 20,
        description: 'Healers are the protectors and caretakers, using their wisdom and knowledge to mend wounds and cure ailments. They are invaluable in keeping their allies in fighting shape through their spells and remedies.',
        abilities: [],
        spells: [
            { name: 'Prayer', description: 'Heal minor wounds with a prayer.' },
        ],
        species: {
            Mouse: {
                maleImage: '/images/mouse_healer_male.webp',
                femaleImage: '/images/mouse_healer_female.webp',
            },
            Badger: {
                maleImage: '/images/badger_healer_male.webp',
                femaleImage: '/images/badger_healer_female.webp',
            },
            Rabbit: {
                maleImage: '/images/rabbit_healer_male.webp',
                femaleImage: '/images/rabbit_healer_female.webp',
            },
        },
        statModifiers: {
            strength: 0,
            dexterity: 0,
            constitution: 1,
            intelligence: 2,
            wisdom: 3,
            charisma: 0,
        },
        startingItems: ['Prayer Book', 'Healing Herbs', 'Bandages'],
    },
    {
        name: 'Ranger',
        startingHP: 18,
        startingMP: 12,
        description: 'Rangers are the agile and perceptive scouts, excelling in tracking and surviving in the wilderness. They are skilled with bows and have a deep connection with nature, able to communicate with animals and navigate the wilds with ease.',
        abilities: [
            { name: 'Tracking', description: 'Track enemies or animals.' },
        ],
        spells: [
            { name: 'Talk with Animals', description: 'Communicate with animals.' },
        ],
        species: {
            Mouse: {
                maleImage: '/images/mouse_ranger_male.webp',
                femaleImage: '/images/mouse_ranger_female.webp',
            },
            Badger: {
                maleImage: '/images/badger_ranger_male.webp',
                femaleImage: '/images/badger_ranger_female.webp',
            },
            Rabbit: {
                maleImage: '/images/rabbit_ranger_male.webp',
                femaleImage: '/images/rabbit_ranger_female.webp',
            },
        },
        statModifiers: {
            strength: 1,
            dexterity: 3,
            constitution: 0,
            intelligence: 0,
            wisdom: 1,
            charisma: 1,
        },
        startingItems: ['Bow & Quiver', 'Arrows', 'Cloak'],
    },
];
