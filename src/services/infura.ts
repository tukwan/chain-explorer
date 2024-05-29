import { InfuraProvider } from "ethers"
import type { SupportedChains } from "@/config"

export async function getTransactionByHash(
  txHash: string,
  chain: SupportedChains
) {
  const infuraProjectId = process.env.INFURA_PROJECT_ID_KEY
  const network = chain === "polygon" ? "matic" : "mainnet"
  const provider = new InfuraProvider(network, infuraProjectId)

  try {
    const tx = await provider.getTransaction(txHash)
    const txReceipt = await provider.getTransactionReceipt(txHash)
    const block = await provider.getBlock(tx?.blockNumber!)

    return {
      ...tx,
      ...txReceipt,
      blockTimestamp: block?.timestamp,
      chain,
    }
  } catch (error) {
    console.error("Error fetching transaction by hash error:", error)
  }
}
