// utils/characterUtils.ts

export const parseAbilities = (abilities: string[]): { name: string, description: string }[] => {
    return abilities.map(ability => {
        // Here you could add more sophisticated parsing if necessary
        return { name: ability, description: 'No description available' }; // Replace with actual descriptions
    });
};

// Function to parse spells
export const parseSpells = (spells: string[]): { name: string, description: string }[] => {
    return spells.map(spell => {
        // Here you could add more sophisticated parsing if necessary
        return { name: spell, description: 'No description available' }; // Replace with actual descriptions
    });
};
