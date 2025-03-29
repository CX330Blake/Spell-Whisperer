import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { ChevronDown, Search, X } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Switch } from "./Switch";
import { Label } from "./ui/label";
import { BProgress } from "@bprogress/core";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export type Challenge = {
    id: number;
    level: string;
    name: string;
    levelId: number;
    solved: boolean;
    firstBlood: string;
    firstBloodAvatar: string;
};

export default function ChallengesList() {
    const [challengeData, setChallengeData] = useState<Challenge[]>([]);
    const [levelNames, setLevelNames] = useState<string[]>([]);
    const { data: session, status } = useSession();
    const userId = session?.user?.id;
    const [search, setSearch] = useState("");
    const [levelFilter, setLevelFilter] = useState<number[]>([]);
    const [hideSolved, setHideSolved] = useState(false);

    const { theme } = useTheme();

    useEffect(() => {
        const fetchLevelNames = async () => {
            try {
                const res = await fetch("/api/challenge/get-levels");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setLevelNames(data);
                } else {
                    console.error("Invalid data format:", data);
                }
            } catch (error) {
                console.error("Error fetching level names:", error);
            }
        };

        fetchLevelNames();
    }, []);

    // Fetch challenges
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            async function fetchChallenges() {
                try {
                    BProgress.start();
                    const levelParam = levelFilter.length
                        ? levelFilter.join(",")
                        : "";
                    const data = await fetch(
                        `/api/challenge/get-challenges?userId=${userId}&search=${search}&levelId=${levelParam}&hideSolved=${hideSolved}`,
                    ).then((res) => res.json());
                    setChallengeData(data);
                    BProgress.done();
                } catch (error) {
                    console.error("Error fetching challenges:", error);
                }
            }
            if (userId) {
                fetchChallenges();
            }
        }, 500); // 0.5 sec delay

        return () => clearTimeout(delayDebounce); // if the search changes, clear the previous timeout
    }, [search, userId, levelFilter, hideSolved]);

    return (
        <div>
            <div className="w-6/7 mx-auto">
                {/* Option bar */}
                <div className="font-victor-mono flex gap-4 h-4 items-center justify-end">
                    <Label>Hide Solved</Label>
                    <Switch
                        className="mr-0 bg-gray-500 data-[state=unchecked]:bg-gray-500"
                        checked={hideSolved}
                        onCheckedChange={(checked) => setHideSolved(checked)}
                    />
                </div>
                <br />
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Search box */}
                    <div className="relative w-full md:w-1/4">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Search className="w-4 h-4" />
                        </div>
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Challenges..."
                            className="pl-8 pr-10 border border-gray-500 rounded-none w-full font-victor-mono text-ellipsis"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition"
                            >
                                <X className="w-4 h-4 hover:text-red-500" />
                            </button>
                        )}
                    </div>

                    {/* Level filter */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full md:w-auto md:ml-auto border border-gray-500 hover:cursor-pointer rounded-none font-victor-mono"
                            >
                                Level / Difficulty <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="font-victor-mono bg-background w-full border border-gray-500"
                        >
                            {levelNames.map((l, idx) => (
                                <DropdownMenuCheckboxItem
                                    key={idx}
                                    className="capitalize"
                                    checked={levelFilter.includes(
                                        levelNames.indexOf(l),
                                    )}
                                    onCheckedChange={(checked) => {
                                        setLevelFilter((prev) =>
                                            checked
                                                ? [...prev, idx]
                                                : prev.filter((v) => v !== idx),
                                        );
                                    }}
                                >
                                    {`${l ?? "Unknown"} - ${idx}`}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <br />
                <table className="min-w-full table-auto font-victor-mono text-sm md:text-base border border-primary">
                    <thead className="bg-background border-b border-primary text-left hidden md:table-header-group">
                        <tr className="text-gray-500">
                            <th className="px-4 py-3">Challenge Name</th>
                            <th className="px-4 py-3">Level / Difficulty</th>
                            <th className="px-4 py-3">First Blood</th>
                        </tr>
                    </thead>
                    <tbody>
                        {challengeData.length ? (
                            challengeData.map((c, idx) => (
                                <tr
                                    key={idx}
                                    className={`${
                                        c.solved
                                            ? theme === "dark"
                                                ? "bg-[#22322e]"
                                                : "bg-green-200"
                                            : ""
                                    } border-b ${
                                        idx === challengeData.length - 1
                                            ? "border-primary"
                                            : "border-gray-700"
                                    } hover:bg-primary/10 transition-all hover:cursor-pointer`}
                                    onClick={() =>
                                        (window.location.href = `/challenges/${encodeURIComponent(c.name)}`)
                                    }
                                >
                                    <td className="px-4 py-3 font-bold md:table-cell flex flex-col gap-2">
                                        <span className="md:hidden text-gray-500">
                                            Challenge Name:{" "}
                                        </span>
                                        {c.name}
                                    </td>
                                    <td
                                        className={`px-4 py-3 font-bold text-primary ${theme === "dark" ? "md:text-gray-400" : "md:text-gray-500"} md:table-cell flex flex-col gap-2 capitalize`}
                                    >
                                        <span className="md:hidden text-gray-500">
                                            Level / Difficulty:{" "}
                                        </span>
                                        {`${c.level} - ${c.levelId}` || "-"}
                                    </td>
                                    <td
                                        className={`px-4 py-3 font-bold text-primary ${theme === "dark" ? "md:text-gray-400" : "md:text-gray-500"} md:table-cell flex flex-col gap-2`}
                                    >
                                        <span className="md:hidden text-gray-500">
                                            First Blood:{" "}
                                        </span>
                                        <div className="flex items-center gap-2 justify-start">
                                            <Avatar className="border-primary border-2">
                                                <AvatarImage
                                                    src={
                                                        c.firstBloodAvatar || ""
                                                    }
                                                />
                                                <AvatarFallback>
                                                    ?
                                                </AvatarFallback>
                                            </Avatar>
                                            {c.firstBlood || "—"}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="border-b border-primary hover:bg-primary/10 transition-all">
                                <td className="px-4 py-3 font-bold" colSpan={3}>
                                    No challenge found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
