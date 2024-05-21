import { Item } from './itemSchema';

export const items: Item[] = [
    {
        name: 'Torch',
        type: 'misc',
        description: 'Provides light in dark areas.',
        weight: 1,
        equippable: false,
    },
    {
        name: 'Rope',
        type: 'misc',
        description: 'A sturdy rope for climbing or tying.',
        weight: 2,
        equippable: false,
    },
    {
        name: 'Prayer Book',
        type: 'misc',
        description: 'A book of prayers and blessings.',
        weight: 1,
        equippable: false,
    },
    {
        name: 'Healing Potion',
        type: 'consumable',
        description: 'Restores 10 HP.',
        weight: 0.5,
        equippable: false,
        attributes: {
            effect: 'heal',
            duration: 0,
        },
    },
];
