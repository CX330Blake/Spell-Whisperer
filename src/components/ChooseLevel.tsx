"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuRadioItem,
    DropdownMenuRadioGroup,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GrHelp } from "react-icons/gr";
import { useLevel } from "@/contexts/LevelContext";
import { useState, useEffect } from "react";
import { animate } from "framer-motion";

export default function ChooseLevel() {
    const { selectedLevel, setSelectedLevel } = useLevel();
    const [levels, setLevels] = useState<string[]>([]);
    const [challengeNames, setChallengeNames] = useState<string[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetch("/api/challenge/get-info").then(
                    (res) => res.json(),
                );
                if (data) {
                    const levels = Object.keys(data);
                    setLevels(levels);
                    const names: string[] = [];
                    for (const level of levels) {
                        names.push(data[level][0]["name"]);
                    }
                    setChallengeNames(names);
                }
            } catch (error) {
                console.error("Error fetching challenges:", error);
            }
        }
        fetchData();
    }, [selectedLevel]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="font-playwrite border-primary hover:cursor-pointer relative"
                >
                    {/* Right top corner dot */}
                    {selectedLevel === undefined || selectedLevel === "" ? (
                        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                            <span className="relative flex">
                                <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
                            </span>
                        </div>
                    ) : null}
                    <div className="flex justify-center items-center space-x-1">
                        <GrHelp size={30} />
                        <div>
                            {selectedLevel
                                ? selectedLevel.charAt(0).toUpperCase() +
                                  selectedLevel.slice(1)
                                : "Choose level"}
                        </div>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Choose level</DropdownMenuLabel>
                <DropdownMenuSeparator />{" "}
                <DropdownMenuRadioGroup
                    value={selectedLevel}
                    onValueChange={setSelectedLevel}
                    className="overflow-auto"
                >
                    {levels.map((level, index) => (
                        <DropdownMenuRadioItem value={level} key={level}>
                            {`${level.charAt(0).toUpperCase() + level.slice(1)} - ${challengeNames[index]}`}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
