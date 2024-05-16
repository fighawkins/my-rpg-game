"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

type GameState = {
    species: string;
    gender: 'male' | 'female';
    characterClass: string;
    name: string;
    setSpecies: (species: string) => void;
    setGender: (gender: 'male' | 'female') => void;
    setCharacterClass: (characterClass: string) => void;
    setName: (name: string) => void;
};

const initialState: GameState = {
    species: '',
    gender: 'male',
    characterClass: '',
    name: '',
    setSpecies: () => { },
    setGender: () => { },
    setCharacterClass: () => { },
    setName: () => { },
};

const GameContext = createContext<GameState>(initialState);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [species, setSpecies] = useState(initialState.species);
    const [gender, setGender] = useState(initialState.gender);
    const [characterClass, setCharacterClass] = useState(initialState.characterClass);
    const [name, setName] = useState(initialState.name);

    return (
        <GameContext.Provider value={{ species, gender, characterClass, name, setSpecies, setGender, setCharacterClass, setName }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext(GameContext);
