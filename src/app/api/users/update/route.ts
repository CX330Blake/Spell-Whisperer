import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import sharp from "sharp";
import z from "zod";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const usernameSchema = z
        .string()
        .min(2)
        .max(30)
        .regex(/^[a-zA-Z0-9_-]+$/, "Invalid username format");

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const avatar = formData.get("avatar") as File | null;

    const parseResult = usernameSchema.safeParse(username);

    if (!parseResult.success) {
        return NextResponse.json(
            {
                error: `Username can only contains numbers, alphabets, "-" and "_"`,
            },
            { status: 400 },
        );
    }

    if (avatar) {
        const arrayBuffer = await avatar.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        try {
            // Try to parse the image file
            const metadata = await sharp(buffer).metadata();

            if (metadata.width && metadata.height) {
                if (metadata.width > 5000 || metadata.height > 5000) {
                    return NextResponse.json(
                        {
                            error: "Image resolution too high. Max 5000x5000 pixels allowed.",
                        },
                        { status: 400 },
                    );
                }
            }
        } catch (error) {
            return NextResponse.json(
                {
                    error: "Invalid image file. Please upload a valid JPG or PNG.",
                },
                { status: 400 },
            );
        }
    }

    let avatarUrl = null;
    if (avatar) {
        const fileExt = avatar.name.split(".").pop();
        const filePath = `avatars/${session.user.id}.${fileExt}`;

        // Upload to Supabase Storage
        const { data, error } = await supabaseServer.storage
            .from("avatars")
            .upload(filePath, avatar, { upsert: true });

        if (!error) {
            avatarUrl = supabaseServer.storage
                .from("avatars")
                .getPublicUrl(filePath).data.publicUrl;
        } else {
            console.log(error);
        }
    }

    // update user info
    const { data, error } = await supabaseServer
        .schema("next_auth")
        .from("users")
        .update({
            name: username,
            // email: email,
            image: avatarUrl || undefined,
        })
        .eq("id", session.user.id)
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 200 });
}
