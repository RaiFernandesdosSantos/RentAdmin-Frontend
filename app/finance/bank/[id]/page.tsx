"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import AppHeader from "@/components/app-header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, SquarePen } from "lucide-react"
import Link from "next/link"
import { MetricCard } from "@/components/metric-card"
import {
  BankAccountService,
  BankAccountEntriesService,
} from "@/src/services/finance"
import { DeleteBankAccountButton } from "@/components/entity-actions"
import { formatCurrency, formatDate } from "@/src/lib/format"
import { downloadCsv } from "@/src/lib/csv"
import type { BankAccount, BankAccountEntries } from "@/src/types/finance"

const MONTHS = [
  { value: "1", label: "Jan" },
  { value: "2", label: "Fev" },
  { value: "3", label: "Mar" },
  { value: "4", label: "Abr" },
  { value: "5", label: "Mai" },
  { value: "6", label: "Jun" },
  { value: "7", label: "Jul" },
  { value: "8", label: "Ago" },
  { value: "9", label: "Set" },
  { value: "10", label: "Out" },
  { value: "11", label: "Nov" },
  { value: "12", label: "Dez" },
]

const CURRENT_YEAR = new Date().getFullYear()
const CURRENT_MONTH = new Date().getMonth() + 1

export default function Page() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)

  const [account, setAccount] = useState<BankAccount | null>(null)
  const [entries, setEntries] = useState<BankAccountEntries[]>([])
  const [year, setYear] = useState(CURRENT_YEAR)
  const [month, setMonth] = useState(CURRENT_MONTH)
  const [loading, setLoading] = useState(true)

  // busca dados da conta uma vez só
  useEffect(() => {
    BankAccountService.get(id).then(setAccount)
  }, [id])

  // rebusca extrato quando mês/ano muda
  useEffect(() => {
    setLoading(true)
    BankAccountEntriesService.list(id, year, month)
      .then(setEntries)
      .finally(() => setLoading(false))
  }, [id, year, month])

  const monthLabel = MONTHS.find((m) => m.value === String(month))?.label ?? ""

  return (
    <>
      <AppHeader
        title={
          account
            ? `${account.bank_name} · ····${account.account_number.slice(-4)}`
            : "Carregando..."
        }
        subtitle={
          account
            ? `Conta corrente · Saldo: ${formatCurrency(account.current_balance)}`
            : ""
        }
        actions={
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <Link href={`/finance/bank/edit/${id}/`}>
              <Button variant="outline" size="sm">
                <SquarePen className="h-4 w-4" />
                Editar
              </Button>
            </Link>
            <DeleteBankAccountButton bankAccountId={id} />
          </>
        }
      />

      <div className="min-h-svh p-4">
        {/* MÉTRICAS */}
        <div className="mb-4 flex gap-3">
          <MetricCard
            label="Saldo atual"
            value={formatCurrency(account?.current_balance)}
          />
          <MetricCard
            label="Entradas no mês"
            value={formatCurrency(account?.monthly_inflows)}
            deltaType="up"
          />
          <MetricCard
            label="Saídas no mês"
            value={formatCurrency(account?.monthly_outflows)}
            deltaType="down"
          />
        </div>

        {/* EXTRATO */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <span className="text-sm font-medium">EXTRATO</span>
            <div className="flex gap-2">
              <Select
                value={String(month)}
                onValueChange={(v) => setMonth(Number(v))}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={String(year)}
                onValueChange={(v) => setYear(Number(v))}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={String(CURRENT_YEAR)}>
                    {CURRENT_YEAR}
                  </SelectItem>
                  <SelectItem value={String(CURRENT_YEAR - 1)}>
                    {CURRENT_YEAR - 1}
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                disabled={entries.length === 0}
                onClick={() => {
                  const rows: (string | number)[][] = [
                    ["Data", "Descrição", "Plano de Contas", "Tipo", "Saldo antes", "Saldo depois"],
                  ]
                  for (const entry of entries) {
                    rows.push([
                      formatDate(entry.entry_date),
                      entry.description,
                      entry.chart_account,
                      entry.entry_type === "CREDIT" ? "Entrada" : "Saída",
                      entry.balance_before,
                      entry.balance_after,
                    ])
                  }
                  downloadCsv(`extrato-${id}-${year}-${String(month).padStart(2, "0")}.csv`, rows)
                }}
              >
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8 text-sm text-muted-foreground">
                Carregando extrato...
              </div>
            ) : entries.length === 0 ? (
              <div className="flex justify-center py-8 text-sm text-muted-foreground">
                Nenhuma movimentação em {monthLabel}/{year}.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Plano de contas</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-right">Saldo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(entry.entry_date)}
                      </TableCell>
                      <TableCell className="text-sm">
                        {entry.description}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {entry.chart_account}
                      </TableCell>
                      <TableCell className="text-right text-sm font-medium">
                        <span
                          className={
                            entry.entry_type === "CREDIT"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {entry.entry_type === "CREDIT" ? "+" : "-"}{" "}
                          {formatCurrency(
                            String(
                              Math.abs(
                                Number(entry.balance_after) -
                                  Number(entry.balance_before)
                              )
                            )
                          )}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {formatCurrency(entry.balance_after)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
