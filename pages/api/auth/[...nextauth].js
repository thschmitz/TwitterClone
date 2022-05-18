import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
        version: "2.0",
        jwt: async (token, user, account, profile, isNewUser) => {
          if (user) {
            token.uid = user.id;
          }
          return Promise.resolve(token);
        },
        callbacks: {
          session: async(session, user) => {
            session.id = user.id
            return Promise.resolve(session)
          }
        }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      version: "2.0",
      jwt: async (token, user, account, profile, isNewUser) => {
        if (user) {
          token.uid = user.id;
        }
        return Promise.resolve(token);
      },
      callbacks: {
        session: async(session, user) => {
          session.id = user.id
          return Promise.resolve(session)
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      jwt: async (token, user, account, profile, isNewUser) => {
        if (user) {
          token.uid = user.id;
        }
        return Promise.resolve(token);
      },
      callbacks: {
        session: async(session, user) => {
          session.id = user.id
          return Promise.resolve(session)
        }
      }
    }),


    // ...add more providers here
  ],



})