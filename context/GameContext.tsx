"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

type GameState = {
    species: string;
    gender: 'male' | 'female';
    characterClass: string;
    name: string;
    inventory: string[];
    currency: number;
    setSpecies: (species: string) => void;
    setGender: (gender: 'male' | 'female') => void;
    setCharacterClass: (characterClass: string) => void;
    setName: (name: string) => void;
    setInventory: (inventory: string[]) => void;
    setCurrency: (currency: number) => void;
    useItem: (item: string) => void;
};

const initialState: GameState = {
    species: '',
    gender: 'male',
    characterClass: '',
    name: '',
    inventory: [],
    currency: 100,
    setSpecies: () => { },
    setGender: () => { },
    setCharacterClass: () => { },
    setName: () => { },
    setInventory: () => { },
    setCurrency: () => { },
    useItem: () => { },
};

const GameContext = createContext<GameState>(initialState);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [species, setSpecies] = useState(initialState.species);
    const [gender, setGender] = useState(initialState.gender);
    const [characterClass, setCharacterClass] = useState(initialState.characterClass);
    const [name, setName] = useState(initialState.name);
    const [inventory, setInventory] = useState(initialState.inventory);
    const [currency, setCurrency] = useState(initialState.currency);

    const useItem = (item: string) => {
        const newInventory = inventory.filter(invItem => invItem !== item);
        setInventory(newInventory);
    };

    return (
        <GameContext.Provider
            value={{
                species,
                gender,
                characterClass,
                name,
                inventory,
                currency,
                setSpecies,
                setGender,
                setCharacterClass,
                setName,
                setInventory,
                setCurrency,
                useItem,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext(GameContext);