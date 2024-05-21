import { Item } from './itemSchema';

export const armor: Item[] = [
    {
        name: 'Leather Armor',
        type: 'armor',
        description: 'Basic leather armor.',
        weight: 15,
        equippable: true,
        slot: 'body',
        attributes: {
            armorClass: 11,
        },
    },
    {
        name: 'Robes',
        type: 'armor',
        description: 'Simple protective clothing.',
        weight: 5,
        equippable: true,
        slot: 'body',
        attributes: {
            armorClass: 9,
        },
    },
];



