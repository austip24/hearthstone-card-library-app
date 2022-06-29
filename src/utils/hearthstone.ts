import { ICardSearchCriteria } from './types'

const { BATTLE_NET_CLIENT_ID, BATTLE_NET_CLIENT_SECRET } = process.env
const API_HOST = `https://us.api.blizzard.com`
const DEFAULT_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}

export const searchCardByName = (searchCriteria: ICardSearchCriteria) => {}
