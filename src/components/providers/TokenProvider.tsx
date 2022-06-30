import { createContext, useEffect, useState } from 'react'

const BATTLENET_CLIENT_ID = process.env.NEXT_PUBLIC_BATTLENET_CLIENT_ID
const BATTLENET_CLIENT_SECRET = process.env.NEXT_PUBLIC_BATTLENET_CLIENT_SECRET
const BATTLENET_ISSUER = process.env.NEXT_PUBLIC_BATTLENET_ISSUER
const OAUTH_TOKEN_URL = `${BATTLENET_ISSUER}/token`

const TokenContext = createContext<string>('')

interface TokenProviderProps {
  children: React.ReactNode
}

const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>('')

  const getAccessToken = async () => {
    try {
      const res = await fetch(OAUTH_TOKEN_URL, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${BATTLENET_CLIENT_ID}:${BATTLENET_CLIENT_SECRET}`,
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
        }),
      })

      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }

      const json = await res.json()
      const { access_token } = json

      setAccessToken(access_token)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAccessToken()
  }, [])

  return (
    <TokenContext.Provider value={accessToken}>
      {children}
    </TokenContext.Provider>
  )
}
