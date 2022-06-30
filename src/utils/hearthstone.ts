import { ICardSearchCriteria } from './types'

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
    const { access_token: accessToken } = json

    return accessToken
  } catch (error) {
    console.error(error)
  }
}

export const updateAccessTokenAndDefaultOptions = async () => {
  accessToken = await getAccessToken()
  defaultOptions = {
    ...defaultOptions,
    headers: {
      ...defaultOptions.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  }
}

export const searchCardByName = async (searchCriteria: ICardSearchCriteria) => {
  if (!accessToken) {
    await updateAccessTokenAndDefaultOptions()
  }
  console.log('accessToken', accessToken)
  console.log('defaultOptions', defaultOptions)
}
