"use client";

import React, { createContext, useContext, useState } from "react";

interface LevelContextType {
    selectedLevel: string;
    setSelectedLevel: (level: string) => void;
}

const LevelContext = createContext<LevelContextType | undefined>(undefined);

export function LevelProvider({ children }: { children: React.ReactNode }) {
    const [selectedLevel, setSelectedLevel] = useState<string>("");

    return (
        <LevelContext.Provider value={{ selectedLevel, setSelectedLevel }}>
            {children}
        </LevelContext.Provider>
    );
}

export function useLevel() {
    const context = useContext(LevelContext);
    if (!context) {
        throw new Error("useLevel must be used within a LevelProvider");
    }
    return context;
}
