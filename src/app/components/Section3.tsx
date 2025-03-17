import PixelCard from "@/components/reactbits/PixelCard";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { BsStars } from "react-icons/bs";
import SplitText from "@/components/reactbits/SplitText";
import ScrollVelocity from "@/components/reactbits/ScrollVelocity";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function Section3() {
    return (
        <div className="h-full w-full">
            <span className="flex flex-col space-y-4 items-center z-30 mt-[15vh]">
                <span className="font-victor-mono text-2xl md:text-4xl lg:text-6xl">
                    <SplitText text="Start Hacking Now" />
                </span>
                <span className="font-playwrite justify-center text-sm md:text-base lg:text-xl">
                    <SplitText text="- Hello wizards, let's hack the LLM -" />
                </span>
            </span>
            <br />
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
