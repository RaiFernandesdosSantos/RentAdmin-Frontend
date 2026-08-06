import AppHeader from "@/components/app-header"
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

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

                <div className="bg-gray-900 p-3">
                    <span className="text-green-600">Entradas operacionais</span>
                    <Table className="mt-3">
                        <TableBody>
                            <TableRow>
                                <TableCell className="w-6/12">3.1.1 - Aluguel residencial</TableCell>
                                <TableCell className="w-2/12 text-right">R$ 3.300</TableCell>
                                <TableCell className="w-2/12 text-right">R$ 3.300</TableCell>
                                <TableCell className="w-2/12 text-right">R$ 3.300</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className="w-6/12">3.1.2 - Aluguel comercial</TableCell>
                                <TableCell className="w-2/12 text-right">R$ 1.500</TableCell>
                                <TableCell className="w-2/12 text-right">R$ 1.500</TableCell>
                                <TableCell className="w-2/12 text-right">R$ 1.500</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Separator className="mt-3"/>
                    <div className="mt-3 flex">
                        <div className="w-6/12">Total entradas</div>
                        <div className="w-2/12 text-right text-green-600">R$ 4.800</div>
                        <div className="w-2/12 text-right text-green-600">R$ 4.800</div>
                        <div className="text-right w-2/12 text-green-600">R$ 4.800</div>
                    </div>
                </div>

                <div className="mt-3 bg-gray-900 p-3">
                    <span className="text-red-600">Saídas operacionais</span>
                    <Table className="mt-3">
                        <TableBody>
                            <TableRow>
                                <TableCell className="w-6/12">4.1.1 - IPTU</TableCell>
                                <TableCell className="w-2/12 text-right">R$ 320</TableCell>
                                <TableCell className="w-2/12 text-right">R$ 320</TableCell>
                                <TableCell className="w-2/12 text-right">R$ 320</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className="w-6/12">4.2.1 - Manutenção</TableCell>
                                <TableCell className="w-2/12 text-right">R$ 600</TableCell>
                                <TableCell className="w-2/12 text-right">-</TableCell>
                                <TableCell className="w-2/12 text-right">R$ 600</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Separator className="mt-3"/>
                    <div className="mt-3 flex">
                        <div className="w-6/12">Total saídas operacionais</div>
                        <div className="w-2/12 text-right text-red-600">R$ 920</div>
                        <div className="w-2/12 text-right text-red-600">R$ 320</div>
                        <div className="text-right w-2/12 text-red-600">R$ 920</div>
                    </div>
                </div>

                <div className="mt-3 bg-gray-900 p-3 border-l-4 border-blue-300">
                    <span className="text-blue-600">Saídas não operacionais <Badge className="bg-blue-50 text-blue-600 rounded-full">Apenas DFC</Badge></span>
                    <Table className="mt-3">
                        <TableBody>
                            <TableRow>
                                <TableCell className="w-6/12">2.1.1 - Parcela empréstimo</TableCell>
                                <TableCell className="w-2/12 text-right">R$ 900</TableCell>
                                <TableCell className="w-2/12 text-right">R$ 900</TableCell>
                                <TableCell className="w-2/12 text-right">R$ 900</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Separator className="mt-3"/>
                    <div className="mt-3 flex">
                        <div className="w-6/12">Total não operacionais</div>
                        <div className="w-2/12 text-right text-red-600">R$ 900</div>
                        <div className="w-2/12 text-right text-red-600">R$ 900</div>
                        <div className="text-right w-2/12 text-red-600">R$ 900</div>
                    </div>
                </div>

                <div className="mt-3 bg-gray-900 p-3">
                    <div className="mt-3 flex">
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
