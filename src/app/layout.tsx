import type { Metadata } from "next";
import { Victor_Mono, Playwrite_AU_VIC } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LevelProvider } from "@/contexts/LevelContext";

const victorMono = Victor_Mono({
    variable: "--font-victor-mono",
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    display: "swap",
});

const playwrite = Playwrite_AU_VIC({
    variable: "--font-playwrite-au-vic",
});

export const metadata: Metadata = {
    title: "Spell Incantor",
    description: "Prompt injection challenges to test your hacking skills",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${victorMono.variable} ${playwrite.variable} antialiased`}
            >
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
