import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const selectedLevel = body.level;
        const flag = body.flag;

        const filePath = path.join(
            process.cwd(),
            "/src/app/api/challenge/challenges.json"
        );

        const challengeInfo = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const answer = challengeInfo[selectedLevel][0]["answer"];

        if (flag.trim() === answer) {
            return NextResponse.json({ correct: true });
        } else {
            return NextResponse.json({ correct: false });
        }
    } catch (error) {
        return NextResponse.json({ response: (error as Error).message });
    }
}
