"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import BlurText from "@/components/reactbits/BlurText";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import SplitText from "@/components/reactbits/SplitText";

export default function Page() {
    const { data: session, status } = useSession();
    if (session) {
        redirect("/challenges");
    }
    return (
        <div className="w-4/5 mx-auto mt-[15vh]">
            <span className="flex flex-col space-y-4 items-center">
                <span className="font-victor-mono text-4xl md:text-6xl">
                    <SplitText text="Join now" />
                </span>
                <span className="font-playwrite justify-center text-base md:text-xl">
                    <SplitText text="- Tomorrow, AI will only be stronger than today -" />
                </span>
            </span>
            <br />
            <br />
            <div className="flex justify-center">
                <Card className="w-[350px] bg-background border-gray-500 font-victor-mono">
                    <CardHeader className="text-2xl">
                        <CardTitle>Login now</CardTitle>
                        <CardDescription>
                            Choose your favorite platform to login
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex flex-col items-center">
                        <Button
                            className="font-victor-mono items-center w-auto text-base hover:cursor-pointer border-background border"
                            onClick={() => signIn("google")}
                        >
                            <FcGoogle />
                            Login with Google
                        </Button>
                        {/* <Button
                            className="font-victor-mono items-center w-auto text-base hover:cursor-pointer border-background border"
                            onClick={() => signIn("github")}
                        >
                            <FaGithub />
                            Login with GitHub
                        </Button> */}
                    </CardContent>
                </Card>
            </div>
            <br />
            <br />
        </div>
    );
}
