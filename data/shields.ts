import { Item } from './itemSchema';

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
