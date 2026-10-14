// app/(dashboard)/analytics/page.tsx
import { analyticsService } from "@/src/services/analytics"
import AppHeader from "@/components/app-header"
import { MetricCard } from "@/components/metric-card"
import { StatusBadge } from "@/components/app-badge"
import { PrintButton } from "@/components/entity-actions"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { formatCurrency, formatDate } from "@/src/lib/format"

export default async function Page() {
  const [summary, chart] = await Promise.all([
    analyticsService.summary(),
    analyticsService.revenueChart(),
  ])

  return (
    <>
      <AppHeader
        title="Analytics"
        subtitle="Visão consolidada do portfólio"
        actions={
          <PrintButton label="Exportar" />
        }
      />

      <div className="flex min-h-svh flex-col gap-4 p-4">
        {/* MÉTRICAS PRINCIPAIS */}
        <div className="flex gap-4">
          <MetricCard
            label="Receita Mensal"
            value={formatCurrency(summary.revenue.total)}
            delta={`${summary.revenue.delta_pct > 0 ? "+" : ""}${summary.revenue.delta_pct}% vs. mês anterior`}
            deltaType={summary.revenue.delta_pct >= 0 ? "up" : "down"}
          />
          <MetricCard
            label="ROE médio do portfólio"
            value={`${summary.roe.average_roe}%`}
            deltaType="neutral"
          />
          <MetricCard
            label="Vacância"
            value={`${summary.vacancy.vacant_count} imóvel${summary.vacancy.vacant_count !== 1 ? "s" : ""}`}
            delta={`${summary.vacancy.vacant_pct}% do portfólio`}
            deltaType={summary.vacancy.vacant_count > 0 ? "down" : "up"}
          />
          <MetricCard
            label="Contratos a vencer"
            value={String(summary.expiring_contracts.length)}
            delta="Próx. 60 dias"
            deltaType={
              summary.expiring_contracts.length > 0 ? "down" : "neutral"
            }
          />
        </div>

        {/* GRÁFICO + ROE POR IMÓVEL */}
        <div className="flex gap-4">
          <Card className="w-3/5">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Receita por mês</CardTitle>
              <CardDescription>Últimos 12 meses</CardDescription>
            </CardHeader>
            <CardContent>
              {/* placeholder — substituir por Recharts quando integrar */}
              <div className="flex h-40 items-end gap-1">
                {chart.map((item) => {
                  const max = Math.max(...chart.map((c) => Number(c.total)))
                  const height = max > 0 ? (Number(item.total) / max) * 100 : 0
                  return (
                    <div
                      key={`${item.year}-${item.month_number}`}
                      className="flex flex-1 flex-col items-center gap-1"
                    >
                      <div
                        className="w-full rounded-t-sm bg-primary/20"
                        style={{ height: `${height}%`, minHeight: 4 }}
                      />
                      <span className="text-[10px] text-muted-foreground">
                        {item.month}
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="w-2/5">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">ROE por imóvel</CardTitle>
              <CardDescription>Portfólio completo</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  {summary.roe.properties.map((prop) => (
                    <TableRow key={prop.property_id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {prop.property_name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {prop.property_type}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {prop.roe !== null ? (
                          <span className="font-medium text-green-600">
                            {prop.roe}%
                          </span>
                        ) : (
                          <StatusBadge status="vacant" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* CONTRATOS A VENCER + INADIMPLÊNCIA */}
        <div className="flex gap-4">
          <Card className="w-1/2">
            <CardHeader>
              <CardTitle className="text-base">
                Contratos próximos ao vencimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              {summary.expiring_contracts.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhum contrato a vencer nos próximos 60 dias.
                </p>
              ) : (
                <Table>
                  <TableBody>
                    {summary.expiring_contracts.map((contract) => (
                      <TableRow key={contract.contract_id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {contract.tenant_name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {contract.property_name} · vence{" "}
                              {formatDate(contract.end_date)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <StatusBadge
                            status="expiring"
                            label={`${contract.days_remaining} dias`}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card className="w-1/2">
            <CardHeader>
              <CardTitle className="text-base">Inadimplência</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {formatCurrency(summary.default.overdue_this_month)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Em aberto este mês
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <StatusBadge
                        status={
                          summary.default.overdue_this_month_count === 0
                            ? "active"
                            : "overdue"
                        }
                        label={`${summary.default.overdue_this_month_count} ocorr.`}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {formatCurrency(summary.default.overdue_year_total)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Acumulado no ano
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <StatusBadge
                        status={
                          summary.default.overdue_year_count === 0
                            ? "active"
                            : "pending"
                        }
                        label={`${summary.default.overdue_year_count} ocorr.`}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          Taxa de inadimplência
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Últimos 12 meses
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <StatusBadge
                        status={
                          summary.default.default_rate < 5
                            ? "active"
                            : "overdue"
                        }
                        label={`${summary.default.default_rate}%`}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
