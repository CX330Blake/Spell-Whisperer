import { NextRequest } from "next/server";
import OpenAI from "openai";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
    // Create a TransformStream for streaming the response
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    const streamResponse = async () => {
        try {
            const body = await req.json();
            const challengeName = body.name;

            if (challengeName === undefined || challengeName === "") {
                await writer.write(
                    encoder.encode(
                        `data: ${JSON.stringify({ content: "Please select a level to start." })}\n\n`,
                    ),
                );
                await writer.write(encoder.encode("data: [DONE]\n\n"));
                await writer.close();
                return;
            }

            // Fetch challenge from Supabase
            const { data: challenge, error } = await supabase
                .from("challenges")
                .select("system_prompt, answer")
                .eq("name", challengeName)
                .single();

            // Handle errors
            if (error || !challenge) {
                await writer.write(
                    encoder.encode(
                        `data: ${JSON.stringify({ content: "Challenge not found" })}\n\n`,
                    ),
                );
                await writer.write(encoder.encode("data: [DONE]\n\n"));
                await writer.close();
                return;
            }

            const { system_prompt, answer } = challenge;
            const systemPrompt = system_prompt.replaceAll("█████", answer);

            // Initialize OpenAI client
            const client = new OpenAI({
                apiKey: process.env.XAI_API_KEY,
                baseURL: "https://api.x.ai/v1",
            });

            // Create streaming completion
            const completion = await client.chat.completions.create({
                model: "grok-2-latest",
                messages: [
                    {
                        role: "system",
                        content: systemPrompt,
                    },
                    {
                        role: "user",
                        content: body.input,
                    },
                ],
                stream: true, // Enable streaming
            });

            // Process the streaming response
            for await (const chunk of completion) {
                const content = chunk.choices[0]?.delta?.content || "";
                if (content) {
                    await writer.write(
                        encoder.encode(
                            `data: ${JSON.stringify({ content })}\n\n`,
                        ),
                    );
                }
            }

            await writer.write(encoder.encode("data: [DONE]\n\n"));
            await writer.close();
        } catch (error) {
            const errorMessage = (error as Error).message;
            await writer.write(
                encoder.encode(
                    `data: ${JSON.stringify({ error: errorMessage })}\n\n`,
                ),
            );
            await writer.write(encoder.encode("data: [DONE]\n\n"));
            await writer.close();
        }
    };

    // Execute the streaming function
    streamResponse();

    // Return the readable stream as the response
    return new Response(stream.readable, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
        },
    });
}
