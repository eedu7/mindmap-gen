"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useGenerate } from "@/hooks/useGenerate";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Loader2 } from "lucide-react";
import { parseJSONData } from "@/lib/parseJSONData";
import { ReactFlowMindMap } from "@/components/mindmap";
import { generateElementsFromJson } from "@/lib/generateElementsFromJson";
import useStore from "@/components/mindmap/store";
import Link from "next/link";

const poppins = Poppins({
    weight: ["700"],
    subsets: ["latin"],
});

export default function Home() {
    const [prompt, setPrompt] = React.useState<string>("");

    const { mindMap } = useGenerate();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        mindMap.mutate(prompt);

        setPrompt("");
    };

    const setElements = useStore((state) => state.setElements);

    React.useEffect(() => {
        if (mindMap.data) {
            const parsed = parseJSONData(mindMap.data);
            const { nodes, edges } = generateElementsFromJson(parsed);
            setElements(nodes, edges);
        }
    }, [mindMap.data, setElements]);

    return (
        <div className="flex min-h-screen flex-col justify-center py-14 md:px-8">
            <div className="mx-auto w-full max-w-6xl flex-1">
                <div>
                    {mindMap.isPending && (
                        <div className="mx-auto flex h-[50vh] max-w-4xl items-center justify-center rounded-xl p-4">
                            <Loader2 className="repeat-infinite text-primary size-14 animate-spin" />
                        </div>
                    )}
                    {mindMap.data && (
                        <div className="mx-auto h-[50vh] max-w-4xl rounded-xl p-4">
                            <ReactFlowMindMap />
                        </div>
                    )}
                </div>
            </div>

            <div className="mx-auto w-full max-w-4xl p-2">
                {!mindMap.data && (
                    <div className="relative bottom-48 flex w-full flex-col items-center justify-center space-y-2 text-center">
                        <h1 className={cn("text-4xl font-bold", poppins.className)}>GenAI - MindMap Generator</h1>
                        <p className="text-muted-foreground max-w-md text-lg">
                            An AI-powered assistant that helps you generate mind maps and get quick, intelligent answers
                            to your questions.
                        </p>
                    </div>
                )}
                <form
                    className="mx-auto flex max-w-xl flex-col items-center gap-x-2 rounded-lg border p-2 shadow-xl"
                    onSubmit={(e) => onSubmit(e)}
                >
                    <div className="flex w-full items-center">
                        <input
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-full flex-1 border-none px-4 py-4 shadow-none outline-none focus:border-none focus:outline-none active:border-none active:outline-none"
                            placeholder="Ask anything..."
                            value={prompt}
                            disabled={mindMap.isPending}
                        />
                        <Button
                            variant="outline"
                            className="cursor-pointer"
                            type="submit"
                            disabled={mindMap.isPending}
                        >
                            Send
                        </Button>
                    </div>
                    <div className="flex-start flex w-full">
                        <Link href="/">
                            <Button className="cursor-pointer">Back to chat</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
