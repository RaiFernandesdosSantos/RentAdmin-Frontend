import AppHeader from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { MetricCard } from "@/components/metric-card"
import { ReportSection } from "@/components/app-report"

export default function Page() {
  return (
    <>
      <AppHeader 
        title="DRE - Demonstração do Resultado"
        subtitle="Resultado operacional do portfólio"
        actions={
            <>
                <Select>
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder="Jan/2026" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2025">Dez/2025</SelectItem>
                        <SelectItem value="2024">Nov/2025</SelectItem>
                    </SelectContent>
                </Select>

                <Select>
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder="Mensal" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2025">Trimenstral</SelectItem>
                        <SelectItem value="2024">Anual</SelectItem>
                    </SelectContent>
                </Select>

                <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                    Exportar
                </Button>
            </>
        }
      />

      <div className="min-h-svh p-4">
        <div className="flex flex-1 gap-3">
            <MetricCard 
                label="Receita bruta"
                value="R$ 4.800,00"
                deltaType="up"
            />

            <MetricCard 
                label="Despesas operacionais"
                value="R$ 920,00"
                deltaType="down"
            />

            <MetricCard 
                label="Resultado líquido"
                value="R$ 3.880,00"
            />
        </div>

        <div className="flex-1 mt-3">
            <Card className="px-3">
                <div className="flex">
                    <div className="w-6/12">Conta</div>
                    <div className="w-2/12 text-right">Jan/25</div>
                    <div className="w-2/12 text-right">Dez/24</div>
                    <div className="text-right w-2/12">Acum. ano</div>
                </div>

                <ReportSection 
                    title="3 - Receitas"
                    type="revenue"
                    rows={
                        [
                            {
                                account: "3.1.1 - Aluguel residencial",
                                current: 3300,
                                previous: 3300,
                                accumulated: 3300 + 3300
                            },
                            {
                                account: "3.1.2 - Aluguel comercial",
                                current: 1500,
                                previous: 1500,
                                accumulated: 1500 + 1500
                            },
                            {
                                account: "3.2.1 - Multas e juros",
                                current: 0,
                                previous: 150,
                                accumulated: 150
                            }
                        ]
                    }
                    totalLabel="Total receitas"
                    total={
                        {current: 3300 + 1500, previous: 1500 + 3300 + 150, accumulated: 1500 + 1500 + 3300 + 3300 + 150 }
                    }
                />

                <ReportSection 
                    title="4 - Despesas operacionais"
                    type="expense"
                    rows={
                        [
                            {
                                account: "4.1.1 - IPTU",
                                current: 320,
                                previous: 320,
                                accumulated: 320 + 320
                            },
                            {
                                account: "4.2.1 - Manutenção",
                                current: 600,
                                previous: 0,
                                accumulated: 600
                            }
                        ]
                    }
                    totalLabel="Total despesas"
                    total={
                        {current: 320 + 600, previous: 320, accumulated: 320 + 320 + 600 }
                    }
                />

                <div className="bg-muted/40 p-3 mt-3 rounded-md">
                    <div className="flex">
                        <div className="w-6/12">Resultado líquido</div>
                        <div className="w-2/12 text-right text-green-600">R$ 3.880</div>
                        <div className="w-2/12 text-right text-green-600">R$ 4.630</div>
                        <div className="text-right w-2/12 text-green-600">R$ 4.030</div>
                    </div>

                    <div className="mt-3 flex">
                        <div className="w-6/12">Margem operacional</div>
                        <div className="w-2/12 text-right text-muted-foreground">80,8%</div>
                        <div className="w-2/12 text-right text-muted-foreground">93,5%</div>
                        <div className="text-right w-2/12 text-muted-foreground">81,4%</div>
                    </div>
                </div>
            </Card>
        </div>
      </div>
    </>
  )
}
