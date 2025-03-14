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

    useEffect(() => {
        // Iphone header notch
        let themeColor;
        if (theme === "dark") {
            themeColor = "#1f1f1f";
        } else {
            themeColor = "#f8f8f2";
        }
        const metaThemeColor = document.querySelector("meta[name=theme-color]");
        if (metaThemeColor) {
            metaThemeColor.setAttribute("content", themeColor);
        }
    }, [theme]);

    // If not loaded, avoid the UI error
    if (!mounted) {
        return <Button variant="outline" size="icon" disabled />;
    }

    return (
        <Button
            variant="default"
            onClick={toggleTheme}
            className="hover:cursor-pointer w-10 h-10 md:w-auto md:h-auto"
        >
            {resolvedTheme === "light" ? (
                <div className="font-playwrite flex justify-between items-center md:space-x-1">
                    <Moon className="h-[1.2rem] w-[1.2rem]" />
                    <div className="hidden md:inline-block">Dark</div>
                </div>
            ) : (
                <div className="font-playwrite flex justify-between items-center md:space-x-1">
                    <Sun className="h-[1.2rem] w-[1.2rem]" />
                    <div className="hidden md:inline-block">Light</div>
                </div>
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
