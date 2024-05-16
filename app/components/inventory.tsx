import React from 'react';

type InventoryProps = {
    inventory: string[];
    currency: number;
};

const Inventory: React.FC<InventoryProps> = ({ inventory, currency }) => {
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
        </div>
    );
};

export default Inventory;
