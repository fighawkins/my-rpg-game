"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Class, classOptions } from '@/data/classes';
import { useGameContext } from '@/context/GameContext';

export default function ClassSelection() {
    const { species, setCharacterClass, setGender } = useGameContext();
    const [currentClassIndex, setCurrentClassIndex] = useState(0);
    const [localGender, setLocalGender] = useState<'male' | 'female'>('male');

    const handleNext = () => {
        setCurrentClassIndex((prevIndex) => (prevIndex + 1) % classOptions.length);
    };

    const handlePrev = () => {
        setCurrentClassIndex((prevIndex) => (prevIndex - 1 + classOptions.length) % classOptions.length);
    };

    const handleChoose = () => {
        setCharacterClass(classOptions[currentClassIndex].name);
        setGender(localGender);
    };

    const currentClass: Class = classOptions[currentClassIndex];

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h2 className="text-3xl font-bold mb-4">Select Your Class</h2>
            <div className="relative flex items-center justify-center w-full h-1/2">
                <FaArrowLeft
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-3xl cursor-pointer"
                />
                <img
                    src={localGender === 'male' ? currentClass.species[species].maleImage : currentClass.species[species].femaleImage}
                    alt={currentClass.name}
                    className="w-[400px] h-auto object-cover transition-transform duration-500 ease-in-out mx-4"
                    key={currentClassIndex}
                />
                <FaArrowRight
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-3xl cursor-pointer"
                />
            </div>
            <div className="flex space-x-4 mt-4">
                <button
                    className={`px-4 py-2 ${localGender === 'male' ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded`}
                    onClick={() => setLocalGender('male')}
                >
                    Male
                </button>
                <button
                    className={`px-4 py-2 ${localGender === 'female' ? 'bg-pink-500' : 'bg-gray-300'} text-white rounded`}
                    onClick={() => setLocalGender('female')}
                >
                    Female
                </button>
            </div>
            <Link href="/character-creation/details">
                <button onClick={handleChoose} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                    Choose
                </button>
            </Link>
        </div>
    );
}
