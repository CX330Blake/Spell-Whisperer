// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                "victor-mono": ["var(--font-victor-mono)"],
                playwrite: ["var(--font-playwrite-au-vic)"],
            },
            colors: {
                border: "hsl(var(--border))",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
