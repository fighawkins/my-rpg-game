"use client";
import React from 'react';
import { useGameContext } from '@/context/GameContext';
import { Ability } from '@/data/abilities';
import { Spell } from '@/data/spells';
import { Item } from '@/data/itemSchema';

type InventoryProps = {
    inventory: Item[];
    weapons: Item[];
    armor: Item[];
    shields: Item[];
    consumables: Item[];
    misc: Item[];
    equippedWeapon: Item | null;
    equippedArmor: Item | null;
    equippedShield: Item | null;
    currency: number;
    abilities: Ability[];
    spells: Spell[];
};

const Inventory: React.FC<InventoryProps> = ({
    inventory,
    weapons,
    armor,
    shields,
    consumables,
    misc,
    equippedWeapon,
    equippedArmor,
    equippedShield,
    currency,
    abilities,
    spells
}) => {
    const { equipItem, unequipItem } = useGameContext();

    const handleEquip = (itemName: string) => {
        const item = [...inventory, ...weapons, ...armor, ...shields, ...consumables, ...misc].find(i => i.name === itemName);
        if (item) {
            equipItem(item);
        }
    };

    const handleUnequip = (itemName: string) => {
        const item = [...inventory, ...weapons, ...armor, ...shields, ...consumables, ...misc].find(i => i.name === itemName);
        if (item) {
            unequipItem(item);
        }
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Inventory</h3>
            <div className="mb-4">
                <h4 className="text-xl font-semibold">Equipped</h4>
                <p><strong>Weapon:</strong> {equippedWeapon ? equippedWeapon.name : 'None'} </p>
                <p><strong>Armor:</strong> {equippedArmor ? equippedArmor.name : 'None'} </p>
                <p><strong>Shield:</strong> {equippedShield ? equippedShield.name : 'None'} </p>
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
                <h4 className="text-xl font-semibold">Shields</h4>
                <ul className="list-disc list-inside">
                    {shields.map((shield, index) => (
                        <li key={index}>{shield.name}: {shield.description} <button onClick={() => handleEquip(shield.name)}>Equip</button></li>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <h4 className="text-xl font-semibold">Consumables</h4>
                <ul className="list-disc list-inside">
                    {consumables.map((consumable, index) => (
                        <li key={index}>{consumable.name}: {consumable.description}</li>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <h4 className="text-xl font-semibold">Miscellaneous</h4>
                <ul className="list-disc list-inside">
                    {misc.map((miscItem, index) => (
                        <li key={index}>{miscItem.name}: {miscItem.description}</li>
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
