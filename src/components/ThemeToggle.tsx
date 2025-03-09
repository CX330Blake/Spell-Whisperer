"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Make sure theme is loaded at client side
    useEffect(() => {
        setMounted(true);
    }, []);

    function toggleTheme() {
        if (resolvedTheme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }

    // If not loaded, avoid the UI error
    if (!mounted) {
        return <Button variant="outline" size="icon" disabled />;
    }

    return (
        <Button variant="outline" size="icon" onClick={toggleTheme}>
            {resolvedTheme === "light" ? (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
            ) : (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
