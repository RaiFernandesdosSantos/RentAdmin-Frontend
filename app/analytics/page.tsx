import AppHeader from "@/components/app-header"
import {Card, CardHeader, CardContent, CardDescription, CardTitle} from "@/components/ui/card"
import {Table, TableBody, TableRow, TableCell} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {Download} from "lucide-react"
import { MetricCard } from "@/components/metric-card"
import { Badge } from "@/components/ui/badge"

export default function Page() {
  return (
    <>
      <AppHeader 
        title="Analytics"
        subtitle="Visão consolidade do portfólio"
        actions={
          <>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
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
        <div className="h-1/4 flex gap-4 flex-1">
          <MetricCard 
            label="Receita Mensal"
            value="R$ 12.345,00"
            delta="+5,2 vs. mês anterior"
            deltaType="up"
          />

          <MetricCard 
            label="ROE médio do portfólio"
            value="7,40%"
            delta="+ 0,3pp"
            deltaType="up"
          />

          <MetricCard 
            label="Vacância"
            value="1 imóvel"
            delta="16,60% do porfólio"
            deltaType="down"
          />

          <MetricCard 
            label="Contrato a vencer"
            value="2"
            delta="Próx. 60 dias"
            deltaType="neutral"
          />
        </div>
        
        <div className="h-3/4 flex-1">
          <div className="h-1/2 flex-1 flex gap-4 pt-3">
            <Card className="w-3/5">
              <CardHeader className="flex justify-between">
                <CardTitle>Receita por mês</CardTitle>
                <CardDescription>Últimos 12 meses</CardDescription>
              </CardHeader>
              <CardContent>
                Graficos
              </CardContent>
            </Card>

            <Card className="w-2/5">
              <CardHeader className="flex justify-between">
                <CardTitle>ROE por imóvel</CardTitle>
                <CardDescription>Ver todos</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="flex flex-col">
                        <span>Casa Jardim Europa</span>
                        <span className="text-muted-foreground">Residencial</span>
                      </TableCell>
                      <TableCell className="text-green-600 text-right">
                        8,1%
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex flex-col">
                        <span>Casa Jardim Europa</span>
                        <span className="text-muted-foreground">Residencial</span>
                      </TableCell>
                      <TableCell className="text-green-600 text-right">
                        8,1%
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex flex-col">
                        <span>Casa Jardim Europa</span>
                        <span className="text-muted-foreground">Residencial</span>
                      </TableCell>
                      <TableCell className="text-green-600 text-right">
                        8,1%
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex flex-col">
                        <span>Casa Jardim Europa</span>
                        <span className="text-muted-foreground">Residencial</span>
                      </TableCell>
                      <TableCell className="text-right text-gray-500">
                        Vago
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="h-1/2 flex-1 flex gap-4 pt-3">
            <Card className="w-1/2">
              <CardHeader className="flex justify-between">
                <CardTitle>Contratos próximos ao vencimento</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="flex flex-col">
                        <span>João Silva</span>
                        <span className="text-muted-foreground">Casa Jardim Europa - vence 15/02</span>
                      </TableCell>
                      <TableCell>
                        <div className="bg-orange-500/30 rounded-4xl p-2 w-fit float-right">
                          <span className="text-yellow-500">22 dias</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex flex-col">
                        <span>João Silva</span>
                        <span className="text-muted-foreground">Casa Jardim Europa - vence 15/02</span>
                      </TableCell>
                      <TableCell>
                        <div className="bg-orange-500/30 rounded-4xl p-2 w-fit float-right">
                          <span className="text-yellow-500">22 dias</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex flex-col">
                        <span>João Silva</span>
                        <span className="text-muted-foreground">Casa Jardim Europa - vence 15/02</span>
                      </TableCell>
                      <TableCell>
                        <div className="bg-orange-500/30 rounded-4xl p-2 w-fit float-right">
                          <span className="text-yellow-500">22 dias</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="w-1/2">
              <CardHeader className="flex justify-between">
                <CardTitle>Inadimplência</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="flex flex-col">
                        <span>R$ 0,00</span>
                        <span className="text-muted-foreground">Em abertos este mês</span>
                      </TableCell>
                      <TableCell>
                        <div className="bg-green-700/30 rounded-4xl p-2 w-fit float-right">
                          <span className="text-green-400">0 ocorr.</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex flex-col">
                        <span>R$ 1.200,00</span>
                        <span className="text-muted-foreground">Acumulado no ano</span>
                      </TableCell>
                      <TableCell>
                        <div className="bg-orange-500/30 rounded-4xl p-2 w-fit float-right">
                          <span className="text-yellow-500">1 ocorr.</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex flex-col">
                        <span>Taxa de Inadimplência</span>
                        <span className="text-muted-foreground">Últimos 12 meses</span>
                      </TableCell>
                      <TableCell>
                        <div className="bg-green-700/30 rounded-4xl p-2 w-fit float-right">
                          <span className="text-green-400">2,10%</span>
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
