import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LevelProvider } from "@/contexts/LevelContext";
// import { Victor_Mono, Playwrite_AU_VIC } from "next/font/google";

// const victorMono = Victor_Mono({
//     variable: "--font-victor-mono",
//     weight: ["400"],
//     display: "swap",
// });
//
// const playwrite = Playwrite_AU_VIC({
//     variable: "--font-playwrite",
//     weight: ["400"],
//     display: "swap",
// });

export const metadata: Metadata = {
    title: "Spell Incantor",
    description: "Prompt injection challenges to test your hacking skills",
    themeColor: "hsl(var(--color-primary))",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            // className={`${victorMono.variable} ${playwrite.variable}`}
        >
            <body className="antialiased">
                <ThemeProvider
                    defaultTheme="dark"
                    attribute="class"
                    enableSystem={false}
                    storageKey="theme"
                    disableTransitionOnChange
                >
                    <LevelProvider>{children}</LevelProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
