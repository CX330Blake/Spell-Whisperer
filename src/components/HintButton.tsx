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
import { IoHelpBuoy } from "react-icons/io5";
import { useChallengeName } from "@/contexts/ChallengeNameContext";
import { useEffect, useState } from "react";

export default function HintButton() {
    const { challengeName } = useChallengeName();
    const [hint, setHint] = useState("");

    if (challengeName) {
        // Get hint for the selected level
        (async () => {
            const hintData = await fetch("/api/challenge/get-hint", {
                method: "POST",
                body: JSON.stringify({ name: challengeName }),
            }).then((res) => res.json());

            if (challengeName && hintData) {
                setHint(hintData);
            }
        })();
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={"outline"}
                    className="font-playwrite border-primary hover:cursor-pointer w-full lg:w-auto"
                >
                    <div className="flex justify-center items-center space-x-1">
                        <IoHelpBuoy size={40} />
                        <div>Show hint</div>
                    </div>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="font-victor-mono">
                <AlertDialogHeader>
                    <AlertDialogTitle>Noob! You need a hint?</AlertDialogTitle>
                    <AlertDialogDescription className="text-base text-left">
                        {hint || "Select a level to see the hint."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>Got it</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
