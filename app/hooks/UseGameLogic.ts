import { useState, useEffect } from 'react';
import { useGameContext } from '@/context/GameContext';
import { appendToSummary, loadSummary, saveSummary, serializeResponses } from '../Utils/Summary';
import { fetchInitialScene, fetchUserInput } from '../Utils/Api';
import { parseAbilities, parseSpells } from '../Utils/CharacterUtils';

export const useGameLogic = () => {
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
        const loadInitialScene = async () => {
            const loadedSummary = loadSummary();
            try {
                const data = await fetchInitialScene({
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
                    mp,
                    summary: loadedSummary
                });
                const initialScene = data.response;
                setMessages([{ role: 'ai', content: initialScene }]);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        loadInitialScene();
    }, [species, characterClass, gender, name, inventory, currency, abilities, spells, stats, hp, mp]);

    const handleUserInput = async () => {
        const userMessage = { role: 'user', content: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput('');

        try {
            const context = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
            const data = await fetchUserInput({
                prompt: `You are a dungeon master. Continue the story based on the following context and player's action. Do not repeat information already provided in previous responses. Respond concisely, and end with "What would you like to do next?". 
                Context: ${context}
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
            });

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

            // Update context states before updating messages to avoid racing conditions
            setHp(updatedHp);
            setMp(updatedMp);
            setInventory(updatedInventory);
            setCurrency(updatedCurrency);
            updateAbilitiesAndSpells(updatedAbilities, updatedSpells);

            // Ensure the response is not cut off and ends with a prompt
            if (!aiMessage.content.endsWith("What would you like to do next?")) {
                aiMessage.content += " What would you like to do next?";
            }

            // Add AI message to messages state
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, aiMessage];

                // Summarize and serialize responses every 10 turns and append to the existing summary
                if (updatedMessages.length >= 10 && updatedMessages.length % 10 === 0) {
                    const last10Responses = updatedMessages.slice(-10).map(msg => msg.content);
                    const serializedSummary = serializeResponses(last10Responses);
                    const existingSummary = loadSummary();
                    const updatedSummary = appendToSummary(existingSummary, JSON.parse(serializedSummary).summary);
                    saveSummary(updatedSummary);
                }

                return updatedMessages;
            });

        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    return {
        input,
        setInput,
        messages,
        handleUserInput,
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
        currency
    };
};
