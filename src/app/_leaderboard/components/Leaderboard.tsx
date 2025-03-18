"use client";

import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState<any[]>([]);

    const fetchLeaderboard = async () => {
        const { data, error } = await supabase
            .from("leaderboard")
            .select("*")
            .order("solved_count", { ascending: false });
        console.log(data);
        if (!error) {
            setLeaderboard(data);
        }
    };

    useEffect(() => {
        // 初始獲取排行榜
        fetchLeaderboard();

        // 訂閱 user_challenges 表的變更以更新排行榜
        const subscription = supabase
            .channel("user_challenges")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "user_challenges" },
                (payload) => {
                    console.log("User challenge changed:", payload);
                    // 每次變更後重新計算排行榜
                    fetchLeaderboard();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    return (
        <div>
            <h2>Leaderboard</h2>
            {leaderboard.map((item) => (
                <div key={item.user_id}>
                    {item.user_id}: {item.solved_count}
                </div>
            ))}
        </div>
    );
}
