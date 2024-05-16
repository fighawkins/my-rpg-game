"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useGameContext } from "@/context/GameContext";
import { speciesOptions } from "@/data/species";
import { classOptions, Ability, Spell } from "@/data/classes";

export default function CharacterDetails() {
    const { species, gender, characterClass, setName } = useGameContext();
    const [name, setLocalName] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalName(e.target.value);
    };

    useEffect(() => {
        if (!species || !characterClass) {
            // Redirect to species selection if no species or class is selected
            window.location.href = "/character-creation/species";
        }
    }, [species, characterClass]);

    const handleBeginGame = () => {
        setName(name);
    };

    const selectedSpecies = speciesOptions.find((s) => s.name === species);
    const selectedClass = classOptions.find((c) => c.name === characterClass);

    if (!selectedSpecies || !selectedClass) {
        return null; // or handle error
    }

    const speciesAbilities: Ability[] = selectedSpecies.abilities;
    const classDetails = selectedClass.species[species];
    const classAbilities: Ability[] = classDetails.abilities;
    const classSpells: Spell[] = classDetails.spells;

    const characterImage = classDetails[gender === 'male' ? 'maleImage' : 'femaleImage'];

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md overflow-y-auto">
                <h2 className="text-4xl font-bold mb-4 text-gray-800">Character Details</h2>
                <div className="mb-4">
                    <label className="text-xl font-semibold">What is your name?</label>
                    <input
                        type="text"
                        value={name}
                        onChange={handleChange}
                        className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="w-full">
                    <h3 className="text-2xl font-bold mb-4 text-center">Character Sheet</h3>
                    <img
                        src={characterImage}
                        alt={`${species} ${characterClass}`}
                        className="w-full h-auto object-cover rounded-md mb-4"
                    />
                    <p><strong>Species:</strong> {species}</p>
                    <p><strong>Class:</strong> {characterClass}</p>
                    <p><strong>Name:</strong> {name}</p>
                    <h4 className="text-xl font-bold mt-4">Abilities:</h4>
                    <ul className="list-disc list-inside">
                        {speciesAbilities.concat(classAbilities).map((ability, index) => (
                            <li key={index}>
                                <strong>{ability.name}:</strong> {ability.description}
                            </li>
                        ))}
                    </ul>
                    <h4 className="text-xl font-bold mt-4">Spells:</h4>
                    <ul className="list-disc list-inside">
                        {classSpells.map((spell, index) => (
                            <li key={index}>
                                <strong>{spell.name}:</strong> {spell.description}
                            </li>
                        ))}
                    </ul>
                </div>
                <Link href="/game">
                    <button onClick={handleBeginGame} className="mt-8 px-6 py-3 bg-green-500 text-white text-xl rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 w-full">
                        Begin Game
                    </button>
                </Link>
            </div>
        </div>
    );
}