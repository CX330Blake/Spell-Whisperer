import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function GET() {
    const { data: leaderboardData, error } = await supabaseServer
        .from("leaderboard")
        .select("user_id, score, solved_count, last_solved_at")
        .order("score", { ascending: false })
        .order("last_solved_at", { ascending: true });

    if (error || !leaderboardData) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Query all `username` corresponding to `user_id`
    const userIds = leaderboardData.map((row) => row.user_id);
    const { data: userData, error: userError } = await supabaseServer
        .schema("next_auth")
        .from("users")
        .select("id, name")
        .in("id", userIds);

    if (userError) {
        return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    // Create a map of `userId → username`
    const userMap = Object.fromEntries(
        userData?.map((u) => [u.id, u.name]) || [],
    );

    const enrichedLeaderboard = leaderboardData.map((row) => ({
        ...row,
        username: userMap[row.user_id] || "Anonymous",
    }));

    return NextResponse.json(enrichedLeaderboard);
}
