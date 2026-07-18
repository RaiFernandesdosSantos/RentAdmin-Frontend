import AppHeader from "@/components/app-header"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Store, Trash2, PenSquare, ArrowLeft, ArrowRight } from "lucide-react"
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table"


export default function Page() {
  return (
    <>
      <AppHeader 
        title="Casa Jardim Europa"
        subtitle="Rua das Flores, 120 - Residencial"
        actions={
          <>
            <Button variant="outline" size="sm">
                <Store className="h-4 w-4"/>
                Registrar venda
            </Button>

            <Link href="/properties/add">
                <Button variant="outline" size="sm">
                    <PenSquare className="h-4 w-4" />
                    Editar
                </Button>
            </Link>

            <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4" />
                Excluir
            </Button>

            <Link href="/properties">
                <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                </Button>
            </Link>
          </>
        }
      />

      <div className="min-h-svh p-4">
        <div className="h-1/4 flex gap-4 flex-1">
          <Card className="flex-1">
            <CardHeader>
              <CardDescription className="text-xl">Valor de compra</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-4xl font-bold">R$ 185.000</span>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader>
              <CardDescription className="text-xl">Valor atual est.</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-4xl font-bold">R$ 220.000</span>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader>
              <CardDescription className="text-xl">Valorização</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-4xl text-green-400">+18,9%</span>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader>
              <CardDescription className="text-xl">ROE anual</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-4xl text-green-400">8,1%</span>
            </CardContent>
          </Card>
        </div>

        <div className="h-3/4 flex-1">
          <div className="h-1/2 flex-1 flex gap-4 pt-3">
            <Card className="w-1/2">
              <CardHeader className="flex justify-between">
                <CardTitle>Dados do imóvel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                        <span className="text-muted-foreground">Tipo</span>
                        <span>Residencial</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-muted-foreground">Área</span>
                        <span>120 m2</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-muted-foreground">IPTU anual</span>
                        <span>R$ 1.200</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-muted-foreground">Matrícula</span>
                        <span>123.456</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-muted-foreground">Adquirido em</span>
                        <span>03/2019</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-muted-foreground">Status</span>
                        <div className="p-2 bg-green-700/30 w-fit rounded-4xl">
                          <span className="text-green-400">Alugado</span>
                        </div>
                    </div>
                </div>
              </CardContent>
            </Card>

            <Card className="w-1/2">
              <CardHeader className="flex justify-between">
                <CardTitle>Contrato ativo</CardTitle>
                <CardDescription className="flex gap-2">
                  Ver contrato
                  <ArrowRight className="w-4 h-4"/>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="flex flex-col text-muted-foreground">
                        Inquilino
                      </TableCell>
                      <TableCell className="text-right">
                        João Silva
                      </TableCell>
                    </TableRow>
                    
                    <TableRow>
                      <TableCell className="flex flex-col text-muted-foreground">
                        Aluguel
                      </TableCell>
                      <TableCell className="text-right">
                        R$ 1.500/mês
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="flex flex-col text-muted-foreground">
                        Vencimento
                      </TableCell>
                      <TableCell className="text-right">
                        01/03/2026
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="flex flex-col text-muted-foreground">
                        Caução
                      </TableCell>
                      <TableCell className="text-right">
                        R$ 3.000
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="flex flex-col text-muted-foreground">
                        Restante
                      </TableCell>
                      <TableCell>
                        <div className="p-2 bg-yellow-700/30 w-fit justify-self-end rounded-3xl">
                          <span className="text-yellow-400">22 dias</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="h-1/2 flex-1 flex gap-4 pt-3">
            <Card className="flex-1">
              <CardHeader className="flex justify-between">
                <CardTitle>Histórico de locações</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-muted-foreground">
                                Inquilino
                            </TableHead>
                            <TableHead className="text-muted-foreground">
                                Início
                            </TableHead>
                            <TableHead className="text-muted-foreground">
                                Fim
                            </TableHead>
                            <TableHead className="text-muted-foreground">
                                Valor
                            </TableHead>
                            <TableHead className="text-muted-foreground">
                                Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        João Silva
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                          03/2024
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        03/2025
                      </TableCell>
                      <TableCell>
                        R$ 1.500
                      </TableCell>
                      <TableCell>
                        <div className="bg-green-700/50 w-fit p-2 rounded-3xl">
                          <span className="text-green-400">
                            Ativo
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        João Silva
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        03/2024
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        03/2025
                      </TableCell>
                      <TableCell>
                        R$ 1.500
                      </TableCell>
                      <TableCell>
                        <div className="bg-green-700/50 w-fit p-2 rounded-3xl">
                          <span className="text-green-400">
                            Ativo
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        João Silva
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        03/2024
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        03/2025
                      </TableCell>
                      <TableCell>
                        R$ 1.500
                      </TableCell>
                      <TableCell>
                        <div className="bg-green-700/50 w-fit p-2 rounded-3xl">
                          <span className="text-green-400">
                            Ativo
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
