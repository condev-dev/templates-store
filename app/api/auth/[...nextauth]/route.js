import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { getDb } from "@/lib/getDb";
import { randomUUID } from "crypto";

export const authOptions = {
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
    // --- اضافه شده: گوگل ---
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // --- پایان اضافه شده ---
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // --- اضافه شده: برای اینکه یوزر گوگل توی دیتابیس خودت هم ساخته/پیدا بشه ---
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const db = await getDb();
        const existingUser = await db
          .collection("users")
          .findOne({ email: user.email });

        if (!existingUser) {
          // یوزر جدید از گوگل - بدون پسورد واقعی (رندوم هش می‌کنیم چون فیلد password اجباریه)
          const randomPassword = await bcrypt.hash(randomUUID(), 10);
          const newUser = {
            id: randomUUID(),
            email: user.email,
            password: randomPassword,
            username: user.name || user.email.split("@")[0],
            fullname: user.name || "",
          };
          await db.collection("users").insertOne(newUser);
        }
      }
      return true;
    },
    // --- پایان اضافه شده ---

    async jwt({ token, user, trigger, session }) {
      if (user) {
        // --- اضافه شده: چون یوزر گوگل شکلش فرق داره، از دیتابیس خودمون می‌خونیم ---
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
        // --- پایان اضافه شده ---
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
