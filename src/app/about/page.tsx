"use client";

import SplitText from "@/components/reactbits/SplitText";
import { Link } from "@heroui/link";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center w-4/5 mx-auto mt-[15vh] space-y-10">
            {/* Title */}
            <div className="flex flex-col space-y-4 items-center">
                <span className="font-victor-mono text-4xl md:text-6xl">
                    <SplitText text="About" />
                </span>
                <span className="font-playwrite justify-center text-base md:text-xl">
                    <SplitText text="- What's Spell Whisperer? That's a secret... -" />
                </span>
            </div>
            {/* Content */}
            <div className="font-victor-mono md:w-2/3 w-full mb-10">
                Spell Whisperer is an experimental platform designed to showcase
                the fascinating realm of prompt injection. Make sure you've
                already checked out the{" "}
                <Link href="/rules">
                    <i>
                        <u>rules</u>
                    </i>
                </Link>{" "}
                before continuing.
                <br />
                <br />
                This project is developed and maintained by{" "}
                <Link href="linktr.ee/CX330Blake">
                    <i>
                        <u>CX330</u>
                    </i>
                </Link>
                . If you found any problem or bug, please contact me via any
                method!
            </div>
            {/* Credit */}
            <div className="flex flex-col space-y-4 items-center">
                <span className="font-victor-mono text-4xl md:text-6xl">
                    <SplitText text="Credits" />
                </span>
                <span className="font-playwrite justify-center text-base md:text-xl">
                    <SplitText text="- Meet some of the good hackers here -" />
                </span>
            </div>
            <div className="font-victor-mono md:w-2/3 w-full mb-10">
                Thanks to the following hackers for contributing their payloads,
                so that the this site can be more difficult and challenging:
                <br />
                <br />
                <ol type="1" className="list-decimal ml-8">
                    <li>
                        <Link
                            href="https://linktr.ee/kazma.tw"
                            className="underline"
                        >
                            Kazma
                        </Link>
                    </li>
                </ol>
            </div>
        </div>
    );
}
