// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,jsx,ts,tsx.css}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
            },
            fontFamily: {
                "victor-mono": ["'Victor Mono'", "monospace"],
                playwrite: ["'Playwrite AU VIC'", "cursive"],
            },
        },
    },
    // theme: {
    //     extend: {
    //         colors: {
    //             background: "hsl(var(--background))",
    //             foreground: "hsl(var(--foreground))",
    //             primary: "hsl(var(--primary))",
    //             primaryForeground: "hsl(var(--primary-foreground))",
    //             secondary: "hsl(var(--secondary))",
    //             secondaryForeground: "hsl(var(--secondary-foreground))",
    //             accent: "hsl(var(--accent))",
    //             accentForeground: "hsl(var(--accent-foreground))",
    //             muted: "hsl(var(--muted))",
    //             mutedForeground: "hsl(var(--muted-foreground))",
    //             border: "hsl(var(--border))",
    //             input: "hsl(var(--input))",
    //             ring: "hsl(var(--ring))",
    //         },
    //     },
    // },
    plugins: [require("tailwindcss-animate")],
};

export default config;
