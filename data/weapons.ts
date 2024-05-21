export type Weapon = {
    name: string;
    description: string;
    damage: string; // Damage in DnD style notation, e.g., "1d6"
};

export const weapons: Weapon[] = [
    { name: 'Sword', description: 'A sharp blade.', damage: '1d8' },
    { name: 'Bow & Quiver', description: 'A ranged weapon.', damage: '1d6' },
    { name: 'Staff', description: 'A wooden staff.', damage: '1d4' }, // Added staff
    // Add more weapons as needed
];

export const sword = weapons.find(weapon => weapon.name === 'Sword');
export const bow = weapons.find(weapon => weapon.name === 'Bow & Quiver');
export const staff = weapons.find(weapon => weapon.name === 'Staff'); // Export staff
