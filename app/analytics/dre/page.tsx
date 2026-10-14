// app/(dashboard)/dre/page.tsx
"use client"

import { useState, useEffect } from "react"
import AppHeader from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { MetricCard } from "@/components/metric-card"
import { ReportSection } from "@/components/app-report"
import { analyticsService } from "@/src/services/analytics"
import { formatCurrency, formatPercent } from "@/src/lib/format"
import { downloadCsv } from "@/src/lib/csv"
import type { DREData } from "@/src/types/analytics"

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
  const [year, setYear] = useState(CURRENT_YEAR)
  const [month, setMonth] = useState(CURRENT_MONTH)
  const [period, setPeriod] = useState("monthly")
  const [data, setData] = useState<DREData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    analyticsService
      .dre(year, month, period)
      .then(setData)
      .finally(() => setLoading(false))
  }, [year, month, period])

  const currentMonthLabel =
    MONTHS.find((m) => m.value === String(month))?.label ?? ""
  const prevMonth = month === 1 ? 12 : month - 1
  const prevMonthLabel =
    MONTHS.find((m) => m.value === String(prevMonth))?.label ?? ""

  function handleExport() {
    if (!data) return
    const rows: (string | number)[][] = [
      ["Seção", "Código", "Conta", "Mês atual", "Mês anterior", "Acumulado no ano"],
    ]
    const sections: [string, typeof data.revenues][] = [
      ["RECEITAS", data.revenues],
      ["DESPESAS", data.expenses],
    ]
    for (const [label, groups] of sections) {
      for (const group of groups) {
        rows.push([label, group.code, group.name, group.total, group.total_prev, ""])
        for (const child of group.children) {
          rows.push([label, child.code, child.name, child.current, child.previous, child.accumulated])
        }
      }
    }
    rows.push(["", "", "RECEITA TOTAL", data.total_revenue, "", ""])
    rows.push(["", "", "DESPESA TOTAL", data.total_expenses, "", ""])
    rows.push(["", "", "RESULTADO", data.net_result, "", ""])
    rows.push(["", "", "MARGEM (%)", data.margin, "", ""])
    downloadCsv(`dre-${year}-${String(month).padStart(2, "0")}.csv`, rows)
  }

  return (
    <>
      <AppHeader
        title="DRE — Demonstração do Resultado"
        subtitle="Resultado operacional do portfólio"
        actions={
          <>
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

            <Select value={period} onValueChange={(value) => setPeriod(value ?? "monthly")}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Mensal</SelectItem>
                <SelectItem value="annual">Anual</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              disabled={!data}
              onClick={handleExport}
            >
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </>
        }
      />

      <div className="min-h-svh p-4">
        {loading ? (
          <div className="flex h-40 items-center justify-center text-muted-foreground">
            Carregando...
          </div>
        ) : (
          data && (
            <>
              {/* MÉTRICAS */}
              <div className="mb-3 flex gap-3">
                <MetricCard
                  label="Receita bruta"
                  value={formatCurrency(data.total_revenue)}
                  deltaType="up"
                />
                <MetricCard
                  label="Despesas operacionais"
                  value={formatCurrency(data.total_expenses)}
                  deltaType="down"
                />
                <MetricCard
                  label="Resultado líquido"
                  value={formatCurrency(data.net_result)}
                  deltaType={Number(data.net_result) >= 0 ? "up" : "down"}
                />
              </div>

              {/* TABELA */}
              <Card className="px-3 py-2">
                {/* cabeçalho */}
                <div className="flex border-b py-2 text-sm font-medium text-muted-foreground">
                  <div className="w-6/12">Conta</div>
                  <div className="w-2/12 text-right">
                    {currentMonthLabel}/{String(year).slice(2)}
                  </div>
                  <div className="w-2/12 text-right">
                    {prevMonthLabel}/{String(year).slice(2)}
                  </div>
                  <div className="w-2/12 text-right">Acum. ano</div>
                </div>

                {/* receitas */}
                {data.revenues.map((group) => (
                  <ReportSection
                    key={group.group_id}
                    title={`${group.code} · ${group.name}`}
                    type="revenue"
                    rows={group.children.map((child) => ({
                      account: `${child.code} · ${child.name}`,
                      current: Number(child.current),
                      previous: Number(child.previous),
                      accumulated: Number(child.accumulated),
                    }))}
                    totalLabel={`Total ${group.name}`}
                    total={{
                      current: Number(group.total),
                      previous: group.children.reduce(
                        (s, c) => s + Number(c.previous),
                        0
                      ),
                      accumulated: group.children.reduce(
                        (s, c) => s + Number(c.accumulated),
                        0
                      ),
                    }}
                  />
                ))}

                {/* despesas */}
                {data.expenses.map((group) => (
                  <ReportSection
                    key={group.group_id}
                    title={`${group.code} · ${group.name}`}
                    type="expense"
                    rows={group.children.map((child) => ({
                      account: `${child.code} · ${child.name}`,
                      current: Number(child.current),
                      previous: Number(child.previous),
                      accumulated: Number(child.accumulated),
                    }))}
                    totalLabel={`Total ${group.name}`}
                    total={{
                      current: Number(group.total),
                      previous: group.children.reduce(
                        (s, c) => s + Number(c.previous),
                        0
                      ),
                      accumulated: group.children.reduce(
                        (s, c) => s + Number(c.accumulated),
                        0
                      ),
                    }}
                  />
                ))}

                {/* resultado final */}
                <div className="mt-3 rounded-md bg-muted/40 p-3">
                  <div className="flex text-sm font-medium">
                    <div className="w-6/12">Resultado líquido</div>
                    <div
                      className={`w-2/12 text-right ${Number(data.net_result) >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {formatCurrency(data.net_result)}
                    </div>
                    <div className="w-2/12 text-right text-muted-foreground">
                      —
                    </div>
                    <div className="w-2/12 text-right text-muted-foreground">
                      —
                    </div>
                  </div>
                  <div className="mt-2 flex text-sm">
                    <div className="w-6/12 text-muted-foreground">
                      Margem operacional
                    </div>
                    <div className="w-2/12 text-right text-muted-foreground">
                      {formatPercent(data.margin)}
                    </div>
                    <div className="w-2/12 text-right text-muted-foreground">
                      —
                    </div>
                    <div className="w-2/12 text-right text-muted-foreground">
                      —
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )
        )}
      </div>
    </>
  )
}
