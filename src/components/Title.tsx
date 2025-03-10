import BlurText from "@/components/reactbits/BlurText";

export default function Title() {
    return (
        <>
            <span className="font-victor-mono text-2xl md:text-4xl lg:text-6xl">
                <BlurText text="Prompt Injection Challenges" />
            </span>
            <br />
            <span className="font-playwrite justify-center text-sm md:text-base lg:text:xl">
                <BlurText text="- Test your hacking skill to break LLMs" />
            </span>
        </>
    );
}
