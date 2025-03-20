import { supabaseServer } from "@/lib/supabase";

export default async function Leaderboard() {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    function formatDateTime(timestamp: string) {
        // Parse Supabase timestamp (if no `Z`, manually append `Z` to represent UTC)
        const utcDate = new Date(timestamp.replace(" ", "T") + "Z");

        return utcDate
            .toLocaleString("zh-TW", {
                timeZone: userTimeZone,
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
            .replace(/\//g, "-") // replace all `/` with `-`
            .replace(",", "");
    }

    const { data: leaderboardData, error } = await supabaseServer
        .from("leaderboard")
        .select("user_id, score, solved_count, last_solved_at")
        .order("score", { ascending: false });

    if (error || !leaderboardData) {
        console.error("Error fetching leaderboard:", error?.message);
        return <div>Error loading leaderboard.</div>;
    }

    // Query all `username` corresponding to `user_id`
    const userIds = leaderboardData.map((row) => row.user_id);
    const { data: userData, error: userError } = await supabaseServer
        .schema("next_auth")
        .from("users")
        .select("id, name")
        .in("id", userIds);

    if (userError) {
        console.error("Error fetching users:", userError?.message);
    }

    // Create a map of `userId → username`
    const userMap = Object.fromEntries(
        userData?.map((u) => [u.id, u.name]) || [],
    );

    return (
        <div className="flex flex-col w-full font-playwrite text-2xl mt-[5vh] mb-[5vh]">
            {/* Header row */}
            <div className="grid grid-cols-5 border-b border-primary py-3 text-center font-bold items-center">
                <div>Rank</div>
                <div>Username</div>
                <div>Score</div>
                <div>Solved Count</div>
                <div className="leading-relaxed">
                    Last Solved
                    <br />({userTimeZone})
                </div>
            </div>
            {/* Content */}
            {leaderboardData.map((row, index) => (
                <div
                    key={row.user_id}
                    className="grid grid-cols-5 p-3 text-base font-victor-mono text-center border-b border-gray-500 items-center"
                >
                    <div>{index + 1}</div>
                    <div>{userMap[row.user_id] || "Anonymous"}</div>
                    <div>{row.score}</div>
                    <div>{row.solved_count}</div>
                    <div>{formatDateTime(row.last_solved_at)}</div>
                </div>
            ))}
        </div>
    );
}
