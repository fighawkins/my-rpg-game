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
    description: string; // New field for description
};

export const speciesOptions: Species[] = [
    {
        name: 'Mouse',
        image: '/images/mouse.webp',
        baseStats: {
            strength: 7,
            dexterity: 8,
            constitution: 5,
            intelligence: 6,
            wisdom: 6,
            charisma: 6,
        },
        abilities: [
            { name: 'Nimble Dodge', description: 'Quickly dodge an incoming attack.' }
        ],
        description: 'Mice are brave, clever, and resourceful. They are known for their sense of community, strong moral values, and willingness to stand up against evil. Mice are small but mighty. They value friendship, loyalty, and courage, and are often leaders, warriors, and protectors of their homes.'
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
        description: ' Badgers are strong, noble, and wise creatures. Known for their bravery and fierce loyalty, Badgers have a natural authority and command respect from other creatures. They are usually associated with the role of warriors or guardians, badgers are also known for their deep sense of honor and justice, and they are formidable in battle'
    },
    {
        name: 'Hare',
        image: '/images/rabbit.webp',
        baseStats: {
            strength: 5,
            dexterity: 10,
            constitution: 6,
            intelligence: 4,
            wisdom: 5,
            charisma: 8,
        },
        abilities: [
            { name: 'Quick Reflexes', description: 'Instantly react to danger, gaining a temporary boost in dodge and initiative for one turn.' }
        ],
        description: 'Hares are known for their insatiable appetites, boundless energy, and strong sense of duty and loyalty, with a penchant for humor and a love for adventure.'
    },
];
