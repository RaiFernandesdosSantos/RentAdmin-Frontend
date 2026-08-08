import AppHeader from "@/components/app-header"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Store, Trash2, PenSquare, ArrowLeft, ArrowRight } from "lucide-react"
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table"
import { MetricCard } from "@/components/metric-card"
import { StatusBadge } from "@/components/app-badge"
import { Badge } from "@/components/ui/badge"


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
          <MetricCard 
            label="Valor de compra"
            value="R$ 185.000"
          />

          <MetricCard 
            label="Valor atual est."
            value="R$ 220.000"
          />

          <MetricCard 
            label="Valorização"
            value="+ 18,90%"
            deltaType="up"
          />

          <MetricCard 
            label="ROE anual"
            value="8,10%"
            deltaType="up"
          />
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
                        <StatusBadge status="rented"/>
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
                      <TableCell className="text-muted-foreground">
                        Restante
                      </TableCell>
                      <TableCell className="flex justify-end">
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 rounded-full">22 dias</Badge>
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
                        <StatusBadge status="active"/>
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
                        <StatusBadge status="active"/>
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
                        <StatusBadge status="active"/>
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
