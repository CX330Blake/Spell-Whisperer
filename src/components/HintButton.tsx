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
import { useLevel } from "@/contexts/LevelContext";
import { useEffect, useState } from "react";

export default function HintButton() {
    const { selectedLevel } = useLevel();
    const [hint, setHint] = useState("");

    // Get hint for the selected level
    (async () => {
        const data = await fetch("/api/challenge/get-info").then((res) =>
            res.json()
        );
        setHint(data[selectedLevel][0]["hint"]);
    })();

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={"outline"}
                    className="font-playwrite border-primary hover:cursor-pointer"
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
                    <AlertDialogDescription>{hint}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>Got it</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
