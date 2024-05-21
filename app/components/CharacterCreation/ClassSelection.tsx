"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Class, classOptions } from '@/data/classes';
import { useGameContext } from '@/context/GameContext';
import { items } from '@/data/itemSchema'; // Updated import

const ClassSelection = () => {
    const { species, gender, setGender, setCharacterClass, initializeCharacter } = useGameContext();
    const [selectedClassIndex, setSelectedClassIndex] = useState(0);

    const handleClassChange = (index: number) => {
        if (index >= 0 && index < classOptions.length) {
            setSelectedClassIndex(index);
        }
    };

    const handleSelectClass = () => {
        const selectedClass = classOptions[selectedClassIndex];
        setCharacterClass(selectedClass.name);
        initializeCharacter(species, selectedClass.name);
    };

    const selectedClass = classOptions[selectedClassIndex];
    const characterImage = selectedClass.species[species as keyof typeof selectedClass.species][gender === 'male' ? 'maleImage' : 'femaleImage'];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-black bg-[#8FBC8F]">
            <div className="bg-[#FFFDDD] rounded-lg shadow-lg p-6 w-full max-w-4xl mb-6 text-center">
                <h2 className="text-4xl font-bold mb-4 text-black">Select Your Class</h2>
                <div className="text-3xl font-semibold mb-4 text-black">{selectedClass.name}</div>
                <div className="relative mx-auto flex items-center justify-center w-full max-w-3xl mb-6">
                    <FaArrowLeft
                        onClick={() => handleClassChange(selectedClassIndex - 1)}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-4xl cursor-pointer text-gray-700 hover:text-gray-900 transition-colors"
                    />
                    <img
                        src={characterImage}
                        alt={selectedClass.name}
                        className="w-full h-auto max-w-[400px] object-cover rounded-lg shadow-lg transition-transform duration-500 ease-in-out mx-4"
                        key={selectedClassIndex}
                    />
                    <FaArrowRight
                        onClick={() => handleClassChange(selectedClassIndex + 1)}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-4xl cursor-pointer text-gray-700 hover:text-gray-900 transition-colors"
                    />
                </div>
                <div className="flex space-x-4 justify-center mb-4">
                    <button
                        className={`px-4 py-2 ${gender === 'male' ? 'bg-blue-600' : 'bg-gray-400'} text-white rounded hover:bg-blue-700 transition-colors`}
                        onClick={() => setGender('male')}
                    >
                        Male
                    </button>
                    <button
                        className={`px-4 py-2 ${gender === 'female' ? 'bg-pink-600' : 'bg-gray-400'} text-white rounded hover:bg-pink-700 transition-colors`}
                        onClick={() => setGender('female')}
                    >
                        Female
                    </button>
                </div>
            </div>

            <div className="bg-[#FFFDDD] rounded-lg shadow-lg p-6 w-full max-w-4xl text-center">
                <h3 className="text-2xl font-semibold mb-4 text-black">Class Description</h3>
                <p className="text-lg mb-6 text-black">{selectedClass.description}</p>
                <div className="flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-6">
                    <div>
                        <h3 className="text-2xl font-semibold mb-2 text-black">Stat Modifiers</h3>
                        <ul className="list-disc list-inside text-lg text-black">
                            <li>Strength: {selectedClass.statModifiers.strength}</li>
                            <li>Dexterity: {selectedClass.statModifiers.dexterity}</li>
                            <li>Constitution: {selectedClass.statModifiers.constitution}</li>
                            <li>Intelligence: {selectedClass.statModifiers.intelligence}</li>
                            <li>Wisdom: {selectedClass.statModifiers.wisdom}</li>
                            <li>Charisma: {selectedClass.statModifiers.charisma}</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-2 text-black">HP & MP</h3>
                        <ul className="list-none text-lg text-black">
                            <li><strong>HP:</strong> {selectedClass.startingHP}</li>
                            <li><strong>MP:</strong> {selectedClass.startingMP}</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-2 text-black">Starting Items</h3>
                        <ul className="list-disc list-inside text-lg text-black">
                            {selectedClass.startingItems.map((itemName, index) => {
                                const item = items.find(item => item.name === itemName);
                                return item ? <li key={index}>{item.name}: {item.description}</li> : null;
                            })}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-2 text-black">Starting Weapons</h3>
                        <ul className="list-disc list-inside text-lg text-black">
                            {selectedClass.startingWeapons.map((weaponName, index) => {
                                const weapon = items.find(item => item.name === weaponName && item.type === 'weapon');
                                return weapon ? <li key={index}>{weapon.name}: {weapon.description}</li> : null;
                            })}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-2 text-black">Starting Armor</h3>
                        <ul className="list-disc list-inside text-lg text-black">
                            {selectedClass.startingArmor.map((armorName, index) => {
                                const armor = items.find(item => item.name === armorName && item.type === 'armor');
                                return armor ? <li key={index}>{armor.name}: {armor.description}</li> : null;
                            })}
                        </ul>
                    </div>
                </div>
                <div className="flex space-x-4 justify-center mb-4">
                    <div>
                        <h3 className="text-2xl font-semibold mb-2 text-black">Abilities</h3>
                        <ul className="list-disc list-inside text-lg text-black">
                            {selectedClass.abilities.map((ability, index) => (
                                <li key={index}>{ability.name}: {ability.description}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-2 text-black">Spells</h3>
                        <ul className="list-disc list-inside text-lg text-black">
                            {selectedClass.spells.map((spell, index) => (
                                <li key={index}>{spell.name}: {spell.description}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <Link href="/character-creation/details">
                <button
                    className="mt-8 px-8 py-3 bg-green-600 text-white text-lg rounded-lg shadow-md hover:bg-green-700 transition-colors"
                    onClick={handleSelectClass}
                >
                    Choose
                </button>
            </Link>
        </div>
    );
};

export default ClassSelection;
