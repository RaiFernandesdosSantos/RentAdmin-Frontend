import AppHeader from "@/components/app-header"
import { Card, CardHeader, CardContent, CardDescription } from "@/components/ui/card"
import { Table, TableHeader, TableHead, TableCell, TableBody, TableRow } from "@/components/ui/table"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"


export default function Page() {
  return (
    <>
      <AppHeader 
        title="Extrato Bancário"
        subtitle="Movimentações por conta bancária"
        actions={
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">Conta Nubank ..... 1234</SelectItem>
              <SelectItem value="2024">Conta Itaú ..... 4567</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      <div className="min-h-svh p-4">
        <div className="flex flex-1 gap-3">
            <Card className="flex-1">
                <CardHeader>
                    <CardDescription className="text-xl">Saldo atual</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">R$ 4.800,00</div>
                </CardContent>
            </Card>

            <Card className="flex-1">
                <CardHeader>
                    <CardDescription className="text-xl">Entradas no mês</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-green-600">R$ 4.800,00</div>
                </CardContent>
            </Card>

            <Card className="flex-1">
                <CardHeader>
                    <CardDescription className="text-xl">Saídas no mês</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-red-600">R$ 920,00</div>
                </CardContent>
            </Card>
        </div>

        <div className="flex-1 pt-4">
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
        </div>
      </div>
    </>
  )
}
