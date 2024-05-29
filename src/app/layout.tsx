import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chain Explorer",
  description: "Explore the Ethereum and Polygon blockchains",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen font-sans antialiased`}>
        <Toaster position="bottom-center" />
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            <div className="container relative px-0 md:px-4">{children}</div>
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
