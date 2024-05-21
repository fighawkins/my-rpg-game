import { Ability, abilities } from '@/data/abilities';
import { Item, items } from '@/data/itemSchema';
import { weapons } from '@/data/weapons';
import { armor } from '@/data/armor';
import { Spell, spells } from './spells';
import { shields } from '@/data/shields'; // Updated import for shields

export type Stats = {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
};

export type Class = {
    name: string;
    description: string;
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
    startingWeapons: string[];
    startingArmor: string[];
    startingShields: string[]; // Updated to plural
};

export const classOptions: Class[] = [
    {
        name: 'Warrior',
        startingHP: 20,
        startingMP: 10,
        description: 'Warriors are the frontline defenders, known for their strength and bravery. They excel in combat and are equipped to handle the toughest foes with sheer power and resilience.',
        abilities: [
            abilities.find((ability: { name: string; }) => ability.name === 'Extra Attack')!
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
        startingItems: ['Torch', 'Rope'],
        startingWeapons: ['Sword'],
        startingArmor: ['Leather Armor'],
        startingShields: ['Wooden Shield'] // Updated to plural
    },
    {
        name: 'Healer',
        startingHP: 15,
        startingMP: 20,
        description: 'Healers are the protectors and caretakers, using their wisdom and knowledge to mend wounds and cure ailments. They are invaluable in keeping their allies in fighting shape through their spells and remedies.',
        abilities: [],
        spells: [
            spells.find((spell: { name: string; }) => spell.name === 'Prayer')!
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
        startingItems: ['Prayer Book', 'Healing Potion'],
        startingWeapons: ['Staff'],
        startingArmor: ['Robes'],
        startingShields: [] // Updated to plural
    },
    {
        name: 'Ranger',
        startingHP: 18,
        startingMP: 12,
        description: 'Rangers are the agile and perceptive scouts, excelling in tracking and surviving in the wilderness. They are skilled with bows and have a deep connection with nature, able to communicate with animals and navigate the wilds with ease.',
        abilities: [
            abilities.find((ability: { name: string; }) => ability.name === 'Tracking')!
        ],
        spells: [
            spells.find((spell: { name: string; }) => spell.name === 'Talk with Animals')!
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
        startingItems: ['Torch', 'Rope'],
        startingWeapons: ['Bow & Quiver'],
        startingArmor: ['Leather Armor'],
        startingShields: [] // Updated to plural
    },
];
