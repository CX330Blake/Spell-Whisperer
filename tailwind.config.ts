// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
            },
            fontFamily: {
                "victor-mono": ["var(--font-victor-mono)", "cursive"],
                playwrite: ["var(--font-playwrite-au-vic)", "monospace"],
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
