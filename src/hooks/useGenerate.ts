import axios from "axios";
import { useMutation } from "@tanstack/react-query";

async function chatWithLLM(prompt: string): Promise<{ message: string }> {
    try {
        const res = await axios.post("/api/chat/", { prompt });
        return res.data;
    } catch (err: any) {
        const errorMsg = err?.response?.data?.error || err?.message || "Unknown error";
        throw new Error(errorMsg);
    }
}

export function useGenerate() {
    const chat = useMutation({
        mutationFn: chatWithLLM,
    });

    return {
        chat,
    };
}
