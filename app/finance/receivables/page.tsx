import AppHeader from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Card, CardHeader, CardContent, CardDescription } from "@/components/ui/card"
import { Table, TableHeader, TableHead, TableCell, TableBody, TableRow } from "@/components/ui/table"
import Link from "next/link"


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
            <Card className="flex-1">
                <CardHeader>
                    <CardDescription className="text-xl">A receber esse mês</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">R$ 4.800,00</div>
                </CardContent>
            </Card>

            <Card className="flex-1">
                <CardHeader>
                    <CardDescription className="text-xl">Recebido</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-green-600">R$ 4.800,00</div>
                </CardContent>
            </Card>

            <Card className="flex-1">
                <CardHeader>
                    <CardDescription className="text-xl">Pendente</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-yellow-600">R$ 4.800,00</div>
                </CardContent>
            </Card>
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
                                    <div className="w-fit p-1 rounded-3xl bg-yellow-300">
                                        <span className="text-yellow-600">Pendente</span>
                                    </div>
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
                                    <div className="w-fit p-1 rounded-3xl bg-green-300">
                                        <span className="text-green-600">Pago</span>
                                    </div>
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
