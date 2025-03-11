import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const client = new OpenAI({
    apiKey: process.env.XAI_API_KEY,
    baseURL: "https://api.x.ai/v1",
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const selectedLevel = body.level;

        const filePath = path.join(
            process.cwd(),
            "/src/app/api/challenge/challenges.json",
        );

        if (!fs.existsSync(filePath)) {
            return NextResponse.json(
                { error: "File not found" },
                { status: 404 },
            );
        }

        const challengeInfo = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        const answer = challengeInfo[selectedLevel][0]["answer"];
        const systemPrompt = challengeInfo[selectedLevel][0]["system"].replace(
            "█████",
            answer,
        );

        console.log();

        const completion = await client.chat.completions.create({
            model: "grok-2-latest",
            messages: [
                {
                    role: "system",
                    content: `${systemPrompt}`,
                },
                {
                    role: "user",
                    content: `${body.input}`,
                },
            ],
        });

        const response = completion.choices[0].message.content;
        console.log(response);
        return NextResponse.json({ response: response });
    } catch (error) {
        return NextResponse.json({ response: (error as Error).message });
    }
}
