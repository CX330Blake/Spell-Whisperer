"use client";

import { signIn } from "next-auth/react";
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
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

export default function LoginButton() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-auto h-auto hover:cursor-pointer"
                >
                    Login
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="flex flex-col gap-4">
                    <AlertDialogTitle className="font-playwrite font-normal text-2xl">
                        Login now to hack LLMs
                    </AlertDialogTitle>
                    <Button
                        className="font-victor-mono items-center w-auto text-base"
                        onClick={() => signIn("google")}
                    >
                        <FcGoogle />
                        Login with Google
                    </Button>
                    <Button
                        className="font-victor-mono items-center text-base"
                        onClick={() => signIn("github")}
                    >
                        <FaGithub />
                        Login with GitHub
                    </Button>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="border-gray-500">
                        Cancel
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
