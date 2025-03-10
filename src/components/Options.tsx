"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

import { ThemeToggle } from "./ThemeToggle";
import { FaLightbulb } from "react-icons/fa6";
import ChooseLevel from "./ChooseLevel";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { IoHelpBuoy } from "react-icons/io5";
import { useLevel } from "@/contexts/LevelContext";

export default function Options() {
    const { selectedLevel, setSelectedLevel } = useLevel();

    const data = fetch("/api/check-flag");

    return (
        <>
            <div className="flex-col justify-center space-y-4">
                <span className="flex items-center justify-center space-x-4">
                    {/* Theme toggler */}
                    <ThemeToggle />
                    {/* Tutorial */}
                    <Button
                        className="font-playwrite border-primary"
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
                        className="font-playwrite border-primary"
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
                <Textarea
                    disabled
                    className="font-victor-mono text-sm md:text-base lg:text-base border-primary resize-none w-full h-2"
                ></Textarea>
            </div>
        </>
    );
}
