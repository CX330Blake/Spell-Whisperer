import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const flag = body.flag;
        const challengeName = body.name;

        const filePath = path.join(
            process.cwd(),
            "/src/app/api/challenge/challenges.json"
        );

        const challengeInfo = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const answer = challengeInfo[challengeName].answer;

        if (flag.trim().toLowerCase() === answer.toLowerCase()) {
            return NextResponse.json({ correct: true });
        } else {
            return NextResponse.json({ correct: false });
        }
    } catch (error) {
        return NextResponse.json({ response: (error as Error).message });
    }
}
