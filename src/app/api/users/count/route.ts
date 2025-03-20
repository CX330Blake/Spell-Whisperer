import { supabaseServer } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { data, error } = await supabaseServer
            .schema("next_auth")
            .from("users")
            .select("*");

        if (error) {
            return NextResponse.json(
                { error: "Failed to fetch users", details: error.message },
                { status: 500 },
            );
        }

        return NextResponse.json({ count: data.length }, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            {
                error: "Unexpected server error",
                details: (err as Error).message,
            },
            { status: 500 },
        );
    }
}
