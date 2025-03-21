import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { supabaseServer } from "@/lib/supabase";

export async function GET() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const { data, error } = await supabaseServer
        .schema("next_auth")
        .from("users")
        .select("name, email, image")
        .eq("id", userId);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
