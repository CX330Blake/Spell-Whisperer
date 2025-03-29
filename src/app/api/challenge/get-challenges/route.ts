import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");
        const levelIdParams = req.nextUrl.searchParams.get("levelId");
        const levelIds = levelIdParams
            ? levelIdParams
                  .split(",")
                  .map((id) => parseInt(id))
                  .filter((id) => !isNaN(id))
            : null;
        const hideSolved =
            req.nextUrl.searchParams.get("hideSolved")?.toLowerCase() ===
            "true";
        const search = req.nextUrl.searchParams.get("search") || "";

        if (!userId) {
            return NextResponse.json(
                { error: "Missing userId" },
                { status: 400 },
            );
        }

        // 1. Query all challenges
        const { data: challenges, error: challengesError } =
            await supabaseServer
                .from("challenges")
                .select("id, name, level_id, levels(level_name)")
                .order("level_id", { ascending: true });

        if (challengesError) {
            return NextResponse.json(
                { error: "Database error", details: challengesError.message },
                { status: 500 },
            );
        }

        // 2. Query first bloods
        const { data: firstBloods, error: firstBloodsError } =
            await supabaseServer
                .from("user_challenges")
                .select("challenge_id, user_id, solved_at")
                .eq("status", true)
                .order("solved_at", { ascending: true });

        if (firstBloodsError) {
            return NextResponse.json(
                { error: "Database error", details: firstBloodsError.message },
                { status: 500 },
            );
        }

        // 3. Construct first blood map
        const firstBloodMap = new Map<number, string>();
        for (const record of firstBloods) {
            if (!firstBloodMap.has(record.challenge_id)) {
                firstBloodMap.set(record.challenge_id, record.user_id);
            }
        }

        const userIds = [...new Set(firstBloods.map((r) => r.user_id))];
        const { data: userProfiles } = await supabaseServer
            .schema("next_auth")
            .from("users")
            .select("id, name, image")
            .in("id", userIds);
        const userMap = new Map(
            userProfiles?.map((u) => [u.id, { name: u.name, image: u.image }]),
        );

        // 4. Query challenges solved by user
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
                { status: 500 },
            );
        }

        const solvedIds =
            solvedChallenges?.map((record) => record.challenge_id) || [];

        // 5. Build final result with firstBlood info included
        const formattedData = challenges.map(
            ({ id, name, level_id, levels }) => ({
                id,
                name,
                level:
                    (levels as unknown as { level_name: string }).level_name ??
                    "Unknown",
                levelId: level_id,
                solved: solvedIds.includes(id),
                firstBlood:
                    userMap.get(firstBloodMap.get(id) ?? "")?.name ?? null,
                firstBloodAvatar:
                    userMap.get(firstBloodMap.get(id) ?? "")?.image ?? null,
            }),
        );

        // 6. Filter
        const filteredData = formattedData
            .filter((c) => (levelIds ? levelIds.includes(c.levelId) : true))
            .filter((c) => (hideSolved ? !c.solved : true))
            .filter((c) =>
                search
                    ? c.name.toLowerCase().startsWith(search.toLowerCase())
                    : true,
            );

        return NextResponse.json(filteredData);
    } catch (error) {
        return NextResponse.json(
            { error: "Server error", details: (error as Error).message },
            { status: 500 },
        );
    }
}
