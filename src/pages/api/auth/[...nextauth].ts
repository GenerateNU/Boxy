import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Utils from "src/utils";

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const { exists, verified } = await Utils.checkForUser(user.email);

      // case 1: user is in database and verified -> send them back to page they came from
      if (exists && verified) {
        return true;
      }

      // case 2: user is in database but not verified -> send them to page to upload DL photo
      if (exists && !verified) {
        return "/user/verify";
      }

      // case 3: user is not in database -> send to account creatin page
      if (!exists && !verified) {
        return "/user/register";
      }

      return true;
    },
  },
};

export default NextAuth(authOptions);
