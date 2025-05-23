"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useGenerate } from "@/hooks/useGenerate";
import { cn } from "@/lib/utils";
import { BotIcon, User2Icon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
    weight: ["700"],
    subsets: ["latin"],
});

export default function Home() {
    const [prompt, setPrompt] = React.useState<string>("");

    const [messages, setMessages] = React.useState<{ role: "user" | "assistant"; content: string }[]>([]);

    const { chat } = useGenerate();

    const bottomRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setMessages((prev) => [...prev, { role: "user", content: prompt }]);

        chat.mutate(prompt, {
            onSuccess: (data) => {
                setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
            },
            onError: () => {
                setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong" }]);
            },
        });

        setPrompt("");
    };

    return (
        <div className="flex min-h-screen flex-col justify-center py-14 md:px-8">
            {messages.length > 0 && (
                <div className="mx-auto w-full max-w-6xl flex-1">
                    <ScrollArea className="h-[75vh]">
                        <div className="flex flex-col space-y-6 px-4">
                            {messages.map(({ content, role }, index) => (
                                <div
                                    key={`${index}_${role}`}
                                    className={cn(
                                        role === "user" && "justify-end",
                                        role === "assistant" && "justify-start",
                                        "flex w-full",
                                    )}
                                >
                                    <div className="flex items-center gap-2 rounded-xl border p-2 shadow-xl">
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="hover:bg-none"
                                        >
                                            {role === "user" ? <User2Icon /> : <BotIcon />}
                                        </Button>
                                        <p>{content}</p>
                                    </div>
                                </div>
                            ))}
                            {chat.isPending && (
                                <div className={cn("flex w-full justify-start")}>
                                    <div className="flex items-center gap-2 rounded-xl border p-2 shadow-xl">
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="hover:bg-none"
                                        >
                                            <BotIcon />
                                        </Button>
                                        <p className="italic">Bot is thinking...</p>
                                    </div>
                                </div>
                            )}
                            <div ref={bottomRef} />
                        </div>
                    </ScrollArea>
                </div>
            )}

            <div className="mx-auto w-full max-w-4xl p-2">
                {messages.length == 0 && (
                    <div className="relative bottom-48 flex w-full flex-col items-center justify-center space-y-2 text-center">
                        <h1 className={cn("text-4xl font-bold", poppins.className)}>GenAI</h1>
                        <p className="text-muted-foreground max-w-md text-lg">
                            Your intelligent assistant powered by AI — ask anything and get smart, instant responses.
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
                            disabled={chat.isPending}
                        />
                        <Button
                            variant="outline"
                            className="cursor-pointer"
                            type="submit"
                            disabled={chat.isPending}
                        >
                            Send
                        </Button>
                    </div>
                    <div className="flex-start flex w-full">
                        <Link href="/mind-map">
                            <Button
                                variant="outline"
                                className="cursor-pointer"
                            >
                                Generate Mindmap
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
