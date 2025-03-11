"use client";

import * as React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { FaLightbulb } from "react-icons/fa6";
import ChooseLevel from "./ChooseLevel";
import { Terminal } from "lucide-react";
import { Label } from "./ui/label";
import { IoHelpBuoy } from "react-icons/io5";
import { useLevel } from "@/contexts/LevelContext";
import HintButton from "./HintButton";
import { Confetti } from "./Confetti";
import TutorialButton from "./TutorialButton";

export default function Options() {
    const { selectedLevel, setSelectedLevel } = useLevel();
    const [systemPrompt, setSystemPrompt] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/api/challenge/get-info");
                const data = await res.json();

                if (selectedLevel && data[selectedLevel]) {
                    setSystemPrompt(data[selectedLevel][0]["system"]);
                }
            } catch (error) {
                console.error("Error fetching challenges:", error);
            }
        }

        fetchData();
    }, [selectedLevel]);

    return (
        <>
            <div className="flex-col justify-center space-y-4">
                <span className="grid grid-cols-2 gap-4 items-center justify-center md:flex">
                    {/* Theme toggler */}
                    <ThemeToggle />
                    {/* Tutorial */}
                    <TutorialButton />
                    {/* Level picker */}
                    <ChooseLevel />
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
                        {systemPrompt || "Loading..."}
                    </AlertDescription>
                </Alert>
            </div>
        </>
    );
}
