"use client";
import React, { createContext, useContext, useState } from 'react';
import { Item, items } from '@/data/itemSchema';
import { Ability, abilities } from '@/data/abilities';
import { Spell, spells } from '@/data/spells';
import { classOptions, Class, Stats } from '@/data/classes';
import { weapons as allWeapons } from '@/data/weapons';
import { armor as allArmor } from '@/data/armor';
import { shields as allShields } from '@/data/shields';
import { speciesOptions, Species } from '@/data/species';

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
    // Methods to update these
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
    initializeCharacter: (species: string, characterClass: string) => void;
    addAbility: (ability: Ability) => void;
    addSpell: (spell: Spell) => void;

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

    const [equippedMainHand, setEquippedMainHand] = useState<Item | null>(null);
    const [equippedOffHand, setEquippedOffHand] = useState<Item | null>(null);
    const [equippedBody, setEquippedBody] = useState<Item | null>(null);
    const [equippedHead, setEquippedHead] = useState<Item | null>(null);
    const [equippedLegs, setEquippedLegs] = useState<Item | null>(null);
    const [equippedFeet, setEquippedFeet] = useState<Item | null>(null);
    const [equippedRing, setEquippedRing] = useState<Item | null>(null);
    const [equippedNecklace, setEquippedNecklace] = useState<Item | null>(null);
    const [equippedCloak, setEquippedCloak] = useState<Item | null>(null);
    const [consumables, setConsumables] = useState<Item[]>([]);
    const [misc, setMisc] = useState<Item[]>([]);
    const [weapons, setWeapons] = useState<Item[]>([]);
    const [armor, setArmor] = useState<Item[]>([]);
    const [shields, setShields] = useState<Item[]>([]);
    const [abilities, setAbilities] = useState<Ability[]>([]);

    const [spells, setSpells] = useState<Spell[]>([]);
    const [stats, setStats] = useState<Stats>(defaultStats);
    const [hp, setHp] = useState<number>(20);
    const [mp, setMp] = useState<number>(10);
    const [currency, setCurrency] = useState<number>(100); // Set initial currency

    const initializeCharacter = (species: string, characterClass: string) => {
        const selectedSpecies = speciesOptions.find(s => s.name === species);
        const selectedClass = classOptions.find(c => c.name === characterClass);
        if (!selectedSpecies || !selectedClass) {
            console.error(`Species ${species} or Class ${characterClass} not found`);
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
            const weapon = allWeapons.find(weapon => weapon.name === weaponName);
            if (!weapon) {
                console.error(`Weapon ${weaponName} not found`);
                return { name: weaponName, type: 'weapon', description: 'Unknown weapon', weight: 0, equippable: false, attributes: { damage: '0' } };
            }
            return weapon;
        });

        const startingArmor = selectedClass.startingArmor.map(armorName => {
            const armorItem = allArmor.find(a => a.name === armorName);
            if (!armorItem) {
                console.error(`Armor ${armorName} not found`);
                return { name: armorName, type: 'armor', description: 'Unknown armor', weight: 0, equippable: false };
            }
            return armorItem;
        });

        const startingShields = selectedClass.startingShields.map(shieldName => {
            const shieldItem = allShields.find(s => s.name === shieldName);
            if (!shieldItem) {
                console.error(`Shield ${shieldName} not found`);
                return { name: shieldName, type: 'shield', description: 'Unknown shield', weight: 0, equippable: false };
            }
            return shieldItem;
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

        // Equip the first available weapon, armor, and shield if any
        if (startingWeapons.length > 0) setEquippedMainHand(startingWeapons[0]);
        if (startingArmor.length > 0) setEquippedBody(startingArmor[0]);
        if (startingShields.length > 0) setEquippedOffHand(startingShields[0]);
    };


    const equipItem = (item: Item) => {
        console.log("Equipping item:", item);
        if (item.slot) {
            if (Array.isArray(item.slot)) {
                item.slot.forEach(slot => {
                    if (slot === 'main_hand') {
                        setEquippedMainHand(item);
                    } else if (slot === 'off_hand') {
                        setEquippedOffHand(item);
                    } else if (slot === 'body') {
                        setEquippedBody(item);
                    } else if (slot === 'head') {
                        setEquippedHead(item);
                    } else if (slot === 'legs') {
                        setEquippedLegs(item);
                    } else if (slot === 'feet') {
                        setEquippedFeet(item);
                    } else if (slot === 'ring') {
                        setEquippedRing(item);
                    } else if (slot === 'necklace') {
                        setEquippedNecklace(item);
                    } else if (slot === 'cloak') {
                        setEquippedCloak(item);
                    }
                });
            } else {
                if (item.slot === 'main_hand') {
                    setEquippedMainHand(item);
                } else if (item.slot === 'off_hand') {
                    setEquippedOffHand(item);
                } else if (item.slot === 'body') {
                    setEquippedBody(item);
                } else if (item.slot === 'head') {
                    setEquippedHead(item);
                } else if (item.slot === 'legs') {
                    setEquippedLegs(item);
                } else if (item.slot === 'feet') {
                    setEquippedFeet(item);
                } else if (item.slot === 'ring') {
                    setEquippedRing(item);
                } else if (item.slot === 'necklace') {
                    setEquippedNecklace(item);
                } else if (item.slot === 'cloak') {
                    setEquippedCloak(item);
                }
            }
        }
        console.log("Current equipped state:", {
            equippedMainHand,
            equippedOffHand,
            equippedBody,
            equippedHead,
            equippedLegs,
            equippedFeet,
            equippedRing,
            equippedNecklace,
            equippedCloak,
        });
    };

    const unequipItem = (item: Item) => {
        console.log("Unequipping item:", item);
        if (item.slot) {
            if (Array.isArray(item.slot)) {
                item.slot.forEach(slot => {
                    if (slot === 'main_hand' && equippedMainHand === item) {
                        setEquippedMainHand(null);
                    } else if (slot === 'off_hand' && equippedOffHand === item) {
                        setEquippedOffHand(null);
                    } else if (slot === 'body' && equippedBody === item) {
                        setEquippedBody(null);
                    } else if (slot === 'head' && equippedHead === item) {
                        setEquippedHead(null);
                    } else if (slot === 'legs' && equippedLegs === item) {
                        setEquippedLegs(null);
                    } else if (slot === 'feet' && equippedFeet === item) {
                        setEquippedFeet(null);
                    } else if (slot === 'ring' && equippedRing === item) {
                        setEquippedRing(null);
                    } else if (slot === 'necklace' && equippedNecklace === item) {
                        setEquippedNecklace(null);
                    } else if (slot === 'cloak' && equippedCloak === item) {
                        setEquippedCloak(null);
                    }
                });
            } else {
                if (item.slot === 'main_hand' && equippedMainHand === item) {
                    setEquippedMainHand(null);
                } else if (item.slot === 'off_hand' && equippedOffHand === item) {
                    setEquippedOffHand(null);
                } else if (item.slot === 'body' && equippedBody === item) {
                    setEquippedBody(null);
                } else if (item.slot === 'head' && equippedHead === item) {
                    setEquippedHead(null);
                } else if (item.slot === 'legs' && equippedLegs === item) {
                    setEquippedLegs(null);
                } else if (item.slot === 'feet' && equippedFeet === item) {
                    setEquippedFeet(null);
                } else if (item.slot === 'ring' && equippedRing === item) {
                    setEquippedRing(null);
                } else if (item.slot === 'necklace' && equippedNecklace === item) {
                    setEquippedNecklace(null);
                } else if (item.slot === 'cloak' && equippedCloak === item) {
                    setEquippedCloak(null);
                }
            }
        }
        console.log("Current equipped state:", {
            equippedMainHand,
            equippedOffHand,
            equippedBody,
            equippedHead,
            equippedLegs,
            equippedFeet,
            equippedRing,
            equippedNecklace,
            equippedCloak,
        });
    };


    const updateAbilitiesAndSpells = (newAbilities: Ability[], newSpells: Spell[]) => {
        setAbilities(newAbilities);
        setSpells(newSpells);
    };

    const addAbility = (ability: Ability) => {
        setAbilities(prev => [...prev, ability]);
    };

    const addSpell = (spell: Spell) => {
        setSpells(prev => [...prev, spell]);
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
                setWeapons,
                setArmor,
                setShields,
                consumables,
                misc,
                equippedMainHand,
                setEquippedMainHand,
                equippedOffHand,
                setEquippedOffHand,
                equippedBody,
                setEquippedBody,
                equippedHead,
                setEquippedHead,
                equippedLegs,
                setEquippedLegs,
                equippedFeet,
                setEquippedFeet,
                equippedRing,
                setEquippedRing,
                equippedNecklace,
                setEquippedNecklace,
                equippedCloak,
                setEquippedCloak,
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
                setConsumables,
                setMisc,
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
                addAbility,
                addSpell,
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
