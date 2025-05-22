import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});

export async function generateJSON(contents: string) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents,
    });
    return response.text;
}
