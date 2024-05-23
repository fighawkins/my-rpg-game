"use client";
import React, { createContext, useContext, useState } from 'react';
import { Item, classifyItem } from '@/data/itemSchema';
import { classOptions, Stats } from '@/data/classes';
import { weapons as allWeapons } from '@/data/weapons';
import { armor as allArmor } from '@/data/armor';
import { shields as allShields } from '@/data/shields';
import { speciesOptions } from '@/data/species';
import { Ability } from '@/data/abilities';
import { Spell } from '@/data/spells';

type GameContextType = {
    species: string;
    characterClass: string;
    gender: 'male' | 'female';
    name: string;
    inventory: Item[];
    weapons: Item[];
    armor: Item[];
    shields: Item[];
    consumables: Item[];
    misc: Item[];
    equippedMainHand: Item | null;
    equippedOffHand: Item | null;
    equippedBody: Item | null;
    equippedHead: Item | null;
    equippedLegs: Item | null;
    equippedFeet: Item | null;
    equippedRing: Item | null;
    equippedNecklace: Item | null;
    equippedCloak: Item | null;
    setSpecies: (species: string) => void;
    setCharacterClass: (characterClass: string) => void;
    setGender: (gender: 'male' | 'female') => void;
    setName: (name: string) => void;
    setInventory: (inventory: Item[]) => void;
    setWeapons: (weapons: Item[]) => void;
    setArmor: (armor: Item[]) => void;
    setShields: (shields: Item[]) => void;
    setConsumables: (consumables: Item[]) => void;
    setMisc: (misc: Item[]) => void;
    setEquippedMainHand: (item: Item | null) => void;
    setEquippedOffHand: (item: Item | null) => void;
    setEquippedBody: (item: Item | null) => void;
    setEquippedHead: (item: Item | null) => void;
    setEquippedLegs: (item: Item | null) => void;
    setEquippedFeet: (item: Item | null) => void;
    setEquippedRing: (item: Item | null) => void;
    setEquippedNecklace: (item: Item | null) => void;
    setEquippedCloak: (item: Item | null) => void;
    abilities: Ability[];
    spells: Spell[];
    stats: Stats;
    hp: number;
    mp: number;
    currency: number;
    setAbilities: (abilities: Ability[]) => void;
    setSpells: (spells: Spell[]) => void;
    setStats: (stats: Stats) => void;
    setHp: (hp: number) => void;
    setMp: (mp: number) => void;
    setCurrency: (currency: number) => void;
    initializeCharacter: (species: string, characterClass: string) => void;
    addAbility: (ability: Ability) => void;
    addSpell: (spell: Spell) => void;
    equipItem: (item: Item) => void;
    unequipItem: (item: Item) => void;
    updateAbilitiesAndSpells: (newAbilities: Ability[], newSpells: Spell[]) => void;
};

const defaultStats: Stats = {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [species, setSpecies] = useState<string>('');
    const [characterClass, setCharacterClass] = useState<string>('');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [name, setName] = useState<string>('');
    const [inventory, setInventory] = useState<Item[]>([]);
    const [weapons, setWeapons] = useState<Item[]>([]);
    const [armor, setArmor] = useState<Item[]>([]);
    const [shields, setShields] = useState<Item[]>([]);
    const [consumables, setConsumables] = useState<Item[]>([]);
    const [misc, setMisc] = useState<Item[]>([]);
    const [equippedMainHand, setEquippedMainHand] = useState<Item | null>(null);
    const [equippedOffHand, setEquippedOffHand] = useState<Item | null>(null);
    const [equippedBody, setEquippedBody] = useState<Item | null>(null);
    const [equippedHead, setEquippedHead] = useState<Item | null>(null);
    const [equippedLegs, setEquippedLegs] = useState<Item | null>(null);
    const [equippedFeet, setEquippedFeet] = useState<Item | null>(null);
    const [equippedRing, setEquippedRing] = useState<Item | null>(null);
    const [equippedNecklace, setEquippedNecklace] = useState<Item | null>(null);
    const [equippedCloak, setEquippedCloak] = useState<Item | null>(null);
    const [abilities, setAbilities] = useState<Ability[]>([]);
    const [spells, setSpells] = useState<Spell[]>([]);
    const [stats, setStats] = useState<Stats>(defaultStats);
    const [hp, setHp] = useState<number>(20);
    const [mp, setMp] = useState<number>(10);
    const [currency, setCurrency] = useState<number>(100);

    const initializeCharacter = (species: string, characterClass: string) => {
        const selectedSpecies = speciesOptions.find(s => s.name === species);
        const selectedClass = classOptions.find(c => c.name === characterClass);
        if (!selectedSpecies || !selectedClass) {
            console.error(`Species ${species} or Class ${characterClass} not found`);
            return;
        }

        const startingItems = selectedClass.startingItems.map(itemName => classifyItem(itemName, ''));
        const startingWeapons = selectedClass.startingWeapons.map(weaponName => {
            const weapon = allWeapons.find(w => w.name === weaponName);
            return weapon || { name: weaponName, type: 'weapon', description: 'Unknown weapon', weight: 0, equippable: true, attributes: { damage: '0' } };
        });

        const startingArmor = selectedClass.startingArmor.map(armorName => {
            const armor = allArmor.find(a => a.name === armorName);
            return armor || { name: armorName, type: 'armor', description: 'Unknown armor', weight: 0, equippable: true };
        });

        const startingShields = selectedClass.startingShields.map(shieldName => {
            const shield = allShields.find(s => s.name === shieldName);
            return shield || { name: shieldName, type: 'shield', description: 'Unknown shield', weight: 0, equippable: true };
        });

        setInventory([...startingItems, ...startingWeapons, ...startingArmor, ...startingShields]);
        setWeapons(startingWeapons);
        setArmor(startingArmor);
        setShields(startingShields);
        setAbilities(selectedClass.abilities);
        setSpells(selectedClass.spells);
        setStats({
            strength: selectedSpecies.baseStats.strength + selectedClass.statModifiers.strength,
            dexterity: selectedSpecies.baseStats.dexterity + selectedClass.statModifiers.dexterity,
            constitution: selectedSpecies.baseStats.constitution + selectedClass.statModifiers.constitution,
            intelligence: selectedSpecies.baseStats.intelligence + selectedClass.statModifiers.intelligence,
            wisdom: selectedSpecies.baseStats.wisdom + selectedClass.statModifiers.wisdom,
            charisma: selectedSpecies.baseStats.charisma + selectedClass.statModifiers.charisma,
        });
        setHp(selectedClass.startingHP);
        setMp(selectedClass.startingMP);
        setCurrency(selectedClass.startingCurrency || 0);

        if (startingWeapons.length > 0) setEquippedMainHand(startingWeapons[0]);
        if (startingArmor.length > 0) setEquippedBody(startingArmor[0]);
        if (startingShields.length > 0) setEquippedOffHand(startingShields[0]);
    };

    const equipItem = (item: Item) => {
        console.log("Equipping item:", item);
        if (item.slot) {
            switch (item.slot) {
                case 'main_hand':
                    setEquippedMainHand(item);
                    break;
                case 'off_hand':
                    setEquippedOffHand(item);
                    break;
                case 'body':
                    setEquippedBody(item);
                    break;
                case 'head':
                    setEquippedHead(item);
                    break;
                case 'legs':
                    setEquippedLegs(item);
                    break;
                case 'feet':
                    setEquippedFeet(item);
                    break;
                case 'ring':
                    setEquippedRing(item);
                    break;
                case 'necklace':
                    setEquippedNecklace(item);
                    break;
                case 'cloak':
                    setEquippedCloak(item);
                    break;
                default:
                    console.error('Invalid item slot:', item.slot);
            }
        } else {
            console.error('Item has no slot:', item);
        }
    };

    const unequipItem = (item: Item) => {
        console.log("Unequipping item:", item);
        if (item.slot) {
            switch (item.slot) {
                case 'main_hand':
                    setEquippedMainHand(null);
                    break;
                case 'off_hand':
                    setEquippedOffHand(null);
                    break;
                case 'body':
                    setEquippedBody(null);
                    break;
                case 'head':
                    setEquippedHead(null);
                    break;
                case 'legs':
                    setEquippedLegs(null);
                    break;
                case 'feet':
                    setEquippedFeet(null);
                    break;
                case 'ring':
                    setEquippedRing(null);
                    break;
                case 'necklace':
                    setEquippedNecklace(null);
                    break;
                case 'cloak':
                    setEquippedCloak(null);
                    break;
                default:
                    console.error('Invalid item slot:', item.slot);
            }
        } else {
            console.error('Item has no slot:', item);
        }
    };

    const updateAbilitiesAndSpells = (newAbilities: Ability[], newSpells: Spell[]) => {
        setAbilities(newAbilities);
        setSpells(newSpells);
    };

    const context = {
        species,
        characterClass,
        gender,
        name,
        inventory,
        weapons,
        armor,
        shields,
        consumables,
        misc,
        equippedMainHand,
        equippedOffHand,
        equippedBody,
        equippedHead,
        equippedLegs,
        equippedFeet,
        equippedRing,
        equippedNecklace,
        equippedCloak,
        abilities,
        spells,
        stats,
        hp,
        mp,
        currency,
        setSpecies,
        setCharacterClass,
        setGender,
        setName,
        setInventory,
        setWeapons,
        setArmor,
        setShields,
        setConsumables,
        setMisc,
        setEquippedMainHand,
        setEquippedOffHand,
        setEquippedBody,
        setEquippedHead,
        setEquippedLegs,
        setEquippedFeet,
        setEquippedRing,
        setEquippedNecklace,
        setEquippedCloak,
        setAbilities,
        setSpells,
        setStats,
        setHp,
        setMp,
        setCurrency,
        initializeCharacter,
        addAbility: (ability: Ability) => setAbilities([...abilities, ability]),
        addSpell: (spell: Spell) => setSpells([...spells, spell]),
        equipItem,
        unequipItem,
        updateAbilitiesAndSpells,
    };

    return (
        <GameContext.Provider value={context}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("GameContext must be used within a GameProvider");
    }
    return context;
};
