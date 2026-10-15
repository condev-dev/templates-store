import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { getDb } from "@/lib/getDb";
import { randomUUID } from "crypto";

export const authOptions = {
  debug: process.env.NODE_ENV === "development",
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
      /*
       * Identity is only ever read from the database.
       *
       * `session.user` in an update() call is CLIENT input. The old
       * `{ ...token, ...session.user }` let any signed-in user send
       * update({ user: { id: "<someone else's id>" }) and have the session adopt that
       * identity, which then unlocked that account's cart and purchases.
       * An update now re-reads the row by the id the server already trusts.
       */
      if (user) {
        const db = await getDb();
        const dbUser = await db
          .collection("users")
          .findOne({ email: user.email });

        token.id = dbUser?.id ?? user.id;
        token.email = dbUser?.email ?? user.email;
        token.username = dbUser?.username ?? user.username;
        token.fullname = dbUser?.fullname ?? user.fullname;
      }

      if (trigger === "update" && session?.user && token.id) {
        const db = await getDb();
        const dbUser = await db.collection("users").findOne({ id: token.id });

        if (dbUser) {
          token.email = dbUser.email;
          token.username = dbUser.username;
          token.fullname = dbUser.fullname;
        }
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
