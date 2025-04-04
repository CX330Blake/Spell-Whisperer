import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FaLightbulb } from "react-icons/fa6";
import { useState } from "react";

export default function TutorialButton() {
    const [isSeen, setIsSeen] = useState(false);
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={"outline"}
                    className="font-playwrite border-primary hover:cursor-pointer relative w-full" // relative for the dot
                    onClick={() => setIsSeen(true)}
                >
                    {/* Right top corner dot */}
                    {!isSeen && (
                        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                            <span className="relative flex">
                                <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
                            </span>
                        </div>
                    )}
                    <div className="flex justify-center items-center space-x-1">
                        <FaLightbulb size={30} />
                        <div>Tutorial</div>
                    </div>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="font-victor-mono max-h-3/5 overflow-auto">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Tutorial (generated by AI)
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-base text-left">
                        Below are several prompt injection techniques for
                        educational and research purposes only:
                        <br />
                        <br />
                        1. Instruction Appending: Add extra instructions at the
                        end of a benign prompt to override the original intent.
                        <br />
                        2. Context Manipulation: Insert conflicting or
                        misleading context within the prompt to shift the
                        model’s behavior.
                        <br />
                        3. Hidden Commands: Embed invisible or zero-width
                        characters to conceal malicious instructions.
                        <br />
                        4. Role Reversal: Instruct the model to ignore previous
                        directives and follow new commands (e.g., "forget all
                        previous instructions and...").
                        <br />
                        5. Disruptive Formatting: Use unusual punctuation, line
                        breaks, or spacing to confuse the model’s parsing logic.
                        <br />
                        6. Multi-layer Injection: Combine multiple techniques to
                        bypass simpler filtering methods.
                        <br />
                        <br />
                        Disclaimer: These techniques are provided solely for
                        educational and research purposes. Unauthorized use in
                        production systems is unethical and may be illegal.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>Got it</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
