import { cn } from "@/lib/utils"

type Status =
  | "active"
  | "inactive"
  | "pending"
  | "paid"
  | "overdue"
  | "expiring"
  | "vacant"
  | "rented"
  | "tenant"
  | "guarantor"
  | "sold"
  | "cancelled"

interface StatusBadgeProps {
  status: Status
  label?: string
  className?: string
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  active:    { label: "Ativo",         className: "bg-green-700/30 text-green-400" },
  inactive:  { label: "Inativo",       className: "bg-gray-700/30 text-gray-400" },
  pending:   { label: "Pendente",      className: "bg-yellow-700/30 text-yellow-400" },
  paid:      { label: "Pago",          className: "bg-green-700/30 text-green-400" },
  overdue:   { label: "Em atraso",     className: "bg-red-700/30 text-red-400" },
  expiring:  { label: "A vencer",      className: "bg-orange-700/30 text-orange-400" },
  vacant:    { label: "Vago",          className: "bg-gray-700/30 text-gray-400" },
  rented:    { label: "Alugado",       className: "bg-green-700/30 text-green-400" },
  tenant:    { label: "Locatário",     className: "bg-blue-700/30 text-blue-400" },
  guarantor: { label: "Fiador",        className: "bg-purple-700/30 text-purple-400" },
  sold:      { label: "Vendido",       className: "bg-gray-700/30 text-gray-400" },
  cancelled: { label: "Cancelado",     className: "bg-red-700/30 text-red-400" },
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <div className={cn("w-fit px-2 py-1 rounded-full text-sm font-medium", config.className, className)}>
      {label ?? config.label}
    </div>
  )
}