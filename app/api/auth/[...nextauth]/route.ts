// app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import connectDB from "@/config/mongo-db";
import User from "@/lib/models/BlandUsers";

// Extend the Session type to include id and username
declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      username?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Handle sign-in logic (create user if doesn't exist)
    async signIn({ profile }) {
      if (!profile?.email) return false;
      await connectDB();

      let user = await User.findOne({ email: profile.email });

      if (!user) {
        user = await User.create({
          username: profile.name,
          email: profile.email,
        });
      }

      return true;
    },

    // Attach user data to session
    async session({ session, token }) {
      await connectDB();

      if (!session?.user?.email) return session;

      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser && session.user) {
        session.user.id = dbUser._id.toString();
        session.user.username = dbUser.username || null;
        session.user.email = dbUser.email;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
