// src/data/species.ts
export type Species = {
    name: string;
    image: string;
    abilities: { name: string; description: string }[];
};

export const speciesOptions: Species[] = [
    { name: 'Mouse', image: '/images/mouse.webp', abilities: [{ name: 'Nimble Dodge', description: 'Quickly dodge an incoming attack.' }] },
    { name: 'Badger', image: '/images/badger.webp', abilities: [{ name: 'Roar', description: 'A powerful roar that intimidates enemies.' }] },
    { name: 'Rabbit', image: '/images/rabbit.webp', abilities: [{ name: 'Quick Hop', description: 'A quick hop to evade attacks.' }] },
];
