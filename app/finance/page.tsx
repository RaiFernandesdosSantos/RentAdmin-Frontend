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
                    <div className="text-4xl font-bold">R$ 4.800,00</div>
                </CardContent>
            </Card>

            <Card className="flex-1">
                <CardHeader>
                    <CardDescription className="text-xl">Saídas no mês</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">R$ 920,00</div>
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
                            05/01
                        </TableCell>
                        <TableCell>Aluguel Apto Centro</TableCell>
                        <TableCell>Aluguel</TableCell>
                        <TableCell>+ R$ 1.500,00</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            05/01
                        </TableCell>
                        <TableCell>Aluguel Apto Centro</TableCell>
                        <TableCell>Aluguel</TableCell>
                        <TableCell>+ R$ 1.500,00</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>05/01</TableCell>
                        <TableCell>Aluguel Apto Centro</TableCell>
                        <TableCell>Aluguel</TableCell>
                        <TableCell>+ R$ 1.500,00</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            05/01
                        </TableCell>
                        <TableCell>Aluguel Apto Centro</TableCell>
                        <TableCell>Aluguel</TableCell>
                        <TableCell>+ R$ 1.500,00</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            05/01
                        </TableCell>
                        <TableCell>Aluguel Apto Centro</TableCell>
                        <TableCell>Aluguel</TableCell>
                        <TableCell>+ R$ 1.500,00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
      </div>
    </>
  )
}
