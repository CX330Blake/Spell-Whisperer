import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export async function GET() {
    try {
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

        const levels: string[] = [];
        const data = fs.readFileSync(filePath, "utf-8");
        const parsedData = JSON.parse(data);

        // Traverse the challenges and get the levels
        for (const challenge of Object.values(parsedData)) {
            const level = (challenge as any).level;
            if (level && !levels.includes(level)) {
                levels.push(level);
            }
        }

        return NextResponse.json(levels);
    } catch (error) {
        return NextResponse.json(
            { error: "Server error", details: (error as Error).message },
            { status: 500 }
        );
    }
}
