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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { prompt, species, characterClass, gender, name } = req.body;

        if (!prompt || !species || !characterClass || !gender || !name) {
            return res.status(400).json({ error: "All fields are required: prompt, species, characterClass, gender, name" });
        }

        const context = `
### Character Information:
- Name: ${name}
- Species: ${species}
- Class: ${characterClass}
- Gender: ${gender}

### World Overview:
${worldOverview}
`;

        const completePrompt = `
${context}

### Player's Action:
${prompt}

### Instructions:
You are a dungeon master. Continue the story based on the above context and player's action. Do not repeat information already provided. Respond concisely, and end with "What would you like to do next?".
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

            return res.status(200).json({ response: response.choices[0].message.content });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
