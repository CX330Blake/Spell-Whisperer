import { LevelChart } from "@/components/LevelChart";
import CountUp from "@/components/reactbits/CountUp";
import GlitchText from "@/components/reactbits/GlitchText";
import RotatingText from "@/components/reactbits/RotatingText";
import { useState, useEffect } from "react";

export default function Section2() {
    const [chalCnt, setChalCnt] = useState(0);
    const [chalNames, setChalNames] = useState<string[]>([]);

    useEffect(() => {
        const fetchChalCnt = async () => {
            try {
                const res = await fetch("/api/challenge/count");
                const data = await res.json();
                setChalCnt(data.count);
            } catch (error) {
                console.error("Error fetching challenge count:", error);
            }
        };

        const fetchChalNames = async () => {
            try {
                const res = await fetch("api/challenge/get-names");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setChalNames(data);
                } else {
                    console.error("Invalid data format:", data);
                }
                setChalNames(data);
            } catch (error) {
                console.error("Error fetching challenge names:", error);
            }
        };

        fetchChalCnt();
        fetchChalNames();
    }, []);
    return (
        <div className="w-full h-full">
            <div className="flex-col space-y-4 font-victor-mono font-bold mt-[15vh] ml-[10vw] mr-[10vw] break-words text-3xl md:text-5xl leading-normal gap-4">
                <div>
                    <CountUp
                        from={0}
                        to={chalCnt}
                        direction="up"
                        duration={2}
                        className="text-4xl md:text-6xl"
                    />
                    &nbsp;challenges now in total, from Simple to Hard.
                </div>
                {chalNames.length > 0 && (
                    <a href="/challenges" target="_blank" rel="/">
                        <RotatingText
                            texts={chalNames || []}
                            mainClassName="w-auto font-victor-mono text-bold px-2 sm:px-2 md:px-3 bg-primary text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                            staggerFrom={"last"}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.05}
                            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                            transition={{
                                type: "spring",
                                damping: 30,
                                stiffness: 400,
                            }}
                            rotationInterval={2500}
                        />
                    </a>
                )}
            </div>
            <div className="ml-[10vw] mr-[10vw] mt-10 mb-10 h-full">
                <div className="bg-cyan-300">PLACEHOLDER</div>
            </div>
            {/* <div className="mb-10">
                <ScrollVelocity
                    texts={["Spell Whisperer *", "Hack The LLM *"]}
                    velocity={50}
                    className="font-victor-mono"
                />
            </div> */}
        </div>
    );
}
