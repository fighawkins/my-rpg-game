import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    throw new Error("Missing OpenAI API key");
}

const openai = new OpenAI({
    apiKey,
});

// Load world overview from file
const worldOverview = fs.readFileSync(path.resolve('world_overview.md'), 'utf-8');

// Parse AI response to get updated inventory and currency
const parseAIResponse = (aiResponse: string, currentInventory: string[], currentCurrency: number) => {
    console.log("AI Response:", aiResponse);

    let updatedInventory = [...currentInventory];
    let updatedCurrency = currentCurrency;

    const inventoryMatch = aiResponse.match(/\*\*Inventory\*\*: (.+)/);
    const currencyMatch = aiResponse.match(/\*\*Currency\*\*: (\d+) gold/);

    if (inventoryMatch) {
        updatedInventory = inventoryMatch[1].split(',').map(item => item.trim());
    }

    if (currencyMatch) {
        updatedCurrency = parseInt(currencyMatch[1], 10);
    }

    console.log("Parsed Inventory:", updatedInventory);
    console.log("Parsed Currency:", updatedCurrency);

    return { updatedInventory, updatedCurrency };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { prompt, species, characterClass, gender, name, inventory, currency } = req.body;

        if (!prompt || !species || !characterClass || !gender || !name || !Array.isArray(inventory) || currency === undefined) {
            return res.status(400).json({ error: "All fields are required: prompt, species, characterClass, gender, name, inventory, currency" });
        }

        const context = `
### Character Information:
- Name: ${name}
- Species: ${species}
- Class: ${characterClass}
- Gender: ${gender}
- Inventory: ${inventory.join(', ')}
- Currency: ${currency} gold

### World Overview:
${worldOverview}
`;

        const completePrompt = `
${context}

### Player's Action:
${prompt}

### Instructions:
You are a dungeon master. Continue the story based on the above context and player's action. Do not repeat information already provided. Respond concisely, and end with "What would you like to do next?".

If the player's action is related to buying an item, check if they have enough currency. If yes, subtract the cost from their currency and add the item to their inventory. Otherwise, inform them they don't have enough currency. Return the updated inventory and currency in the response.

If the player's action is related to using an item from their inventory, apply the item's effects and remove it from the inventory. Return the updated inventory and any changes to the player's status or stats in the response.
`;

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: "You are the DM of a D&D game. Follow the rules and lore provided." },
                    { role: "user", content: completePrompt },
                ],
                max_tokens: 300,
            });

            const aiResponse = response.choices[0].message.content;
            const { updatedInventory, updatedCurrency } = parseAIResponse(aiResponse, inventory, currency);

            return res.status(200).json({ response: aiResponse, updatedInventory, updatedCurrency });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
