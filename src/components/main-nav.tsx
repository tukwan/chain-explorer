"use client"

import { useState, useEffect } from "react"
import {
  useRouter,
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation"
import Link from "next/link"
import { config } from "@/config"
import { Button } from "@/components/ui/button"
import { EthereumIcon, PolygonIcon } from "@/components/icons"

export const MainNav = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = useParams()

  const currentChain = params.chain || config.defaultChain
  const isEthereum = currentChain === "ethereum"

  useEffect(() => {
    setIsLoading(false)
  }, [pathname, searchParams])

  const toggleChain = async () => {
    setIsLoading(true)
    const newChain = isEthereum ? "polygon" : "ethereum"
    const newPath = pathname.replace(`/${currentChain}`, `/${newChain}`)
    await router.push(newPath)
  }

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href={`/${currentChain}/address/${config.defaultAddress}`}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Address
      </Link>

      <Link
        href={`/${currentChain}/tx/${config.defaultTx}`}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Transaction
      </Link>
      <div className="flex items-center">
        <Button
          onClick={toggleChain}
          variant="outline"
          size="sm"
          className="h-8 data-[state=open]:bg-accent"
          disabled={isLoading}
        >
          <span className="flex items-center">
            {isEthereum ? <EthereumIcon /> : <PolygonIcon />}
            {isEthereum ? "Ethereum" : "Polygon"}
          </span>
          {isLoading && (
            <div className="ml-2 flex items-center">
              <div className="w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </Button>
      </div>
    </nav>
  )
}
