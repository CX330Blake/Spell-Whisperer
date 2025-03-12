import BlurText from "@/components/reactbits/BlurText";

export default function Title() {
    return (
        <span className="flex flex-col space-y-4 items-center mt-10">
            <span className="font-victor-mono text-2xl md:text-4xl lg:text-6xl">
                <BlurText text="Spell Whisperer" />
            </span>
            <span className="font-playwrite justify-center text-sm md:text-base lg:text-xl">
                <BlurText text="- Hello wizards, let's hack the LLM -" />
            </span>
        </span>
    );
}
