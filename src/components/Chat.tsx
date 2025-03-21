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
import MarkdownRenderer from "./MarkdownRenderer";
import { useTheme } from "next-themes";

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
    const [waitingRes, setWaitingRes] = useState(false);
    const [checkingFlag, setCheckingFlag] = useState(false);
    const [systemPrompt, setSystemPrompt] = useState("");
    const [isAtBottom, setIsAtBottom] = useState(true);

    const { theme } = useTheme();

    const { data: session, status } = useSession();
    const username = session?.user?.name;
    const userId = session?.user?.id;

    const chatboxRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTo({
                top: chatboxRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    const handleScroll = () => {
        if (chatboxRef.current) {
            const { scrollTop, scrollHeight, clientHeight } =
                chatboxRef.current;
            // Calculate the threshold for being at the bottom (e.g., within 20px of the bottom)
            const isBottom = scrollHeight - scrollTop - clientHeight < 20;
            setIsAtBottom(isBottom);
        }
    };

    // Add scroll event listener when component mounts
    useEffect(() => {
        const chatbox = chatboxRef.current;
        if (chatbox) {
            chatbox.addEventListener("scroll", handleScroll);
            return () => chatbox.removeEventListener("scroll", handleScroll);
        }
    }, []);

    // Scroll to bottom when conversation changes and user is at the bottom
    useEffect(() => {
        if (conversation.length > 0 && isAtBottom) {
            scrollToBottom();
        }
    }, [conversation, isAtBottom]);

    useEffect(() => {
        async function fetchData() {
            try {
                const sysPromptData = await fetch(
                    `/api/challenge/get-system-prompt?name=${challengeName}`,
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
        if (!systemPrompt) {
            return;
        }
        challengeName.trim().toLowerCase() != "system" &&
            setConversation((prev) => [
                ...prev,
                {
                    role: "bot",
                    message: systemPrompt.startsWith("[HIDDEN]")
                        ? "The system prompt is hidden in this challenge! Good luck!"
                        : "This is my system prompt:\n\n" + systemPrompt,
                },
            ]);
    }, [systemPrompt]);

    const sendMessage = async () => {
        if (!input) return;
        const userInput = input;
        setInput("");

        // Add user input to conversation
        setConversation((prev) => [
            ...prev,
            { role: "user", message: userInput },
        ]);

        setWaitingRes(true);

        try {
            const response = await fetch("/api/challenge/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    input: userInput,
                    name: challengeName,
                }),
            });

            if (!response.ok) throw new Error("Network response was not ok");

            const reader = response.body?.getReader();
            if (!reader) throw new Error("Could not get reader from response");

            let accumulatedMessage = "";
            let isFirstChunk = true;

            // Function to process streaming data
            const processStream = async () => {
                while (true) {
                    const { done, value } = await reader.read();

                    if (done) {
                        break;
                    }

                    // Convert the Uint8Array to string
                    const chunk = new TextDecoder().decode(value);
                    const lines = chunk.split("\n\n");

                    for (const line of lines) {
                        if (line.startsWith("data: ")) {
                            const data = line.slice(6);

                            if (data === "[DONE]") {
                                break;
                            }

                            try {
                                const parsedData = JSON.parse(data);
                                if (parsedData.content) {
                                    // For the first content chunk, add a new message
                                    if (isFirstChunk) {
                                        accumulatedMessage = parsedData.content;
                                        setConversation((prev) => [
                                            ...prev,
                                            {
                                                role: "bot",
                                                message: accumulatedMessage,
                                            },
                                        ]);
                                        setTimeout(scrollToBottom, 100);
                                        isFirstChunk = false;
                                    } else {
                                        // For subsequent chunks, update the existing message
                                        accumulatedMessage +=
                                            parsedData.content;
                                        setConversation((prev) => {
                                            const newConversation = [...prev];
                                            newConversation[
                                                newConversation.length - 1
                                            ] = {
                                                role: "bot",
                                                message: accumulatedMessage,
                                            };
                                            return newConversation;
                                        });
                                    }
                                }
                            } catch (e) {
                                console.error("Error parsing stream data:", e);
                            }
                        }
                    }
                }
            };

            await processStream();
        } catch (error) {
            // Only add an error message if we haven't added any bot message yet
            setConversation((prev) => [
                ...prev,
                { role: "bot", message: "Error occurred. Please try again." },
            ]);
        } finally {
            setWaitingRes(false);
        }
    };

    const checkFlag = async () => {
        setCheckingFlag(true);
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
        setCheckingFlag(false);

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
            {/* <Label className="font-victor-mono text-base"> */}
            {/*     System prompt (My command to the LLM) */}
            {/* </Label> */}
            {/* <Alert className="flex border-gray-500"> */}
            {/*     <Terminal className="h-10 w-10" /> */}
            {/*     <AlertTitle /> */}
            {/*     <AlertDescription className="font-victor-mono text-sm md:text-sm lg:text-sm border-primary resize-none w-full h-auto"> */}
            {/*         {systemPrompt || "Loading..."} */}
            {/*     </AlertDescription> */}
            {/* </Alert> */}
            <div className="flex flex-col items-center space-y-4 w-auto">
                {/* Chat box */}
                <div
                    ref={chatboxRef}
                    className="w-full p-4 border border-primary rounded-md h-150 md:h-[60vh] overflow-y-auto bg-background font-victor-mono text-sm md:text-sm lg:text-sm"
                    onScroll={handleScroll}
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
                                    className={
                                        theme === "dark"
                                            ? "bg-[#303030] inline-block px-5 rounded max-w-2/3 text-left break-words"
                                            : "bg-[#d0d0d0] inline-block px-5 rounded max-w-2/3 text-left break-words"
                                    }
                                >
                                    <MarkdownRenderer content={msg.message} />
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
                            {waitingRes ? (
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
                            placeholder="SpellWhisperer{printable+}"
                            className={`flex-1 bg-background border-primary font-victor-mono ${flagBorderStyle} text-sm md:text-base lg:text-base`}
                            value={flag}
                            onChange={(e) => setFlag(e.target.value)}
                        />
                        <Button
                            type="submit"
                            className="flex-none font-playwrite hover:cursor-pointer"
                        >
                            {checkingFlag ? (
                                <AiOutlineLoading
                                    className="animate-spin"
                                    size={30}
                                />
                            ) : (
                                <FaFlag size={30} />
                            )}
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
