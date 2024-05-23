import React from 'react';
import { Item } from '@/data/itemSchema';
import { Spell } from '@/data/spells';
import { Ability } from '@/data/abilities';

type InventoryProps = {
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
    equippedMainHand,
    equippedOffHand,
    equippedBody,
    equippedHead,
    equippedLegs,
    equippedFeet,
    equippedRing,
    equippedNecklace,
    equippedCloak,
    currency,
    abilities,
    spells,
}) => {
    return (
        <div className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Inventory</h2>
            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2 text-center">Equipped</h3>
                <ul className="grid grid-cols-2 gap-4 mb-4">
                    <li><strong>Main Hand:</strong> {equippedMainHand ? equippedMainHand.name : 'None'}</li>
                    <li><strong>Off Hand:</strong> {equippedOffHand ? equippedOffHand.name : 'None'}</li>
                    <li><strong>Body:</strong> {equippedBody ? equippedBody.name : 'None'}</li>
                    <li><strong>Head:</strong> {equippedHead ? equippedHead.name : 'None'}</li>
                    <li><strong>Legs:</strong> {equippedLegs ? equippedLegs.name : 'None'}</li>
                    <li><strong>Feet:</strong> {equippedFeet ? equippedFeet.name : 'None'}</li>
                    <li><strong>Ring:</strong> {equippedRing ? equippedRing.name : 'None'}</li>
                    <li><strong>Necklace:</strong> {equippedNecklace ? equippedNecklace.name : 'None'}</li>
                    <li><strong>Cloak:</strong> {equippedCloak ? equippedCloak.name : 'None'}</li>
                </ul>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2 text-center">Consumables</h3>
                <ul className="mb-4">{consumables.map((item, index) => <li key={index}>{item.name}</li>)}</ul>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2 text-center">Miscellaneous</h3>
                <ul className="mb-4">{misc.map((item, index) => <li key={index}>{item.name}</li>)}</ul>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2 text-center">Currency</h3>
                <p className="mb-4 text-center">{currency} gold</p>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2 text-center">Abilities</h3>
                <ul className="mb-4">{abilities.map((ability, index) => <li key={index}>{ability.name}</li>)}</ul>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2 text-center">Spells</h3>
                <ul className="mb-4">{spells.map((spell, index) => <li key={index}>{spell.name}</li>)}</ul>
            </div>
        </div>
    );
};

export default Inventory;
