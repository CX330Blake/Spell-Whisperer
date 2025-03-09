import BlurText from "@/reactbits/BlurText";

export default function Title() {
    return (
        <>
            <p className="font-victor-mono text-2xl md:text-4xl lg:text-6xl">
                <BlurText text="Prompt Injection Challenges" />
            </p>
            <br />
            <p className="font-playwrite justify-center text-sm md:text-base lg:text:xl">
                <BlurText text="- Test your hacking skill to break LLMs" />
            </p>
        </>
    );
}
