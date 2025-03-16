import CountUp from "@/components/reactbits/CountUp";
import ScrollVelocity from "@/components/reactbits/ScrollVelocity";
import { useState } from "react";

export default function Section2() {
    const [challCnt, setChallCnt] = useState(0);
    const fetchChallCnt = async () => {
        const res = await fetch("/api/challenge/count");
        const data = await res.json();
        setChallCnt(data.count);
    };
    fetchChallCnt();
    return (
        <div className="w-full h-full">
            <div className="font-victor-mono font-bold mt-10 ml-10">
                <CountUp
                    from={0}
                    to={challCnt}
                    direction="up"
                    duration={2}
                    className="text-6xl"
                />
                &nbsp;challenges now in total, from easy to hard.
            </div>
            <div className="mb-10">
                <ScrollVelocity
                    texts={["Spell Whisperer *", "Hack The LLM *"]}
                    velocity={50}
                    className="font-victor-mono"
                />
            </div>
        </div>
    );
}
