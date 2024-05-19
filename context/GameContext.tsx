"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Ability, Spell, classOptions, Stats } from '../data/classes';
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
    stats: Stats;
    hp: number;
    mp: number;
    setSpecies: (species: string) => void;
    setGender: (gender: 'male' | 'female') => void;
    setCharacterClass: (characterClass: string) => void;
    setName: (name: string) => void;
    setInventory: (inventory: string[]) => void;
    setCurrency: (currency: number) => void;
    setAbilities: (abilities: Ability[]) => void;
    setSpells: (spells: Spell[]) => void;
    setStats: (stats: Stats) => void;
    setHp: (hp: number) => void;
    setMp: (mp: number) => void;
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
    stats: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
    },
    hp: 0,
    mp: 0,
    setSpecies: () => { },
    setGender: () => { },
    setCharacterClass: () => { },
    setName: () => { },
    setInventory: () => { },
    setCurrency: () => { },
    setAbilities: () => { },
    setSpells: () => { },
    setStats: () => { },
    setHp: () => { },
    setMp: () => { },
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
    const [stats, setStats] = useState(initialState.stats);
    const [hp, setHp] = useState(initialState.hp);
    const [mp, setMp] = useState(initialState.mp);

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

            // Combine base stats and class stat modifiers
            const combinedStats: Stats = {
                strength: species.baseStats.strength + charClass.statModifiers.strength,
                dexterity: species.baseStats.dexterity + charClass.statModifiers.dexterity,
                constitution: species.baseStats.constitution + charClass.statModifiers.constitution,
                intelligence: species.baseStats.intelligence + charClass.statModifiers.intelligence,
                wisdom: species.baseStats.wisdom + charClass.statModifiers.wisdom,
                charisma: species.baseStats.charisma + charClass.statModifiers.charisma,
            };

            // Calculate HP and MP based on class starting values
            const initialHp = charClass.startingHP;
            const initialMp = charClass.startingMP;

            setStats(combinedStats);
            setHp(initialHp);
            setMp(initialMp);
            setInventory(charClass.startingItems); // Add starting items to inventory
        }
    };

    const updateAbilitiesAndSpells = (newAbilities: Ability[], newSpells: Spell[]) => {
        setAbilities((prevAbilities) => {
            const updatedAbilities = [...prevAbilities, ...newAbilities];
            // Remove duplicates
            return updatedAbilities.filter((ability, index, self) =>
                index === self.findIndex((a) => a.name === ability.name)
            );
        });

        setSpells((prevSpells) => {
            const updatedSpells = [...prevSpells, ...newSpells];
            // Remove duplicates
            return updatedSpells.filter((spell, index, self) =>
                index === self.findIndex((s) => s.name === spell.name)
            );
        });
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
                stats,
                hp,
                mp,
                setSpecies,
                setGender,
                setCharacterClass,
                setName,
                setInventory,
                setCurrency,
                setAbilities,
                setSpells,
                setStats,
                setHp,
                setMp,
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
