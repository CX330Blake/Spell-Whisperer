"use client";

import Chat from "@/components/Chat";
import Options from "@/components/Options";
import { useTheme } from "next-themes";

function App() {
    const { resolvedTheme } = useTheme();
    return (
        <div>
            <Options />
            <br />
            <Chat />
            <br />
            <br />
            <br />
        </div>
    );
}

export default App;
