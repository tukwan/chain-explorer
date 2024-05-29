import { Metadata } from "next"
import Image from "next/image"
import makeBlockie from "ethereum-blockies-base64"
import { SupportedChains, config } from "@/config"
import { getTransactions, getEtherBalance } from "@/services/scanner"
import { weiToEthOrMatic, getUnit, getScannerUrl } from "@/lib/utils"
import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"
import { topETHAddresses, topMATICAddresses } from "./isr.data"

export const metadata: Metadata = {
  title: "Address Details",
  description:
    "View transactions and balance details for a specific Ethereum or Polygon address.",
}

type Props = {
  params: { chain: SupportedChains; addressHash: string }
}

const AddressPage = async ({ params: { chain, addressHash } }: Props) => {
  const transactions = await getTransactions(addressHash, chain)
  const etherBalance = await getEtherBalance(addressHash, chain)
  const scannerUrl = getScannerUrl(chain)

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 pb-0 md:flex">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0">
        <div className="flex items-center space-x-4">
          <Image
            src={makeBlockie(addressHash)}
            alt="blockies avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold tracking-tight flex flex-col md:flex-row md:items-center">
              <span className="text-gray-700">Address:</span>

              <a
                href={`${scannerUrl}/address/${addressHash}`}
                className="text-gray-500 hover:underline ml-2 text-sm md:text-base break-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                {addressHash}
              </a>
            </h2>
            <div className="flex flex-col md:flex-row md:items-center font-bold text-sm md:text-base">
              <span className="text-gray-700">Balance:</span>
              <span className="text-gray-500 ml-2 text-sm md:text-base break-all">
                {weiToEthOrMatic(etherBalance)} {getUnit(chain)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <DataTable data={transactions} columns={columns} chain={chain} />
    </div>
  )
}

export default AddressPage

export async function generateStaticParams() {
  const ethParams = topETHAddresses.map((address) => ({
    chain: "ethereum",
    addressHash: address,
  }))

  const maticParams = topMATICAddresses.map((address) => ({
    chain: "polygon",
    addressHash: address,
  }))

  const defaultParams = [
    { chain: "ethereum", addressHash: config.defaultAddress },
    { chain: "polygon", addressHash: config.defaultAddress },
  ]

  return [...ethParams, ...maticParams, ...defaultParams]
}

export const revalidate = 600 // 10 min
