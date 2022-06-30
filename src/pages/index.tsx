import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { searchCardByName } from '../utils/hearthstone'

const Home: NextPage = () => {
  const { data: session } = useSession()

  useEffect(() => {
    console.log(session)
  }, [session])

  useEffect(() => {
    const request = async () => {
      await searchCardByName({} as any)
    }

    request()
  }, [])

  return (
    <div className="flex text-white gap-4">
      <button
        className="px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-600"
        onClick={() => signIn()}
      >
        Sign in
      </button>
      <button
        className="px-4 py-2 rounded bg-rose-500 hover:bg-rose-600"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  )
}

export default Home
