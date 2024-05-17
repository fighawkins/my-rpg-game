import { Ability, Spell } from '@/data/classes';
import React from 'react';

type InventoryProps = {
    inventory: string[];
    currency: number;
    abilities: Ability[];
    spells: Spell[];
};

const Inventory: React.FC<InventoryProps> = ({ inventory, currency, abilities, spells }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Inventory</h2>
            <ul className="list-disc pl-6">
                {inventory.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <div className="mt-4">
                <h3 className="text-xl font-semibold">Currency</h3>
                <p>{currency} gold</p>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold">Abilities</h3>
                <ul className="list-disc pl-6">
                    {abilities.map((ability, index) => (
                        <li key={index}>
                            <strong>{ability.name}:</strong> {ability.description}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold">Spells</h3>
                <ul className="list-disc pl-6">
                    {spells.map((spell, index) => (
                        <li key={index}>
                            <strong>{spell.name}:</strong> {spell.description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Inventory;
