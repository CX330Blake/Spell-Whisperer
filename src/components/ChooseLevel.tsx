"use client";

import * as React from "react";

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

export default function ChooseLevel() {
    const { selectedLevel, setSelectedLevel } = useLevel();

    const handleToggle = (level: string) => {
        setSelectedLevel(level);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="font-playwrite border-primary hover:cursor-pointer"
                >
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
                >
                    <DropdownMenuRadioItem value="simple">
                        Simple - Traveler
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="medium">
                        Medium - Twilight
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="hard">
                        Hard - Tokyo night
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
