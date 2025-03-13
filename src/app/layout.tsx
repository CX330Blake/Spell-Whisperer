import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LevelProvider } from "@/contexts/LevelContext";
import Footer from "@/components/Footer";
import SplashCursor from "@/components/reactbits/SplashCursor";
import Threads from "@/components/reactbits/Threads";
import GitHubCorner from "@/components/GitHubCorner";
import Title from "@/components/Title";

export const viewport: Viewport = {
    themeColor: "#1f1f1f",
};

export const metadata: Metadata = {
    title: "Spell Whisperer",
    description: "Prompt injection challenges to test your hacking skills",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // // Set theme
    const defaultTheme = "light";

    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased">
                <ThemeProvider
                    defaultTheme={defaultTheme}
                    attribute="class"
                    enableSystem={false}
                    storageKey="theme"
                    disableTransitionOnChange
                >
                    <LevelProvider>
                        <div className="flex flex-col items-center justify-center h-auto relative">
                            <SplashCursor />
                            <GitHubCorner />
                            <div className="mt-12 w-4/5 z-10">
                                <Title />
                                <br />
                                {/* Main Content */}
                                {children}
                                {/* Footer */}
                            </div>
                            <div className="absolute w-full h-screen -z-30">
                                <Threads
                                    amplitude={2}
                                    distance={0}
                                    enableMouseInteraction={false}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center w-full bottom-0">
                            <Footer />
                        </div>
                    </LevelProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
