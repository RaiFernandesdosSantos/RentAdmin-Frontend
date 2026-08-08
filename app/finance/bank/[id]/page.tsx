import AppHeader from "@/components/app-header"
import { Card, CardHeader, CardContent, CardDescription } from "@/components/ui/card"
import { Table, TableHeader, TableHead, TableCell, TableBody, TableRow } from "@/components/ui/table"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SquarePen, Trash2, ArrowLeft, Download } from "lucide-react"
import { MetricCard } from "@/components/metric-card"

export default function Page() {
  return (
    <>
      <AppHeader 
        title="Nubank - .....1234"
        subtitle="Conta corrente - Saldo: R$ 8.240"
        actions={
          <>
            <Link href="/finance/">
                <Button variant="outline" size="sm">
                    <ArrowLeft className="w-4 h-4"/>
                    Voltar
                </Button>
            </Link>

            <Link href="/finance/bank/edit/1/">
                <Button variant="outline" size="sm">
                    <SquarePen className="w-4 h-4"/>
                    Editar
                </Button>
            </Link>

            <Button variant="outline" size="sm">
                <Trash2 className="w-4 h-4"/>
                Excluir
            </Button>
          </>
        }
      />

      <div className="min-h-svh p-4">
        <div className="flex flex-1 gap-3">
            <MetricCard 
                label="Saldo atual"
                value="R$ 4.800,00"
            />
            
            <MetricCard 
                label="Entradas no mês"
                value="R$ 4.800,00"
                deltaType="up"
            />

            <MetricCard 
                label="Saídas no mês"
                value="R$ 920,00"
                deltaType="down"
            />
        </div>

        <div className="flex-1 pt-4">
            <Card>
                <CardHeader className="flex justify-between">
                    <div>EXTRATO</div>
                    <div className="flex gap-3">
                        <Select>
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder="Jan/2025" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Dez/2024">Dez/2024</SelectItem>
                                <SelectItem value="Nov/2024">Nov/2024</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button variant="outline">
                            <Download className="w-4 h-4"/>
                            Exportar
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Data</TableHead>
                                <TableHead>Descrição</TableHead>
                                <TableHead>Plano de Contas</TableHead>
                                <TableHead>Valor</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <span className="text-muted-foreground">05/01</span>
                                </TableCell>
                                <TableCell>Aluguel Apto Centro</TableCell>
                                <TableCell className="text-muted-foreground">
                                    <span>Aluguel</span>
                                </TableCell>
                                <TableCell className="text-green-600">
                                    <span>+ R$ 1.500,00</span>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    <span className="text-muted-foreground">05/01</span>
                                </TableCell>
                                <TableCell>Manutencao Apto Centro</TableCell>
                                <TableCell className="text-muted-foreground">
                                    <span>Manutencao</span>
                                </TableCell>
                                <TableCell className="text-red-600">
                                    <span>- R$ 500,00</span>
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
