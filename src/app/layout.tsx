import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ChallengeNameProvider } from "@/contexts/ChallengeNameContext";
import Footer from "@/components/Footer";
import MyNavbar from "@/components/MyNavbar";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

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
    const defaultTheme = "dark";

    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased">
                <SessionProviderWrapper>
                    <ThemeProvider
                        defaultTheme={defaultTheme}
                        attribute="class"
                        enableSystem={false}
                        storageKey="theme"
                        disableTransitionOnChange
                    >
                        <ChallengeNameProvider>
                            <MyNavbar />
                            <div className="flex flex-col items-center justify-center h-auto relative z-0">
                                <div className="w-full">
                                    {/* Main Content */}
                                    {children}
                                    <Toaster />
                                    {/* Footer */}
                                </div>
                            </div>
                            <div className="flex justify-center w-full bottom-0">
                                <Footer />
                            </div>
                        </ChallengeNameProvider>
                    </ThemeProvider>
                </SessionProviderWrapper>
            </body>
        </html>
    );
}
