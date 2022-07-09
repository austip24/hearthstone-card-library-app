import { CardSearchCriteria, CardSearchResponse } from './types'

const BATTLENET_CLIENT_ID = process.env.NEXT_PUBLIC_BATTLENET_CLIENT_ID
const BATTLENET_CLIENT_SECRET = process.env.NEXT_PUBLIC_BATTLENET_CLIENT_SECRET
const BATTLENET_ISSUER = process.env.NEXT_PUBLIC_BATTLENET_ISSUER
const API_HOST = `https://us.api.blizzard.com`
const OAUTH_TOKEN_URL = `${BATTLENET_ISSUER}/token`

let defaultOptions: RequestInit = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}

let accessToken: string

export const getAccessToken = async () => {
  try {
    const res = await fetch(OAUTH_TOKEN_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${BATTLENET_CLIENT_ID}:${BATTLENET_CLIENT_SECRET}`
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    })

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`)
    }

    const json = await res.json()
    const { access_token } = json

    return access_token
  } catch (error) {
    console.error(error)
  }
}

export const updateAccessTokenAndDefaultOptions = async () => {
  if (!accessToken) {
    accessToken = await getAccessToken()
    defaultOptions = {
      ...defaultOptions,
      headers: {
        ...defaultOptions.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  }
}

export const searchCard: (
  criteria?: CardSearchCriteria
) => Promise<CardSearchResponse | undefined> = async (
  criteria = { locale: 'en_US' }
) => {
  try {
    await updateAccessTokenAndDefaultOptions()

    let url = `${API_HOST}/hearthstone/cards`
    if (criteria) {
      const params = new URLSearchParams(criteria as any).toString()
      url += `?${params}`
    }

    const res = await fetch(url, defaultOptions)

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`)
    }

    const json = (await res.json()) as Promise<CardSearchResponse>
    return json
  } catch (error) {
    console.error(error)
  }
}
