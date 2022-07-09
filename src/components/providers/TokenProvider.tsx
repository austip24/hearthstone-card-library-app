import { createContext, useContext, useEffect, useState } from 'react'
import { getAccessToken } from '../../utils/hearthstone'

export interface TokenObject {
  accessToken: string
}

const TokenContext = createContext<TokenObject>({} as TokenObject)

export const useAccessToken = () => useContext(TokenContext)

interface TokenProviderProps {
  children: React.ReactNode
}

const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>('')

  useEffect(() => {
    const getAndSetToken = async () => {
      const token = await getAccessToken()
      setAccessToken(token)
    }
    getAndSetToken()
  }, [])

  return (
    <TokenContext.Provider value={{ accessToken }}>
      {children}
    </TokenContext.Provider>
  )
}

export default TokenProvider
