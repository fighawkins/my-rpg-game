import { Ability, Spell } from '@/data/classes';
import React from 'react';

type Stats = {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
};

type InventoryProps = {
    inventory: string[];
    currency: number;
    abilities: Ability[];
    spells: Spell[];
    stats: Stats;
};

const Inventory: React.FC<InventoryProps> = ({ inventory, currency, abilities, spells, stats }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Inventory</h2>
            <div className="mb-4">
                {inventory.map((item, index) => (
                    <div key={index} className="pl-6">{item}</div>
                ))}
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold">Currency</h3>
                <p>{currency} gold</p>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold">Abilities</h3>
                <div className="pl-6">
                    {abilities.map((ability, index) => (
                        <div key={index}>
                            <strong>{ability.name}:</strong> {ability.description}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold">Spells</h3>
                <div className="pl-6">
                    {spells.map((spell, index) => (
                        <div key={index}>
                            <strong>{spell.name}:</strong> {spell.description}
                        </div>
                    ))}
                </div>
            </div>
            {stats && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">Stats</h3>
                    <div className="pl-6">
                        <div><strong>Strength:</strong> {stats.strength}</div>
                        <div><strong>Dexterity:</strong> {stats.dexterity}</div>
                        <div><strong>Constitution:</strong> {stats.constitution}</div>
                        <div><strong>Intelligence:</strong> {stats.intelligence}</div>
                        <div><strong>Wisdom:</strong> {stats.wisdom}</div>
                        <div><strong>Charisma:</strong> {stats.charisma}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
