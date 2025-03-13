import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/prisma/client";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async redirect({ baseUrl }) {
            const base = process.env.NEXTAUTH_URL || baseUrl;
            return `${base}`;
        },
    }
}

export default authOptions;