import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Item, items, classifyItem } from '@/data/itemSchema';
import { Ability, abilities } from '@/data/abilities';
import { Spell, spells } from '@/data/spells';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    throw new Error("Missing OpenAI API key");
}

const openai = new OpenAI({
    apiKey,
});

const worldOverview = fs.readFileSync(path.resolve('world_overview.md'), 'utf-8');

const parseAIResponse = (
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
    currentEquippedWeapon: Item | null,
    currentEquippedArmor: Item | null,
    currentEquippedShield: Item | null
) => {
    console.log("AI Response:", aiResponse);

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
    let updatedEquippedWeapon = currentEquippedWeapon;
    let updatedEquippedArmor = currentEquippedArmor;
    let updatedEquippedShield = currentEquippedShield;

    const inventoryMatch = aiResponse.match(/\*\*Inventory\*\*: (.+)/);
    const currencyMatch = aiResponse.match(/\*\*Currency\*\*: (\d+) gold/);
    const abilitiesMatch = aiResponse.match(/\*\*Abilities\*\*: (.+?)(?=\*\*Spells\*\*|$)/s);
    const spellsMatch = aiResponse.match(/\*\*Spells\*\*: (.+)/);
    const hpMatch = aiResponse.match(/\*\*HP\*\*: (\d+)/);
    const mpMatch = aiResponse.match(/\*\*MP\*\*: (\d+)/);
    const equippedWeaponMatch = aiResponse.match(/\*\*Equipped Weapon\*\*: (.+)/);
    const equippedArmorMatch = aiResponse.match(/\*\*Equipped Armor\*\*: (.+)/);
    const equippedShieldMatch = aiResponse.match(/\*\*Equipped Shield\*\*: (.+)/);

    if (inventoryMatch) {
        const inventoryItems = inventoryMatch[1].split(',').map(item => item.trim()).filter(item => item !== '');
        inventoryItems.forEach(itemName => {
            const item = items.find(i => i.name === itemName);
            if (item) {
                switch (item.type) {
                    case 'weapon':
                        updatedWeapons.push(item);
                        break;
                    case 'armor':
                        updatedArmor.push(item);
                        break;
                    case 'shield':
                        updatedShields.push(item);
                        break;
                    case 'consumable':
                        updatedConsumables.push(item);
                        break;
                    case 'misc':
                    default:
                        updatedMisc.push(item);
                        break;
                }
            } else {
                const classifiedItem = classifyItem(itemName, itemName);
                switch (classifiedItem.type) {
                    case 'weapon':
                        updatedWeapons.push(classifiedItem);
                        break;
                    case 'armor':
                        updatedArmor.push(classifiedItem);
                        break;
                    case 'shield':
                        updatedShields.push(classifiedItem);
                        break;
                    case 'consumable':
                        updatedConsumables.push(classifiedItem);
                        break;
                    case 'misc':
                    default:
                        updatedMisc.push(classifiedItem);
                        break;
                }
            }
        });
    }

    if (currencyMatch) {
        updatedCurrency = parseInt(currencyMatch[1], 10);
    }

    if (hpMatch) {
        updatedHp = parseInt(hpMatch[1], 10);
    }

    if (mpMatch) {
        updatedMp = parseInt(mpMatch[1], 10);
    }

    if (equippedWeaponMatch) {
        const weaponName = equippedWeaponMatch[1].trim();
        updatedEquippedWeapon = weaponName === 'None' ? null : updatedWeapons.find(w => w.name === weaponName) || null;
    }

    if (equippedArmorMatch) {
        const armorName = equippedArmorMatch[1].trim();
        updatedEquippedArmor = armorName === 'None' ? null : updatedArmor.find(a => a.name === armorName) || null;
    }

    if (equippedShieldMatch) {
        const shieldName = equippedShieldMatch[1].trim();
        updatedEquippedShield = shieldName === 'None' ? null : updatedShields.find(s => s.name === shieldName) || null;
    }

    if (abilitiesMatch) {
        const abilitiesList = abilitiesMatch[1].split('- ').map(item => item.trim()).filter(item => item !== '');
        const newAbilities = abilitiesList.map(name => abilities.find(ability => ability.name === name)).filter(Boolean) as Ability[];

        updatedAbilities = [...currentAbilities, ...newAbilities].filter((ability, index, self) =>
            index === self.findIndex((a) => a.name === ability.name)
        );
    }

    if (spellsMatch) {
        const spellsList = spellsMatch[1].split('- ').map(item => item.trim()).filter(item => item !== '');
        const newSpells = spellsList.map(name => spells.find(spell => spell.name === name)).filter(Boolean) as Spell[];

        updatedSpells = [...currentSpells, ...newSpells].filter((spell, index, self) =>
            index === self.findIndex((s) => s.name === spell.name)
        );
    }

    console.log("Parsed Inventory:", updatedInventory);
    console.log("Parsed Weapons:", updatedWeapons);
    console.log("Parsed Armor:", updatedArmor);
    console.log("Parsed Shields:", updatedShields);
    console.log("Parsed Consumables:", updatedConsumables);
    console.log("Parsed Misc:", updatedMisc);
    console.log("Parsed Currency:", updatedCurrency);
    console.log("Parsed Abilities:", updatedAbilities);
    console.log("Parsed Spells:", updatedSpells);
    console.log("Parsed HP:", updatedHp);
    console.log("Parsed MP:", updatedMp);
    console.log("Parsed Equipped Weapon:", updatedEquippedWeapon);
    console.log("Parsed Equipped Armor:", updatedEquippedArmor);
    console.log("Parsed Equipped Shield:", updatedEquippedShield);

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
        updatedEquippedWeapon,
        updatedEquippedArmor,
        updatedEquippedShield
    };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const {
            prompt,
            species,
            characterClass,
            gender,
            name,
            inventory = [],
            weapons = [],
            armor = [],
            shields = [],
            consumables = [],
            misc = [],
            equippedWeapon,
            equippedArmor,
            equippedShield,
            currency,
            hp,
            mp,
            abilities = [],
            spells = [],
            stats
        } = req.body;

        console.log("Request body:", req.body);

        if (!prompt || !species || !characterClass || !gender || !name || hp === undefined || mp === undefined || !Array.isArray(inventory) || currency === undefined || !Array.isArray(abilities) || !Array.isArray(spells) || !stats) {
            console.error("Missing required fields in the request body.");
            return res.status(400).json({ error: "All fields are required: prompt, species, characterClass, gender, name, inventory, weapons, armor, shields, consumables, misc, equippedWeapon, equippedArmor, equippedShield, currency, abilities, spells, hp, mp, stats" });
        }

        let diceRoll;
        try {
            console.log("Fetching dice roll...");
            const diceRollResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/roll`);
            if (!diceRollResponse.ok) {
                throw new Error(`Failed to fetch dice roll: ${diceRollResponse.statusText}`);
            }
            const diceRollData = await diceRollResponse.json();
            diceRoll = diceRollData.roll;
            console.log("Dice roll fetched:", diceRoll);
        } catch (error) {
            console.error("Error fetching dice roll:", error);
            return res.status(500).json({ error: "Failed to fetch dice roll" });
        }

        const context = `
        ### Character Information:
        - Name: ${name}
        - Species: ${species}
        - Class: ${characterClass}
        - Gender: ${gender}
        - Inventory: ${inventory.map(item => item.name).join(', ')}
        - Abilities: ${abilities.map(ability => ability.name).join(', ')}
        - Spells: ${spells.map(spell => spell.name).join(', ')}
        - Currency: ${currency} gold
        - HP: ${hp}
        - MP: ${mp}
        - Stats:
          - Strength: ${stats.strength}
          - Dexterity: ${stats.dexterity}
          - Constitution: ${stats.constitution}
          - Intelligence: ${stats.intelligence}
          - Wisdom: ${stats.wisdom}
          - Charisma: ${stats.charisma}
        - Dice Roll: ${diceRoll}

        ### World Overview:
        ${worldOverview}
        `;

        const completePrompt = `
${context}

### Player's Action:
${prompt}

### Instructions:
You are a dungeon master. Continue the story based on the above context and player's action. Do not repeat information already provided. Respond concisely, and end with "What would you like to do next?".
Determine the passing score needed based on the difficulty of the action/skill check and the character's current stats and abilities:
- Easy tasks (e.g., simple actions that match the character's skills): Passing score of 5-10.
- Moderate tasks (e.g., actions that are within the character's abilities but require effort): Passing score of 11-15.
- Difficult tasks (e.g., actions that are challenging even for skilled characters): Passing score of 16-20.
- Impossible tasks (e.g., actions that are beyond the character's capabilities without special circumstances): Explain why the task is impossible and suggest alternatives.

For **basic actions**, respond without using a dice roll and narrate the outcome directly.

Respond to the player's action within the narrative without disrupting the story with inventory, currency, abilities, or spells. Focus on storytelling and narrative coherence. Use the provided dice roll for any random outcomes.
Speak in present tense.
If the player's action is related to using an item from their inventory, apply the item's effects and remove it from the inventory. Clearly update and display the player's inventory and any changes to the player's status or stats in the format:
**Inventory**: item1, item2, item3
**Currency**: X gold

If the player's action is related to finding or obtaining an item or currency, add the item to their inventory or add the currency to their current amount. Clearly update and display the player's inventory and currency in the format:
**Inventory**: item1, item2, item3
**Currency**: X gold

If the player's action's HP or MP are altered, Clearly update and display the player's HP and MP in the format:
**HP**: X HP
**MP**: X MP

If the player's action is related to learning a new ability or spell, add it to their list of abilities or spells. Clearly update and display the player's abilities and spells in the format:
**Abilities**: ability1, ability2
**Spells**: spell1, spell2

If the player's action is related to equipping or unequipping a weapon or armor, update the equipped weapon or armor state. Clearly update and display the player's equipped weapon and armor in the format:
**Equipped Weapon**: weapon_name
**Equipped Armor**: armor_name
**Equipped Shield**: shield_name

Use the dice roll provided in the context (${diceRoll}) for all random outcomes/skill checks. Do not generate your own random numbers. Explicitly mention the dice roll in the response and base the outcome on this provided dice roll.

Ensure the story remains coherent and engaging. Encourage player creativity and decision-making. Maintain a balance between challenge and fairness. Narrate the outcomes of actions based on the dice rolls in a way that enhances the story and keeps the player engaged. Provide concise and relevant responses to the player's specific questions or actions without veering off-topic. If the player asks a specific question, answer directly and briefly, unless additional context is necessary. Before resolving an action, ask the player to confirm or provide additional input.
Allow the player to "live in" the world, engaging in non-quest activities like building relationships with NPCs, making plans, and exploring daily life. The world should feel real, not just quest-driven.
Give realistic consequences to the player's action, with nuance and complexity.
`;
        try {
            console.log("Sending request to OpenAI...");
            const response = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are the DM of a D&D game. Follow the rules and lore provided." },
                    { role: "user", content: completePrompt },
                ],
                max_tokens: 300,
            });

            const aiResponse = response.choices[0].message.content;
            console.log("OpenAI response received:", aiResponse);
            const {
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
                updatedEquippedWeapon,
                updatedEquippedArmor,
                updatedEquippedShield
            } = parseAIResponse(
                aiResponse,
                inventory,
                weapons,
                armor,
                shields,
                consumables,
                misc,
                currency,
                abilities,
                spells,
                hp,
                mp,
                equippedWeapon,
                equippedArmor,
                equippedShield
            );

            return res.status(200).json({
                response: aiResponse,
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
                updatedEquippedWeapon,
                updatedEquippedArmor,
                updatedEquippedShield
            });
        } catch (error) {
            console.error("Error with OpenAI API:", error);
            return res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
