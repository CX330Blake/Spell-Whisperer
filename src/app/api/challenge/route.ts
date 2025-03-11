import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const filePath = path.join(
            process.cwd(),
            "/src/app/api/challenges/challenges.json",
        );

        if (!fs.existsSync(filePath)) {
            return NextResponse.json(
                { error: "File not found" },
                { status: 404 },
            );
        }

        const data = fs.readFileSync(filePath, "utf-8");
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json(
            { error: "Server error", details: error.message },
            { status: 500 },
        );
    }
}
