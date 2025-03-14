import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { useChallengeName } from "@/contexts/ChallengeNameContext";

export async function POST(req: NextRequest) {
    try {
        const { challengeName } = await req.json();

        if (!challengeName) {
            return NextResponse.json(
                { error: "Missing challengeName" },
                { status: 400 }
            );
        }

        const filePath = path.join(
            process.cwd(),
            "/src/app/api/challenge/challenges.json"
        );

        if (!fs.existsSync(filePath)) {
            return NextResponse.json(
                { error: "File not found" },
                { status: 404 }
            );
        }

        const data = fs.readFileSync(filePath, "utf-8");
        const jsonData = JSON.parse(data);

        return NextResponse.json(jsonData.challengeName.systemPrompt);
    } catch (error) {
        return NextResponse.json(
            { error: "Server error", details: (error as Error).message },
            { status: 500 }
        );
    }
}
