"use client";

import React, { createContext, useContext, useState } from "react";

interface challengeNameType {
    challengeName: string;
    setChallengeName: (name: string) => void;
}

const challengeNameContext = createContext<challengeNameType | null>(null);

export function ChallengeNameProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [challengeName, setChallengeName] = useState<string>("System");

    return (
        <challengeNameContext.Provider
            value={{ challengeName, setChallengeName }}
        >
            {children}
        </challengeNameContext.Provider>
    );
}

export function useChallengeName() {
    const context = useContext(challengeNameContext);
    if (!context) {
        throw new Error(
            "useChallengeName must be used within a ChallengeNameProvider"
        );
    }
    return context;
}
