import type { GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react'
import { useAccessToken } from '../components/providers/TokenProvider'
import { searchCard } from '../utils/hearthstone'
import { Card } from '../utils/types'

interface PageProps {
  cards: Card[] | undefined
}

const Home: NextPage<PageProps> = ({ cards }) => {
  const { accessToken } = useAccessToken()
  useEffect(() => {
    console.log(accessToken)
  }, [accessToken])

  return (
    <div className="flex text-white gap-4">
      {cards?.map((card) => (
        <div key={card.id} className="flex flex-col">
          <img
            src={card.image}
            className="w-48 h-64 hover:opacity-90"
            alt={card.name}
          />
        </div>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const cardsResponse = await searchCard({
    locale: 'en_US',
    textFilter: 'kalecgos',
  })

  const cards = cardsResponse?.cards.filter((card) =>
    card.hasOwnProperty('copyOfCardId')
  )

  return {
    props: {
      cards,
    },
  }
}

export default Home
