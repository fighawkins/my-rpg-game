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
    species: {
        [key: string]: {
            maleImage: string;
            femaleImage: string;
            abilities: Ability[];
            spells: Spell[];
        };
    };
};

export const classOptions: Class[] = [
    {
        name: 'Warrior',
        species: {
            Mouse: {
                maleImage: '/images/mouse_warrior_male.webp',
                femaleImage: '/images/mouse_warrior_female.webp',
                abilities: [
                    { name: 'Extra Attack', description: 'Perform an additional attack.' },
                ],
                spells: [],
            },
            Badger: {
                maleImage: '/images/badger_warrior_male.webp',
                femaleImage: '/images/badger_warrior_female.png',
                abilities: [
                    { name: 'Ferocious Roar', description: 'Intimidate enemies with a powerful roar.' },
                ],
                spells: [],
            },
            Rabbit: {
                maleImage: '/images/rabbit_warrior_male.webp',
                femaleImage: '/images/rabbit_warrior_female.webp',
                abilities: [
                    { name: 'Quick Strike', description: 'Perform a quick and agile strike.' },
                ],
                spells: [],
            },
        },
    },
    {
        name: 'Healer',
        species: {
            Mouse: {
                maleImage: '/images/mouse_healer_male.webp',
                femaleImage: '/images/mouse_healer_female.webp',
                abilities: [],
                spells: [
                    { name: 'Prayer', description: 'Heal minor wounds with a prayer.' },
                ],
            },
            Badger: {
                maleImage: '/images/badger_healer_male.webp',
                femaleImage: '/images/badger_healer_female.webp',
                abilities: [],
                spells: [
                    { name: 'Nature\'s Touch', description: 'Heal wounds with the power of nature.' },
                ],
            },
            Rabbit: {
                maleImage: '/images/rabbit_healer_male.webp',
                femaleImage: '/images/rabbit_healer_female.webp',
                abilities: [],
                spells: [
                    { name: 'Herbal Remedy', description: 'Heal wounds using herbal medicine.' },
                ],
            },
        },
    },
    {
        name: 'Ranger',
        species: {
            Mouse: {
                maleImage: '/images/mouse_ranger_male.webp',
                femaleImage: '/images/mouse_ranger_female.webp',
                abilities: [
                    { name: 'Tracking', description: 'Track enemies or animals.' },
                ],
                spells: [
                    { name: 'Talk with Animals', description: 'Communicate with animals.' },
                ],
            },
            Badger: {
                maleImage: '/images/badger_ranger_male.webp',
                femaleImage: '/images/badger_ranger_female.webp',
                abilities: [
                    { name: 'Forest Sense', description: 'Navigate through forests with ease.' },
                ],
                spells: [
                    { name: 'Animal Companion', description: 'Summon a woodland creature to assist you.' },
                ],
            },
            Rabbit: {
                maleImage: '/images/rabbit_ranger_male.webp',
                femaleImage: '/images/rabbit_ranger_female.webp',
                abilities: [
                    { name: 'Stealth', description: 'Move silently and avoid detection.' },
                ],
                spells: [
                    { name: 'Nature\'s Ally', description: 'Call upon the forces of nature for aid.' },
                ],
            },
        },
    },
];
