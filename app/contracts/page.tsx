import AppHeader from "@/components/app-header"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Eye, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { StatusBadge } from "@/components/app-badge"

export default function Page() {
  return (
    <>
      <AppHeader 
        title="Contratos"
        subtitle="Gestão e acompanhamento"
        actions={
          <Link href="/contracts/add/">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4" />
              Novo contrato
            </Button>
          </Link>
        }
      />

      <div className="min-h-svh p-4">
        <Tabs>
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="ativos">Ativos</TabsTrigger>
            <TabsTrigger value="aVencer">A vencer</TabsTrigger>
            <TabsTrigger value="encerrados">Encerrados</TabsTrigger>
          </TabsList>
          <TabsContent value="todos">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Imóvel/Inquilino
                  </TableHead>
                  <TableHead>
                    Período
                  </TableHead>
                  <TableHead>
                    Aluguel
                  </TableHead>
                  <TableHead>
                    Caução
                  </TableHead>
                  <TableHead>
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="flex flex-col">
                    <span className="font-bold">Casa Jardim Europa</span>
                    <span className="text-muted-foreground">João Silva</span>
                  </TableCell>
                  <TableCell>
                    01/03/2024 - 01/03/2025
                  </TableCell>
                  <TableCell>
                    R$ 1.500,00
                  </TableCell>
                  <TableCell>
                    R$ 3.000,00
                  </TableCell>
                  <TableCell>
                    <StatusBadge status="expiring"/>
                  </TableCell>
                  <TableCell className="flex justify-between items-center">
                    <Link href="/contracts/1">
                      <Button variant="outline">
                        <Eye className="h-4 w-4"/>
                      </Button>
                    </Link>
                    <Link href="/contracts/renew/1">
                      <Button variant="outline">
                        <RefreshCw className="h-4 w-4"/>
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="flex flex-col">
                    <span className="font-bold">Casa Jardim Europa</span>
                    <span className="text-muted-foreground">João Silva</span>
                  </TableCell>
                  <TableCell>
                    01/03/2024 - 01/03/2025
                  </TableCell>
                  <TableCell>
                    R$ 1.500,00
                  </TableCell>
                  <TableCell>
                    R$ 3.000,00
                  </TableCell>
                  <TableCell>
                    <StatusBadge status="expiring"/>
                  </TableCell>
                  <TableCell className="flex justify-between items-center">
                    <Button variant="outline">
                      <Eye className="h-4 w-4"/>
                    </Button>
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4"/>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="ativos">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Imóvel/Inquilino
                  </TableHead>
                  <TableHead>
                    Período
                  </TableHead>
                  <TableHead>
                    Aluguel
                  </TableHead>
                  <TableHead>
                    Caução
                  </TableHead>
                  <TableHead>
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="flex flex-col">
                    <span className="font-bold">Casa Jardim Europa</span>
                    <span className="text-muted-foreground">João Silva</span>
                  </TableCell>
                  <TableCell>
                    01/03/2024 - 01/03/2025
                  </TableCell>
                  <TableCell>
                    R$ 1.500,00
                  </TableCell>
                  <TableCell>
                    R$ 3.000,00
                  </TableCell>
                  <TableCell>
                    <StatusBadge status="expiring"/>
                  </TableCell>
                  <TableCell className="flex justify-between items-center">
                    <Button variant="outline">
                      <Eye className="h-4 w-4"/>
                    </Button>
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4"/>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="aVencer">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Imóvel/Inquilino
                  </TableHead>
                  <TableHead>
                    Período
                  </TableHead>
                  <TableHead>
                    Aluguel
                  </TableHead>
                  <TableHead>
                    Caução
                  </TableHead>
                  <TableHead>
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="flex flex-col">
                    <span className="font-bold">Casa Jardim Europa</span>
                    <span className="text-muted-foreground">João Silva</span>
                  </TableCell>
                  <TableCell>
                    01/03/2024 - 01/03/2025
                  </TableCell>
                  <TableCell>
                    R$ 1.500,00
                  </TableCell>
                  <TableCell>
                    R$ 3.000,00
                  </TableCell>
                  <TableCell>
                    <StatusBadge status="expiring"/>
                  </TableCell>
                  <TableCell className="flex justify-between items-center">
                    <Button variant="outline">
                      <Eye className="h-4 w-4"/>
                    </Button>
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4"/>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="encerrados">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Imóvel/Inquilino
                  </TableHead>
                  <TableHead>
                    Período
                  </TableHead>
                  <TableHead>
                    Aluguel
                  </TableHead>
                  <TableHead>
                    Caução
                  </TableHead>
                  <TableHead>
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="flex flex-col">
                    <span className="font-bold">Casa Jardim Europa</span>
                    <span className="text-muted-foreground">João Silva</span>
                  </TableCell>
                  <TableCell>
                    01/03/2024 - 01/03/2025
                  </TableCell>
                  <TableCell>
                    R$ 1.500,00
                  </TableCell>
                  <TableCell>
                    R$ 3.000,00
                  </TableCell>
                  <TableCell>
                    <StatusBadge status="expiring"/>
                  </TableCell>
                  <TableCell className="flex justify-between items-center">
                    <Button variant="outline">
                      <Eye className="h-4 w-4"/>
                    </Button>
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4"/>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
