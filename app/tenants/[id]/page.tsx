import AppHeader from "@/components/app-header"
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SquarePen, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/app-badge"
import { DeleteTenantButton } from "@/components/entity-actions"
import { TenantService } from "@/src/services/tenants"
import { contractsService } from "@/src/services/contracts"
import { formatCurrency, formatDate } from "@/src/lib/format"
import type { Contract } from "@/src/types/contract"

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
  const tenant = await TenantService.get(Number(id))
  const [contractsAsTenant, contractsAsGuarantor] = await Promise.all([
    contractsService.list({ tenant: id }),
    contractsService.list({ guarantor: id }),
  ])

  return (
    <>
      <AppHeader
        title={tenant.name}
        subtitle={tenant.guarantor ? "Fiador" : "Locatário"}
        actions={
          <>
            <Link href="/tenants/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>

            <Link href={`/tenants/edit/${tenant.id}`}>
              <Button variant="outline" size="sm">
                <SquarePen className="h-4 w-4" />
                Editar
              </Button>
            </Link>

            <DeleteTenantButton tenantId={tenant.id} />
          </>
        }
      />

      <div className="flex min-h-svh gap-5 p-4">
        <div className="w-1/2">
          <Card>
            <CardHeader className="flex items-center gap-5">
              <div className="flex h-15 w-15 items-center justify-center rounded-full bg-blue-300">
                {tenant.name.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <span className="text-3xl font-bold">{tenant.name}</span>
                <StatusBadge
                  status={tenant.guarantor ? "guarantor" : "tenant"}
                />
              </div>
            </CardHeader>

            <CardContent>
              <CardDescription>DADOS PESSOAIS</CardDescription>
              <Separator />

              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>CPF: </TableCell>
                    <TableCell className="text-right">{tenant.cpf}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Telefone: </TableCell>
                    <TableCell className="text-right">
                      {tenant.phone_number}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>E-mail: </TableCell>
                    <TableCell className="text-right">
                      {tenant.email ?? "—"}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Profissão: </TableCell>
                    <TableCell className="text-right">
                      {tenant.profession}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Renda mensal: </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(tenant.monthly_income)}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Status: </TableCell>
                    <TableCell className="flex justify-end">
                      <StatusBadge
                        status={tenant.is_active ? "active" : "inactive"}
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
              <CardDescription>CONTRATOS VINCULADOS</CardDescription>
              <Separator />

              <div className="mt-3 flex flex-col gap-3">
                {contractsAsTenant.length === 0 && (
                  <span className="text-muted-foreground">
                    Nenhum contrato como locatário
                  </span>
                )}
                {contractsAsTenant.map((contract: Contract) => (
                  <Link
                    key={contract.id}
                    href={`/contracts/${contract.id}`}
                    className="flex items-center justify-between hover:opacity-80"
                  >
                    <div className="flex w-1/2 flex-col">
                      <span className="font-bold">
                        {contract.property.description}
                      </span>
                      <span className="text-muted-foreground">
                        {formatCurrency(contract.monthly_rent)}/mês ·{" "}
                        {formatDate(contract.start_date)} a{" "}
                        {formatDate(contract.end_date)}
                      </span>
                    </div>
                    <div className="flex w-1/2 items-center justify-center">
                      <StatusBadge
                        status={contractStatusBadge(contract.status) as never}
                        label={contractStatusLabel(contract.status)}
                      />
                    </div>
                  </Link>
                ))}
              </div>

              <CardDescription className="mt-3">FIADOR DE</CardDescription>
              <Separator />

              <div className="mt-3 flex flex-col gap-3">
                {contractsAsGuarantor.length === 0 && (
                  <span className="text-muted-foreground">
                    Nenhum contrato como fiador
                  </span>
                )}
                {contractsAsGuarantor.map((contract: Contract) => (
                  <Link
                    key={contract.id}
                    href={`/contracts/${contract.id}`}
                    className="flex items-center justify-between hover:opacity-80"
                  >
                    <div className="flex w-1/2 flex-col">
                      <span className="font-bold">
                        {contract.property.description}
                      </span>
                      <span className="text-muted-foreground">
                        Locatário: {contract.tenant.name}
                      </span>
                    </div>
                    <div className="flex w-1/2 items-center justify-center">
                      <StatusBadge
                        status={contractStatusBadge(contract.status) as never}
                        label={contractStatusLabel(contract.status)}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
