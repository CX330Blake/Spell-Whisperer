import SplitText from "@/components/reactbits/SplitText";
import Footer from "@/components/Footer";
import FlowingMenu from "@/components/reactbits/FlowingMenu";
import { useMemo } from "react";

const demoItems = [
    {
        link: "/login",
        text: "Login",
        image: "https://picsum.photos/600/400?random=4",
    },
    {
        link: "https://github.com/CX330Blake/Spell-Whisperer",
        text: "Give a star",
        image: "https://picsum.photos/600/400?random=1",
    },
    {
        link: "/challenges",
        text: "Play now",
        image: "https://picsum.photos/600/400?random=2",
    },
    {
        link: "https://buymeacoffee.com/cx330",
        text: "Sponsor",
        image: "https://picsum.photos/600/400?random=3",
    },
];

export default function Section3() {
    return (
        <div className="h-full w-full">
            <span className="flex flex-col space-y-4 items-center z-30 mt-[15vh] mb-2">
                <span className="font-victor-mono text-4xl md:text-6xl">
                    <SplitText text="Start Hacking Now" />
                </span>
                <span className="font-playwrite justify-center text-base md:text-xl">
                    <SplitText text="- Hello wizards, let's hack the LLM -" />
                </span>
            </span>

            {useMemo(
                () => (
                    <div
                        style={{ height: "600px", position: "relative" }}
                        className="font-playwrite text-primary"
                    >
                        <FlowingMenu items={demoItems} />
                    </div>
                ),
                []
            )}
            <Footer />
        </div>
    );
}
