import { supabaseServer } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");
        if (!userId) {
            return NextResponse.json(
                { error: "Missing userId" },
                { status: 400 },
            );
        }

        // 1. Get all challenges that the user has solved
        const { data: userChallenges, error: solvedError } =
            await supabaseServer
                .from("user_challenges")
                .select("challenge_id")
                .eq("user_id", userId);

        if (solvedError) {
            throw new Error(solvedError.message);
        }

        console.log(userChallenges);

        // If the user has not solved any challenges, return 0
        if (!userChallenges || userChallenges.length === 0) {
            return NextResponse.json({ totalScore: 0 });
        }

        // extract the challenge ids
        const solvedIds = userChallenges.map((record) => record.challenge_id);

        // 2. Query the challenges table based on these challenge_ids to get the level_id for each challenge
        const { data: challenges, error: challengesError } =
            await supabaseServer
                .from("challenges")
                .select("level_id")
                .in("id", solvedIds);

        if (challengesError) {
            throw new Error(challengesError.message);
        }

        if (!challenges || challenges.length === 0) {
            return NextResponse.json({ totalScore: 0 });
        }

        // 3. Query the scores table to get the scores for each level_id
        const levelIds = Array.from(
            new Set(challenges.map((ch) => ch.level_id)),
        );

        const { data: scores, error: scoresError } = await supabaseServer
            .from("scores")
            .select("level_id, score")
            .in("level_id", levelIds);

        if (scoresError) {
            throw new Error(scoresError.message);
        }

        // Create a mapping of level_id to score
        const scoreMap = new Map<number, number>();
        scores.forEach((item) => {
            scoreMap.set(item.level_id, item.score);
        });

        // 4. Sum all the scores of the challenges
        let totalScore = 0;
        challenges.forEach((challenge) => {
            const score = scoreMap.get(challenge.level_id) || 0;
            totalScore += score;
        });

        return NextResponse.json({ totalScore });
    } catch (error) {
        return NextResponse.json(
            { error: "Server error", details: (error as Error).message },
            { status: 500 },
        );
    }
}
