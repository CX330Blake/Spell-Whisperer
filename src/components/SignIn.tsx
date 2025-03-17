"use server";

import { signIn } from "@/auth";

export async function SignIn() {
    await signIn("google");
}
