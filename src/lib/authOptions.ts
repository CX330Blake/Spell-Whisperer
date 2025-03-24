import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { Adapter } from "next-auth/adapters";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET ?? "",
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID ?? "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
        }),
    ],
    adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    }) as Adapter,
    callbacks: {
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.sub as string;
                if (token.name) session.user.name = token.name as string;
                if (token.email) session.user.email = token.email as string;
                if (token.picture) session.user.image = token.picture as string;
            }
            return session;
        },
        async jwt({ user, token, trigger, session }) {
            if (user) {
                token.uid = user.id;
                token.name = user.name;
                token.email = user.email;
                token.picture = user.image;
            }

            if (trigger === "update" && session) {
                // Sync the updated session data to the token
                if (session.name) token.name = session.name;
                if (session.email) token.email = session.email;
                if (session.image) token.picture = session.image;
            }

            return token;
        },
    },
    session: {
        strategy: "jwt",
    },
};
