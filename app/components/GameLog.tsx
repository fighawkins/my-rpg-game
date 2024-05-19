import React from 'react';

type GameLogProps = {
    messages: { role: string; content: string }[];
};

const GameLog: React.FC<GameLogProps> = ({ messages }) => {
    return (
        <section className="flex flex-col bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-80 overflow-y-auto flex-grow">
            <h2 className="text-2xl mb-2 text-gray-700">Game Log</h2>
            {messages.map((message, index) => (
                <div key={index} className={`mb-2 ${message.role === 'ai' ? 'text-left' : 'text-right'}`}>
                    <strong className={`${message.role === 'ai' ? 'text-green-500' : 'text-blue-500'}`}>
                        {message.role === 'ai' ? 'AI' : 'You'}:
                    </strong> {message.content}
                </div>
            ))}
        </section>
    );
};

export default GameLog;
