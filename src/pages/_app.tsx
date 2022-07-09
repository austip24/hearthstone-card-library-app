import type { AppProps } from 'next/app'
import React from 'react'
import TokenProvider from '../components/providers/TokenProvider'
import '../styles/globals.css'

const App: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <TokenProvider>
      {/* <SessionProvider session={session}> */}
      <Component {...pageProps} />
      {/* </SessionProvider> */}
    </TokenProvider>
  )
}

export default App
