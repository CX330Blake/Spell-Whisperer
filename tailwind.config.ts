import { heroui } from "@heroui/theme";
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                "victor-mono": ["var(--font-victor-mono)"],
                playwrite: ["var(--font-playwrite-au-vic)"],
            },
            colors: {
                border: "hsl(var(--border))",
                current: "var(--primary)",
            },
        },
    },
    plugins: [require("tailwindcss-animate"), heroui()],
};

export default config;
