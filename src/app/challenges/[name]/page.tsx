"use client";

import { useParams, useRouter } from "next/navigation";
import BlurText from "@/components/reactbits/BlurText";
import { useEffect, useState, useRef } from "react";
import Chat from "@/components/Chat";
import { useChallengeName } from "@/contexts/ChallengeNameContext";

export default function Page() {
    const hasFetched = useRef(false);
    const { name } = useParams();
    const chalName = decodeURIComponent(String(name));
    const { setChallengeName } = useChallengeName();

    console.log(chalName);
    const [isValidChallenge, setIsValidChallenge] = useState<boolean | null>(
        null
    );
    const router = useRouter();

    useEffect(() => {
        if (!chalName) return;

        const fetchNames = async () => {
            try {
                const data = await fetch("/api/challenge/get-names").then(
                    (res) => res.json()
                );

                if (data.includes(chalName)) {
                    setIsValidChallenge(true);
                    setChallengeName(chalName);
                } else {
                    setIsValidChallenge(false);
                }
            } catch (error) {
                console.error("Error fetching challenge names:", error);
                router.replace("/404");
            }
        };

        fetchNames();
    }, [chalName, router]);

    useEffect(() => {
        if (isValidChallenge === false) {
            router.replace("/404");
        }
    }, [isValidChallenge, router]);

    if (isValidChallenge === null) {
        return <p>Loading...</p>;
    }

    return (
        <span className="flex flex-col space-y-4 items-center">
            <span className="font-victor-mono text-2xl md:text-4xl lg:text-6xl">
                <BlurText text={`${chalName}`} />
            </span>
            <span className="font-playwrite justify-center text-sm md:text-base lg:text-xl">
                <BlurText text="- Hello wizards, let's hack the LLM -" />
            </span>
            <br />
            <Chat />
            <br />
            <br />
            <br />
            <br />
        </span>
    );
}
