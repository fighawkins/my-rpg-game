import React from 'react';

interface InventoryProps {
    inventory: string[];
    currency: number;
}

const Inventory: React.FC<InventoryProps> = ({ inventory, currency }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-2 text-gray-700">Inventory</h2>
            <ul className="list-disc list-inside">
                {inventory.map((item, index) => (
                    <li key={index} className="text-lg text-gray-800">{item}</li>
                ))}
            </ul>
            <div className="mt-4">
                <h2 className="text-2xl mb-2 text-gray-700">Currency</h2>
                <p className="text-lg text-gray-800">{currency} gold</p>
            </div>
        </div>
    );
};

export default Inventory;
