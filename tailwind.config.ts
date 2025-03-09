// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    content: ["index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#f9f9f9",
                "dark-blue": "#0A192F",
                "light-blue": "#112240",
                "light-gray": "#F4F6F8",
                "dark-gray": "#E5E5E5",
                "dark-red": "#FF4949",
                "light-red": "#FFCFCF",
                "dark-green": "#00C48C",
                "light-green": "#CFFAF1",
                "dark-yellow": "#FFB800",
                "light-yellow": "#FFFAE5",
                "dark-purple": "#7F5AF0",
                "light-purple": "#EAE6FF",
            },
        },
    },
    plugins: [],
};

export default config;
