import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name } = await req.json();

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

        return NextResponse.json(jsonData[name].hint);
    } catch (error) {
        return NextResponse.json(
            { error: "Server error", details: (error as Error).message },
            { status: 500 }
        );
    }
}
