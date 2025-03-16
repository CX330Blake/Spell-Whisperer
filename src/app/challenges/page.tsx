"use client";

import BlurText from "@/components/reactbits/BlurText";
import { ChallengeTable } from "@/components/ChallengeTable";

export default function Page() {
    return (
        <div className="w-4/5 mx-auto mt-10">
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
