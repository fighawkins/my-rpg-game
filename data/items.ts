export type Item = {
    name: string;
    description: string;
    effect?: string; // Optional field for items with effects
};

export const items: Item[] = [
    { name: 'Healing Potion', description: 'Restores 10 HP.', effect: 'heal' },
    { name: 'Torch', description: 'Provides light in dark areas.' },
    { name: 'Rope', description: 'A sturdy rope for climbing or tying.' },
    { name: 'Prayer Book', description: 'A book of prayers for healing and protection.' }, // Added prayer book
    // Add more items as needed
];

export const healingPotion = items.find(item => item.name === 'Healing Potion');
export const torch = items.find(item => item.name === 'Torch');
export const rope = items.find(item => item.name === 'Rope');
export const prayerBook = items.find(item => item.name === 'Prayer Book'); // Export
