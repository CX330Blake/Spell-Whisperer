import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { supabase } from "@/lib/supabase";

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

        const { data: challenge, error } = await supabase
            .from("challenges")
            .select("system_prompt, answer")
            .eq("name", challengeName)
            .single();

        // No challenge found
        if (!challenge) {
            return NextResponse.json(
                { error: "Challenge not found" },
                { status: 404 },
            );
        }

        const { system_prompt, answer } = challenge;

        const systemPrompt = system_prompt.replaceAll("█████", answer);
        console.log(systemPrompt);

        if (error || !challenge) {
            return NextResponse.json(
                { error: "Challenge not found" },
                { status: 404 },
            );
        }

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
