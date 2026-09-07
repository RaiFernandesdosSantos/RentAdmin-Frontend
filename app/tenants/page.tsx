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
import { Eye, SquarePen } from "lucide-react"
import Link from "next/link"
import { StatusBadge } from "@/components/app-badge"
import { TenantService } from "@/src/services/tenants"
import { Tenant } from "@/src/types/tenant"

export default async function Page() {
  const tenants = await TenantService.list()

  return (
    <>
      <AppHeader
        title="Inquilinos"
        subtitle="Cadastro de locatários e fiadores"
        actions={
          <Link href="/tenants/add/">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4" />
              Novo inquilino
            </Button>
          </Link>
        }
      />

      <div className="min-h-svh p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants?.map((tenant: Tenant) => (
              <TableRow key={tenant.id}>
                <TableCell className="flex w-fit items-center gap-4">
                  <div className="h-fit w-fit rounded-3xl bg-blue-300 p-3">
                    <span className="font-bold text-blue-600">JS</span>
                  </div>
                  <div className="flex flex-col">
                    <span>{tenant.name}</span>
                    <span className="text-muted-foreground">
                      CPF: {tenant.cpf}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{tenant.phone_number}</TableCell>
                <TableCell>
                  <StatusBadge status="tenant" />
                </TableCell>
                <TableCell>
                  <StatusBadge status="active" />
                </TableCell>
                <TableCell className="flex justify-between">
                  <Link href={`/tenants/${tenant.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>

                  <Link href="/tenants/edit/1">
                    <Button variant="outline" size="sm">
                      <SquarePen className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
