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
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log("url: " + url)
      console.log("baseUrl: " + baseUrl)
      return 'https://site-git-hw.hackclub.dev/hackers-wanted'
    },
    async signIn({ user }) {
      console.log(user)
      try {
        fetch('https://site-git-hw.hackclub.dev/api/hackers-wanted', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Id: user.id,
            Username: user.name,
            Email: user.email
          })
        })
      } catch(err) {
        console.log(err)
      }
      console.log('hi')
      return true
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});