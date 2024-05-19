"use client";
import React, { useState, useEffect } from 'react';
import { useGameContext } from '@/context/GameContext';
import Inventory from '../components/inventory';
import CharacterInfo from '../components/CharacterInfo';
import GameLog from '../components/GameLog';
import InputArea from '../components/InputArea';



const GamePage: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const {
        species,
        characterClass,
        gender,
        name,
        inventory,
        abilities,
        spells,
        stats,
        hp,
        mp,
        currency,
        setInventory,
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
                    Species: ${species}, Character Class: ${characterClass}, Gender: ${gender}, Name: ${name}, Inventory: ${inventory.join(', ')}, Currency: ${currency}`,
                    species,
                    characterClass,
                    gender,
                    name,
                    inventory,
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


            const updatedInventory = updatedInventoryMatch ? updatedInventoryMatch[1].split(', ').filter(item => item !== 'None') : inventory;
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

    // Helper functions to parse abilities and spells
    const parseAbilities = (abilitiesString: string) => {
        return abilitiesString.trim().split(',').map(ability => {
            const [name, description] = ability.split(':').map(part => part.trim());
            return { name, description };
        });
    };

    const parseSpells = (spellsString: string) => {
        return spellsString.trim().split(',').map(spell => {
            const [name, description] = spell.split(':').map(part => part.trim());
            return { name, description };
        });
    };

    return (
        <div className="flex flex-row items-start justify-center min-h-screen bg-gray-100 p-6 space-x-4">
            <div className="w-1/4 bg-white rounded-lg shadow-lg p-4 space-y-4">
                <CharacterInfo species={species} characterClass={characterClass} name={name} />
                <Inventory inventory={inventory} currency={currency} abilities={abilities} spells={spells} stats={stats} hp={hp} mp={mp} />
            </div>
            <div className="w-3/4 flex flex-col">
                <header className="text-center">
                    <h1 className="text-3xl mb-2 text-gray-800">Adventure Game</h1>
                    <p className="text-lg text-gray-600">Embark on your journey and make choices to shape your destiny.</p>
                </header>
                <GameLog messages={messages} />
                <InputArea input={input} setInput={setInput} handleUserInput={handleUserInput} />
            </div>
        </div>
    );
};

export default GamePage;
