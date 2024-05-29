export type SupportedChains = "ethereum" | "polygon"

export const config = {
  links: {
    githubProject: "https://github.com/tukwan/chain-explorer",
    github: "https://github.com/tukwan",
  },
  defaultChain: "ethereum" as SupportedChains,
  defaultAddress: "0xE21DC18513e3e68a52F9fcDaCfD56948d43a11c6",
  defaultTx:
    "0x072803af9102ffdba26efc1fcb6ef615cad68b02f279acfabc120673e945d7fb",
  ethereumURL: "https://etherscan.io",
  polygonURL: "https://polygonscan.com",
  ethereumAPI: "https://api.etherscan.io",
  polygonAPI: "https://api.polygonscan.com",
}

export type Config = typeof config
