"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Ability, Spell, classOptions } from '../data/classes';
import { speciesOptions } from '@/data/species';

type GameState = {
    species: string;
    gender: 'male' | 'female';
    characterClass: string;
    name: string;
    inventory: string[];
    currency: number;
    abilities: Ability[];
    spells: Spell[];
    setSpecies: (species: string) => void;
    setGender: (gender: 'male' | 'female') => void;
    setCharacterClass: (characterClass: string) => void;
    setName: (name: string) => void;
    setInventory: (inventory: string[]) => void;
    setCurrency: (currency: number) => void;
    setAbilities: (abilities: Ability[]) => void;
    setSpells: (spells: Spell[]) => void;
    useItem: (item: string) => void;
    initializeCharacter: (speciesName: string, className: string) => void;
    updateAbilitiesAndSpells: (newAbilities: Ability[], newSpells: Spell[]) => void;
};

const initialState: GameState = {
    species: '',
    gender: 'male',
    characterClass: '',
    name: '',
    inventory: [],
    currency: 100,
    abilities: [],
    spells: [],
    setSpecies: () => { },
    setGender: () => { },
    setCharacterClass: () => { },
    setName: () => { },
    setInventory: () => { },
    setCurrency: () => { },
    setAbilities: () => { },
    setSpells: () => { },
    useItem: () => { },
    initializeCharacter: () => { },
    updateAbilitiesAndSpells: () => { },
};

const GameContext = createContext<GameState>(initialState);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [species, setSpecies] = useState(initialState.species);
    const [gender, setGender] = useState(initialState.gender);
    const [characterClass, setCharacterClass] = useState(initialState.characterClass);
    const [name, setName] = useState(initialState.name);
    const [inventory, setInventory] = useState(initialState.inventory);
    const [currency, setCurrency] = useState(initialState.currency);
    const [abilities, setAbilities] = useState(initialState.abilities);
    const [spells, setSpells] = useState(initialState.spells);

    const useItem = (item: string) => {
        const newInventory = inventory.filter(invItem => invItem !== item);
        setInventory(newInventory);
    };

    const initializeCharacter = (speciesName: string, className: string) => {
        const species = speciesOptions.find(s => s.name === speciesName);
        const charClass = classOptions.find(c => c.name === className);

        if (species && charClass) {
            setAbilities([...species.abilities, ...charClass.abilities]);
            setSpells([...charClass.spells]);
        }
    };

    const updateAbilitiesAndSpells = (newAbilities: Ability[], newSpells: Spell[]) => {
        setAbilities(newAbilities);
        setSpells(newSpells);
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
                abilities,
                spells,
                setSpecies,
                setGender,
                setCharacterClass,
                setName,
                setInventory,
                setCurrency,
                setAbilities,
                setSpells,
                useItem,
                initializeCharacter,
                updateAbilitiesAndSpells,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext(GameContext);
