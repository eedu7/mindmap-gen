import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});

export async function chat(contents: string) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents,
    });
    return response.text;
}

export async function getMindMap(topic: string) {
    const prompt = `
You are a mind map generator. Given a topic, respond with a JSON object compatible with React Flow. 
Return an object with "nodes" and "edges" keys.

Each node should include:
- id (string)
- type (e.g. "mindmap")
- data: { label: string }
- position: { x: number, y: number }

Each edge should include:
- id (string)
- source (node id)
- target (node id)
- type (e.g. "default")

Generate a small, meaningful mind map for the topic: "${topic}".
Also the type of the node can only be "mindmap", nothing else
Respond with **only** a JSON object. Do not include explanations or extra text.
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });

    return response.text;
}
