import NextAuth from 'next-auth'
import BattleNetProvider from 'next-auth/providers/battlenet'

type BattleNetIssuer =
  | 'https://www.battlenet.com.cn/oauth'
  | 'https://us.battle.net/oauth'
  | 'https://eu.battle.net/oauth'
  | 'https://kr.battle.net/oauth'
  | 'https://tw.battle.net/oauth'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    BattleNetProvider({
      clientId: process.env.BATTLENET_CLIENT_ID as string,
      clientSecret: process.env.BATTLENET_CLIENT_SECRET as string,
      issuer: process.env.BATTLENET_ISSUER as BattleNetIssuer,
    }),
    // ...add more providers here
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.id = user.id
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id
      }
      return session
    },
  },
})
