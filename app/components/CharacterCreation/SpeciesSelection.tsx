"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Species, speciesOptions } from '@/data/species';
import { useGameContext } from '@/context/GameContext';

export default function SpeciesSelection() {
    const { setSpecies } = useGameContext();
    const [currentSpeciesIndex, setCurrentSpeciesIndex] = useState(0);

    const handleNext = () => {
        setCurrentSpeciesIndex((prevIndex) => (prevIndex + 1) % speciesOptions.length);
    };

    const handlePrev = () => {
        setCurrentSpeciesIndex((prevIndex) => (prevIndex - 1 + speciesOptions.length) % speciesOptions.length);
    };

    const handleChoose = () => {
        setSpecies(speciesOptions[currentSpeciesIndex].name);
    };

    const currentSpecies: Species = speciesOptions[currentSpeciesIndex];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen  p-4 text-black">
            <div className="bg-[#FFFDDD] rounded-lg shadow-lg p-6 w-full max-w-4xl mb-6 text-center">
                <h2 className="text-4xl font-bold mb-4 text-black">Select Your Species</h2>
                <div className="text-3xl font-semibold mb-4 text-black">{currentSpecies.name}</div>
                <div className="relative mx-auto flex items-center justify-center w-full max-w-3xl mb-6">
                    <FaArrowLeft
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-4xl cursor-pointer text-gray-700 hover:text-gray-900 transition-colors"
                    />
                    <img
                        src={currentSpecies.image}
                        alt={currentSpecies.name}
                        className="w-full h-auto max-w-[400px] object-cover rounded-lg shadow-lg transition-transform duration-500 ease-in-out mx-4"
                        key={currentSpeciesIndex}
                    />
                    <FaArrowRight
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-4xl cursor-pointer text-gray-700 hover:text-gray-900 transition-colors"
                    />
                </div>
            </div>

            <div className="bg-[#FFFDDD] rounded-lg shadow-lg p-6 w-full max-w-4xl text-center">
                <h3 className="text-2xl font-semibold mb-4 text-black">Species Description</h3>
                <p className="text-lg mb-6 text-black">{currentSpecies.description}</p>
                <div className="flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-6">
                    <div>
                        <h3 className="text-2xl font-semibold mb-2 text-black">Base Stats</h3>
                        <ul className="list-disc list-inside text-lg text-black">
                            <li>Strength: {currentSpecies.baseStats.strength}</li>
                            <li>Dexterity: {currentSpecies.baseStats.dexterity}</li>
                            <li>Constitution: {currentSpecies.baseStats.constitution}</li>
                            <li>Intelligence: {currentSpecies.baseStats.intelligence}</li>
                            <li>Wisdom: {currentSpecies.baseStats.wisdom}</li>
                            <li>Charisma: {currentSpecies.baseStats.charisma}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Link href="/character-creation/class">
                <button onClick={handleChoose} className="mt-8 px-8 py-3 bg-green-600 text-white text-lg rounded-lg shadow-md hover:bg-green-700 transition-colors">
                    Choose
                </button>
            </Link>
        </div>
    );
}
