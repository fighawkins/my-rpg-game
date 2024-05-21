import React from 'react';

const InventorySection = ({ title, items }) => (
    <div className="mb-4">
        <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
        {items.length > 0 ? (
            items.map((item, index) => (
                <p key={index} className="text-sm">{item.name}: {item.description}</p>
            ))
        ) : (
            <p className="text-sm">None</p>
        )}
    </div>
);

const Inventory = ({
    inventory = [],
    weapons = [],
    armor = [],
    shields = [],
    consumables = [],
    misc = [],
    equippedWeapon = null,
    equippedArmor = null,
    equippedShield = null,
    currency = 0,
    abilities = [],
    spells = [],
}) => (
    <div className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
        <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Inventory</h2>
            <div className="grid grid-cols-1 gap-4">
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 text-center">Equipped</h3>
                    <p>Weapon: {equippedWeapon ? equippedWeapon.name : 'None'}</p>
                    <p>Armor: {equippedArmor ? equippedArmor.name : 'None'}</p>
                    <p>Shield: {equippedShield ? equippedShield.name : 'None'}</p>
                </div>
                <InventorySection title="Items" items={inventory} />

                <InventorySection title="Consumables" items={consumables} />
                <InventorySection title="Miscellaneous" items={misc} />
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 text-center">Currency</h3>
                    <p>{currency} gold</p>
                </div>
                <InventorySection title="Abilities" items={abilities} />
                <InventorySection title="Spells" items={spells} />
            </div>
        </div>
    </div>
);

export default Inventory;
