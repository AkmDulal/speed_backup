import NextAuth from "next-auth";

import Apple from "next-auth/providers/apple";
import Auth0 from "next-auth/providers/auth0";
import Cognito from "next-auth/providers/cognito";
import Coinbase from "next-auth/providers/coinbase";
import Discord from "next-auth/providers/discord";
import Dropbox from "next-auth/providers/dropbox";
import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
import GitLab from "next-auth/providers/gitlab";
import Google from "next-auth/providers/google";
import Hubspot from "next-auth/providers/hubspot";
import Keycloak from "next-auth/providers/keycloak";
import LinkedIn from "next-auth/providers/linkedin";
import Netlify from "next-auth/providers/netlify";
import Okta from "next-auth/providers/okta";
import Passage from "next-auth/providers/passage";
import Pinterest from "next-auth/providers/pinterest";
import Reddit from "next-auth/providers/reddit";
import Slack from "next-auth/providers/slack";
import Spotify from "next-auth/providers/spotify";
import Twitch from "next-auth/providers/twitch";
import Twitter from "next-auth/providers/twitter";
import Zoom from "next-auth/providers/zoom";

export const config = {
  providers: [
    Apple,
    Auth0,
    Cognito,
    Coinbase,
    Discord,
    Dropbox,
    Facebook,
    GitHub,
    GitLab,
    Google({
      clientId:
        "372102869142-fkh41to88b0rp0iv15qijqa4j99fpssk.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    Hubspot,
    Keycloak,
    LinkedIn,
    Netlify,
    Okta,
    Passage,
    Pinterest,
    Reddit,
    Slack,
    Spotify,
    Twitch,
    Twitter,
    Zoom,
  ],
  basePath: "/auth",
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
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
