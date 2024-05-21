export type Spell = {
    name: string;
    description: string;
};

export const spells: Spell[] = [
    {
        name: 'Prayer',
        description: 'Heal minor wounds with a prayer.',
    },
    {
        name: 'Talk with Animals',
        description: 'Communicate with animals.',
    },
    {
        name: 'Fireball',
        description: 'Cast a ball of fire that deals damage.',
    },
    {
        name: 'Shield',
        description: 'Create a magical shield that increases defense.',
    },
];
