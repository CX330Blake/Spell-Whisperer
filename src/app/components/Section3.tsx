import PixelCard from "@/components/reactbits/PixelCard";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { BsStars } from "react-icons/bs";
import SplitText from "@/components/reactbits/SplitText";
import ScrollVelocity from "@/components/reactbits/ScrollVelocity";

export default function Section3() {
    return (
        <div className="h-full w-full">
            <br />
            <span className="flex flex-col space-y-4 items-center z-30">
                <span className="font-victor-mono text-2xl md:text-4xl lg:text-6xl">
                    <SplitText text="Start Hacking Now" />
                </span>
                <span className="font-playwrite justify-center text-sm md:text-base lg:text-xl">
                    <SplitText text="- Hello wizards, let's hack the LLM -" />
                </span>
            </span>
            <br />
            <div className="flex flex-col md:flex-row justify-around items-center gap-4">
                {/* SpotlightCard 修正 relative，讓 BsStars 定位 */}
                <SpotlightCard className="custom-spotlight-card bg-background font-playwrite w-4/5 h-1/3 md:w-2/5 md:h-[60vh] border-gray-500 border-2">
                    <BsStars size={50} className="top-0 left-0 p-3" />
                </SpotlightCard>
            </div>
        </div>
    );
}
