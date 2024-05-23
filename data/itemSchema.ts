import nlp from 'compromise';

export type ItemType = 'weapon' | 'armor' | 'shield' | 'consumable' | 'misc' | 'head' | 'ring' | 'necklace' | 'cloak';
export type EquipSlot = 'main_hand' | 'off_hand' | 'body' | 'head' | 'legs' | 'feet' | 'ring' | 'necklace' | 'cloak';

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

const weaponKeywords = ['blade', 'sword', 'dagger', 'axe', 'mace', 'hammer', 'weapon', 'spear', 'staff', 'bow', 'crossbow'];
const armorKeywords = ['armor', 'robe', 'mail', 'plate', 'shield', 'helmet', 'cap', 'hat', 'boots', 'shoes'];
const consumableKeywords = ['potion', 'elixir', 'antidote', 'food', 'drink', 'tea', 'cake', 'bread', 'honey', 'consumable'];
const magicKeywords = ['magic', 'enchanted', 'spell', 'cursed', 'mystical', 'of'];

export const classifyItem = (itemName: string, description: string): Item => {
    const doc = nlp(description.toLowerCase());

    // Check for magic items
    if (magicKeywords.some(keyword => doc.has(keyword))) {
        const effectMatch = doc.match('(of|with) [a-z]+').out('text');
        const effect = effectMatch.split(' ').slice(1).join(' '); // Extract the effect after 'of' or 'with'

        return {
            name: itemName,
            type: detectItemType(itemName, description),
            description: description,
            weight: 2, // Default weight for magic items, adjust as needed
            handedness: itemName.includes('sword') ? 'one-handed' : undefined, // Example logic for handedness
            equippable: true,
            slot: determineSlot(itemName, description),
            attributes: {
                damage: '1d8',
                effect: effect,
            },
        };
    }

    // Check for weapons
    if (weaponKeywords.some(keyword => doc.has(keyword))) {
        return {
            name: itemName,
            type: 'weapon',
            description: description,
            weight: 2,
            handedness: 'one-handed',
            equippable: true,
            slot: 'main_hand',
            attributes: {
                damage: '1d6',
            },
        };
    }

    // Check for armor
    if (armorKeywords.some(keyword => doc.has(keyword))) {
        return {
            name: itemName,
            type: 'armor',
            description: description,
            weight: 10,
            equippable: true,
            slot: 'body',
            attributes: {
                armorClass: 5,
            },
        };
    }

    // Check for consumables
    if (consumableKeywords.some(keyword => doc.has(keyword))) {
        return {
            name: itemName,
            type: 'consumable',
            description: description,
            weight: 0.5,
            equippable: false,
            attributes: {
                effect: 'restore health',
                duration: 0,
            },
        };
    }

    // Fallback to misc
    return {
        name: itemName,
        type: 'misc',
        description: description,
        weight: 1,
        equippable: false,
    };
};

// Function to detect item type based on name and description
const detectItemType = (itemName: string, description: string): ItemType => {
    if (weaponKeywords.some(keyword => itemName.includes(keyword) || description.includes(keyword))) {
        return 'weapon';
    }
    if (armorKeywords.some(keyword => itemName.includes(keyword) || description.includes(keyword))) {
        return 'armor';
    }
    if (consumableKeywords.some(keyword => itemName.includes(keyword) || description.includes(keyword))) {
        return 'consumable';
    }
    return 'misc';
};

// Function to determine the slot based on name and description
const determineSlot = (itemName: string, description: string): EquipSlot | EquipSlot[] | undefined => {
    if (itemName.includes('sword') || description.includes('sword')) {
        return 'main_hand';
    }
    if (itemName.includes('shield') || description.includes('shield')) {
        return 'off_hand';
    }
    if (itemName.includes('armor') || description.includes('armor')) {
        return 'body';
    }
    if (itemName.includes('helmet') || description.includes('helmet') || itemName.includes('cap') || description.includes('cap') || itemName.includes('hat') || description.includes('hat')) {
        return 'head';
    }
    if (itemName.includes('boots') || description.includes('boots') || itemName.includes('shoes') || description.includes('shoes')) {
        return 'feet';
    }
    if (itemName.includes('ring') || description.includes('ring')) {
        return 'ring';
    }
    if (itemName.includes('necklace') || description.includes('necklace')) {
        return 'necklace';
    }
    if (itemName.includes('cloak') || description.includes('cloak')) {
        return 'cloak';
    }
    return undefined;
};

// Example items array
export const items: Item[] = [
    classifyItem('Sword of Flames', 'A magical sword that burns with an eternal flame.'),
    classifyItem('Healing Potion', 'A potion that restores health.'),
    classifyItem('Steel Armor', 'Heavy armor that provides excellent protection.'),
    classifyItem('Boots of Speed', 'These boots make you run faster.'),
];
