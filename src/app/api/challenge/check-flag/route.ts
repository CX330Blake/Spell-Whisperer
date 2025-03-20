import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { flag, name: challengeName, userId } = body;

        if (!flag || !challengeName) {
            return NextResponse.json(
                { error: "Missing flag or challenge name" },
                { status: 400 },
            );
        }

        // Select the challenge by name
        const { data: challenge, error: challengeError } = await supabaseServer
            .from("challenges")
            .select("id, answer")
            .eq("name", challengeName)
            .single();

        if (challengeError || !challenge) {
            return NextResponse.json(
                { error: "Challenge not found" },
                { status: 404 },
            );
        }

        //Check flag
        const correct =
            flag.trim().toLowerCase() === challenge.answer.trim().toLowerCase();

        if (correct) {
            // Check if the user has already solved the challenge
            const { data: existingRecord, error: selectError } =
                await supabaseServer
                    .from("user_challenges")
                    .select()
                    .eq("user_id", userId)
                    .eq("challenge_id", challenge.id)
                    .single();

            if (selectError && selectError.code !== "PGRST116") {
                // PGRST116: No records found
                throw new Error(selectError.message);
            }

            // If the user has not solved the challenge yet, insert a new record
            if (!existingRecord) {
                const { error: insertError } = await supabaseServer
                    .from("user_challenges")
                    .insert({
                        user_id: userId,
                        status: true,
                        challenge_id: challenge.id,
                        solved_at: new Date().toISOString(),
                    });

                if (insertError) {
                    throw new Error(
                        `Failed to insert user challenge: ${insertError.message}`,
                    );
                }
            }
        }
        return NextResponse.json({ correct });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Server error", details: (error as Error).message },
            { status: 500 },
        );
    }
}
