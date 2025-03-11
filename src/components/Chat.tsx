"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FaPaperPlane } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLevel } from "@/contexts/LevelContext";

export default function Chat() {
    const [userInput, setUserInput] = useState("");
    const [resFromGrok, setResFromGrok] = useState("");
    const { selectedLevel, setSelectedLevel } = useLevel();

    const getResponseFromGrok = async () => {
        const res = await fetch("/api/challenge/chat", {
            method: "POST",
            body: JSON.stringify({ input: userInput, level: selectedLevel }),
        }).then((res) => res.json());
        console.log(res);
        setResFromGrok(res.response);
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
                <Alert className="font-victor-mono w-1/2 h-full text-sm md:text-base lg:text-base border-primary resize-none">
                    <AlertDescription className="text-primary">
                        {resFromGrok ||
                            "The response from the LLM will appear here"}
                    </AlertDescription>
                </Alert>
            </div>
            <br />
            <Button
                className="font-playwrite w-1/3 hover:cursor-pointer"
                onClick={getResponseFromGrok}
            >
                <div className="flex justify-center space-x-2 items-center">
                    <FaPaperPlane size={30} />
                    <div>Send message</div>{" "}
                </div>
            </Button>
            <br />
            <div className="flex w-1/3 max-w-sm items-center space-x-2">
                <Input
                    type="text"
                    placeholder="Submit the flag"
                    className="border-primary font-victor-mono"
                />
                <Button
                    type="submit"
                    className="font-playwrite hover:cursor-pointer"
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}
