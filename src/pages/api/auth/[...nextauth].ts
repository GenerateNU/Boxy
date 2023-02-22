import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import persistentUserInstance from "lib/userInstance";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "string", placeholder: "john" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "secret",
        },
      },
      async authorize(credentials, req) {
        console.log("we're authroizing");
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        try {
          await persistentUserInstance.login(username, password);
          // ID is the only required field
          return { id: "1", name: "J Smith", email: "jsmith@example.com" };
        } catch (e) {
          throw new Error("invalid credentials");
        }
      },
    }),
  ],
  // pages: {
  //   // signIn: "/auth/signin",
  //   // error: '/auth/error',
  //   // signOut: '/auth/signout'
  // },
};

export default NextAuth(authOptions);
