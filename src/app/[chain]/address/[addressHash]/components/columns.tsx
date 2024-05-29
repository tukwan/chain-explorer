"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { weiToEthOrMatic, timeStampToHuman, getUnit } from "@/lib/utils"
import type { Transaction } from "./schema"
import { DataTableColumnHeader } from "./data-table-column-header"

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "hash",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction Hash" />
    ),
    cell: ({ row, table }) => {
      const hash = row.getValue("hash") as string
      const chain = table?.options?.meta?.chain
      return (
        <div className="flex w-[100px] md:w-[400px] lg:w-full space-x-2">
          <Link
            href={`/${chain}/tx/${hash}`}
            className="truncate text-blue-500 hover:text-blue-600 "
          >
            {hash}
          </Link>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Value" />
    ),
    cell: ({ row, table }) => {
      const chain = table?.options?.meta?.chain
      return (
        <div className="flex w-[100px] md:w-[150px]">
          {weiToEthOrMatic(row.getValue("value"))} {getUnit(chain!)}
        </div>
      )
    },
  },
  {
    accessorKey: "timeStamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Time (UTC)" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] md:w-[250px]">
          <span>
            {timeStampToHuman(row.getValue("timeStamp"), "yyyy-MM-dd HH:mm:ss")}
          </span>
        </div>
      )
    },
  },
]
