export type Ability = {
    name: string;
    description: string;
};

export const abilities: Ability[] = [
    {
        name: 'Extra Attack',
        description: 'Perform an additional attack.',
    },
    {
        name: 'Tracking',
        description: 'Track enemies or animals.',
    },
    {
        name: 'Parry',
        description: 'Skillfully deflect an incoming attack.',
    },
    {
        name: 'Nimble Dodge',
        description: 'Quickly dodge an incoming attack.',
    },
];
