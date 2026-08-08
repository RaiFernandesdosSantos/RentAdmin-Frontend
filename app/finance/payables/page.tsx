import AppHeader from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableHead, TableCell, TableBody, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { MetricCard } from "@/components/metric-card"
import { StatusBadge } from "@/components/app-badge"


export default function Page() {
  return (
    <>
      <AppHeader 
        title="Contas a pagar"
        subtitle="Despesas e obrigações dos imóveis"
        actions={
            <Link href="/finance/payables/add/">
                <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                    Lançar despesa
                </Button>
            </Link>
        }
      />

      <div className="min-h-svh p-4">
        <div className="flex flex-1 gap-3">
            <MetricCard 
                label="A pagar esse mês"
                value="R$ 1.240,00"
                deltaType="down"
            />

            <MetricCard 
                label="Pago"
                value="R$ 920,00"
                deltaType="down"
            />

            <MetricCard 
                label="Pendente"
                value="R$ 320,00"
            />
        </div>

        <div className="flex-1 pt-4">
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Descrição/Imóvel</TableHead>
                                <TableHead>Vencimento</TableHead>
                                <TableHead>Valor</TableHead>
                                <TableHead>Plano de Contas</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="flex flex-col">
                                    <span>IPTU</span>
                                    <span className="text-muted-foreground">Casa Jardim Europa</span>
                                </TableCell>
                                <TableCell className="text-red-600">10/01/2025</TableCell>
                                <TableCell>R$ 320,00</TableCell>
                                <TableCell className="text-muted-foreground">IPTU</TableCell>
                                <TableCell>
                                    <StatusBadge status="pending"/>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm">Baixar</Button>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className="flex flex-col">
                                    <span>IPTU</span>
                                    <span className="text-muted-foreground">Casa Jardim Europa</span>
                                </TableCell>
                                <TableCell className="text-red-600">10/01/2025</TableCell>
                                <TableCell>R$ 320,00</TableCell>
                                <TableCell className="text-muted-foreground">IPTU</TableCell>
                                <TableCell>
                                    <StatusBadge status="paid"/>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm">Baixar</Button>
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
