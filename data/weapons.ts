import { Item } from './itemSchema';

export const weapons: Item[] = [
    {
        name: 'Sword',
        type: 'weapon',
        description: 'A sharp blade.',
        weight: 3,
        handedness: 'one-handed',
        equippable: true,
        slot: 'main_hand',
        attributes: {
            damage: '1d8',
        },
    },
    {
        name: 'Bow & Quiver',
        type: 'weapon',
        description: 'A ranged weapon.',
        weight: 2,
        handedness: 'two-handed',
        equippable: true,
        slot: 'main_hand',
        attributes: {
            damage: '1d6',
        },
    },
    {
        name: 'Staff',
        type: 'weapon',
        description: 'A wooden staff.',
        weight: 4,
        handedness: 'two-handed',
        equippable: true,
        slot: 'main_hand',
        attributes: {
            damage: '1d4',
        },
    },
    {
        name: 'Dagger',
        type: 'weapon',
        description: 'A short, sharp blade.',
        weight: 1,
        handedness: 'one-handed',
        equippable: true,
        slot: 'main_hand',
        attributes: {
            damage: '1d4',
        },
    },
];
