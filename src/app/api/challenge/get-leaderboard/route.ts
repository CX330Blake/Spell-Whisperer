import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("leaderboard")
            .select("*")
            .order("solved_count", { ascending: false });
        console.log(data);

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "Server error", details: (error as Error).message },
            { status: 500 }
        );
    }
}
