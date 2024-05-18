// src/data/classes.ts

export type Ability = {
    name: string;
    description: string;
};

export type Spell = {
    name: string;
    description: string;
};

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
    abilities: Ability[];
    spells: Spell[];
    statModifiers: Stats;
    species: {
        [key: string]: {
            maleImage: string;
            femaleImage: string;
        };
    };
};

export const classOptions: Class[] = [
    {
        name: 'Warrior',
        abilities: [
            { name: 'Extra Attack', description: 'Perform an additional attack.' },
        ],
        spells: [],
        statModifiers: {
            strength: 2,
            dexterity: 1,
            constitution: 2,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
        },
        species: {
            Mouse: {
                maleImage: '/images/mouse_warrior_male.webp',
                femaleImage: '/images/mouse_warrior_female.webp',
            },
            Badger: {
                maleImage: '/images/badger_warrior_male.webp',
                femaleImage: '/images/badger_warrior_female.png',
            },
            Rabbit: {
                maleImage: '/images/rabbit_warrior_male.webp',
                femaleImage: '/images/rabbit_warrior_female.webp',
            },
        },
    },
    {
        name: 'Healer',
        abilities: [],
        spells: [
            { name: 'Prayer', description: 'Heal minor wounds with a prayer.' },
        ],
        statModifiers: {
            strength: 0,
            dexterity: 0,
            constitution: 1,
            intelligence: 1,
            wisdom: 2,
            charisma: 0,
        },
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
    },
    {
        name: 'Ranger',
        abilities: [
            { name: 'Tracking', description: 'Track enemies or animals.' },
        ],
        spells: [
            { name: 'Talk with Animals', description: 'Communicate with animals.' },
        ],
        statModifiers: {
            strength: 1,
            dexterity: 2,
            constitution: 1,
            intelligence: 0,
            wisdom: 1,
            charisma: 0,
        },
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
    },
];
