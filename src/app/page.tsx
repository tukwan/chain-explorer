import { redirect } from "next/navigation"
import { config } from "@/config"

export default function Home() {
  // TODO: design & build a home page
  return redirect(`${config.defaultChain}/address/${config.defaultAddress}`)
}
