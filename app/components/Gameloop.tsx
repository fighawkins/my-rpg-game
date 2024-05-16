"use client";

import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

interface Message {
    role: 'user' | 'ai';
    content: string;
}

const GameLoop: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");

    const handleUserInput = async () => {
        if (!input.trim()) return;
        const userMessage: Message = { role: 'user', content: input.trim() };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput("");

        try {
            const response = await fetch('/api/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: input.trim() }),
            });

            const data = await response.json();

            if (response.ok) {
                const aiMessage: Message = { role: 'ai', content: data.response };
                setMessages((prevMessages) => [...prevMessages, userMessage, aiMessage]);
            } else {
                console.error('Error from API:', data.error);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}><strong>{msg.role === 'user' ? 'You' : 'DM'}:</strong> {msg.content}</p>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="What do you want to do?"
            />
            <button onClick={handleUserInput}>Send</button>
        </div>
    );
};

const GamePage: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the Adventure!</h1>
            <GameLoop />
        </div>
    );
};

export default GamePage;
