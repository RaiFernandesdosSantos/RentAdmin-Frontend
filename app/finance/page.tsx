// app/(dashboard)/finance/bank/page.tsx
import AppHeader from "@/components/app-header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MetricCard } from "@/components/metric-card"
import { BankAccountService } from "@/src/services/finance"
import { formatCurrency, formatDate } from "@/src/lib/format"
import type { BankAccount } from "@/src/types/finance"

export default async function Page() {
  const accounts = await BankAccountService.list()

  const activeAccounts = accounts.filter((a) => a.is_active)

  // saldo consolidado — soma dos saldos atuais de todas as contas ativas
  const totalBalance = activeAccounts.reduce(
    (sum, a) => sum + Number(a.current_balance),
    0
  )

  // última movimentação — a mais recente entre todas as contas
  const lastMovement = accounts
    .map((a) => a.last_movement)
    .filter(Boolean)
    .sort()
    .at(-1)

  const today = new Date().toISOString().split("T")[0]
  const lastMovementLabel =
    lastMovement === today
      ? "Hoje"
      : lastMovement
        ? formatDate(lastMovement)
        : "—"

  return (
    <>
      <AppHeader
        title="Contas bancárias"
        subtitle="Gestão de contas e extratos"
        actions={
          <Link href="/finance/bank/add/">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4" />
              Nova conta
            </Button>
          </Link>
        }
      />

      <div className="min-h-svh p-4">
        {/* MÉTRICAS */}
        <div className="mb-4 flex gap-3">
          <MetricCard
            label="Saldo total consolidado"
            value={formatCurrency(String(totalBalance))}
          />
          <MetricCard
            label="Contas ativas"
            value={String(activeAccounts.length)}
          />
          <MetricCard label="Última movimentação" value={lastMovementLabel} />
        </div>

        {/* LISTA DE CONTAS */}
        {accounts.length === 0 ? (
          <div className="flex h-40 flex-col items-center justify-center gap-2 text-muted-foreground">
            <p>Nenhuma conta bancária cadastrada.</p>
            <Link href="/finance/bank/add/">
              <Button size="sm">Adicionar conta</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {accounts.map((account: BankAccount) => (
              <Link key={account.id} href={`/finance/bank/${account.id}/`}>
                <Card className="h-full transition-colors hover:border-border/60">
                  <CardHeader className="flex flex-row items-start justify-between">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold">
                        {account.bank_name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Conta corrente · ····{account.account_number.slice(-4)}
                      </span>
                    </div>
                    <Badge
                      className={
                        account.is_active
                          ? "rounded-full bg-green-50 text-green-700"
                          : "rounded-full bg-gray-100 text-gray-500"
                      }
                    >
                      {account.is_active ? "Ativa" : "Inativa"}
                    </Badge>
                  </CardHeader>

                  <CardContent>
                    <div className="mb-3 flex justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">
                          Saldo atual
                        </span>
                        <span className="text-2xl font-bold">
                          {formatCurrency(account.current_balance)}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-muted-foreground">
                          Últ. movimentação
                        </span>
                        <span className="text-sm">
                          {account.last_movement
                            ? account.last_movement === today
                              ? "Hoje"
                              : formatDate(account.last_movement)
                            : "—"}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="mt-3 flex justify-around">
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-muted-foreground">
                          Entradas/mês
                        </span>
                        <span className="text-sm font-medium text-green-600">
                          + {formatCurrency(account.monthly_inflows)}
                        </span>
                      </div>

                      <Separator orientation="vertical" className="h-8" />

                      <div className="flex flex-col items-center">
                        <span className="text-xs text-muted-foreground">
                          Saídas/mês
                        </span>
                        <span className="text-sm font-medium text-red-600">
                          - {formatCurrency(account.monthly_outflows)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
