import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0", // opt-in to Twitter OAuth 2.0
    })
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/"
  },
  session: {
    strategy: "jwt",
  },
  debug: true,
  callbacks: {
    async session({ session, user, token }) {
      session.username = session?.user?.name
      .split(" ")
      .join("")
      .toLocaleLowerCase();
      return session
    },
  }
})

