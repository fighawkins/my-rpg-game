import React from 'react';

type GameLogProps = {
    messages: { role: string; content: string }[];
};

const GameLog: React.FC<GameLogProps> = ({ messages }) => {
    return (
        <section
            className="flex flex-col bg-gray-50 bg-center bg-cover p-4 rounded-lg border border-gray-200 max-h-80 overflow-y-auto flex-grow"
            style={{ backgroundImage: `public/images/homepage1.webp')` }}
        >
            <h2 className="text-2xl mb-2 text-gray-800 bg-opacity-50 bg-white p-2 rounded">Game Log</h2>
            {messages.map((message, index) => (
                <div key={index} className={`mb-2 ${message.role === 'ai' ? 'text-left' : 'text-right'}`}>
                    <strong className={`${message.role === 'ai' ? 'text-green-500' : 'text-blue-500'} text-lg`}>
                        {message.role === 'ai' ? 'DM' : 'You'}:
                    </strong> <span className="text-lg bg-opacity-50 bg-white p-1 rounded">{message.content}</span>
                </div>
            ))}
        </section>
    );
};

export default GameLog;
