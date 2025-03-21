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
                                    <Toaster
                                        toastOptions={{
                                            duration: 60000,
                                            classNames: {
                                                error: "bg-red-400",
                                                info: "bg-blue-400",
                                                success: "bg-green-400",
                                                warning: "bg-orange-400",
                                                title: "text-red-400 text-base",
                                                closeButton: "bg-lime-400",
                                                toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                                                description:
                                                    "group-[.toast]:text-muted-foreground text-base",
                                                actionButton:
                                                    "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                                                cancelButton:
                                                    "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                                                icon: "group-data-[type=error]:text-red-500 group-data-[type=success]:text-green-500 group-data-[type=warning]:text-amber-500 group-data-[type=info]:text-blue-500",
                                            },
                                        }}
                                    />
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
