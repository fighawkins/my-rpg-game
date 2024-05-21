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

export const shields: Item[] = [
    {
        name: 'Wooden Shield',
        type: 'shield',
        description: 'A sturdy wooden shield.',
        weight: 6,
        equippable: true,
        slot: 'off_hand',
        attributes: {
            armorBonus: 2,
        },
    },
    {
        name: 'Iron Shield',
        type: 'shield',
        description: 'A strong iron shield.',
        weight: 10,
        equippable: true,
        slot: 'off_hand',
        attributes: {
            armorBonus: 3,
        },
    },
];
