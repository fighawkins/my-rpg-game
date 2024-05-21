"use client";
import React, { useState, useEffect } from 'react';
import { useGameContext } from '@/context/GameContext';
import { speciesOptions } from '@/data/species';
import { classOptions } from '@/data/classes';
import Link from 'next/link';

export default function CharacterDetails() {
    const { species, gender, characterClass, name, inventory, currency, abilities, stats, hp, mp, spells, equippedWeapon, equippedArmor, setName, initializeCharacter, setInventory, setCurrency, setAbilities, setSpells } = useGameContext();
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
                    hp,
                    mp,
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
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-black bg-[#8FBC8F]">
            <div className="bg-[#FFFDDD] rounded-lg shadow-lg p-6 w-full max-w-4xl text-center">
                <h2 className="text-4xl font-bold mb-4 text-black">Character Details</h2>
                <div className="mb-4">
                    <label className="text-xl font-semibold text-black">What is your name?</label>
                    <input
                        type="text"
                        value={localName}
                        onChange={handleChange}
                        className="block w-full max-w-xs mx-auto mt-2 px-3 py-2 border border-gray-300 rounded-md text-black"
                    />
                </div>
                <div className="w-full">
                    <h3 className="text-3xl font-bold mb-4 text-center text-black">Character Sheet</h3>
                    <img
                        src={characterImage}
                        alt={`${species} ${characterClass}`}
                        className="w-full h-auto max-w-[400px] object-cover rounded-md mb-4 mx-auto"
                    />
                    <p className="text-black"><strong>Species:</strong> {species}</p>
                    <p className="text-black"><strong>Class:</strong> {characterClass}</p>
                    <p className="text-black"><strong>Name:</strong> {localName}</p>
                    <div className="mt-4 flex flex-row justify-center gap-6 text-left flex-wrap">
                        <div className="flex-1 min-w-[200px]">
                            <h3 className="text-2xl font-semibold mb-2 text-black">Inventory</h3>
                            <ul className="list-disc list-inside text-black">
                                {inventory.map((item, index) => (
                                    <li key={index}>{item.name}: {item.description}</li>
                                ))}
                            </ul>
                            <p className="text-black mt-2"><strong>Currency:</strong> {currency} gold</p>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <h3 className="text-2xl font-semibold mb-2 text-black">Abilities</h3>
                            <ul className="list-disc list-inside text-black">
                                {abilities.map((ability, index) => (
                                    <li key={index}><strong>{ability.name}:</strong> {ability.description}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <h3 className="text-2xl font-semibold mb-2 text-black">Spells</h3>
                            <ul className="list-disc list-inside text-black">
                                {spells.map((spell, index) => (
                                    <li key={index}><strong>{spell.name}:</strong> {spell.description}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <h3 className="text-2xl font-semibold mb-2 text-black">Stats</h3>
                            <ul className="list-none text-black">
                                <li><strong>Strength:</strong> {stats.strength}</li>
                                <li><strong>Dexterity:</strong> {stats.dexterity}</li>
                                <li><strong>Constitution:</strong> {stats.constitution}</li>
                                <li><strong>Intelligence:</strong> {stats.intelligence}</li>
                                <li><strong>Wisdom:</strong> {stats.wisdom}</li>
                                <li><strong>Charisma:</strong> {stats.charisma}</li>
                                <li><strong>HP:</strong> {hp}</li>
                                <li><strong>MP:</strong> {mp}</li>
                            </ul>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <h3 className="text-2xl font-semibold mb-2 text-black">Equipped</h3>
                            <ul className="list-none text-black">
                                <li><strong>Weapon:</strong> {equippedWeapon ? equippedWeapon.name : 'None'}</li>
                                <li><strong>Armor:</strong> {equippedArmor ? equippedArmor.name : 'None'}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Link href="/game">
                    <button onClick={handleBeginGame} className="mt-8 px-6 py-3 bg-green-600 text-white text-lg rounded-lg shadow-md hover:bg-green-700 transition-colors">
                        Begin Game
                    </button>
                </Link>
            </div>
        </div>
    );
}
