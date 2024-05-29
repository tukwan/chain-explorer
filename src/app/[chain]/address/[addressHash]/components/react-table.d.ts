import "@tanstack/react-table"
import type { SupportedChains } from "@/config/index"

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    chain: SupportedChains
  }
}
