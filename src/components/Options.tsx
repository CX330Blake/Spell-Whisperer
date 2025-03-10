"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

import { ThemeToggle } from "./ThemeToggle";
import { FaLightbulb } from "react-icons/fa6";
import ChooseLevel from "./ChooseLevel";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

export default function Options() {
    return (
        <>
            <div className="flex-col justify-center space-y-4">
                <span className="flex items-center justify-center space-x-4">
                    {/* Theme toggler */}
                    <ThemeToggle />
                    {/* Level picker */}
                    <ChooseLevel />
                    {/* Hint */}
                    <Button className="font-playwrite">
                        <div className="flex justify-center items-center space-x-2">
                            <FaLightbulb size={30} />
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
