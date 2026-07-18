import AppHeader from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Card, CardHeader, CardContent, CardDescription } from "@/components/ui/card"
import { Table, TableHeader, TableHead, TableCell, TableBody, TableRow } from "@/components/ui/table"


export default function Page() {
  return (
    <>
      <AppHeader 
        title="Contas a receber"
        subtitle="Aluguéis e cobranças pendentes"
        actions={
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4" />
            Lançar cobrança
          </Button>
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
                    <div className="text-4xl font-bold">R$ 4.800,00</div>
                </CardContent>
            </Card>

            <Card className="flex-1">
                <CardHeader>
                    <CardDescription className="text-xl">Pendente</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">R$ 4.800,00</div>
                </CardContent>
            </Card>
        </div>

        <div className="flex-1 pt-4">
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
                        <TableCell>
                            João Silva
                            Casa Jardim Europa
                        </TableCell>
                        <TableCell>05/01/2025</TableCell>
                        <TableCell>R$ 1.500,00</TableCell>
                        <TableCell>Aluguel</TableCell>
                        <TableCell>Pendente</TableCell>
                        <TableCell>
                            <Button variant="outline" size="sm">Baixar</Button>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            João Silva
                            Casa Jardim Europa
                        </TableCell>
                        <TableCell>05/01/2025</TableCell>
                        <TableCell>R$ 1.500,00</TableCell>
                        <TableCell>Aluguel</TableCell>
                        <TableCell>Pendente</TableCell>
                        <TableCell>
                            <Button variant="outline" size="sm">Baixar</Button>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            João Silva
                            Casa Jardim Europa
                        </TableCell>
                        <TableCell>05/01/2025</TableCell>
                        <TableCell>R$ 1.500,00</TableCell>
                        <TableCell>Aluguel</TableCell>
                        <TableCell>Pendente</TableCell>
                        <TableCell>
                            <Button variant="outline" size="sm">Baixar</Button>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            João Silva
                            Casa Jardim Europa
                        </TableCell>
                        <TableCell>05/01/2025</TableCell>
                        <TableCell>R$ 1.500,00</TableCell>
                        <TableCell>Aluguel</TableCell>
                        <TableCell>Pendente</TableCell>
                        <TableCell>
                            <Button variant="outline" size="sm">Baixar</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
      </div>
    </>
  )
}
