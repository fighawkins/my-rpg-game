"use client";
import React, { useState, useEffect } from 'react';
import { useGameContext } from '@/context/GameContext';
import CharacterInfo from '../components/CharacterInfo';
import GameLog from '../components/GameLog';
import InputArea from '../components/InputArea';
import AudioPlayer from '../components/AudioPlayer';
import Inventory from '../components/inventory';
import SpeakerToggle from '../components/speakertoggle';
import { parseAIResponse } from '../Utils/parseAIResponse';

const GamePage: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

    const {
        species,
        characterClass,
        gender,
        name,
        inventory,
        weapons,
        armor,
        shields,
        consumables,
        misc,
        equippedMainHand,
        equippedOffHand,
        equippedBody,
        equippedHead,
        equippedLegs,
        equippedFeet,
        equippedRing,
        equippedNecklace,
        equippedCloak,
        abilities,
        spells,
        stats,
        hp,
        mp,
        currency,
        setInventory,
        setWeapons,
        setArmor,
        setShields,
        setConsumables,
        setMisc,
        setEquippedMainHand,
        setEquippedOffHand,
        setEquippedBody,
        setEquippedHead,
        setEquippedLegs,
        setEquippedFeet,
        setEquippedRing,
        setEquippedNecklace,
        setEquippedCloak,
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
            const payload = {
                prompt: `You are a dungeon master. Set the scene for the beginning of the adventure. If the player buys an item, create an item with appropriate attributes based on the name and description. Place it in the correct inventory category and ensure it has all relevant fields filled out. End each scene with "What would you like to do next?".
                        Species: ${species}, Character Class: ${characterClass}, Gender: ${gender}, Name: ${name}, 
                        Inventory: ${inventory.map(item => `${item.name}: ${item.description}`).join(', ')}, 
                        Weapons: ${weapons.map(weapon => `${weapon.name}: ${weapon.description} (${weapon.attributes?.damage} damage)`).join(', ')}, 
                        Armor: ${armor.map(a => `${a.name}: ${a.description}`).join(', ')}, 
                        Shields: ${shields.map(s => `${s.name}: ${s.description}`).join(', ')}, 
                        Consumables: ${consumables.map(c => `${c.name}: ${c.description}`).join(', ')}, 
                        Misc: ${misc.map(m => `${m.name}: ${m.description}`).join(', ')}, 
                        Equipped Main Hand: ${equippedMainHand ? `${equippedMainHand.name}: ${equippedMainHand.description} (${equippedMainHand.attributes?.damage} damage)` : 'None'}, 
                        Equipped Off Hand: ${equippedOffHand ? `${equippedOffHand.name}: ${equippedOffHand.description} (${equippedOffHand.attributes?.armorBonus} armor)` : 'None'}, 
                        Equipped Body: ${equippedBody ? `${equippedBody.name}: ${equippedBody.description}` : 'None'}, 
                        Equipped Head: ${equippedHead ? `${equippedHead.name}: ${equippedHead.description}` : 'None'}, 
                        Equipped Legs: ${equippedLegs ? `${equippedLegs.name}: ${equippedLegs.description}` : 'None'}, 
                        Equipped Feet: ${equippedFeet ? `${equippedFeet.name}: ${equippedFeet.description}` : 'None'}, 
                        Equipped Ring: ${equippedRing ? `${equippedRing.name}: ${equippedRing.description}` : 'None'}, 
                        Equipped Necklace: ${equippedNecklace ? `${equippedNecklace.name}: ${equippedNecklace.description}` : 'None'}, 
                        Equipped Cloak: ${equippedCloak ? `${equippedCloak.name}: ${equippedCloak.description}` : 'None'}, 
                        Currency: ${currency}`,
                species,
                characterClass,
                gender,
                name,
                inventory,
                weapons,
                armor,
                shields,
                consumables,
                misc,
                equippedMainHand,
                equippedOffHand,
                equippedBody,
                equippedHead,
                equippedLegs,
                equippedFeet,
                equippedRing,
                equippedNecklace,
                equippedCloak,
                currency,
                abilities,
                spells,
                stats,
                hp,
                mp
            };
            console.log('Payload for initial scene:', payload);

            const response = await fetch('/api/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const initialScene = data.response;
            setMessages([{ role: 'ai', content: initialScene }]);

            const {
                updatedInventory,
                updatedWeapons,
                updatedArmor,
                updatedShields,
                updatedConsumables,
                updatedMisc,
                updatedCurrency,
                updatedAbilities,
                updatedSpells,
                updatedHp,
                updatedMp,
                updatedEquippedMainHand,
                updatedEquippedOffHand,
                updatedEquippedBody,
                updatedEquippedHead,
                updatedEquippedLegs,
                updatedEquippedFeet,
                updatedEquippedRing,
                updatedEquippedNecklace,
                updatedEquippedCloak
            } = parseAIResponse(
                initialScene,
                inventory,
                weapons,
                armor,
                shields,
                consumables,
                misc,
                currency,
                abilities,
                spells,
                hp,
                mp,
                equippedMainHand,
                equippedOffHand,
                equippedBody,
                equippedHead,
                equippedLegs,
                equippedFeet,
                equippedRing,
                equippedNecklace,
                equippedCloak
            );

            setHp(updatedHp);
            setMp(updatedMp);
            setInventory(updatedInventory);
            setWeapons(updatedWeapons);
            setArmor(updatedArmor);
            setShields(updatedShields);
            setConsumables(updatedConsumables);
            setMisc(updatedMisc);
            setCurrency(updatedCurrency);
            setEquippedMainHand(updatedEquippedMainHand);
            setEquippedOffHand(updatedEquippedOffHand);
            setEquippedBody(updatedEquippedBody);
            setEquippedHead(updatedEquippedHead);
            setEquippedLegs(updatedEquippedLegs);
            setEquippedFeet(updatedEquippedFeet);
            setEquippedRing(updatedEquippedRing);
            setEquippedNecklace(updatedEquippedNecklace);
            setEquippedCloak(updatedEquippedCloak);

        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleUserInput = async () => {
        const userMessage = { role: 'user', content: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput('');

        try {
            const contextMessages = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
            const payload = {
                prompt: `You are a dungeon master. Continue the story based on the following context and player's action. Do not repeat information already provided in previous responses. Respond concisely, and end with "What would you like to do next?".
                
                        Context: ${contextMessages}
                        Player's action: ${input}
                        Species: ${species}, Character Class: ${characterClass}, Gender: ${gender}, Name: ${name}, 
                        Inventory: ${inventory.map(item => `${item.name}: ${item.description}`).join(', ')}, 
                        Weapons: ${weapons.map(weapon => `${weapon.name}: ${weapon.description} (${weapon.attributes.damage} damage)`).join(', ')}, 
                        Armor: ${armor.map(a => `${a.name}: ${a.description}`).join(', ')}, 
                        Equipped Weapon: ${equippedMainHand ? `${equippedMainHand.name}: ${equippedMainHand.description} (${equippedMainHand.attributes.damage} damage)` : 'None'}, 
                        Equipped Off-Hand: ${equippedOffHand ? `${equippedOffHand.name}: ${equippedOffHand.description}` : 'None'}, 
                        Equipped Armor: ${equippedBody ? `${equippedBody.name}: ${equippedBody.description}` : 'None'}, 
                        Equipped Head: ${equippedHead ? `${equippedHead.name}: ${equippedHead.description}` : 'None'}, 
                        Equipped Legs: ${equippedLegs ? `${equippedLegs.name}: ${equippedLegs.description}` : 'None'}, 
                        Equipped Feet: ${equippedFeet ? `${equippedFeet.name}: ${equippedFeet.description}` : 'None'}, 
                        Equipped Ring: ${equippedRing ? `${equippedRing.name}: ${equippedRing.description}` : 'None'}, 
                        Equipped Necklace: ${equippedNecklace ? `${equippedNecklace.name}: ${equippedNecklace.description}` : 'None'}, 
                        Equipped Cloak: ${equippedCloak ? `${equippedCloak.name}: ${equippedCloak.description}` : 'None'}, 
                        Currency: ${currency}`,
                species,
                characterClass,
                gender,
                name,
                inventory,
                weapons,
                armor,
                shields,
                consumables,
                misc,
                equippedMainHand,
                equippedOffHand,
                equippedBody,
                equippedHead,
                equippedLegs,
                equippedFeet,
                equippedRing,
                equippedNecklace,
                equippedCloak,
                currency,
                abilities,
                spells,
                stats,
                hp,
                mp,
            };
            console.log('Payload for user input:', payload);

            const response = await fetch('/api/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const aiMessage = { role: 'ai', content: data.response };

            const {
                updatedInventory,
                updatedWeapons,
                updatedArmor,
                updatedShields,
                updatedConsumables,
                updatedMisc,
                updatedCurrency,
                updatedAbilities,
                updatedSpells,
                updatedHp,
                updatedMp,
                updatedEquippedMainHand,
                updatedEquippedOffHand,
                updatedEquippedBody,
                updatedEquippedHead,
                updatedEquippedLegs,
                updatedEquippedFeet,
                updatedEquippedRing,
                updatedEquippedNecklace,
                updatedEquippedCloak
            } = parseAIResponse(
                aiMessage.content,
                inventory,
                weapons,
                armor,
                shields,
                consumables,
                misc,
                currency,
                abilities,
                spells,
                hp,
                mp,
                equippedMainHand,
                equippedOffHand,
                equippedBody,
                equippedHead,
                equippedLegs,
                equippedFeet,
                equippedRing,
                equippedNecklace,
                equippedCloak
            );

            setHp(updatedHp);
            setMp(updatedMp);
            setInventory(updatedInventory);
            setWeapons(updatedWeapons);
            setArmor(updatedArmor);
            setShields(updatedShields);
            setConsumables(updatedConsumables);
            setMisc(updatedMisc);
            setCurrency(updatedCurrency);
            setEquippedMainHand(updatedEquippedMainHand);
            setEquippedOffHand(updatedEquippedOffHand);
            setEquippedBody(updatedEquippedBody);
            setEquippedHead(updatedEquippedHead);
            setEquippedLegs(updatedEquippedLegs);
            setEquippedFeet(updatedEquippedFeet);
            setEquippedRing(updatedEquippedRing);
            setEquippedNecklace(updatedEquippedNecklace);
            setEquippedCloak(updatedEquippedCloak);

            setMessages((prevMessages) => [...prevMessages, aiMessage]);

            window.scrollTo(0, document.body.scrollHeight);
        } catch (error) {
            console.error('Error handling user input:', error);
        }
    };
    const togglePlay = () => {
        setIsPlaying(!isPlaying);
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
                    <Inventory
                        inventory={inventory}
                        weapons={weapons}
                        armor={armor}
                        shields={shields}
                        consumables={consumables}
                        misc={misc}
                        equippedMainHand={equippedMainHand}
                        equippedOffHand={equippedOffHand}
                        equippedBody={equippedBody}
                        equippedHead={equippedHead}
                        equippedLegs={equippedLegs}
                        equippedFeet={equippedFeet}
                        equippedRing={equippedRing}
                        equippedNecklace={equippedNecklace}
                        equippedCloak={equippedCloak}
                        currency={currency}
                        abilities={abilities}
                        spells={spells}
                    />
                </div>
            </div>
            <SpeakerToggle isPlaying={isPlaying} togglePlay={togglePlay} />
            <AudioPlayer isPlaying={isPlaying} />
        </div>
    );
};

export default GamePage;
