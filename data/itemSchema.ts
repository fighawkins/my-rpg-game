// itemSchema.ts

// Define the possible item types.
export type ItemType = 'weapon' | 'armor' | 'shield' | 'consumable' | 'misc' | 'head' | 'ring' | 'necklace' | 'cloak';

// Define the possible equippable slots.
export type EquipSlot = 'main_hand' | 'off_hand' | 'body' | 'head' | 'legs' | 'feet' | 'ring' | 'necklace' | 'cloak';

// Define the structure of an item.
export type Item = {
    name: string;
    type: ItemType;
    description: string;
    weight: number;
    handedness?: 'one-handed' | 'two-handed';
    equippable: boolean;
    slot?: EquipSlot | EquipSlot[];
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
        slot: ['main_hand', 'off_hand'],
        attributes: {
            damage: '1d4',
        },
    },
    {
        name: 'Axe',
        type: 'weapon',
        description: 'A heavy axe.',
        weight: 5,
        handedness: 'one-handed',
        equippable: true,
        slot: 'main_hand',
        attributes: {
            damage: '1d10',
        },
    },
    {
        name: 'Crossbow',
        type: 'weapon',
        description: 'A ranged crossbow.',
        weight: 3,
        handedness: 'two-handed',
        equippable: true,
        slot: 'main_hand',
        attributes: {
            damage: '1d8',
        },
    },
    {
        name: 'Mace',
        type: 'weapon',
        description: 'A blunt mace.',
        weight: 4,
        handedness: 'one-handed',
        equippable: true,
        slot: 'main_hand',
        attributes: {
            damage: '1d6',
        },
    },
    {
        name: 'Spear',
        type: 'weapon',
        description: 'A long spear.',
        weight: 4,
        handedness: 'two-handed',
        equippable: true,
        slot: 'main_hand',
        attributes: {
            damage: '1d8',
        },
    },
    {
        name: 'Warhammer',
        type: 'weapon',
        description: 'A heavy warhammer.',
        weight: 6,
        handedness: 'two-handed',
        equippable: true,
        slot: 'main_hand',
        attributes: {
            damage: '1d12',
        },
    },
    {
        name: 'Shortsword',
        type: 'weapon',
        description: 'A lightweight shortsword.',
        weight: 2,
        handedness: 'one-handed',
        equippable: true,
        slot: 'main_hand',
        attributes: {
            damage: '1d6',
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
    {
        name: 'Chainmail',
        type: 'armor',
        description: 'A suit of chainmail armor.',
        weight: 20,
        equippable: true,
        slot: 'body',
        attributes: {
            armorClass: 13,
        },
    },
    {
        name: 'Plate Armor',
        type: 'armor',
        description: 'Heavy plate armor.',
        weight: 30,
        equippable: true,
        slot: 'body',
        attributes: {
            armorClass: 16,
        },
    },
    {
        name: 'Padded Armor',
        type: 'armor',
        description: 'Light padded armor.',
        weight: 10,
        equippable: true,
        slot: 'body',
        attributes: {
            armorClass: 10,
        },
    },
    {
        name: 'Scale Armor',
        type: 'armor',
        description: 'Armor made of scale',
        weight: 25,
        equippable: true,
        slot: 'body',
        attributes: {
            armorClass: 14,
        },
    },
    {
        name: 'Helmet',
        type: 'armor',
        description: 'A protective helmet.',
        weight: 5,
        equippable: true,
        slot: 'head',
        attributes: {
            armorClass: 2,
        },
    },
    {
        name: 'Boots',
        type: 'armor',
        description: 'Sturdy boots.',
        weight: 3,
        equippable: true,
        slot: 'feet',
        attributes: {
            armorClass: 1,
        },
    },


    {
        name: 'Shield',
        type: 'shield',
        description: 'A sturdy shield.',
        weight: 6,
        handedness: 'one-handed',
        equippable: true,
        slot: 'off_hand',
        attributes: {
            armorClass: 2,
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
    {
        name: 'Mana Potion',
        type: 'consumable',
        description: 'Restores 10 MP.',
        weight: 0.5,
        equippable: false,
        attributes: {
            effect: 'restore_mana',
            duration: 0,
        },
    },
    {
        name: 'Stamina Potion',
        type: 'consumable',
        description: 'Restores 10 SP.',
        weight: 0.5,
        equippable: false,
        attributes: {
            effect: 'restore_stamina',
            duration: 0,
        },
    },
    {
        name: 'Antidote',
        type: 'consumable',
        description: 'Cures poison.',
        weight: 0.5,
        equippable: false,
        attributes: {
            effect: 'cure_poison',
            duration: 0,
        },
    },
    {
        name: 'Elixir',
        type: 'consumable',
        description: 'Restores all HP and MP.',
        weight: 0.5,
        equippable: false,
        attributes: {
            effect: 'restore_all',
            duration: 0,
        },
    },
    {
        name: 'Speed Potion',
        type: 'consumable',
        description: 'Increases speed for 10 minutes.',
        weight: 0.5,
        equippable: false,
        attributes: {
            effect: 'increase_speed',
            duration: 600,
        },
    },
    {
        name: 'Strength Potion',
        type: 'consumable',
        description: 'Increases strength for 10 minutes.',
        weight: 0.5,
        equippable: false,
        attributes: {
            effect: 'increase_strength',
            duration: 600,
        },
    },
    {
        name: 'Invisibility Potion',
        type: 'consumable',
        description: 'Grants invisibility for 5 minutes.',
        weight: 0.5,
        equippable: false,
        attributes: {
            effect: 'invisibility',
            duration: 300,
        },
    },
    {
        name: 'Fire Resistance Potion',
        type: 'consumable',
        description: 'Grants fire resistance for 10 minutes.',
        weight: 0.5,
        equippable: false,
        attributes: {
            effect: 'fire_resistance',
            duration: 600,
        },
    },
    {
        name: 'Water Breathing Potion',
        type: 'consumable',
        description: 'Grants water breathing for 15 minutes.',
        weight: 0.5,
        equippable: false,
        attributes: {
            effect: 'water_breathing',
            duration: 900,
        },
    },
    {
        name: 'Night Vision Potion',
        type: 'consumable',
        description: 'Grants night vision for 8 hours.',
        weight: 0.5,
        equippable: false,
        attributes: {
            effect: 'night_vision',
            duration: 28800,
        },
    },

    // Predefined misc items
    {
        name: 'Rope',
        type: 'misc',
        description: 'A sturdy rope.',
        weight: 10,
        equippable: false,
    },
    {
        name: 'Torch',
        type: 'misc',
        description: 'Provides light in dark areas.',
        weight: 2,
        equippable: false,
    },
    {
        name: 'Fishing Pole',
        type: 'misc',
        description: 'Used for fishing.',
        weight: 5,
        equippable: true,
        slot: 'main_hand',
    },
    {
        name: 'Backpack',
        type: 'misc',
        description: 'Increases carrying capacity.',
        weight: 1,
        equippable: false,
    },
    {
        name: 'Lockpick Set',
        type: 'misc',
        description: 'Used for picking locks.',
        weight: 0.5,
        equippable: false,
    },
    {
        name: 'Map',
        type: 'misc',
        description: 'Shows the surrounding area.',
        weight: 0.1,
        equippable: false,
    },
    {
        name: 'Lantern',
        type: 'misc',
        description: 'Provides light in dark areas.',
        weight: 3,
        equippable: false,
    },
    {
        name: 'Book',
        type: 'misc',
        description: 'A book with valuable information.',
        weight: 1,
        equippable: false,
    },
    {
        name: 'Compass',
        type: 'misc',
        description: 'Helps with navigation.',
        weight: 0.2,
        equippable: false,
    },
];

export const classifyItem = (itemName: string): Item => {
    const predefinedItem = items.find(item => item.name.toLowerCase() === itemName.toLowerCase());
    if (predefinedItem) {
        return predefinedItem;
    }


    const lowerDescription = description.toLowerCase();

    if (lowerDescription.includes('blade') || lowerDescription.includes('sword') || lowerDescription.includes('dagger')) {
        return {
            name: itemName,
            type: 'weapon',
            description: 'A sharp blade.',
            weight: 2,
            handedness: 'one-handed',
            equippable: true,
            slot: 'main_hand',
            attributes: {
                damage: '1d6',
            },
        };
    } else if (lowerDescription.includes('armor') || lowerDescription.includes('robes') || lowerDescription.includes('mail') || lowerDescription.includes('plate')) {
        return {
            name: itemName,
            type: 'armor',
            description: 'Protective armor.',
            weight: 15,
            equippable: true,
            slot: 'body',
            attributes: {
                armorClass: 10,
            },
        };
    } else if (lowerDescription.includes('shield')) {
        return {
            name: itemName,
            type: 'shield',
            description: 'A sturdy shield.',
            weight: 6,
            handedness: 'one-handed',
            equippable: true,
            slot: 'off_hand',
            attributes: {
                armorClass: 2,
            },
        };
    } else if (lowerDescription.includes('potion') || lowerDescription.includes('elixir') || lowerDescription.includes('antidote')) {
        return {
            name: itemName,
            type: 'consumable',
            description: 'A consumable item.',
            weight: 0.5,
            equippable: false,
            attributes: {
                effect: lowerDescription.includes('heal') ? 'heal' : 'effect',
                duration: 0,
            },
        };
    } else if (lowerDescription.includes('cap') || lowerDescription.includes('hat') || itemName.toLowerCase().includes('cap') || itemName.toLowerCase().includes('hat') || lowerDescription.includes('helmet')) {
        return {
            name: itemName,
            type: 'armor',
            description: 'A piece of headwear.',
            weight: 1,
            equippable: true,
            slot: 'head',
            attributes: {
                armorClass: 1,
            },
        };
    } else if (lowerDescription.includes('boots') || lowerDescription.includes('shoes') || lowerDescription.includes('sandals')) {
        return {
            name: itemName,
            type: 'armor',
            description: 'Footwear.',
            weight: 2,
            equippable: true,
            slot: 'feet',
            attributes: {
                armorClass: 1,
            },
        };
    } else {
        return {
            name: itemName,
            type: 'misc',
            description: 'An unknown item.',
            weight: 1,
            equippable: false,
        };
    }
};
