import axios from "axios";
import { useMutation } from "@tanstack/react-query";

async function chatWithLLM(prompt: string): Promise<{ message: string }> {
    try {
        const res = await axios.post("/api/chat/", { prompt });
        return res.data;
    } catch {
        const errorMsg = "Unknown error";
        throw new Error(errorMsg);
    }
}

async function generateMindMapData(prompt: string) {
    try {
        const res = await axios.post("/api/mindmap/", { prompt });
        return res.data;
    } catch {
        const errorMsg = "Unknown error";
        throw new Error(errorMsg);
    }
}

export function useGenerate() {
    const chat = useMutation({
        mutationFn: chatWithLLM,
    });

    const mindMap = useMutation({
        mutationFn: generateMindMapData,
    });

    return {
        chat,
        mindMap,
    };
}
