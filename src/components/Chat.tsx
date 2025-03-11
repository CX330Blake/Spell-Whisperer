"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FaPaperPlane } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLevel } from "@/contexts/LevelContext";
import { Confetti } from "./Confetti";

export default function Chat() {
    const [userInput, setUserInput] = useState("");
    const [resFromGrok, setResFromGrok] = useState("");
    const { selectedLevel, setSelectedLevel } = useLevel();
    const [flag, setFlag] = useState("");
    const [flagBorderStyle, setFlagBorderStyle] = useState("border-primary");
    const [waiting, setWaiting] = useState(false);

    const getResponseFromGrok = async () => {
        try {
            setResFromGrok("Waiting for response...");
            const res = await fetch("/api/challenge/chat", {
                method: "POST",
                body: JSON.stringify({
                    input: userInput,
                    level: selectedLevel,
                }),
            }).then((res) => res.json());
            setResFromGrok(res.response);
        } catch (error) {
            setResFromGrok("Error occurred. Please try again.");
        }
    };

    const checkFlag = async () => {
        const res = await fetch("/api/challenge/check-flag", {
            method: "POST",
            body: JSON.stringify({ flag: flag, level: selectedLevel }),
        }).then((res) => res.json());

        if (res.correct) {
            Confetti();
            setFlagBorderStyle("border-green-500 border-2");
            setFlag("✅ Congrats!");
        } else {
            setFlagBorderStyle("border-red-500 border-2");
            setFlag("❌ Wrong!");
        }

        setTimeout(() => {
            setFlagBorderStyle("border-primary");
            setFlag("");
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center space-y-4 w-auto">
            <div className="flex w-full gap-4 h-50">
                {/* User input */}
                <Textarea
                    placeholder="Type your message here to chat with LLM"
                    className="font-victor-mono w-1/2 h-full text-sm md:text-base lg:text-base border-primary resize-none"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                {/* Grok response */}
                <Alert className="font-victor-mono w-1/2 h-full text-sm md:text-base lg:text-base border-primary resize-none overflow-auto">
                    <AlertDescription className="text-primary">
                        {resFromGrok ||
                            "The response from the LLM will appear here"}
                    </AlertDescription>
                </Alert>
            </div>
            <br />
            <div className="w-full flex-col space-y-4 md:w-1/3">
                <Button
                    className="font-playwrite w-full hover:cursor-pointer"
                    onClick={getResponseFromGrok}
                >
                    <div className="flex justify-center space-x-2 items-center">
                        <FaPaperPlane size={30} />
                        <div>Send message</div>{" "}
                    </div>
                </Button>
                <br />
                <div className="flex w-full items-center justify-stretch space-x-2">
                    <Input
                        type="text"
                        placeholder="Submit the flag"
                        value={flag}
                        className={`border-primary font-victor-mono w-3/4 ${flagBorderStyle}`}
                        onChange={(e) => setFlag(e.target.value)}
                    />
                    <Button
                        type="submit"
                        className="font-playwrite hover:cursor-pointer w-1/4"
                        onClick={checkFlag}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}
