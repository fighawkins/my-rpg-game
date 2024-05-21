export type Armor = {
    name: string;
    description: string;
    armorClass: number;
};

export const armor: Armor[] = [
    { name: 'Leather Armor', description: 'Basic leather armor.', armorClass: 11 },
    { name: 'Chain Mail', description: 'A sturdy chain mail.', armorClass: 16 },
    // Add more armor as needed
];

export const leatherArmor = armor.find(a => a.name === 'Leather Armor');
export const chainMail = armor.find(a => a.name === 'Chain Mail');
