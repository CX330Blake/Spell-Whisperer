"use client";

import { SignIn } from "./SignIn";

export default function LoginButton() {
    return (
        <a
            onClick={async () => {
                await SignIn(); // ✅ Call server action
            }}
            className="hover:cursor-pointer"
        >
            Login
        </a>
    );
}
