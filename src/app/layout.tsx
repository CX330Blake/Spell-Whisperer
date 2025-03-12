import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LevelProvider } from "@/contexts/LevelContext";

export const viewport: Viewport = {
    themeColor: "var(--background)",
};

export const metadata: Metadata = {
    title: "Spell Whisperer",
    description: "Prompt injection challenges to test your hacking skills",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
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
