import AppHeader from "@/components/app-header"
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SquarePen, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/app-badge"
import { TenantService } from "@/src/services/tenants"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const tenant = await TenantService.get(Number(id))

  return (
    <>
      <AppHeader
        title={tenant.name}
        subtitle={tenant.guarantor ? "Fiador" : "Locátario"}
        actions={
          <>
            <Link href="/tenants/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>

            <Button variant="outline" size="sm">
              <SquarePen className="h-4 w-4" />
              Editar
            </Button>

            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4" />
              Excluir
            </Button>
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
                    <TableCell>Profissão: </TableCell>
                    <TableCell className="text-right">
                      {tenant.profession}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Renda mensal: </TableCell>
                    <TableCell className="text-right">
                      {tenant.monthly_income}
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

              <div className="mt-3 flex">
                <div className="flex w-1/2 flex-col">
                  <span className="font-bold">Casa Jardim Europa</span>
                  <span className="text-muted-foreground">
                    R$ 1.500/mês - vence 01/03/2027
                  </span>
                </div>
                <div className="flex w-1/2 items-center justify-center">
                  <StatusBadge status="active" />
                </div>
              </div>

              <CardDescription className="mt-3">FIADOR DE</CardDescription>
              <Separator />

              <div className="mt-3">
                <span className="text-muted-foreground">
                  Nenhum contrato como fiador
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
