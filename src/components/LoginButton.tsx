"use client";

import { Button } from "./ui/button";
import { redirect } from "next/navigation";

export default function LoginButton() {
    return (
        <Button
            variant="ghost"
            className="w-auto h-auto hover:cursor-pointer"
            onClick={() => redirect("login")}
        >
            Login
        </Button>
    );
}
