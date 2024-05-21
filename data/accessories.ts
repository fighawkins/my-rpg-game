export type Accessory = {
    name: string;
    description: string;
    effect: string;
};

export const accessories: Accessory[] = [
    { name: 'Ring of Strength', description: 'Increases strength by 2.', effect: '+2 strength' },
    { name: 'Amulet of Health', description: 'Increases health by 10.', effect: '+10 HP' },
    // Add more accessories as needed
];

export const ringOfStrength = accessories.find(acc => acc.name === 'Ring of Strength');
export const amuletOfHealth = accessories.find(acc => acc.name === 'Amulet of Health');
