import AppHeader from "@/components/app-header"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RefreshCw, FileDown } from "lucide-react"
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
import { CloseContractButton } from "@/components/transaction-actions"
import { contractsService } from "@/src/services/contracts"
import { TransactionsService, ContractsFilesService } from "@/src/services/finance"
import { formatCurrency, formatDate } from "@/src/lib/format"
import type { Transactions } from "@/src/types/finance"

interface PageProps {
  params: Promise<{ id: string }>
}

function contractStatusBadge(status: number) {
  if (status === 0) return "active"
  if (status === 1) return "expiring"
  if (status === 2) return "overdue"
  if (status === 4) return "active"
  return "cancelled"
}

function contractStatusLabel(status: number) {
  const labels = ["Ativo", "A vencer", "Vencido", "Encerrado", "Renovado"]
  return labels[status]
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const contract = await contractsService.get(Number(id))
  const charges = await TransactionsService.list({ contract: String(id) })

  return (
    <>
      <AppHeader
        title={`Contrato - ${contract.property.description}`}
        subtitle={`${contract.tenant.name} - ${contractStatusLabel(contract.status)}`}
        actions={
          <>
            <Link href="/contracts/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>

            {contract.status !== 3 && contract.status !== 4 && (
              <Link href={`/contracts/renew/${contract.id}`}>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4" />
                  Renovar
                </Button>
              </Link>
            )}

            <a
              href={ContractsFilesService.contractPdfUrl(contract.id)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm">
                <FileDown className="h-4 w-4" />
                Contrato (PDF)
              </Button>
            </a>

            {contract.status !== 3 && (
              <CloseContractButton contractId={contract.id} />
            )}
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
                      {contract.guarantor?.name ?? "—"}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Dia de vencimento: </TableCell>
                    <TableCell className="text-right">
                      dia {contract.due_day}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Início: </TableCell>
                    <TableCell className="text-right">
                      {formatDate(contract.start_date)}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Término: </TableCell>
                    <TableCell className="text-right">
                      {formatDate(contract.end_date)}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Aluguel: </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(contract.monthly_rent)}/mês
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Caução: </TableCell>
                    <TableCell className="text-right">
                      {contract.security_deposit != null
                        ? formatCurrency(contract.security_deposit)
                        : "—"}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Status: </TableCell>
                    <TableCell className="flex justify-end">
                      <StatusBadge
                        status={contractStatusBadge(contract.status) as never}
                        label={contractStatusLabel(contract.status)}
                      />
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
              <CardDescription>COBRANÇAS DO CONTRATO</CardDescription>
              <Separator />

              <Table className="mt-3">
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {charges.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-muted-foreground">
                        Nenhuma cobrança gerada para este contrato.
                      </TableCell>
                    </TableRow>
                  )}
                  {charges.map((charge: Transactions) => (
                    <TableRow key={charge.id}>
                      <TableCell>{charge.description}</TableCell>
                      <TableCell>{formatDate(charge.due_date)}</TableCell>
                      <TableCell>{formatCurrency(charge.amount)}</TableCell>
                      <TableCell>
                        <StatusBadge
                          status={
                            charge.status === "PENDING"
                              ? "pending"
                              : charge.status === "PAID"
                                ? "paid"
                                : charge.status === "OVERDUE"
                                  ? "overdue"
                                  : "cancelled"
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
