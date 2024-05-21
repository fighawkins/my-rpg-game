"use client";
import React, { createContext, useContext, useState } from 'react';
import { Item, items } from '@/data/itemSchema';
import { Ability, abilities } from '@/data/abilities';
import { Spell, spells } from '@/data/spells';
import { classOptions, Class, Stats } from '@/data/classes';
import { weapons } from '@/data/weapons';
import { armor as armorItems, shields } from '@/data/armor';

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
    equippedWeapon: Item | null;
    equippedArmor: Item | null;
    equippedShield: Item | null;
    abilities: Ability[];
    spells: Spell[];
    stats: Stats;
    hp: number;
    mp: number;
    currency: number;
    initializeCharacter: (species: string, characterClass: string) => void;

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
    setEquippedWeapon: (weapon: Item | null) => void;
    setEquippedArmor: (armor: Item | null) => void;
    setEquippedShield: (shield: Item | null) => void;
    setAbilities: (abilities: Ability[]) => void;
    setSpells: (spells: Spell[]) => void;
    setStats: (stats: Stats) => void;
    setHp: (hp: number) => void;
    setMp: (mp: number) => void;
    setCurrency: (currency: number) => void;
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
    const [equippedWeapon, setEquippedWeapon] = useState<Item | null>(null);
    const [equippedArmor, setEquippedArmor] = useState<Item | null>(null);
    const [equippedShield, setEquippedShield] = useState<Item | null>(null);
    const [abilities, setAbilities] = useState<Ability[]>([]);
    const [spells, setSpells] = useState<Spell[]>([]);
    const [stats, setStats] = useState<Stats>(defaultStats);
    const [hp, setHp] = useState<number>(20);
    const [mp, setMp] = useState<number>(10);
    const [currency, setCurrency] = useState<number>(100); // Set initial currency to 100 for testing

    const initializeCharacter = (species: string, characterClass: string) => {
        const selectedClass = classOptions.find(c => c.name === characterClass);
        if (!selectedClass) {
            console.error(`Class ${characterClass} not found`);
            return;
        }

        const startingItems = selectedClass.startingItems.map(itemName => {
            const item = items.find(item => item.name === itemName);
            if (!item) {
                console.error(`Item ${itemName} not found`);
                return { name: itemName, type: 'misc', description: 'Unknown item', weight: 0, equippable: false };
            }
            return item;
        });

        const startingWeapons = selectedClass.startingWeapons.map(weaponName => {
            const weapon = weapons.find(weapon => weapon.name === weaponName);
            if (!weapon) {
                console.error(`Weapon ${weaponName} not found`);
                return { name: weaponName, type: 'weapon', description: 'Unknown weapon', weight: 0, equippable: false };
            }
            return weapon;
        });

        const startingArmor = selectedClass.startingArmor.map(armorName => {
            const armorItem = armorItems.find(a => a.name === armorName);
            if (!armorItem) {
                console.error(`Armor ${armorName} not found`);
                return { name: armorName, type: 'armor', description: 'Unknown armor', weight: 0, equippable: false };
            }
            return armorItem;
        });

        setInventory(startingItems);
        setWeapons(startingWeapons);
        setArmor(startingArmor);

        setAbilities(selectedClass.abilities);
        setSpells(selectedClass.spells);
        setStats(prevStats => ({
            ...prevStats,
            ...selectedClass.statModifiers,
        }));
        setHp(selectedClass.startingHP);
        setMp(selectedClass.startingMP);

        // Equip the first available weapon, armor, and shield if any
        if (startingWeapons.length > 0) setEquippedWeapon(startingWeapons[0]);
        if (startingArmor.length > 0) setEquippedArmor(startingArmor[0]);
        if (selectedClass.startingItems.includes('Shield')) {
            const shield = shields.find(s => s.name === 'Shield');
            if (shield) setEquippedShield(shield);
        }

        // Set initial currency
        setCurrency(100); // Set initial currency to 100
    };

    const equipItem = (item: Item) => {
        if (item.type === 'weapon') {
            if (item.handedness === 'two-handed') {
                setEquippedWeapon(item);
                setEquippedShield(null); // Can't equip a shield with a two-handed weapon
            } else {
                setEquippedWeapon(item);
            }
        } else if (item.type === 'armor') {
            setEquippedArmor(item);
        } else if (item.type === 'shield') {
            if (equippedWeapon && equippedWeapon.handedness === 'two-handed') {
                console.log('Cannot equip a shield with a two-handed weapon');
            } else {
                setEquippedShield(item);
            }
        }
    };

    const unequipItem = (item: Item) => {
        if (item.type === 'weapon' && equippedWeapon === item) {
            setEquippedWeapon(null);
        } else if (item.type === 'armor' && equippedArmor === item) {
            setEquippedArmor(null);
        } else if (item.type === 'shield' && equippedShield === item) {
            setEquippedShield(null);
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
                characterClass,
                gender,
                name,
                inventory,
                weapons,
                armor,
                shields,
                consumables,
                misc,
                equippedWeapon,
                equippedArmor,
                equippedShield,
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
                setEquippedWeapon,
                setEquippedArmor,
                setEquippedShield,
                setAbilities,
                setSpells,
                setStats,
                setHp,
                setMp,
                setCurrency,
                equipItem,
                unequipItem,
                updateAbilitiesAndSpells,
                initializeCharacter,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
    return context;
};
