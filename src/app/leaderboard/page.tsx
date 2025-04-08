"use client";

import BlurText from "@/components/reactbits/BlurText";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SplitText from "@/components/reactbits/SplitText";

interface LeaderboardEntry {
    user_id: string;
    user_avatar: string;
    username: string;
    score: number;
    solved_count: number;
    last_solved_at: string;
}

export default function Page() {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
        [],
    );
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                setLoading(true);

                const res = await fetch("/api/challenge/get-leaderboard");
                if (!res.ok) throw new Error("Failed to fetch leaderboard");

                const data: LeaderboardEntry[] = await res.json();
                setLeaderboardData(data);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchLeaderboard();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="w-4/5 mx-auto mt-[15vh]">
            <span className="flex flex-col space-y-4 items-center">
                <span className="font-victor-mono text-4xl md:text-6xl">
                    <SplitText text="Leaderboard" />
                </span>
                <span className="font-playwrite justify-center text-base md:text-xl">
                    <SplitText text="- Be the best Spell Whisperer in the world -" />
                </span>
            </span>
            <div className="flex flex-col w-full font-playwrite text-2xl mt-[5vh] mb-[5vh]">
                <div className="overflow-x-auto">
                    <div className="min-w-[600px]">
                        {/* Header row */}
                        <div className="grid grid-cols-5 border-b border-primary py-3 text-center font-bold items-center">
                            <div>Rank</div>
                            <div>Hacker</div>
                            <div>Score</div>
                            <div>Pwned LLMs</div>
                            <div className="leading-relaxed">
                                Last Pwned
                                <br />({userTimeZone})
                            </div>
                        </div>
                        {/* Content */}
                        {leaderboardData.map((row, index) => (
                            <div
                                key={row.user_id}
                                className="grid grid-cols-5 p-3 text-base font-victor-mono text-center border-b border-gray-500 items-center"
                            >
                                <div>#{index + 1}</div>
                                <div className="flex items-center gap-2 justify-center">
                                    <Avatar className="border-primary border-2">
                                        <AvatarImage src={row.user_avatar} />
                                        <AvatarFallback>?</AvatarFallback>
                                    </Avatar>
                                    {row.username}
                                </div>
                                <div>{row.score}</div>
                                <div>{row.solved_count}</div>
                                <div>{formatDateTime(row.last_solved_at)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
