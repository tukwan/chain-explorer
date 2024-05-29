import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatUnits } from "ethers"
import { format } from "date-fns"
import { SupportedChains, config } from "@/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const weiToEthOrMatic = (wei: string | bigint | undefined) => {
  if (!wei || isNaN(Number(wei))) return "-"
  const value = parseFloat(formatUnits(wei, 18))
  return value === 0 ? "0" : value.toFixed(8)
}

export function calcTransactionFee(
  gasUsed: bigint | undefined,
  gasPrice: bigint | undefined
) {
  if (gasUsed === undefined || gasPrice === undefined) return "-"
  const gasUsedB = BigInt(gasUsed)
  const gasPriceB = BigInt(gasPrice)
  const fee = gasUsedB * gasPriceB
  return weiToEthOrMatic(fee.toString())
}

export const timeStampToHuman = (
  timeStamp: string | number | undefined,
  dateFormat: string
) => {
  if (!timeStamp || isNaN(Number(timeStamp))) return "-"
  const stamp = Number(timeStamp) * 1000
  const date = new Date(stamp || 0)
  const utcDate = new Date(date.toUTCString().slice(0, -4))
  return format(utcDate, dateFormat)
}

export const getUnit = (chain: SupportedChains) =>
  chain === "ethereum" ? "ETH" : "MATIC"

export const getScannerUrl = (chain: SupportedChains) =>
  chain === "ethereum" ? config.ethereumURL : config.polygonURL
