import AppHeader from "@/components/app-header"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SquarePen, ArrowLeft, XIcon, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table"

export default function Page() {
  return (
    <>
      <AppHeader 
        title="Contrato - Casa Jardim Europa"
        subtitle="João Silva - Ativo"
        actions={
          <>
            <Link href="/contracts/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>

            <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4"/>
                Renovar
            </Button>

            <Link href="/contracts/edit/1">
                <Button variant="outline" size="sm">
                    <SquarePen className="h-4 w-4" />
                    Editar
                </Button>
            </Link>

            <Button variant="outline" size="sm">
              <XIcon className="h-4 w-4" />
              Encerrar
            </Button>
          </>
        }
      />

      <div className="min-h-svh p-4 flex gap-5">
        <div className="w-1/2">
          <Card>
            <CardContent>
              <CardDescription>DADOS DO CONTRATO</CardDescription>
              <Separator />

              <Table className="mt-3">
                <TableBody>
                  <TableRow>
                    <TableCell>Imóvel: </TableCell>
                    <TableCell className="text-right">Casa Jardim Europa</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Inquilino: </TableCell>
                    <TableCell className="text-right">João Silva</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Fiador: </TableCell>
                    <TableCell className="text-right">Pedro Lima</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Início: </TableCell>
                    <TableCell className="text-right">01/03/2024</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Vencimento: </TableCell>
                    <TableCell className="text-right">01/03/2025</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Aluguel: </TableCell>
                    <TableCell className="text-right">R$ 1.500/mês</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Caução: </TableCell>
                    <TableCell className="text-right">R$ 3.000</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Status: </TableCell>
                    <TableCell className="flex justify-end">
                        <div className="w-fit bg-yellow-300 p-1 rounded-3xl">
                            <span className="text-yellow-600">Vence em 22 dias</span>
                        </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="w-1/2">
          <Card>
            <CardContent>
              <CardDescription>HISTÓRICO DE PAGAMENTOS</CardDescription>
              <Separator />

                <Table className="mt-3">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Mês</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Jan/25 </TableCell>
                    <TableCell>R$ 1.500</TableCell>
                    <TableCell>
                        <div className="w-fit p-1 bg-yellow-300 rounded-3xl">
                            <span className="text-yellow-600">Pendente</span>
                        </div>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Jan/25 </TableCell>
                    <TableCell>R$ 1.500</TableCell>
                    <TableCell>
                        <div className="w-fit p-1 bg-green-300 rounded-3xl">
                            <span className="text-grenn-600">Pago</span>
                        </div>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Jan/25 </TableCell>
                    <TableCell>R$ 1.500</TableCell>
                    <TableCell>
                        <div className="w-fit p-1 bg-green-300 rounded-3xl">
                            <span className="text-grenn-600">Pago</span>
                        </div>
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
