"use client";

import * as React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Terminal } from "lucide-react";
import { Label } from "./ui/label";
import HintButton from "./HintButton";
import TutorialButton from "./TutorialButton";
import { useChallengeName } from "@/contexts/ChallengeNameContext";

export default function Options() {
    const { challengeName } = useChallengeName();
    const [systemPrompt, setSystemPrompt] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const sysPromptData = await fetch(
                    "/api/challenge/get-system-prompt",
                    {
                        method: "POST",
                        body: JSON.stringify({ name: challengeName }),
                    }
                ).then((res) => res.json());

                if (challengeName && sysPromptData) {
                    setSystemPrompt(sysPromptData);
                }
            } catch (error) {
                console.error("Error fetching challenges:", error);
            }
        }

        fetchData();
    }, [challengeName]);

    return (
        <>
            <div className="flex-col justify-center space-y-2">
                <span className="grid grid-cols-2 gap-4 items-center justify-center md:flex">
                    {/* Theme toggler */}
                    <ThemeToggle />
                    {/* Tutorial */}
                    <TutorialButton />
                    {/* Level picker */}
                    {/* Hint */}
                    <HintButton />
                </span>
                <Label className="font-victor-mono text-base">
                    System prompt (My command to the LLM)
                </Label>
                <Alert className="flex border-primary">
                    <Terminal className="h-10 w-10" />
                    <AlertTitle />
                    <AlertDescription className="font-victor-mono text-sm md:text-sm lg:text-sm border-primary resize-none w-full h-auto">
                        {systemPrompt ||
                            "Choose level to see the system prompt"}
                    </AlertDescription>
                </Alert>
            </div>
        </>
    );
}
