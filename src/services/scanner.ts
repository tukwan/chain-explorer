import { SupportedChains, config } from "@/config"

type ApiConfig = {
  url: string
  apiKey: string | undefined
}

const API_CONFIG: Record<SupportedChains, ApiConfig> = {
  ethereum: {
    url: config.ethereumAPI,
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  polygon: {
    url: config.polygonAPI,
    apiKey: process.env.POLYGON_API_KEY,
  },
}

export async function getEtherBalance(
  addressHash: string,
  chain: SupportedChains
) {
  const config = API_CONFIG[chain]

  const url = new URL(`${config.url}/api`)
  url.search = new URLSearchParams({
    module: "account",
    action: "balance",
    address: addressHash,
    tag: "latest",
    apikey: config.apiKey as string,
  }).toString()

  return fetchFromApi(url)
}

export async function getTransactions(
  addressHash: string,
  chain: SupportedChains
) {
  const config = API_CONFIG[chain]

  const url = new URL(`${config.url}/api`)
  url.search = new URLSearchParams({
    module: "account",
    action: "txlist",
    address: addressHash,
    sort: 'desc',
    apikey: config.apiKey as string,
  }).toString()

  return fetchFromApi(url)
}

async function fetchFromApi(url: URL) {
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error("Failed to fetch data from the API")
  const data = await res.json()
  return data.result
}
