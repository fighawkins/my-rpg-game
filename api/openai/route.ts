import { NextRequest, NextResponse } from 'next/server';
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

export async function POST(request: NextRequest) {
    const { prompt, species, characterClass, gender, name } = await request.json();

    if (!prompt || !species || !characterClass || !gender || !name) {
        return NextResponse.json({ error: "All fields are required: prompt, species, characterClass, gender, name" }, { status: 400 });
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

    const completePrompt = `${context}\n\n${prompt}`;

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
        return NextResponse.json({ response: aiResponse });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
