"use client";

import BlurText from "@/components/reactbits/BlurText";
import { ChallengeTable } from "@/components/ChallengeTable";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import SplitText from "@/components/reactbits/SplitText";

export default function Page() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            redirect("/login");
        }
    }, [status]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-4/5 mx-auto mt-[15vh]">
            <span className="flex flex-col space-y-4 items-center">
                <span className="font-victor-mono text-4xl md:text-6xl">
                    <SplitText text="Challenges" />
                </span>
                <span className="font-playwrite justify-center text-base md:text-xl">
                    <SplitText text="- Pick a challenge and be a LLM killer -" />
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
