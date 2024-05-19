import React from 'react';
import { getCharacterImage } from '../Utils/getCharacterImage';

type Stats = {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
};

type CharacterInfoProps = {
    species: string;
    characterClass: string;
    name: string;
    stats: Stats;
    hp: number;
    mp: number;
    gender: string;
};

const CharacterInfo: React.FC<CharacterInfoProps> = ({ species, characterClass, name, stats, hp, mp, gender }) => {
    const characterImage = getCharacterImage(species, characterClass, gender);

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
            <div className="mt-6">
                <h3 className="text-2xl font-bold mb-2 text-center">Health & Magic</h3>
                <div className="grid grid-cols-2 pb-4 gap-4 text-center">
                    <div><strong>HP:</strong> {hp}</div>
                    <div><strong>MP:</strong> {mp}</div>
                </div>
            </div>
            <div className="flex justify-center mb-6">
                <img src={characterImage} alt={`${species} ${characterClass}`} className="w-48 h-48 object-cover rounded-full shadow-lg border-4 border-white" />
            </div>
            <div className="mb-4 text-center">
                <p className="text-xl font-semibold"> {name}</p>
                <p className="text-xl font-semibold"> {species}</p>
                <p className="text-xl font-semibold"> {characterClass}</p>
            </div>
            <div className="mt-4">
                <h3 className="text-2xl font-bold mb-2 text-center">Stats</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div><strong>Strength:</strong> {stats.strength}</div>
                    <div><strong>Dexterity:</strong> {stats.dexterity}</div>
                    <div><strong>Constitution:</strong> {stats.constitution}</div>
                    <div><strong>Intelligence:</strong> {stats.intelligence}</div>
                    <div><strong>Wisdom:</strong> {stats.wisdom}</div>
                    <div><strong>Charisma:</strong> {stats.charisma}</div>
                </div>
            </div>

        </div>
    );
};

export default CharacterInfo;
