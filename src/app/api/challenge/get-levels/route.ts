import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
    try {
        // FROM `challenges` SELECT `name`
        const { data, error } = await supabase
            .from("levels")
            .select("level_name");

        if (error) {
            throw new Error(error.message);
        }

        const challengeNames = data.map((level) => level.level_name);

        return NextResponse.json(challengeNames);
    } catch (error) {
        return NextResponse.json(
            { error: "Server error", details: (error as Error).message },
            { status: 500 }
        );
    }
}
