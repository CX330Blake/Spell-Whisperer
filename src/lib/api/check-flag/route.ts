import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export async function GET() {
    const filePath = path.join(
        process.cwd(),
        "@/lib/api/check-flag/challenges.json",
    );
    const data = fs.readFileSync(filePath, "utf-8");
    return NextResponse.json(JSON.parse(data));
}
