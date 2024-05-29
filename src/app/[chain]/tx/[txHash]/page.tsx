import { Metadata } from "next"
import { getTransactionByHash } from "@/services/infura"
import { getTransactions } from "@/services/scanner"
import { SupportedChains, config } from "@/config"
import {
  timeStampToHuman,
  weiToEthOrMatic,
  calcTransactionFee,
  getUnit,
  cn,
  getScannerUrl,
} from "@/lib/utils"

export const metadata: Metadata = {
  title: "Transaction Details",
  description:
    "View detailed information about a specific Ethereum or Polygon transaction, including its status, amount, and associated addresses.",
}

type Props = {
  params: { txHash: string; chain: SupportedChains }
}

const TransactionPage = async ({ params: { txHash, chain } }: Props) => {
  const tx = await getTransactionByHash(txHash, chain)
  const scannerUrl = getScannerUrl(chain)

  if (!tx?.blockHash) {
    return (
      <div className="h-full flex-1 flex-col space-y-8 p-8 pb-0 md:flex">
        <h2 className="text-2xl font-bold tracking-tight text-gray-700">
          Transaction Details
        </h2>
        <div className="border rounded-lg border-gray-200 p-4">
          <p className="text-sm text-gray-900">
            Transaction not found. Check the hash again or try to change the
            network.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 pb-0 md:flex">
      <h2 className="text-2xl font-bold tracking-tight text-gray-700">
        Transaction Details
      </h2>
      <div className="border rounded-lg border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            <dt className="text-sm font-medium text-gray-500">
              Transaction Hash
            </dt>
            <dd className="text-sm text-gray-900 col-span-2 break-words">
              <a
                href={`${scannerUrl}/tx/${txHash}`}
                className="text-blue-500 hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {txHash}
              </a>
            </dd>
          </div>
          <div className="px-4 py-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            <dt className="text-sm font-medium text-gray-500">
              Confirmation Status
            </dt>
            <dd className="text-sm text-gray-900 col-span-2">
              <span
                className={cn(
                  "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium",
                  {
                    "bg-green-100 text-green-800": tx.status === 1,
                    "bg-red-100 text-red-800": tx.status === 0,
                    "bg-gray-100 text-gray-800":
                      tx.status !== 1 && tx.status !== 0,
                  }
                )}
              >
                {tx.status === 1
                  ? "Success"
                  : tx.status === 0
                  ? "Failure"
                  : "Unknown"}
              </span>
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            <dt className="text-sm font-medium text-gray-500">Block Number</dt>
            <dd className="text-sm text-gray-900 col-span-2">
              <a
                href={`${scannerUrl}/block/${tx.blockNumber}`}
                className="text-blue-500 hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {tx.blockNumber}
              </a>
            </dd>
          </div>
          <div className="px-4 py-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            <dt className="text-sm font-medium text-gray-500">Timestamp</dt>
            <dd className="text-sm text-gray-900 col-span-2">
              {timeStampToHuman(
                tx.blockTimestamp,
                "MMM-dd-yyyy hh:mm:ss aa '+UTC'"
              )}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            <dt className="text-sm font-medium text-gray-500">From</dt>
            <dd className="text-sm text-gray-900 col-span-2 break-words">
              <a
                href={`${scannerUrl}/address/${tx.from}`}
                className="text-blue-500 hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {tx.from}
              </a>
            </dd>
          </div>
          <div className="px-4 py-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            <dt className="text-sm font-medium text-gray-500">To</dt>
            <dd className="text-sm text-gray-900 col-span-2 break-words">
              <a
                href={`${scannerUrl}/address/${tx.to}`}
                className="text-blue-500 hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {tx.to}
              </a>
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            <dt className="text-sm font-medium text-gray-500">Amount</dt>
            <dd className="text-sm text-gray-900 col-span-2">
              {weiToEthOrMatic(tx.value)} {getUnit(chain)}
            </dd>
          </div>
          <div className="px-4 py-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            <dt className="text-sm font-medium text-gray-500">
              Transaction Fee
            </dt>
            <dd className="text-sm text-gray-900 col-span-2">
              {calcTransactionFee(tx.gasUsed, tx.gasPrice)} {getUnit(chain)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default TransactionPage

export async function generateStaticParams() {
  const defaultTxsEthereum = await getTransactions(
    config.defaultAddress,
    "ethereum"
  )
  const defaultTxsPolygon = await getTransactions(
    config.defaultAddress,
    "polygon"
  )

  // load first 10 txs
  const ethereumParams = defaultTxsEthereum
    .slice(0, 10)
    .map((tx: any) => ({ chain: "ethereum", txHash: tx.hash }))

  const polygonParams = defaultTxsPolygon
    .slice(0, 10)
    .map((tx: any) => ({ chain: "polygon", txHash: tx.hash }))

  return [...ethereumParams, ...polygonParams]
}

export const revalidate = 600 // 10 min
