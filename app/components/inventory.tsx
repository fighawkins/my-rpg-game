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
        <div className="mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Inventory</h2>

            <div className="mb-4">
                <h3 className="text-2xl font-semibold mb-2">Items</h3>
                <div className="grid grid-cols-2 gap-4">
                    {inventory.map((item, index) => (
                        <div key={index} className="bg-gray-700 p-2 rounded-md shadow-md">
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-2">Currency</h3>
                <p className="text-lg">{currency} gold</p>
            </div>

            <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-2">Abilities</h3>
                <div className="grid grid-cols-1 gap-4">
                    {abilities.map((ability, index) => (
                        <div key={index} className="bg-gray-700 p-2 rounded-md shadow-md">
                            <strong>{ability.name}:</strong> {ability.description}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-2">Spells</h3>
                <div className="grid grid-cols-1 gap-4">
                    {spells.map((spell, index) => (
                        <div key={index} className="bg-gray-700 p-2 rounded-md shadow-md">
                            <strong>{spell.name}:</strong> {spell.description}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Inventory;
