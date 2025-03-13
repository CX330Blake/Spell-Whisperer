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

export default function ChooseLevel() {
    const { selectedLevel, setSelectedLevel } = useLevel();
    const [challengeLevels, setChallengeLevels] = useState<string[]>([]);
    const [challengeNames, setChallengeNames] = useState<string[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // fetch names
                let data = await fetch("/api/challenge/get-names").then((res) =>
                    res.json(),
                );

                const names: string[] = [];
                for (const d of data) {
                    names.push(d);
                }

                // fetch levels
                data = await fetch("/api/challenge/get-levels").then((res) =>
                    res.json(),
                );

                const levels: string[] = [];
                for (const d of data) {
                    levels.push(d);
                }

                setChallengeNames(names);
                setChallengeLevels(levels);
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
                    {challengeLevels.map((level, index) => (
                        <DropdownMenuRadioItem value={level} key={level}>
                            {`${level.charAt(0).toUpperCase() + level.slice(1)} - ${challengeNames[index]}`}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
