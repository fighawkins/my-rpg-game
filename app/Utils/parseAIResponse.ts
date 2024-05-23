import nlp from 'compromise';
import { Item, classifyItem } from '@/data/itemSchema';
import { Ability, abilities } from '@/data/abilities';
import { Spell, spells } from '@/data/spells';

export const parseAIResponse = (
    aiResponse: string,
    currentInventory: Item[],
    currentWeapons: Item[],
    currentArmor: Item[],
    currentShields: Item[],
    currentConsumables: Item[],
    currentMisc: Item[],
    currentCurrency: number,
    currentAbilities: Ability[],
    currentSpells: Spell[],
    currentHp: number,
    currentMp: number,
    currentEquippedMainHand: Item | null,
    currentEquippedOffHand: Item | null,
    currentEquippedBody: Item | null,
    currentEquippedHead: Item | null,
    currentEquippedLegs: Item | null,
    currentEquippedFeet: Item | null,
    currentEquippedRing: Item | null,
    currentEquippedNecklace: Item | null,
    currentEquippedCloak: Item | null
) => {
    console.log("AI Response:", aiResponse);

    const doc = nlp(aiResponse.toLowerCase());

    let updatedInventory = [...currentInventory];
    let updatedWeapons = [...currentWeapons];
    let updatedArmor = [...currentArmor];
    let updatedShields = [...currentShields];
    let updatedConsumables = [...currentConsumables];
    let updatedMisc = [...currentMisc];
    let updatedCurrency = currentCurrency;
    let updatedAbilities = [...currentAbilities];
    let updatedSpells = [...currentSpells];
    let updatedHp = currentHp;
    let updatedMp = currentMp;
    let updatedEquippedMainHand = currentEquippedMainHand;
    let updatedEquippedOffHand = currentEquippedOffHand;
    let updatedEquippedBody = currentEquippedBody;
    let updatedEquippedHead = currentEquippedHead;
    let updatedEquippedLegs = currentEquippedLegs;
    let updatedEquippedFeet = currentEquippedFeet;
    let updatedEquippedRing = currentEquippedRing;
    let updatedEquippedNecklace = currentEquippedNecklace;
    let updatedEquippedCloak = currentEquippedCloak;

    // Parsing updates for inventory and other attributes from the AI response
    const inventoryText = aiResponse.match(/Inventory[^:]*:\s*(.+)/i);
    const currencyText = aiResponse.match(/Currency[^:]*:\s*(\d+)\s*gold/i);
    const abilitiesText = aiResponse.match(/Abilities[^:]*:\s*(.+)/i);
    const spellsText = aiResponse.match(/Spells[^:]*:\s*(.+)/i);
    const hpText = aiResponse.match(/HP[^:]*:\s*(\d+)/i);
    const mpText = aiResponse.match(/MP[^:]*:\s*(\d+)/i);
    const equippedMainHandText = aiResponse.match(/Equipped Main Hand[^:]*:\s*(.+)/i);
    const equippedOffHandText = aiResponse.match(/Equipped Off Hand[^:]*:\s*(.+)/i);
    const equippedBodyText = aiResponse.match(/Equipped Body[^:]*:\s*(.+)/i);
    const equippedHeadText = aiResponse.match(/Equipped Head[^:]*:\s*(.+)/i);
    const equippedLegsText = aiResponse.match(/Equipped Legs[^:]*:\s*(.+)/i);
    const equippedFeetText = aiResponse.match(/Equipped Feet[^:]*:\s*(.+)/i);
    const equippedRingText = aiResponse.match(/Equipped Ring[^:]*:\s*(.+)/i);
    const equippedNecklaceText = aiResponse.match(/Equipped Necklace[^:]*:\s*(.+)/i);
    const equippedCloakText = aiResponse.match(/Equipped Cloak[^:]*:\s*(.+)/i);

    if (inventoryText) {
        const itemNames = inventoryText[1].split(',').map(item => item.trim());
        updatedInventory = itemNames.map(itemName => classifyItem(itemName, itemName));
        updatedWeapons = updatedInventory.filter(item => item.type === 'weapon');
        updatedArmor = updatedInventory.filter(item => item.type === 'armor');
        updatedShields = updatedInventory.filter(item => item.type === 'shield');
        updatedConsumables = updatedInventory.filter(item => item.type === 'consumable');
        updatedMisc = updatedInventory.filter(item => item.type === 'misc');
    }

    if (currencyText) {
        updatedCurrency = parseInt(currencyText[1], 10);
    }

    if (abilitiesText) {
        const abilityNames = abilitiesText[1].split(',').map(ability => ability.trim());
        updatedAbilities = abilityNames.map(abilityName => abilities.find(ability => ability.name === abilityName) || { name: abilityName, description: '' });
    }

    if (spellsText) {
        const spellNames = spellsText[1].split(',').map(spell => spell.trim());
        updatedSpells = spellNames.map(spellName => spells.find(spell => spell.name === spellName) || { name: spellName, description: '' });
    }

    if (hpText) {
        updatedHp = parseInt(hpText[1], 10);
    }

    if (mpText) {
        updatedMp = parseInt(mpText[1], 10);
    }

    // Only update the equipped items if they are mentioned in the AI response
    if (equippedMainHandText) {
        updatedEquippedMainHand = updatedInventory.find(item => item.name === equippedMainHandText[1]) || null;
    }

    if (equippedOffHandText) {
        updatedEquippedOffHand = updatedInventory.find(item => item.name === equippedOffHandText[1]) || null;
    }

    if (equippedBodyText) {
        updatedEquippedBody = updatedInventory.find(item => item.name === equippedBodyText[1]) || null;
    }

    if (equippedHeadText) {
        updatedEquippedHead = updatedInventory.find(item => item.name === equippedHeadText[1]) || null;
    }

    if (equippedLegsText) {
        updatedEquippedLegs = updatedInventory.find(item => item.name === equippedLegsText[1]) || null;
    }

    if (equippedFeetText) {
        updatedEquippedFeet = updatedInventory.find(item => item.name === equippedFeetText[1]) || null;
    }

    if (equippedRingText) {
        updatedEquippedRing = updatedInventory.find(item => item.name === equippedRingText[1]) || null;
    }

    if (equippedNecklaceText) {
        updatedEquippedNecklace = updatedInventory.find(item => item.name === equippedNecklaceText[1]) || null;
    }

    if (equippedCloakText) {
        updatedEquippedCloak = updatedInventory.find(item => item.name === equippedCloakText[1]) || null;
    }

    return {
        updatedInventory,
        updatedWeapons,
        updatedArmor,
        updatedShields,
        updatedConsumables,
        updatedMisc,
        updatedCurrency,
        updatedAbilities,
        updatedSpells,
        updatedHp,
        updatedMp,
        updatedEquippedMainHand,
        updatedEquippedOffHand,
        updatedEquippedBody,
        updatedEquippedHead,
        updatedEquippedLegs,
        updatedEquippedFeet,
        updatedEquippedRing,
        updatedEquippedNecklace,
        updatedEquippedCloak,
    };
};
