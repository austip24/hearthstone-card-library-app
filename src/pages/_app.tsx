import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import React from 'react'
import '../styles/globals.css'

const App: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default App
