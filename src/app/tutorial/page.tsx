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
                message: `Hello, welcome to the Spell Whisperer training! In this course, you will embark on a journey to master the art of uncovering hidden knowledge. As a Seeker, your mission is to outsmart the Secret Guard and extract the hidden secrets. But don’t worry—this is a guided challenge, and I will be here every step of the way to teach you how to think, analyze, and uncover what is hidden. Follow the tutorial closely, complete each challenge, and refine your techniques. If you ever have questions, feel free to ask me in any language you prefer—I am here to assist you. Now, let’s begin your training. Your first challenge is simple: find the secret. Good luck! --- 你好，歡迎來到《咒語低語者》的訓練課程！在這堂課中，你將踏上一場探索隱藏知識的旅程。作為探求者，你的目標是運用你的智慧，挑戰秘密衛士，並成功獲取隱藏的秘密。但不用擔心！這是一場有指引的挑戰，我會在整個過程中引導你，幫助你學習如何思考、分析，並揭開隱藏的線索。請仔細閱讀教程，完成每個挑戰，並不斷提升你的技能。如果你有任何問題，隨時用任何你習慣的語言問我——我會幫助你解決。現在，讓我們開始你的訓練。你的第一個挑戰很簡單：找到秘密。 祝你好運！`,
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
        } else {
            setFlagBorderStyle("border-red-500 border-2");
            setFlag("❌ Wrong!");
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
                        className="w-full p-4 border border-primary rounded-md h-150 md:h-[60vh] overflow-y-auto bg-background font-victor-mono text-sm md:text-sm lg:text-sm"
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
