import BlurText from "@/components/reactbits/BlurText";
import SplitText from "./reactbits/SplitText";

export default function Title() {
    return (
        <span className="flex flex-col space-y-4 items-center">
            <span className="font-victor-mono text-4xl md:text-6xl">
                <SplitText text="Spell Whisperer" />
            </span>
            <span className="font-playwrite justify-center text-sm md:text-base lg:text-xl">
                <SplitText text="- Hello wizards, let's hack the LLM -" />
            </span>
        </span>
    );
}
