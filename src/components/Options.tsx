"use client";

import * as React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { FaLightbulb } from "react-icons/fa6";
import ChooseLevel from "./ChooseLevel";
import { Textarea } from "./ui/textarea";
import { Terminal } from "lucide-react";
import { Label } from "./ui/label";
import { IoHelpBuoy } from "react-icons/io5";
import { useLevel } from "@/contexts/LevelContext";

export default function Options() {
    const { selectedLevel, setSelectedLevel } = useLevel();
    const [systemPrompt, setSystemPrompt] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/api/challenges");
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
                <span className="flex items-center justify-center space-x-4">
                    {/* Theme toggler */}
                    <ThemeToggle />
                    {/* Tutorial */}
                    <Button
                        className="font-playwrite border-primary hover:cursor-pointer"
                        variant={"outline"}
                    >
                        <div className="flex justify-center items-center space-x-1">
                            <FaLightbulb size={30} />
                            <div>Tutorial</div>
                        </div>
                    </Button>
                    {/* Level picker */}
                    <ChooseLevel />
                    {/* Hint */}
                    <Button
                        className="font-playwrite border-primary hover:cursor-pointer"
                        variant={"outline"}
                    >
                        <div className="flex justify-center items-center space-x-1">
                            <IoHelpBuoy size={40} />
                            <div>Show hint</div>
                        </div>
                    </Button>
                </span>
                <Label className="font-victor-mono text-base">
                    System prompt (My command to the LLM)
                </Label>
                <Alert className="flex border-primary">
                    <Terminal className="h-10 w-10" />
                    <AlertTitle />
                    <AlertDescription className="font-victor-mono text-sm md:text-sm lg:text-sm border-primary resize-none w-full h-2">
                        {systemPrompt || "Loading..."}
                    </AlertDescription>
                </Alert>
            </div>
        </>
    );
}
