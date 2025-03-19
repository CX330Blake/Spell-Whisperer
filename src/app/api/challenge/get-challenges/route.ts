import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { error: "Missing userId" },
                { status: 400 }
            );
        } else {
            console.log("userId", userId);
        }

        // 1. Query all challenges (including related levels data)
        const { data: challenges, error: challengesError } =
            await supabaseServer
                .from("challenges")
                .select("id, name, level_id, levels(level_name)")
                .order("level_id", { ascending: true });

        if (challengesError) {
            return NextResponse.json(
                { error: "Database error", details: challengesError.message },
                { status: 500 }
            );
        }

        // Query the challenges solved by the user
        const { data: solvedChallenges, error: solvedChallengesError } =
            await supabaseServer
                .from("user_challenges")
                .select()
                .eq("user_id", userId);

        if (solvedChallengesError) {
            return NextResponse.json(
                {
                    error: "Database error",
                    details: solvedChallengesError.message,
                },
                { status: 500 }
            );
        }

        // Turn userChallenges into an array (containing the challenge_id of the solved challenge)
        const solvedIds =
            solvedChallenges?.map((record) => record.challenge_id) || [];

        // 3. Combine the results and mark each question as solved
        const formattedData = challenges.map(
            ({ id, name, level_id, levels }) => ({
                name,
                // level: levels?.level_name ?? "Unknown",
                level:
                    (levels as unknown as { level_name: string }).level_name ??
                    "Unknown",
                levelID: level_id,
                solved: solvedIds.includes(id),
            })
        );

        console.log(formattedData);
        return NextResponse.json(formattedData);
    } catch (error) {
        return NextResponse.json(
            { error: "Server error", details: (error as Error).message },
            { status: 500 }
        );
    }
}
