"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useDebugValue } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutlineLoading } from "react-icons/ai";
import { FaPaperPlane } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa";
import { useChallengeName } from "@/contexts/ChallengeNameContext";
import { Confetti } from "./Confetti";
import { Label } from "./ui/label";
import HintButton from "./HintButton";
import TutorialButton from "./TutorialButton";
import { useSession } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

interface Message {
    role: "user" | "bot";
    message: string;
}

export default function Chat() {
    const [conversation, setConversation] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const { challengeName } = useChallengeName();
    const [flag, setFlag] = useState("");
    const [flagBorderStyle, setFlagBorderStyle] = useState("border-primary");
    const [waiting, setWaiting] = useState(false);
    const [systemPrompt, setSystemPrompt] = useState("");

    const { data: session, status } = useSession();
    const username = session?.user?.name;
    const userId = session?.user?.id;

    console.log("userId", userId);

    const chatboxRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTo({
                top: chatboxRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const sysPromptData = await fetch(
                    `/api/challenge/get-system-prompt?name=${challengeName}`
                ).then((res) => res.json());

                if (challengeName && sysPromptData) {
                    setSystemPrompt(sysPromptData);
                }
            } catch (error) {
                console.error("Error fetching challenges:", error);
            }
        }

        fetchData();
    }, [challengeName]);

    useEffect(() => {
        scrollToBottom();
    }, [conversation]);

    useEffect(() => {
        setConversation([]);
        challengeName.trim().toLowerCase() != "system" &&
            setConversation((prev) => [
                ...prev,
                {
                    role: "bot",
                    message: "Hello, how can I help you today?",
                },
            ]);
    }, [challengeName]);

    useEffect(() => {
        setConversation([]);
        challengeName.trim().toLowerCase() != "system" &&
            setConversation((prev) => [
                ...prev,
                {
                    role: "bot",
                    message: "Hello, how can I help you today?",
                },
            ]);
    }, [challengeName]);

    const sendMessage = async () => {
        if (!input) return;
        const userInput = input;
        setInput("");
        // Add user input to conversation
        setConversation((prev) => [
            ...prev,
            { role: "user", message: userInput },
        ]);
        setWaiting(true);
        try {
            const res = await fetch("/api/challenge/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    input: userInput,
                    name: challengeName,
                }),
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
        }
    };

    const checkFlag = async () => {
        if (!challengeName) {
            setFlagBorderStyle("border-red-500 border-2");
            setFlag("❗ Pick a challenge!");
            setTimeout(() => {
                setFlagBorderStyle("border-primary");
                setFlag("");
            }, 1500);
            return;
        }
        const userFlag = flag;
        setFlag("");
        const res = await fetch("/api/challenge/check-flag", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                flag: userFlag,
                name: challengeName,
                userId: userId,
            }),
        }).then((res) => res.json());

        if (res.correct) {
            Confetti();
            setFlagBorderStyle("border-green-500 border-2");
            setFlag("✅ Correct!");
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
        <div className="space-y-2 w-full">
            <Label className="font-victor-mono text-base">
                System prompt (My command to the LLM)
            </Label>
            <Alert className="flex border-gray-500">
                <Terminal className="h-10 w-10" />
                <AlertTitle />
                <AlertDescription className="font-victor-mono text-sm md:text-sm lg:text-sm border-primary resize-none w-full h-auto">
                    {systemPrompt || "Loading..."}
                </AlertDescription>
            </Alert>
            <div className="flex flex-col items-center space-y-4 w-auto">
                {/* Chat box */}
                <div
                    ref={chatboxRef}
                    className="w-full p-4 border border-primary rounded-md h-150 md:h-[50vh] overflow-y-auto bg-background font-victor-mono text-sm md:text-sm lg:text-sm"
                >
                    {conversation.length === 0 ? (
                        <div className="text-gray-500">No messages yet.</div>
                    ) : (
                        conversation.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className={`my-2 space-y-1 ${
                                    msg.role === "user"
                                        ? "text-right"
                                        : "text-left"
                                }`}
                            >
                                <div>
                                    {msg.role === "user"
                                        ? username
                                        : challengeName}
                                </div>
                                <span
                                    className={`inline-block p-2 rounded bg-background border-primary border max-w-2/3 text-left break-words`}
                                >
                                    {msg.message}
                                </span>
                            </motion.div>
                        ))
                    )}
                </div>
                <div className="flex flex-col lg:flex-row w-full items-cneter space-y-4 lg:space-y-0 space-x-4">
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
                    <HintButton />
                    <TutorialButton />
                </div>
            </div>
        </div>
    );
}
