"use client";
import React from 'react';
import { Item } from '@/data/items';
import { Weapon } from '@/data/weapons';
import { Armor } from '@/data/armor';
import { useGameContext } from '@/context/GameContext';
import { Ability, Spell } from '@/data/classes';

type InventoryProps = {
    inventory: Item[];
    weapons: Weapon[];
    armor: Armor[];
    equippedWeapon: Weapon | null;
    equippedArmor: Armor | null;
    currency: number;
    abilities: Ability[];
    spells: Spell[];
};

const Inventory: React.FC<InventoryProps> = ({ inventory, weapons, armor, equippedWeapon, equippedArmor, currency, abilities, spells }) => {
    const { equipItem, unequipItem } = useGameContext();

    const handleEquip = (itemName: string) => {
        equipItem(itemName);
    };

    const handleUnequip = (itemName: string) => {
        unequipItem(itemName);
    };

    console.log("Inventory:", inventory);
    console.log("Weapons:", weapons);
    console.log("Armor:", armor);
    console.log("Equipped Weapon:", equippedWeapon);
    console.log("Equipped Armor:", equippedArmor);

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Inventory</h3>
            <div className="mb-4">
                <h4 className="text-xl font-semibold">Equipped</h4>
                <p><strong>Weapon:</strong> {equippedWeapon ? equippedWeapon.name : 'None'} </p>
                <p><strong>Armor:</strong> {equippedArmor ? equippedArmor.name : 'None'} </p>
            </div>
            <div className="mb-4">
                <h4 className="text-xl font-semibold">Items</h4>
                <ul className="list-disc list-inside">
                    {inventory.map((item, index) => (
                        <li key={index}>{item.name}: {item.description}</li>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <h4 className="text-xl font-semibold">Weapons</h4>
                <ul className="list-disc list-inside">
                    {weapons.map((weapon, index) => (
                        <li key={index}>{weapon.name}: {weapon.description} <button onClick={() => handleEquip(weapon.name)}>Equip</button></li>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <h4 className="text-xl font-semibold">Armor</h4>
                <ul className="list-disc list-inside">
                    {armor.map((armorItem, index) => (
                        <li key={index}>{armorItem.name}: {armorItem.description} <button onClick={() => handleEquip(armorItem.name)}>Equip</button></li>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <h4 className="text-xl font-semibold">Abilities</h4>
                <ul className="list-disc list-inside">
                    {abilities.map((ability, index) => (
                        <li key={index}><strong>{ability.name}:</strong> {ability.description}</li>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <h4 className="text-xl font-semibold">Spells</h4>
                <ul className="list-disc list-inside">
                    {spells.map((spell, index) => (
                        <li key={index}><strong>{spell.name}:</strong> {spell.description}</li>
                    ))}
                </ul>
            </div>
            <p><strong>Currency:</strong> {currency} gold</p>
        </div>
    );
};

export default Inventory;
