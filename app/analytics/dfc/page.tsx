import AppHeader from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { ReportSection } from "@/components/app-report"

export default function Page() {
  return (
    <>
      <AppHeader 
        title="DFC - Fluxo de Caixa"
        subtitle="Entradas e saídas de caixa"
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
            <Card className="flex-1">
                <CardHeader>
                    <CardDescription className="text-xl">Saldo inicial</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">R$ 7.260,00</div>
                </CardContent>
            </Card>
            
            <Card className="flex-1">
                <CardHeader>
                    <CardDescription className="text-xl">Entradas</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-green-600">R$ 4.800,00</div>
                </CardContent>
            </Card>

            <Card className="flex-1">
                <CardHeader>
                    <CardDescription className="text-xl">Saídas</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-red-600">R$ 920,00</div>
                </CardContent>
            </Card>

            <Card className="flex-1">
                <CardHeader>
                    <CardDescription className="text-xl">Saldo final</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">R$ 10.240,00</div>
                </CardContent>
            </Card>
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
                    title="Entradas operacionais"
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
                            }
                        ]
                    }
                    totalLabel="Total entradas"
                    total={
                        {current: 3300 + 1500, previous: 1500 + 3300, accumulated: 1500 + 1500 + 3300 + 3300 }
                    }
                />

                <ReportSection 
                    title="Saídas operacionais"
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
                    totalLabel="Total saídas"
                    total={
                        {current: 320 + 600, previous: 320, accumulated: 320 + 320 + 600 }
                    }
                />

                <ReportSection 
                    title="Saídas não operacionais"
                    type="non-operational"
                    rows={
                        [
                            {
                                account: "2.1.1 - Parcela empréstimo",
                                current: 900,
                                previous: 900,
                                accumulated: 900 + 900
                            }
                        ]
                    }
                    totalLabel="Total não operacional"
                    total={
                        {current: 900, previous: 900, accumulated: 900 }
                    }
                />

                <div className="bg-muted/40 p-3 mt-3 rounded-md">
                    <div className="flex">
                        <div className="w-6/12">Variação de caixa</div>
                        <div className="w-2/12 text-right text-green-600">+ R$ 2.980</div>
                        <div className="w-2/12 text-right text-green-600">+ R$ 3.580</div>
                        <div className="text-right w-2/12 text-green-600">+ R$ 2.980</div>
                    </div>

                    <div className="mt-3 flex">
                        <div className="w-6/12">Saldo final projetado</div>
                        <div className="w-2/12 text-right text-muted-foreground">R$ 10.240</div>
                        <div className="w-2/12 text-right text-muted-foreground">R$ 7.260</div>
                        <div className="text-right w-2/12 text-muted-foreground">R$ 10.240</div>
                    </div>
                </div>
            </Card>
        </div>
      </div>
    </>
  )
}
