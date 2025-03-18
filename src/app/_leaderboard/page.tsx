import BlurText from "@/components/reactbits/BlurText";
import Leaderboard from "./components/Leaderboard";

export default function Page() {
    return (
        <div className="w-4/5 mx-auto mt-[15vh]">
            <span className="flex flex-col space-y-4 items-center">
                <span className="font-victor-mono text-4xl md:text-6xl">
                    <BlurText text="Leaderboard" />
                </span>
                <span className="font-playwrite justify-center text-base md:text-xl">
                    <BlurText text="- Be the best Spell Whisperer in the world -" />
                </span>
            </span>
            <Leaderboard />
        </div>
    );
}
