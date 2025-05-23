import { NextRequest, NextResponse } from "next/server";
import { getMindMap } from "@/lib/gemini";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const prompt = body.prompt;

        if (!prompt) {
            return NextResponse.json(
                {
                    error: "Prompt is required",
                },
                {
                    status: 400,
                },
            );
        }

        const result = await getMindMap(prompt);
        return NextResponse.json(result);
    } catch {
        return NextResponse.json(
            {
                error: "Unknown error",
            },
            {
                status: 500,
            },
        );
    }
}
