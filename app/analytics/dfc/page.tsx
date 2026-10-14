// app/(dashboard)/dfc/page.tsx
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { ReportSection } from "@/components/app-report"
import { analyticsService } from "@/src/services/analytics"
import { formatCurrency } from "@/src/lib/format"
import { downloadCsv } from "@/src/lib/csv"
import type { DFCData } from "@/src/types/analytics"

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
  const [data, setData] = useState<DFCData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    analyticsService
      .dfc(year, month, period)
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
    const sections: [string, typeof data.inflows][] = [
      ["ENTRADAS OPERACIONAIS", data.inflows],
      ["SAÍDAS OPERACIONAIS", data.outflows],
      ["SAÍDAS NÃO OPERACIONAIS", data.non_operational],
    ]
    for (const [label, groups] of sections) {
      for (const group of groups) {
        rows.push([label, group.code, group.name, group.total, "", ""])
        for (const child of group.children) {
          rows.push([label, child.code, child.name, child.current, child.previous, child.accumulated])
        }
      }
    }
    rows.push(["", "", "SALDO INICIAL", data.initial_balance, "", ""])
    rows.push(["", "", "TOTAL DE ENTRADAS", data.total_inflows, "", ""])
    rows.push(["", "", "TOTAL DE SAÍDAS", data.total_outflows, "", ""])
    rows.push(["", "", "NÃO OPERACIONAIS", data.total_non_op, "", ""])
    rows.push(["", "", "VARIAÇÃO DE CAIXA", data.cash_variation, "", ""])
    rows.push(["", "", "SALDO FINAL", data.final_balance, "", ""])
    downloadCsv(`dfc-${year}-${String(month).padStart(2, "0")}.csv`, rows)
  }

  return (
    <>
      <AppHeader
        title="DFC — Fluxo de Caixa"
        subtitle="Entradas e saídas de caixa"
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
                <Card className="flex-1">
                  <CardHeader>
                    <CardDescription className="text-xl">
                      Saldo inicial
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">
                      {formatCurrency(data.initial_balance)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex-1">
                  <CardHeader>
                    <CardDescription className="text-xl">
                      Entradas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-green-600">
                      {formatCurrency(data.total_inflows)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex-1">
                  <CardHeader>
                    <CardDescription className="text-xl">
                      Saídas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-red-600">
                      {formatCurrency(
                        String(
                          Number(data.total_outflows) +
                            Number(data.total_non_op)
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex-1">
                  <CardHeader>
                    <CardDescription className="text-xl">
                      Saldo final
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`text-4xl font-bold ${Number(data.final_balance) >= 0 ? "" : "text-red-600"}`}
                    >
                      {formatCurrency(data.final_balance)}
                    </div>
                  </CardContent>
                </Card>
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

                {/* entradas operacionais */}
                {data.inflows.map((group) => (
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

                {/* saídas operacionais */}
                {data.outflows.map((group) => (
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

                {/* saídas não-operacionais */}
                {data.non_operational.length > 0 &&
                  data.non_operational.map((group) => (
                    <ReportSection
                      key={group.group_id}
                      title={`${group.code} · ${group.name}`}
                      type="non-operational"
                      rows={group.children.map((child) => ({
                        account: `${child.code} · ${child.name}`,
                        current: Number(child.current),
                        previous: Number(child.previous),
                        accumulated: Number(child.accumulated),
                      }))}
                      totalLabel="Total não-operacional"
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
                    <div className="w-6/12">Variação de caixa</div>
                    <div
                      className={`w-2/12 text-right ${Number(data.cash_variation) >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {Number(data.cash_variation) >= 0 ? "+" : ""}
                      {formatCurrency(data.cash_variation)}
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
                      Saldo final projetado
                    </div>
                    <div className="w-2/12 text-right text-muted-foreground">
                      {formatCurrency(data.final_balance)}
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
