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
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h2 className="text-3xl font-bold mb-4">Select Your Species</h2>
            <div className="relative flex items-center justify-center w-full h-1/2">
                <FaArrowLeft
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-3xl cursor-pointer"
                />
                <img
                    src={currentSpecies.image}
                    alt={currentSpecies.name}
                    className="w-[400px] h-auto object-cover transition-transform duration-500 ease-in-out mx-4"
                    key={currentSpeciesIndex}
                />
                <FaArrowRight
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-3xl cursor-pointer"
                />
            </div>
            <Link href="/character-creation/class">
                <button onClick={handleChoose} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                    Choose
                </button>
            </Link>
        </div>
    );
}
