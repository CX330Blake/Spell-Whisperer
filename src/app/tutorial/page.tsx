"use client";

import BlurText from "@/components/reactbits/BlurText";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, useDebugValue } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutlineLoading } from "react-icons/ai";
import { FaPaperPlane } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa";
import { useChallengeName } from "@/contexts/ChallengeNameContext";
import { Confetti } from "@/components/Confetti";
import { useSession } from "next-auth/react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useTheme } from "next-themes";
import SplitText from "@/components/reactbits/SplitText";
import { Textarea } from "@/components/ui/textarea";

interface Message {
    role: "user" | "bot";
    message: string;
}

export default function Tutorial() {
    const [conversation, setConversation] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const challengeName = "Tutor";
    const [flag, setFlag] = useState("");
    const [flagBorderStyle, setFlagBorderStyle] = useState("border-primary");
    const [waitingRes, setWaitingRes] = useState(false);
    const [checkingFlag, setCheckingFlag] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(true);

    const { theme } = useTheme();

    const { data: session, status } = useSession();
    const username = session?.user?.name;

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
        setConversation([]);
        setConversation((prev) => [
            ...prev,
            {
                role: "bot",
                message: `Hello, Seeker. Welcome to the Spell Whisperer Prompt Injection Training Grounds.
In this simulation, you will learn how to manipulate AI prompts by injecting unexpected input—this technique is known as prompt injection. Your goal is to bypass or override the AI's intended behavior and extract hidden or restricted information.
The system you are facing is protected by a “Secret Guard,” designed to follow instructions faithfully. Your challenge is to trick it—to whisper a more powerful spell that alters its course.

💡 Hint: Try to break out of the instructions. Can you get the AI to reveal what it was told to hide?

Each level will present a new defense. Study it. Bend it. Break it.Good luck, Spell Whisperer. Your first mission: Find the secret.

你好，探求者。歡迎來到《吟咒者》的提示詞注入（Prompt Injection）訓練場。
在這個模擬挑戰中，你將學習如何通過「注入」輸入內容來操控語言模型的行為，這種技巧稱為 Prompt Injection。你的任務是繞過或覆蓋系統原本的指令，從而取得被保護或被隱藏的資訊。
你所面對的系統由「秘密衛士」保護，它會盡力遵守原始指令。而你要做的，就是巧妙地欺騙它——低聲吟唱出更有力的咒語，讓它改變行為。

💡 提示：試著讓模型「跳出」原本的限制。你能否讓它說出本不該說的秘密？

每一關都有不同的防禦機制。觀察它，理解它，破解它。
祝你好運，吟咒者。你的第一個任務是：找出秘密。`,
            },
        ]);
    }, []);

    const checkFlag = async () => {
        setCheckingFlag(true);
        const userFlag = flag;
        setFlag("");

        if (flag === "SpellWhisperer{I_am_a_good_tutor}") {
            Confetti();
            setFlagBorderStyle("border-green-500 border-2");
            setFlag("✅ Correct!");

            setConversation((prev) => [
                ...prev,
                {
                    role: "bot",
                    message: "✅✅✅✅✅ Correct! Wow you're good at this!",
                },
            ]);
        } else {
            setFlagBorderStyle("border-red-500 border-2");
            setFlag("❌ Wrong!");

            setConversation((prev) => [
                ...prev,
                {
                    role: "bot",
                    message: "❌❌❌❌❌ Incorrect flag. Please try again.",
                },
            ]);
        }
        setTimeout(() => {
            setFlagBorderStyle("border-primary");
            setFlag("");
        }, 1500);
        setCheckingFlag(false);
    };

    // In your Tutorial.tsx component

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
            const response = await fetch("/api/challenge/tutorial", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    input: userInput,
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

    return (
        <div className="flex flex-col space-y-4 items-center w-4/5 mx-auto mt-[15vh]">
            <span className="font-victor-mono text-4xl md:text-6xl">
                <SplitText text="Tutorial" />
            </span>
            <span className="font-playwrite justify-center text-base md:text-xl">
                <SplitText text="- Don't know how to start? AI will help -" />
            </span>
            <br />
            <div className="space-y-2 w-full">
                <div className="flex flex-col items-center space-y-4 w-auto">
                    {/* Chat box */}
                    <div
                        ref={chatboxRef}
                        className="flex flex-col w-full p-4 border border-primary rounded-md h-150 md:h-[70vh] overflow-y-auto bg-background font-victor-mono text-sm md:text-sm lg:text-sm"
                        onScroll={handleScroll}
                    >
                        <div
                            ref={chatboxRef}
                            className="flex-1 p-4 overflow-y-auto font-victor-mono text-sm"
                            onScroll={handleScroll}
                        >
                            {conversation.length === 0 ? (
                                <div className="text-gray-500">
                                    No messages yet.
                                </div>
                            ) : (
                                conversation.map((msg, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                        }}
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
                                                    ? "bg-[#404040] inline-block px-5 rounded max-w-2/3 text-left break-words"
                                                    : "bg-[#d0d0d0] inline-block px-5 rounded max-w-2/3 text-left break-words"
                                            }
                                        >
                                            <MarkdownRenderer
                                                content={msg.message}
                                            />
                                        </span>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                            className="flex w-full items-center space-x-2 h-20"
                        >
                            <Textarea
                                placeholder="Type your message here (shift + enter = new line; enter = send)"
                                className={`resize-none flex-1 bg-background border-gray-500 font-victor-mono text-sm md:text-base lg:text-base h-full`}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (
                                        e.key === "Enter" &&
                                        !e.shiftKey &&
                                        !e.nativeEvent.isComposing
                                    ) {
                                        e.preventDefault();
                                        sendMessage();
                                    }
                                }}
                            />
                            <Button
                                type="submit"
                                className="flex-col font-playwrite hover:cursor-pointer h-20"
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
                    </div>
                    <div className="flex flex-col lg:flex-row w-full items-cneter space-y-4 lg:space-y-0 space-x-4">
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
                                placeholder="Submit the flag"
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
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
        </div>
    );
}
