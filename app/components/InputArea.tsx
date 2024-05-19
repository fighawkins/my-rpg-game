import React from 'react';

type InputAreaProps = {
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    handleUserInput: () => void;
};

const InputArea: React.FC<InputAreaProps> = ({ input, setInput, handleUserInput }) => {
    return (
        <div className="mt-6 flex items-center space-x-4">
            <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleUserInput()}
            />
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleUserInput}
            >
                Send
            </button>
        </div>
    );
};

export default InputArea;
