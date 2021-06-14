import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { GITHUB_ID, GTIHUB_SECRET } from '@utils/const';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: GITHUB_ID,
      clientSecret: GTIHUB_SECRET,
    }),
  ],
  callbacks: {
    // eslint-disable-next-line no-unused-vars
    async jwt(token, user, account, profile, isNewUser) {
      // Add access_token to the token right after signin
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
