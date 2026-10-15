import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { getDb } from "@/lib/getDb";
import { randomUUID } from "crypto";

export const authOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = await getDb();
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (user) {
          const isPasswordMatch = await bcrypt.compare(
            credentials.password,
            user.password,
          );
          if (isPasswordMatch) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
          }
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const db = await getDb();
        const existingUser = await db
          .collection("users")
          .findOne({ email: user.email });

        if (!existingUser) {
          const randomPassword = await bcrypt.hash(randomUUID(), 10);
          const newUser = {
            id: randomUUID(),
            email: user.email,
            password: randomPassword,
            username: user.name || user.email.split("@")[0],
            fullname: user.name || "",
          };
          await db.collection("users").insertOne(newUser);

          await db.collection("carts").insertOne({
            id: randomUUID(),
            user_id: newUser.id,
            carts: [],
          });
        }
      }
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        const db = await getDb();
        const dbUser = await db
          .collection("users")
          .findOne({ email: user.email });

        if (dbUser) {
          token.id = dbUser.id;
          token.email = dbUser.email;
          token.username = dbUser.username;
          token.fullname = dbUser.fullname;
        } else {
          token.id = user.id;
          token.email = user.email;
          token.username = user.username;
          token.fullname = user.fullname;
        }
      }
      if (trigger === "update" && session?.user) {
        return { ...token, ...session.user };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.fullname = token.fullname;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    SignUp: "/auth/signup",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
