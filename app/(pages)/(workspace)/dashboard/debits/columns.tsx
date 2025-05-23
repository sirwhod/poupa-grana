"use client"

import { DataTableColumnHeader } from "@/app/components/table/column-header"
import { Debit } from "@/app/types/financial"
import { ColumnDef } from "@tanstack/react-table"
import { Banknote, CreditCard, Landmark } from "lucide-react"
import { format } from 'date-fns'
import Image from "next/image"

export const columns: ColumnDef<Debit>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Descrição" />
      )
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Valor" />
      )
    },
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("value"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "bankName",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Banco" />
      )
    },
    cell: ({ row }) => {
      const bankName = row.original.bankName
      const bankImageUrl = row.original.bankImageUrl
      const type = row.original.type
 
      return (
        <div className="w-full flex flex-row gap-4 items-center">
          {/* Image */}
          {bankImageUrl ? (
            <Image src={bankImageUrl} alt="" width={36} height={36} className="h-10 w-10 rounded-sm" />
          ) : (
            <div className="bg-primary p-2 rounded-sm">
              <Landmark className="h-6 w-6 text-foreground" />
            </div>
          )}
          <div className="flex flex-col gap-0 items-start justify-self-start">
            <strong>{bankName}</strong>
            <span>{type}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Método de Pagamento" />
      )
    },
    cell: ({ row }) => {
      const paymentMethod = row.original.paymentMethod
 
      switch (paymentMethod) {
        case "Conta":
          return (
            <div className="flex flex-row gap-2 items-center">
              <Landmark className="w-4 h-4"/>
              <strong>{paymentMethod}</strong>
            </div>
          )
        case "Crédito":
          return (
            <div className="flex flex-row gap-2 items-center">
              <CreditCard className="w-4 h-4"/>
              <strong>{paymentMethod}</strong>
            </div>
          )
        case "Débito":
          return (
            <div className="flex flex-row gap-2 items-center">
              <Banknote className="w-4 h-4"/>
              <strong>{paymentMethod}</strong>
            </div>
          )
        case "Pix":
          return (
            <div className="flex flex-row gap-2 items-center">
              <svg fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="mb-3 w-4 h-4">
                <path d="M11.917 11.71a2.046 2.046 0 0 1-1.454-.602l-2.1-2.1a.4.4 0 0 0-.551 0l-2.108 2.108a2.044 2.044 0 0 1-1.454.602h-.414l2.66 2.66c.83.83 2.177.83 3.007 0l2.667-2.668h-.253zM4.25 4.282c.55 0 1.066.214 1.454.602l2.108 2.108a.39.39 0 0 0 .552 0l2.1-2.1a2.044 2.044 0 0 1 1.453-.602h.253L9.503 1.623a2.127 2.127 0 0 0-3.007 0l-2.66 2.66h.414z"/>
                <path d="m14.377 6.496-1.612-1.612a.307.307 0 0 1-.114.023h-.733c-.379 0-.75.154-1.017.422l-2.1 2.1a1.005 1.005 0 0 1-1.425 0L5.268 5.32a1.448 1.448 0 0 0-1.018-.422h-.9a.306.306 0 0 1-.109-.021L1.623 6.496c-.83.83-.83 2.177 0 3.008l1.618 1.618a.305.305 0 0 1 .108-.022h.901c.38 0 .75-.153 1.018-.421L7.375 8.57a1.034 1.034 0 0 1 1.426 0l2.1 2.1c.267.268.638.421 1.017.421h.733c.04 0 .079.01.114.024l1.612-1.612c.83-.83.83-2.178 0-3.008z"/>
              </svg>
              <strong>{paymentMethod}</strong>
            </div>
          )
        // ... more cases
        default:
         // Code to execute if no case matches
      }
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Data" />
      )
    },
    cell: ({ row }) => {
      const date = parseFloat(row.getValue("date"))
      const objectDate = new Date(date)
 
      return format(objectDate, 'dd/MM/yyyy')
    },
  },
]
