"use client";
import React, { useState, useEffect } from 'react';
import { useGameContext } from '@/context/GameContext';
import CharacterInfo from '../components/CharacterInfo';
import GameLog from '../components/GameLog';
import InputArea from '../components/InputArea';
import Inventory from '../components/inventory';
import { items } from '@/data/items';

const GamePage: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const {
        species,
        characterClass,
        gender,
        name,
        inventory,
        weapons,
        armor,
        equippedWeapon,
        equippedArmor,
        abilities,
        spells,
        stats,
        hp,
        mp,
        currency,
        setInventory,
        setWeapons,
        setArmor,
        setEquippedWeapon,
        setEquippedArmor,
        setHp,
        setMp,
        setCurrency,
        updateAbilitiesAndSpells
    } = useGameContext();

    useEffect(() => {
        fetchInitialScene();
    }, []);

    const fetchInitialScene = async () => {
        try {
            const response = await fetch('/api/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: "You are a dungeon master. Set the scene for the beginning of the adventure. Keep it concise under three sentences, and end by asking the player what they want to do. The player will respond with whatever they see fit.",
                    species,
                    characterClass,
                    gender,
                    name,
                    inventory,
                    weapons,
                    armor,
                    equippedWeapon,
                    equippedArmor,
                    currency,
                    abilities,
                    spells,
                    stats,
                    hp,
                    mp
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const initialScene = data.response;
            setMessages([{ role: 'ai', content: initialScene }]);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleUserInput = async () => {
        const userMessage = { role: 'user', content: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput('');

        try {
            const response = await fetch('/api/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: `You are a dungeon master. Continue the story based on the following context and player's action. Do not repeat information already provided in previous responses. Respond concisely, and end with "What would you like to do next?".
        
                    Context: ${messages.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
                    Player's action: ${input}
                    Species: ${species}, Character Class: ${characterClass}, Gender: ${gender}, Name: ${name}, Inventory: ${inventory.map(item => item.name).join(', ')}, Weapons: ${weapons.map(w => w.name).join(', ')}, Armor: ${armor.map(a => a.name).join(', ')}, Equipped Weapon: ${equippedWeapon ? equippedWeapon.name : 'None'}, Equipped Armor: ${equippedArmor ? equippedArmor.name : 'None'}, Currency: ${currency}`,
                    species,
                    characterClass,
                    gender,
                    name,
                    inventory,
                    weapons,
                    armor,
                    equippedWeapon,
                    equippedArmor,
                    currency,
                    abilities,
                    spells,
                    stats,
                    hp,
                    mp,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const aiMessage = { role: 'ai', content: data.response };

            // Parse the API response for updated status
            const updatedInventoryMatch = data.response.match(/\*\*Inventory\*\*: (.*?)\s*$/m);
            const updatedCurrencyMatch = data.response.match(/\*\*Currency\*\*: (\d+) gold/m);
            const updatedAbilitiesMatch = data.response.match(/\*\*Abilities\*\*: (.*?)\s*$/m);
            const updatedSpellsMatch = data.response.match(/\*\*Spells\*\*: (.*?)\s*$/m);
            const updatedHpMatch = data.response.match(/\*\*HP\*\*: (\d+) HP/m);
            const updatedMpMatch = data.response.match(/\*\*MP\*\*: (\d+) MP/m);

            const newItems = updatedInventoryMatch ? updatedInventoryMatch[1].split(', ').filter(item => item !== '').map(itemName => items.find(item => item.name === itemName) || { name: itemName, description: '' }) : [];
            const updatedInventory = [...inventory, ...newItems.filter(newItem => !inventory.some(item => item.name === newItem.name))];
            const updatedCurrency = updatedCurrencyMatch ? parseInt(updatedCurrencyMatch[1], 10) : currency;
            const updatedAbilities = updatedAbilitiesMatch ? parseAbilities(updatedAbilitiesMatch[1]) : abilities;
            const updatedSpells = updatedSpellsMatch ? parseSpells(updatedSpellsMatch[1]) : spells;
            const updatedHp = updatedHpMatch ? parseInt(updatedHpMatch[1], 10) : hp;
            const updatedMp = updatedMpMatch ? parseInt(updatedMpMatch[1], 10) : mp;

            setHp(updatedHp);
            setMp(updatedMp);
            setInventory(updatedInventory);
            setCurrency(updatedCurrency);
            updateAbilitiesAndSpells(updatedAbilities, updatedSpells);

            // Ensure the response is not cut off and ends with a prompt
            if (!aiMessage.content.endsWith("What would you like to do next?")) {
                aiMessage.content += " What would you like to do next?";
            }

            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center p-6 text-gray-800">
            <div className="flex flex-row items-start justify-center max-w-7xl w-full space-x-6 p-6 bg-[#825f2644] rounded-lg shadow-lg">
                <div className="w-1/4 bg-[#FFFDDD] p-4 rounded-lg shadow-md">
                    <CharacterInfo species={species} characterClass={characterClass} name={name} stats={stats} hp={hp} mp={mp} gender={gender} />
                </div>
                <div className="w-2/4 bg-[#FFFDDD] p-4 rounded-lg shadow-md flex flex-col">
                    <header className="text-center mb-6">
                        <h1 className="text-4xl font-bold mb-2">Go Forth...</h1>
                    </header>
                    <GameLog messages={messages} />
                    <InputArea input={input} setInput={setInput} handleUserInput={handleUserInput} />
                </div>
                <div className="w-1/4 bg-[#FFFDDD] p-4 rounded-lg shadow-md">
                    <Inventory inventory={inventory} weapons={weapons} armor={armor} equippedWeapon={equippedWeapon} equippedArmor={equippedArmor} currency={currency} abilities={abilities} spells={spells} />
                </div>
            </div>
        </div>
    );
};

export default GamePage;
