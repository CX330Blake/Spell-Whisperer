import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
    try {
        const name = req.nextUrl.searchParams.get("name");

        const { data, error } = await supabase
            .from("challenges")
            .select("system_prompt")
            .eq("name", name);

        if (error) {
            throw new Error(error.message);
        }
        const hint = data[0]?.system_prompt;

        return NextResponse.json(hint);
    } catch (error) {
        return NextResponse.json(
            { error: "Server error", details: (error as Error).message },
            { status: 500 }
        );
    }
}
