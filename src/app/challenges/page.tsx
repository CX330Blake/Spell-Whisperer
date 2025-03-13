"use client";

import BlurText from "@/components/reactbits/BlurText";
import { ChallengeTable } from "@/components/ChallengeTable";
import AnimatedList from "@/components/reactbits/AnimatedList";
import { useState, useEffect } from "react";

export default function Page() {
    const [challengeNames, setChallengeNames] = useState([]);
    const [challengeLevels, setChallengeLevels] = useState([]);

    const fetchNames = async () => {
        const data = await fetch("/api/challenge/get-names", {
            cache: "default",
        }).then((res) => res.json());
        console.log(data);
        setChallengeNames(data);
    };
    const fetchLevels = async () => {
        const data = await fetch(
            "http://localhost:3000/api/challenge/get-levels",
            {
                cache: "default",
            },
        ).then((res) => res.json());
        console.log(data);
        setChallengeLevels(data);
    };

    useEffect(() => {
        fetchNames();
        fetchLevels();
    }, []);

    return (
        <div>
            <span className="flex flex-col space-y-4 items-center">
                <span className="font-victor-mono text-2xl md:text-4xl lg:text-6xl">
                    <BlurText text="Challenges" />
                </span>
                <span className="font-playwrite justify-center text-sm md:text-base lg:text-xl">
                    <BlurText text="- Pick a challenge and be a LLM killer -" />
                </span>
            </span>
            <br />
            <br />
            <ChallengeTable />
            <br />
            <br />
        </div>
    );
}
