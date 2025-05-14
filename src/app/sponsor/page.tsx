"use client";

import SplitText from "@/components/reactbits/SplitText";
import Image from "next/image";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center w-4/5 mx-auto mt-[15vh] space-y-10">
            {/* Title */}
            <div className="flex flex-col space-y-4 items-center">
                <span className="font-victor-mono text-4xl md:text-6xl">
                    <SplitText text="Sponsor" />
                </span>
                <span className="font-playwrite justify-center text-base md:text-xl">
                    <SplitText text="- Let's make Spell Whisperer better -" />
                </span>
            </div>
            <div className="md:w-2/3 w-full mb-10 font-victor-mono">
                {/* Sponsor description */}
                There are 2 ways of sponsorship, non-commercial (personal) or
                commercial. Your sponsorship is making Spell Whisperer more
                better, we really appreciate that.
                <br />
                <br />
                For commercial use, plaese contact{" "}
                <a href="mailto:cx330tw@gmail.com">
                    <u>cx330tw@gmail.com</u>
                </a>{" "}
                for more details. We are open to any kind of cooperations,
                please let us know if you have any thoughts or any concern.
                We're willing to solve your problem.
                <br />
                <br />
                For non-commercial and personal sponsorship, you can click the
                button below and buy me a coffee to cheer me up!
                {/* Sponsorship logo */}
                <div className="flex justify-center w-full items-center">
                    <a href="https://kjhuang.com/" target="_blank">
                        <Image
                            src="/kjh.png"
                            alt="KJH Company Logo"
                            width={200}
                            height={"100"}
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}
