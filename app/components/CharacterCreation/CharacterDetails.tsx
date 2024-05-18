"use client";
import React, { useState, useEffect } from 'react';
import { useGameContext } from '@/context/GameContext';
import { speciesOptions } from '@/data/species';
import { classOptions } from '@/data/classes';
import Link from 'next/link';
import Inventory from '../inventory';

export default function CharacterDetails() {
    const { species, gender, characterClass, name, inventory, currency, abilities, stats, hp, mp, spells, setName, initializeCharacter, setInventory, setCurrency, setAbilities, setSpells } = useGameContext();
    const [localName, setLocalName] = useState(name);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalName(e.target.value);
    };

    useEffect(() => {
        if (!species || !characterClass) {
            // Redirect to species selection if no species or class is selected
            window.location.href = "/character-creation/species";
        } else {
            // Initialize character with abilities and spells if species and class are selected
            initializeCharacter(species, characterClass);
        }
    }, [species, characterClass]);

    useEffect(() => {
        console.log('Inventory:', inventory);
        console.log('Currency:', currency);
        console.log('Abilities:', abilities);
        console.log('Spells:', spells);
    }, [inventory, currency, abilities, spells]);

    const handleBeginGame = async () => {
        setName(localName);

        try {
            const response = await fetch('/api/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: 'I want to begin my journey.',
                    species,
                    characterClass,
                    gender,
                    name: localName,
                    inventory,
                    currency,
                    abilities,
                    spells,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const { updatedInventory, updatedCurrency, updatedAbilities, updatedSpells } = data;

                setInventory(updatedInventory);
                setCurrency(updatedCurrency);
                setAbilities(updatedAbilities);
                setSpells(updatedSpells);

                // Log the updated state
                console.log('Updated Inventory:', updatedInventory);
                console.log('Updated Currency:', updatedCurrency);
                console.log('Updated Abilities:', updatedAbilities);
                console.log('Updated Spells:', updatedSpells);
            } else {
                console.error('Failed to update character details.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const selectedSpecies = speciesOptions.find((s) => s.name === species);
    const selectedClass = classOptions.find((c) => c.name === characterClass);

    if (!selectedSpecies || !selectedClass) {
        return null; // or handle error
    }

    const classDetails = selectedClass.species[species as keyof typeof selectedClass.species];
    const characterImage = classDetails ? classDetails[gender === 'male' ? 'maleImage' : 'femaleImage'] : '';

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md overflow-y-auto">
                <h2 className="text-4xl font-bold mb-4 text-gray-800">Character Details</h2>
                <div className="mb-4">
                    <label className="text-xl font-semibold">What is your name?</label>
                    <input
                        type="text"
                        value={localName}
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
                    <p><strong>Name:</strong> {localName}</p>

                    <div className="mt-4">

                    </div>
                    <Inventory inventory={inventory} currency={currency} abilities={abilities} spells={spells} stats={stats} hp={hp} mp={mp} />
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
