import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvide from 'next-auth/providers/google';
import refreshGithubToken from '../../../utils/refreshGithubToken';

/* Refresh token for github, the others implementations to refresh token go here */
function refreshToken(token) {
  if (token.providerId === 'github') {
    return refreshGithubToken(token);
  }

  return {
    ...token,
    error: 'RefreshAccessTokenError',
  };
}

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvide({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/error',
  },
  callbacks: {
    jwt({ token, account, user }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          providerId: account.provider,
          user,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.user = token.user;
      return session;
    },
  },
});
