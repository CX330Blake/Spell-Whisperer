import BlurText from "@/components/reactbits/BlurText";

export default function Title() {
    return (
        <span className="flex flex-col space-y-4 items-center">
            <span className="font-victor-mono text-2xl md:text-4xl lg:text-6xl">
                <BlurText text="Spell Incantor" />
            </span>
            <span className="font-playwrite justify-center text-sm md:text-base lg:text-xl">
                <BlurText text="- Prompt injection challenges to test your hacking skills -" />
            </span>
        </span>
    );
}
