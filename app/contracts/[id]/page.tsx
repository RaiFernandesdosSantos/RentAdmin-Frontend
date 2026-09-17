import AppHeader from "@/components/app-header"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SquarePen, ArrowLeft, XIcon, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHead,
} from "@/components/ui/table"
import { StatusBadge } from "@/components/app-badge"
import { contractsService } from "@/src/services/contracts"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const contract = await contractsService.get(Number(id))

  return (
    <>
      <AppHeader
        title={`Contrato - ${contract.property.description}`}
        subtitle={`${contract.tenant.name} - Ativo`}
        actions={
          <>
            <Link href="/contracts/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>

            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
              Renovar
            </Button>

            <Button variant="outline" size="sm">
              <XIcon className="h-4 w-4" />
              Encerrar
            </Button>
          </>
        }
      />

      <div className="flex min-h-svh gap-5 p-4">
        <div className="w-1/2">
          <Card>
            <CardContent>
              <CardDescription>DADOS DO CONTRATO</CardDescription>
              <Separator />

              <Table className="mt-3">
                <TableBody>
                  <TableRow>
                    <TableCell>Imóvel: </TableCell>
                    <TableCell className="text-right">
                      {contract.property.description}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Inquilino: </TableCell>
                    <TableCell className="text-right">
                      {contract.tenant.name}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Fiador: </TableCell>
                    <TableCell className="text-right">
                      {contract.guarantor?.name}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Início: </TableCell>
                    <TableCell className="text-right">
                      {contract.start_date}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Vencimento: </TableCell>
                    <TableCell className="text-right">
                      {contract.end_date}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Aluguel: </TableCell>
                    <TableCell className="text-right">
                      {contract.monthly_rent.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                      /mês
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Caução: </TableCell>
                    <TableCell className="text-right">
                      {contract.security_deposit?.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Status: </TableCell>
                    <TableCell className="flex justify-end">
                      <StatusBadge status="expiring" />
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
                      <StatusBadge status="pending" />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Jan/25 </TableCell>
                    <TableCell>R$ 1.500</TableCell>
                    <TableCell>
                      <StatusBadge status="paid" />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Jan/25 </TableCell>
                    <TableCell>R$ 1.500</TableCell>
                    <TableCell>
                      <StatusBadge status="paid" />
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
