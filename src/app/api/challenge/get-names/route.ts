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

        const data = fs.readFileSync(filePath, "utf-8");
        const jsonData = JSON.parse(data);
        const names = Object.keys(jsonData);

        return NextResponse.json(names);
    } catch (error) {
        return NextResponse.json(
            { error: "Server error", details: (error as Error).message },
            { status: 500 }
        );
    }
}
