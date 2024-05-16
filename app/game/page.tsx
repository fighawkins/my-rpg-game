"use client";
import React, { useState, useEffect } from 'react';
import { useGameContext } from '@/context/GameContext';

export default function GamePage() {
    const [scene, setScene] = useState<string>('');
    const [input, setInput] = useState<string>('');
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const { species, characterClass, gender, name } = useGameContext();

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
                    name
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setScene(data.response);
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
                    Species: ${species}, Character Class: ${characterClass}, Gender: ${gender}, Name: ${name}`,
                    species,
                    characterClass,
                    gender,
                    name
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const aiMessage = { role: 'ai', content: data.response };

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl space-y-6">
                <header className="text-center">
                    <h1 className="text-3xl mb-2 text-gray-800">Adventure Game</h1>
                    <p className="text-lg text-gray-600">Embark on your journey and make choices to shape your destiny.</p>
                </header>
                <section className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h2 className="text-2xl mb-2 text-gray-700">Current Scene</h2>
                    <p className="text-lg text-gray-800">{scene}</p>
                </section>
                <section className="flex flex-col bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-80 overflow-y-auto">
                    <h2 className="text-2xl mb-2 text-gray-700">Game Log</h2>
                    {messages.map((message, index) => (
                        <div key={index} className={`mb-2 ${message.role === 'ai' ? 'text-left' : 'text-right'}`}>
                            <strong className={`${message.role === 'ai' ? 'text-green-500' : 'text-blue-500'}`}>
                                {message.role === 'ai' ? 'AI' : 'You'}:
                            </strong> {message.content}
                        </div>
                    ))}
                </section>
            </div>
            <section className="flex items-center w-full max-w-3xl mt-6">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUserInput()}
                    className="flex-grow p-2 text-lg border border-gray-300 rounded mr-2"
                    placeholder="Enter your action..."
                />
                <button
                    onClick={handleUserInput}
                    className="p-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Send
                </button>
            </section>
        </div>
    );
}
