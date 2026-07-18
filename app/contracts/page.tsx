import AppHeader from "@/components/app-header"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Search, Eye, SquarePen } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function Page() {
  return (
    <>
      <AppHeader 
        title="Contratos"
        subtitle="Gestão e acompanhamento"
        actions={
          <>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4" />
              Novo contrato
            </Button>
          </>
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
                  <TableCell>
                    Casa Jardim Europa
                    João Silva
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
                    Vence em 22d
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Eye className="h-4 w-4"/>
                    <SquarePen className="h-4 w-4"/>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Casa Jardim Europa
                    João Silva
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
                    Vence em 22d
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Eye className="h-4 w-4"/>
                    <SquarePen className="h-4 w-4"/>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Casa Jardim Europa
                    João Silva
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
                    Vence em 22d
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Eye className="h-4 w-4"/>
                    <SquarePen className="h-4 w-4"/>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Casa Jardim Europa
                    João Silva
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
                    Vence em 22d
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Eye className="h-4 w-4"/>
                    <SquarePen className="h-4 w-4"/>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Casa Jardim Europa
                    João Silva
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
                    Vence em 22d
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Eye className="h-4 w-4"/>
                    <SquarePen className="h-4 w-4"/>
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
                  <TableCell>
                    Casa Jardim Europa
                    João Silva
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
                    Ativo
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Eye className="h-4 w-4"/>
                    <SquarePen className="h-4 w-4"/>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Casa Jardim Europa
                    João Silva
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
                    Ativo
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Eye className="h-4 w-4"/>
                    <SquarePen className="h-4 w-4"/>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Casa Jardim Europa
                    João Silva
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
                    Ativo
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Eye className="h-4 w-4"/>
                    <SquarePen className="h-4 w-4"/>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Casa Jardim Europa
                    João Silva
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
                    Ativo
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Eye className="h-4 w-4"/>
                    <SquarePen className="h-4 w-4"/>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Casa Jardim Europa
                    João Silva
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
                    Ativo
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Eye className="h-4 w-4"/>
                    <SquarePen className="h-4 w-4"/>
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
                  <TableCell>
                    Casa Jardim Europa
                    João Silva
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
                    Vence em 22d
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Eye className="h-4 w-4"/>
                    <SquarePen className="h-4 w-4"/>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Casa Jardim Europa
                    João Silva
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
                    Vence em 22d
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Eye className="h-4 w-4"/>
                    <SquarePen className="h-4 w-4"/>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Casa Jardim Europa
                    João Silva
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
                    Vence em 22d
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Eye className="h-4 w-4"/>
                    <SquarePen className="h-4 w-4"/>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Casa Jardim Europa
                    João Silva
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
                    Vence em 22d
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Eye className="h-4 w-4"/>
                    <SquarePen className="h-4 w-4"/>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Casa Jardim Europa
                    João Silva
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
                    Vence em 22d
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Eye className="h-4 w-4"/>
                    <SquarePen className="h-4 w-4"/>
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
                  <TableCell>
                    Casa Jardim Europa
                    João Silva
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
                    Encerrado
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Eye className="h-4 w-4"/>
                    <SquarePen className="h-4 w-4"/>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Casa Jardim Europa
                    João Silva
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
                    Encerrado
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Eye className="h-4 w-4"/>
                    <SquarePen className="h-4 w-4"/>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Casa Jardim Europa
                    João Silva
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
                    Encerrado
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Eye className="h-4 w-4"/>
                    <SquarePen className="h-4 w-4"/>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Casa Jardim Europa
                    João Silva
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
                    Encerrado
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Eye className="h-4 w-4"/>
                    <SquarePen className="h-4 w-4"/>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    Casa Jardim Europa
                    João Silva
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
                    Encerrado
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Eye className="h-4 w-4"/>
                    <SquarePen className="h-4 w-4"/>
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
