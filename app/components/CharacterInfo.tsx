import React from 'react';

type CharacterInfoProps = {
    species: string;
    characterClass: string;
    name: string;
};

const CharacterInfo: React.FC<CharacterInfoProps> = ({ species, characterClass, name }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Character Info</h2>
            <p><strong>Species:</strong> {species}</p>
            <p><strong>Class:</strong> {characterClass}</p>
            <p><strong>Name:</strong> {name}</p>
        </div>
    );
};

export default CharacterInfo;
