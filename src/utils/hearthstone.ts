import { ICardSearchCriteria } from './types'

const { BATTLENET_CLIENT_ID, BATTLENET_CLIENT_SECRET, BATTLENET_ISSUER } =
  process.env
const API_HOST = `https://us.api.blizzard.com`
const DEFAULT_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}

export const searchCardByName = (searchCriteria: ICardSearchCriteria) => {}
