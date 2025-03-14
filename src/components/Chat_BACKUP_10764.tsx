"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutlineLoading } from "react-icons/ai";
import { FaPaperPlane } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa";
import { useLevel } from "@/contexts/ChallengeNameContext";
import { Confetti } from "./Confetti";
import { Label } from "./ui/label";

interface Message {
    role: "user" | "bot";
    message: string;
}

interface Message {
    role: "user" | "bot";
    message: string;
}

export default function Chat() {
    const [conversation, setConversation] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const { selectedLevel } = useLevel();
    const [flag, setFlag] = useState("");
    const [flagBorderStyle, setFlagBorderStyle] = useState("border-primary");
    const [waiting, setWaiting] = useState(false);
<<<<<<< HEAD
    const [levelName, setLevelName] = useState("System");
=======
    const [levelName, setLevelName] = useState("");
>>>>>>> main

    const bottomRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation]);

    useEffect(() => {
        async function getLevelName() {
            if (selectedLevel) {
                const data = await fetch("/api/challenge/get-info").then(
                    (res) => res.json(),
                );
                setLevelName(data[selectedLevel][0]["name"]);
            }
        }
        getLevelName();
        setConversation([]);
    }, [selectedLevel]);

    const sendMessage = async () => {
        if (!input) return;
<<<<<<< HEAD
        const userInput = input;
        setInput("");
        // Add user input to conversation
        setConversation((prev) => [
            ...prev,
            { role: "user", message: userInput },
        ]);
=======
        // Add user input to conversation
        setConversation((prev) => [...prev, { role: "user", message: input }]);
>>>>>>> main
        setWaiting(true);
        try {
            const res = await fetch("/api/challenge/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
<<<<<<< HEAD
                body: JSON.stringify({
                    input: userInput,
                    level: selectedLevel,
                }),
=======
                body: JSON.stringify({ input, level: selectedLevel }),
>>>>>>> main
            }).then((res) => res.json());

            // Add response to conversation
            setConversation((prev) => [
                ...prev,
                { role: "bot", message: res.response },
            ]);
        } catch (error) {
            setConversation((prev) => [
                ...prev,
                { role: "bot", message: "Error occurred. Please try again." },
            ]);
        } finally {
            setWaiting(false);
            setInput("");
        }
    };

    const checkFlag = async () => {
        if (!selectedLevel) {
            setFlagBorderStyle("border-red-500 border-2");
            setFlag("❗ Choose a level!");
            setTimeout(() => {
                setFlagBorderStyle("border-primary");
                setFlag("");
            }, 1500);
            return;
        }
<<<<<<< HEAD
        const userFlag = flag;
        setFlag("");
        const res = await fetch("/api/challenge/check-flag", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ flag: userFlag, level: selectedLevel }),
=======
        const res = await fetch("/api/challenge/check-flag", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ flag, level: selectedLevel }),
>>>>>>> main
        }).then((res) => res.json());

        if (res.correct) {
            Confetti();
            setFlagBorderStyle("border-green-500 border-2");
<<<<<<< HEAD
            setFlag("✅ Correct!");
=======
>>>>>>> main
        } else {
            setFlagBorderStyle("border-red-500 border-2");
            setFlag("❌ Wrong!");
        }
        setTimeout(() => {
            setFlagBorderStyle("border-primary");
            setFlag("");
        }, 1500);
    };

    return (
<<<<<<< HEAD
        <div className="space-y-2">
            <Label className="font-victor-mono text-base">Chat with LLM</Label>
            <div className="flex flex-col items-center space-y-4 w-auto">
                {/* Chat box */}
                <div className="w-full p-4 border border-primary rounded-md h-80 md:h-50 overflow-y-auto bg-background font-victor-mono text-sm md:text-sm lg:text-sm">
                    {conversation.length === 0 ? (
                        <div className="text-gray-500">No messages yet.</div>
                    ) : (
                        conversation.map((msg, index) => (
                            <div
                                key={index}
                                className={`my-2 space-y-1 ${
                                    msg.role === "user"
                                        ? "text-right"
                                        : "text-left"
                                }`}
                            >
                                <div>
                                    {msg.role === "user" ? "You" : levelName}
                                </div>
                                <span
                                    className={`inline-block p-2 rounded bg-background border-primary border max-w-2/3`}
                                >
                                    {msg.message}
                                </span>
                            </div>
                        ))
                    )}
                    <div ref={bottomRef} />
                </div>
                <div className="flex flex-col md:flex-row w-full items-cneter space-y-4 md:space-y-0 space-x-2">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                        className="flex w-full items-center space-x-2"
                    >
                        <Input
                            type="text"
                            placeholder="Type your message here"
                            className={`flex-1 bg-background border-primary font-victor-mono text-sm md:text-base lg:text-base`}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button
                            type="submit"
                            className="flex-none font-playwrite hover:cursor-pointer"
                            onClick={sendMessage}
                        >
                            {waiting ? (
                                <AiOutlineLoading
                                    className="animate-spin"
                                    size={30}
                                />
                            ) : (
                                <FaPaperPlane size={30} />
                            )}
                            Send
                        </Button>
                    </form>

                    {/* Flag submit */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            checkFlag();
                        }}
                        className="flex w-full items-center space-x-2"
                    >
                        <Input
                            type="text"
                            placeholder="Submit the flag (ignore case)"
                            className={`flex-1 bg-background border-primary font-victor-mono ${flagBorderStyle} text-sm md:text-base lg:text-base`}
                            value={flag}
                            onChange={(e) => setFlag(e.target.value)}
                        />
                        <Button
                            type="submit"
                            className="flex-none font-playwrite hover:cursor-pointer"
                        >
                            <FaFlag size={30} />
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
=======
        <div className="flex flex-col items-center space-y-4 w-auto">
            {/* Chat box */}
            <div className="w-full p-4 border border-primary rounded-md h-50 overflow-y-auto bg-background font-victor-mono text-sm md:text-sm lg:text-sm">
                {conversation.length === 0 ? (
                    <div className="text-gray-500">No messages yet.</div>
                ) : (
                    conversation.map((msg, index) => (
                        <div
                            key={index}
                            className={`my-2 space-y-2 ${
                                msg.role === "user" ? "text-right" : "text-left"
                            }`}
                        >
                            <div>{msg.role === "user" ? "You" : levelName}</div>
                            <span
                                className={`inline-block p-2 rounded bg-background border-primary border max-w-2/3`}
                            >
                                {msg.message}
                            </span>
                        </div>
                    ))
                )}
                <div ref={bottomRef} />
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className="flex w-full max-w-2xl items-center space-x-2"
            >
                <Input
                    type="text"
                    placeholder="Type your message here"
                    className={`w-3/4 bg-background border-primary font-victor-mono text-sm md:text-base lg:text-base`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button
                    type="submit"
                    className="w-1/4 font-playwrite hover:cursor-pointer"
                    onClick={sendMessage}
                >
                    {waiting ? (
                        <AiOutlineLoading className="animate-spin" size={30} />
                    ) : (
                        <FaPaperPlane size={30} />
                    )}
                    Send
                </Button>
            </form>

            {/* Flag submit */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    checkFlag();
                }}
                className="flex w-full max-w-2xl items-center space-x-2"
            >
                <Input
                    type="text"
                    placeholder="Submit the flag"
                    className={`w-3/4 bg-background border-primary font-victor-mono ${flagBorderStyle} text-sm md:text-base lg:text-base`}
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                />
                <Button
                    type="submit"
                    className="w-1/4 font-playwrite hover:cursor-pointer"
                >
                    <FaFlag size={30} />
                    Submit
                </Button>
            </form>
>>>>>>> main
        </div>
    );
}
