import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { BsStars } from "react-icons/bs";
import SplitText from "@/components/reactbits/SplitText";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import FlowingMenu from "@/components/reactbits/FlowingMenu";

const demoItems = [
    {
        link: "/login",
        text: "Login",
        image: "https://picsum.photos/600/400?random=4",
    },
    {
        link: "github.com/CX330Blake/Spell-Whisperer",
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
            <span className="flex flex-col space-y-4 items-center z-30 mt-[15vh]">
                <span className="font-victor-mono text-4xl md:text-6xl">
                    <SplitText text="Start Hacking Now" />
                </span>
                <span className="font-playwrite justify-center text-base md:text-xl">
                    <SplitText text="- Hello wizards, let's hack the LLM -" />
                </span>
            </span>
            <br />
            <div
                style={{ height: "600px", position: "relative" }}
                className="font-playwrite text-primary"
            >
                <FlowingMenu items={demoItems} />
            </div>
            {/* <div className="flex flex-col md:flex-row justify-around items-center gap-4 ">
                <SpotlightCard className="aspect-square bg-background font-playwrite h-1/3 md:w-2/7 border-gray-500 border-2 space-y-2">
                    <BsStars size={50} className="top-0 left-0 p-3" />
                    <div className="pt-1 text-2xl">Start hacking</div>
                    <div className="text-base font-victor-mono">
                        Start now to hack the LLM with hackers around the world
                    </div>
                    <Button className="absolute bottom-10 right-10">
                        Play
                    </Button>
                </SpotlightCard>

                <SpotlightCard className="aspect-square bg-background font-playwrite h-1/3 md:w-2/7 border-gray-500 border-2">
                    <BsStars size={50} className="top-0 left-0 p-3" />
                </SpotlightCard>
            </div> */}
            <Footer />
        </div>
    );
}
