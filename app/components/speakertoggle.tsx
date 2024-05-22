import React from 'react';

type SpeakerToggleProps = {
    isPlaying: boolean;
    togglePlay: () => void;
};

const SpeakerToggle: React.FC<SpeakerToggleProps> = ({ isPlaying, togglePlay }) => {
    return (
        <button onClick={togglePlay} className="focus:outline-none text-white">
            {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l-6 6h4l6-6v12m5-1.038V5.038M21 5.038L17.344 8.7m0 6.6L21 18.962" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l-6 6h4l6-6v12M15 12h.01M19 12h.01M23 12h.01" />
                </svg>
            )}
        </button>
    );
};

export default SpeakerToggle;
