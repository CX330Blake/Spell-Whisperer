import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const challengeName = body.name;

        if (challengeName === undefined || challengeName === "") {
            return NextResponse.json({
                response: "Please select a level to start.",
            });
        }

        // Grok API endpoint here
        const client = new OpenAI({
            apiKey: process.env.XAI_API_KEY,
            baseURL: "https://api.x.ai/v1",
        });

        const filePath = path.join(
            process.cwd(),
            "/src/app/api/challenge/challenges.json"
        );

        if (!fs.existsSync(filePath)) {
            return NextResponse.json(
                { error: "File not found" },
                { status: 404 }
            );
        }

        const challengeInfo = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        const answer = challengeInfo[challengeName].answer;
        const systemPrompt = challengeInfo[challengeName].system.replace(
            "█████",
            answer
        );

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
        return NextResponse.json({ response: response });
    } catch (error) {
        return NextResponse.json({ response: (error as Error).message });
    }
}
