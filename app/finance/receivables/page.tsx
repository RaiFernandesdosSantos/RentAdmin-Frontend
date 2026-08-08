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
                value="R$ 4.800,00"
                deltaType="up"
            />

            <MetricCard 
                label="Recebido"
                value="R$ 4.800,00"
                deltaType="up"
            />

            <MetricCard 
                label="Pendente"
                value="R$ 4.800,00"
                deltaType="down"
            />
        </div>

        <div className="flex-1 pt-4">
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Inquilino/Imóvel</TableHead>
                                <TableHead>Vencimento</TableHead>
                                <TableHead>Valor</TableHead>
                                <TableHead>Plano de Contas</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="flex flex-col">
                                    <span>João Silva</span>
                                    <span className="text-muted-foreground">Casa Jardim Europa</span>
                                </TableCell>
                                <TableCell className="text-red-600">05/01/2025</TableCell>
                                <TableCell>R$ 1.500,00</TableCell>
                                <TableCell className="text-muted-foreground">Aluguel</TableCell>
                                <TableCell>
                                    <StatusBadge status="pending"/>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm">Baixar</Button>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className="flex flex-col">
                                    <span>João Silva</span>
                                    <span className="text-muted-foreground">Casa Jardim Europa</span>
                                </TableCell>
                                <TableCell className="text-muted-foreground">05/01/2025</TableCell>
                                <TableCell>R$ 1.500,00</TableCell>
                                <TableCell className="text-muted-foreground">Aluguel</TableCell>
                                <TableCell>
                                    <StatusBadge status="paid"/>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm" disabled>Baixar</Button>
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
