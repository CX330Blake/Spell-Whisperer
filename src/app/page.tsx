"use client";

import Title from "@/components/Title";
import Chat from "@/components/Chat";
import Options from "@/components/Options";
import Footer from "@/components/Footer";
import SplashCursor from "@/components/reactbits/SplashCursor";
import Threads from "@/components/reactbits/Threads";
import { useTheme } from "next-themes";
import GitHubCorner from "@/components/GitHubCorner";

function App() {
    const { resolvedTheme } = useTheme();
    return (
        <div className="flex flex-col items-center justify-center h-auto relative">
            <SplashCursor />
            <GitHubCorner />
            <div className="mt-12 w-4/5 z-10">
                {/* Main Content */}
                <div className="h-auto">
                    <Title />
                    <br />
                    <Options />
                    <br />
                    <Chat />
                    <br />
                    <br />
                </div>
                {/* Footer */}
                <div className="flex justify-center w-full">
                    <Footer />
                </div>
            </div>
            {resolvedTheme === "dark" && (
                <div className="absolute w-full h-screen -z-30">
                    <Threads
                        amplitude={2}
                        distance={0}
                        enableMouseInteraction={false}
                    />
                </div>
            )}
        </div>
    );
}

export default App;
