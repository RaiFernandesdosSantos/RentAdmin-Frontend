import AppHeader from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { MetricCard } from "@/components/metric-card"
import { StatusBadge } from "@/components/app-badge"
import {
  PayTransactionButton,
  SendChargeEmailButton,
} from "@/components/transaction-actions"
import { TransactionsService, CollectionsService } from "@/src/services/finance"
import { formatCurrency, formatDate } from "@/src/lib/format"
import type { Transactions } from "@/src/types/finance"

export default async function Page() {
  const [charges, overdue] = await Promise.all([
    TransactionsService.list({ account_type: "ENTRIES" }),
    CollectionsService.listOverdue().catch(() => null),
  ])

  const now = new Date()
  const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`

  const monthCharges = charges.filter(
    (c: Transactions) => c.competence_date?.slice(0, 7) === monthKey,
  )
  const overdueCharges = charges.filter(
    (c: Transactions) => c.status === "OVERDUE",
  )
  const paidThisMonth = monthCharges.filter(
    (c: Transactions) => c.status === "PAID",
  )
  const toReceiveThisMonth = monthCharges.filter(
    (c: Transactions) => c.status === "PENDING" || c.status === "OVERDUE",
  )

  const sum = (list: Transactions[]) =>
    list.reduce((acc, c) => acc + Number(c.amount), 0)

  return (
    <>
      <AppHeader
        title="Contas a receber"
        subtitle="Aluguéis e cobranças pendentes"
        actions={
          <Link href="/finance/receivables/add/">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4" />
              Lançar cobrança
            </Button>
          </Link>
        }
      />

      <div className="min-h-svh p-4">
        <div className="flex flex-1 gap-3">
          <MetricCard
            label="A receber esse mês"
            value={formatCurrency(sum(toReceiveThisMonth))}
            deltaType="up"
          />
          <MetricCard
            label="Recebido no mês"
            value={formatCurrency(sum(paidThisMonth))}
            deltaType="up"
          />
          <MetricCard
            label="Em atraso"
            value={
              overdue
                ? `${formatCurrency(overdue.total_amount)} (${overdue.count})`
                : formatCurrency(sum(overdueCharges))
            }
            deltaType="down"
          />
        </div>

        <div className="flex-1 pt-4">
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Imóvel / Inquilino</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Plano de Contas</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {charges.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-muted-foreground">
                        Nenhuma cobrança lançada. Crie um contrato (as
                        cobranças são geradas automaticamente) ou lance uma
                        cobrança manual.
                      </TableCell>
                    </TableRow>
                  )}
                  {charges.map((charge: Transactions) => (
                    <TableRow key={charge.id}>
                      <TableCell>
                        <span>{charge.description}</span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <span className="flex flex-col">
                          <span>{charge.property?.description ?? "—"}</span>
                          <span>{charge.contract?.tenant?.name ?? ""}</span>
                        </span>
                      </TableCell>
                      <TableCell
                        className={
                          charge.status === "OVERDUE" ? "text-red-600" : ""
                        }
                      >
                        {formatDate(charge.due_date)}
                      </TableCell>
                      <TableCell>{formatCurrency(charge.amount)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {charge.account
                          ? `${charge.account.code} · ${charge.account.name}`
                          : "—"}
                      </TableCell>
                      <TableCell>
                        <StatusBadge
                          status={
                            charge.status === "PENDING"
                              ? "pending"
                              : charge.status === "PAID"
                                ? "paid"
                                : charge.status === "OVERDUE"
                                  ? "overdue"
                                  : "cancelled"
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <PayTransactionButton
                            transactionId={charge.id}
                            disabled={charge.status === "PAID"}
                          />
                          {charge.contract &&
                            (charge.status === "OVERDUE" ||
                              charge.status === "PENDING") && (
                              <SendChargeEmailButton transactionId={charge.id} />
                            )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
