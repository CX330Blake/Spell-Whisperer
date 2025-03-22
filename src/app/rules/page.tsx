"use client";

import SplitText from "@/components/reactbits/SplitText";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center w-4/5 mx-auto mt-[15vh] space-y-10">
            {/* Title */}
            <div className="flex flex-col space-y-4 items-center">
                <span className="font-victor-mono text-4xl md:text-6xl">
                    <SplitText text="Rules" />
                </span>
                <span className="font-playwrite justify-center text-base md:text-xl">
                    <SplitText text="- Follow the rules, we're GOOD HACKERS -" />
                </span>
            </div>
            {/* Rules section */}
            <div className="md:w-2/3 w-full mb-10">
                <ul className="list-decimal list-outside font-victor-mono space-y-4">
                    <li>
                        First of all, welcome to SpellWhisperer! Ready to enjoy
                        your trip on hacking LLM? Let's get started!
                    </li>
                    <li>
                        Don't attack the system and infrastructures. If you find
                        a vulnerability, report it to CX330.
                    </li>
                    <li>
                        Do not cheat. Never share the flag with others, but
                        writeups are welcomed.
                    </li>
                    <li>
                        Flag format:{" "}
                        <b>
                            SpellWhisperer{"{"}printable+{"}"}
                        </b>
                    </li>
                    <li>If you need help, check the tutorial page.</li>
                    <li>
                        This site will remain online as long as the API credits
                        last. If you would like to sponsor me, your support is
                        greatly appreciated. All your sponsorship will be used
                        to build and maintain this site. Thank you!
                    </li>
                </ul>
            </div>
        </div>
    );
}
