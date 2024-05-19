// utils/characterUtils.ts
import { classOptions } from '@/data/classes';

export const getCharacterImage = (species: string, characterClass: string, gender: string): string => {
    const selectedClass = classOptions.find((c) => c.name === characterClass);

    if (!selectedClass) {
        return '/images/default_image.webp'; // Default image path
    }

    const classDetails = selectedClass.species[species as keyof typeof selectedClass.species];
    return classDetails ? classDetails[gender === 'male' ? 'maleImage' : 'femaleImage'] : '/images/default_image.webp';
};
