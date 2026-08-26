import AppHeader from "@/components/app-header"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Eye, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { StatusBadge } from "@/components/app-badge"
import { contractsService } from "@/src/services/contracts"
import { Contract } from "@/src/types/contract"

export default async function Page() {
  const contracts = await contractsService.list()

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
                  <TableHead>Imóvel/Inquilino</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Aluguel</TableHead>
                  <TableHead>Caução</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((contract: Contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="flex flex-col">
                      <span className="font-bold">
                        {contract.property.description}
                      </span>
                      <span className="text-muted-foreground">
                        {contract.tenant.name}
                      </span>
                    </TableCell>
                    <TableCell>
                      {contract.start_date} - {contract.end_date}
                    </TableCell>
                    <TableCell>
                      {contract.monthly_rent.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                    <TableCell>
                      {contract.security_deposit?.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status="expiring" />
                    </TableCell>
                    <TableCell className="flex items-center justify-between">
                      <Link href="/contracts/1">
                        <Button variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/contracts/renew/${contract.id}`}>
                        <Button variant="outline">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="encerrados">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Imóvel/Inquilino</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Aluguel</TableHead>
                  <TableHead>Caução</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="flex flex-col">
                    <span className="font-bold">Casa Jardim Europa</span>
                    <span className="text-muted-foreground">João Silva</span>
                  </TableCell>
                  <TableCell>01/03/2024 - 01/03/2025</TableCell>
                  <TableCell>R$ 1.500,00</TableCell>
                  <TableCell>R$ 3.000,00</TableCell>
                  <TableCell>
                    <StatusBadge status="expiring" />
                  </TableCell>
                  <TableCell className="flex items-center justify-between">
                    <Button variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4" />
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
