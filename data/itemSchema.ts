// itemSchema.ts

// Define the possible item types.
export type ItemType = 'weapon' | 'armor' | 'shield' | 'consumable' | 'misc';

// Define the structure of an item.
export type Item = {
    name: string;
    type: ItemType;
    description: string;
    weight: number;
    handedness?: 'one-handed' | 'two-handed';
    equippable: boolean;
    slot?: 'main_hand' | 'off_hand' | 'body' | 'head' | 'legs' | 'feet' | 'ring' | 'necklace';
    attributes?: {
        damage?: string;
        armorClass?: number;
        effect?: string;
        duration?: number;
        [key: string]: any;
    };
};

// Predefined items for different categories
export const items: Item[] = [
    // Predefined weapons
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
    // Predefined armor
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
    // Predefined consumables
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
    // Predefined miscellaneous items
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
];

// Function to classify items based on their description.
export const classifyItem = (name: string, description: string): Item => {
    if (description.toLowerCase().includes('blade') || description.toLowerCase().includes('sword') || description.toLowerCase().includes('dagger')) {
        return {
            name,
            type: 'weapon',
            description,
            weight: 2,
            handedness: 'one-handed',
            equippable: true,
            slot: 'main_hand',
            attributes: {
                damage: '1d6',
            },
        };
    } else if (description.toLowerCase().includes('armor') || description.toLowerCase().includes('robes')) {
        return {
            name,
            type: 'armor',
            description,
            weight: 15,
            equippable: true,
            slot: 'body',
            attributes: {
                armorClass: 10,
            },
        };
    } else if (description.toLowerCase().includes('potion')) {
        return {
            name,
            type: 'consumable',
            description,
            weight: 0.5,
            equippable: false,
            attributes: {
                effect: 'heal',
                duration: 0,
            },
        };
    } else {
        return {
            name,
            type: 'misc',
            description,
            weight: 1,
            equippable: false,
        };
    }
};
