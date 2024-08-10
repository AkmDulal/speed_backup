import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "372102869142-fkh41to88b0rp0iv15qijqa4j99fpssk.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  secret: "6sZQpyLaaBlnJhUPpXxTzX1_sDth",
  session: {
    jwt: true,
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/middleware-example") return !!auth;
      return true;
    },
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session.user.name;
      return token;
    },
  },
  pages: {
    signIn: `https://www.sped.delivery/api/auth/signin`,
    // Add other custom pages if needed
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, handler as signOut };
