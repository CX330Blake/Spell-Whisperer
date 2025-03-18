import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            /** The user's unique identifier. */
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}
