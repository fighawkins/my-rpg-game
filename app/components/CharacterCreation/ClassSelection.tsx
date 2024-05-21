"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Class, classOptions } from '@/data/classes';
import { useGameContext } from '@/context/GameContext';
import { items } from '@/data/items';
import { weapons } from '@/data/weapons';
import { armor } from '@/data/armor';

export default function ClassSelection() {
    const { species, setCharacterClass, setGender, setInventory, setWeapons, setArmor, setEquippedWeapon, setEquippedArmor } = useGameContext();
    const [currentClassIndex, setCurrentClassIndex] = useState(0);
    const [localGender, setLocalGender] = useState<'male' | 'female'>('male');

    const handleNext = () => {
        setCurrentClassIndex((prevIndex) => (prevIndex + 1) % classOptions.length);
    };

    const handlePrev = () => {
        setCurrentClassIndex((prevIndex) => (prevIndex - 1 + classOptions.length) % classOptions.length);
    };

    const handleChoose = () => {
        const chosenClass = classOptions[currentClassIndex];
        setCharacterClass(chosenClass.name);
        setGender(localGender);

        // Set inventory, weapons, and armor based on the chosen class
        const classItems = chosenClass.startingItems.map(itemName => items.find(item => item.name === itemName)!).filter(item => item);
        const classWeapons = chosenClass.startingWeapons.map(weaponName => weapons.find(weapon => weapon.name === weaponName)!).filter(weapon => weapon);
        const classArmor = chosenClass.startingArmor.map(armorName => armor.find(a => a.name === armorName)!).filter(a => a);

        setInventory(classItems);
        setWeapons(classWeapons);
        setArmor(classArmor);

        // Equip the first weapon and armor by default
        setEquippedWeapon(classWeapons[0] || null);
        setEquippedArmor(classArmor[0] || null);
    };

    const currentClass: Class = classOptions[currentClassIndex];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-black bg-[#8FBC8F]">
            <div className="bg-[#FFFDDD] rounded-lg shadow-lg p-6 w-full max-w-4xl mb-6 text-center">
                <h2 className="text-4xl font-bold mb-4 text-black">Select Your Class</h2>
                <div className="text-3xl font-semibold mb-4 text-black">{currentClass.name}</div>
                <div className="relative mx-auto flex items-center justify-center w-full max-w-3xl mb-6">
                    <FaArrowLeft
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-4xl cursor-pointer text-gray-700 hover:text-gray-900 transition-colors"
                    />
                    <img
                        src={localGender === 'male' ? currentClass.species[species].maleImage : currentClass.species[species].femaleImage}
                        alt={currentClass.name}
                        className="w-full h-auto max-w-[400px] object-cover rounded-lg shadow-lg transition-transform duration-500 ease-in-out mx-4"
                        key={currentClassIndex}
                    />
                    <FaArrowRight
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-4xl cursor-pointer text-gray-700 hover:text-gray-900 transition-colors"
                    />
                </div>
                <div className="flex space-x-4 justify-center mb-4">
                    <button
                        className={`px-4 py-2 ${localGender === 'male' ? 'bg-blue-600' : 'bg-gray-400'} text-white rounded hover:bg-blue-700 transition-colors`}
                        onClick={() => setLocalGender('male')}
                    >
                        Male
                    </button>
                    <button
                        className={`px-4 py-2 ${localGender === 'female' ? 'bg-pink-600' : 'bg-gray-400'} text-white rounded hover:bg-pink-700 transition-colors`}
                        onClick={() => setLocalGender('female')}
                    >
                        Female
                    </button>
                </div>
            </div>

            <div className="bg-[#FFFDDD] rounded-lg shadow-lg p-6 w-full max-w-4xl text-center">
                <h3 className="text-2xl font-semibold mb-4 text-black">Class Description</h3>
                <p className="text-lg mb-6 text-black">{currentClass.description}</p>
                <div className="flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-6">
                    <div>
                        <h3 className="text-2xl font-semibold mb-2 text-black">Stat Modifiers</h3>
                        <ul className="list-disc list-inside text-lg text-black">
                            <li>Strength: {currentClass.statModifiers.strength}</li>
                            <li>Dexterity: {currentClass.statModifiers.dexterity}</li>
                            <li>Constitution: {currentClass.statModifiers.constitution}</li>
                            <li>Intelligence: {currentClass.statModifiers.intelligence}</li>
                            <li>Wisdom: {currentClass.statModifiers.wisdom}</li>
                            <li>Charisma: {currentClass.statModifiers.charisma}</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-2 text-black">HP & MP</h3>
                        <ul className="list-none text-lg text-black">
                            <li><strong>HP:</strong> {currentClass.startingHP}</li>
                            <li><strong>MP:</strong> {currentClass.startingMP}</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-2 text-black">Starting Items</h3>
                        <ul className="list-disc list-inside text-lg text-black">
                            {currentClass.startingItems.map((itemName, index) => {
                                const item = items.find(item => item.name === itemName);
                                return item ? <li key={index}>{item.name}: {item.description}</li> : null;
                            })}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-2 text-black">Starting Weapons</h3>
                        <ul className="list-disc list-inside text-lg text-black">
                            {currentClass.startingWeapons.map((weaponName, index) => {
                                const weapon = weapons.find(weapon => weapon.name === weaponName);
                                return weapon ? <li key={index}>{weapon.name}: {weapon.description}</li> : null;
                            })}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-2 text-black">Starting Armor</h3>
                        <ul className="list-disc list-inside text-lg text-black">
                            {currentClass.startingArmor.map((armorName, index) => {
                                const armorItem = armor.find(a => a.name === armorName);
                                return armorItem ? <li key={index}>{armorItem.name}: {armorItem.description}</li> : null;
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            <Link href="/character-creation/details">
                <button onClick={handleChoose} className="mt-8 px-8 py-3 bg-green-600 text-white text-lg rounded-lg shadow-md hover:bg-green-700 transition-colors">
                    Choose
                </button>
            </Link>
        </div>
    );
}
