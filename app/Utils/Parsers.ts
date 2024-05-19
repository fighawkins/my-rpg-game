export const parseAbilities = (abilitiesString: string) => {
    return abilitiesString.trim().split(',').map(ability => {
        const [name, description] = ability.split(':').map(part => part.trim());
        return { name, description };
    });
};

export const parseSpells = (spellsString: string) => {
    return spellsString.trim().split(',').map(spell => {
        const [name, description] = spell.split(':').map(part => part.trim());
        return { name, description };
    });
};
