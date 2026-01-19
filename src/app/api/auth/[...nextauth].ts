import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTExtended, SessionExtended, UserExtended } from "@/src/types/Auth";
import { environment } from "@/src/config/environment";
import AuthService from "@/src/services/auth.service";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: environment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "identifier", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { identifier, password } = credentials!;

          const resultToken = await AuthService.login({
            identifier,
            password,
          });

          const accessToken = resultToken.data.data;
          const me = await AuthService.findToken(accessToken);
          const user = me.data.data;

          if (accessToken && user?._id) {
            user.accessToken = accessToken;
            return user;
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWTExtended;
      user: UserExtended | null;
    }) {
      if (user) {
        token.user = user;
      }
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
});
