import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("challenges")
            .select("name");

        if (error) {
            throw new Error(error.message);
        }
        const count = data.length;

        return NextResponse.json({ count: count });
    } catch (error) {
        return NextResponse.json(
            { error: "Server error", details: (error as Error).message },
            { status: 500 }
        );
    }
}
