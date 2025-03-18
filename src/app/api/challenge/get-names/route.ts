import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
    try {
        // FROM `challenges` SELECT `name`
        const { data, error } = await supabase
            .from("challenges")
            .select("name");

        if (error) {
            throw new Error(error.message);
        }

        const challengeNames = data.map((challenge) => challenge.name);

        return NextResponse.json(challengeNames);
    } catch (error) {
        return NextResponse.json(
            { error: "Server error", details: (error as Error).message },
            { status: 500 }
        );
    }
}
