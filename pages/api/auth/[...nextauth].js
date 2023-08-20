import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      authorization: { params: { scope: "read:user user:email" } },
      profile(profile) {
        return {
          name: profile.login,
          email: profile.email,
          image: profile.avatar_url,
          id: profile.id.toString(),
          githubId: profile.id.toString(),
          githubUsername: profile.login,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});