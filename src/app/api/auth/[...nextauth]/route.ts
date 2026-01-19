import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { environment } from "@/src/config/environment";
import AuthService from "@/src/services/auth.service";
import { JWTExtended, SessionExtended, UserExtended } from "@/src/types/Auth";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: environment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identifier: { label: "identifier", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const resultToken = await AuthService.login({
            identifier: credentials.identifier,
            password: credentials.password,
          }).catch(() => null);

          if (!resultToken || resultToken.status !== 200) {
            return null;
          }

          const accessToken = resultToken.data.data;

          const me = await AuthService.findToken(accessToken).catch(() => null);

          if (!me || me.status !== 200) {
            return null;
          }

          const user = me.data.data;

          if (user?._id) {
            user.accessToken = accessToken;
            return user;
          }

          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWTExtended; user: UserExtended | null }) {
      if (user) token.user = user;
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: SessionExtended;
      token: JWTExtended;
    }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };