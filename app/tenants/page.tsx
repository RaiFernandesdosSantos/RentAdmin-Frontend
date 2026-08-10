import AppHeader from "@/components/app-header"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Eye, SquarePen } from "lucide-react"
import Link from "next/link"
import { StatusBadge } from "@/components/app-badge"

export default function Page() {
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
              <TableHead>
                Nome
              </TableHead>
              <TableHead>
                Contato
              </TableHead>
              <TableHead>
                Tipo
              </TableHead>
              <TableHead>
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="flex gap-4 w-fit items-center">
                <div className="bg-blue-300 rounded-3xl h-fit w-fit p-3">
                  <span className="text-blue-600 font-bold">JS</span>
                </div>
                <div className="flex flex-col">
                  <span>João Silva</span>
                  <span className="text-muted-foreground">CPF: 056.456.789-89</span>
                </div>
              </TableCell>
              <TableCell>
                (67) 9 9999-9999
              </TableCell>
              <TableCell>
                <StatusBadge status="tenant"/>
              </TableCell>
              <TableCell>
                <StatusBadge status="active"/>
              </TableCell>
              <TableCell className="flex justify-between">
                <Link href="/tenants/1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4"/>                
                  </Button>
                </Link>

                <Link href="/tenants/edit/1">
                  <Button variant="outline" size="sm">
                    <SquarePen className="h-4 w-4"/>
                  </Button>
                </Link>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="flex gap-4 w-fit items-center">
                <div className="bg-blue-300 rounded-3xl h-fit w-fit p-3">
                  <span className="text-blue-600 font-bold">JS</span>
                </div>
                <div className="flex flex-col">
                  <span>João Silva</span>
                  <span className="text-muted-foreground">CPF: 056.456.789-89</span>
                </div>
              </TableCell>
              <TableCell>
                (67) 9 9999-9999
              </TableCell>
              <TableCell>
                <StatusBadge status="tenant"/>
              </TableCell>
              <TableCell>
                <StatusBadge status="active"/>
              </TableCell>
              <TableCell className="flex justify-between">
                <Link href="/tenants/1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4"/>                
                  </Button>
                </Link>

                <Link href="/tenants/edit/1">
                  <Button variant="outline" size="sm">
                    <SquarePen className="h-4 w-4"/>
                  </Button>
                </Link>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="flex gap-4 w-fit items-center">
                <div className="bg-blue-300 rounded-3xl h-fit w-fit p-3">
                  <span className="text-blue-600 font-bold">JS</span>
                </div>
                <div className="flex flex-col">
                  <span>João Silva</span>
                  <span className="text-muted-foreground">CPF: 056.456.789-89</span>
                </div>
              </TableCell>
              <TableCell>
                (67) 9 9999-9999
              </TableCell>
              <TableCell>
                <StatusBadge status="tenant"/>
              </TableCell>
              <TableCell>
                <StatusBadge status="active"/>
              </TableCell>
              <TableCell className="flex justify-between">
                <Link href="/tenants/1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4"/>                
                  </Button>
                </Link>

                <Link href="/tenants/edit/1">
                  <Button variant="outline" size="sm">
                    <SquarePen className="h-4 w-4"/>
                  </Button>
                </Link>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="flex gap-4 w-fit items-center">
                <div className="bg-blue-300 rounded-3xl h-fit w-fit p-3">
                  <span className="text-blue-600 font-bold">JS</span>
                </div>
                <div className="flex flex-col">
                  <span>João Silva</span>
                  <span className="text-muted-foreground">CPF: 056.456.789-89</span>
                </div>
              </TableCell>
              <TableCell>
                (67) 9 9999-9999
              </TableCell>
              <TableCell>
                <StatusBadge status="tenant"/>
              </TableCell>
              <TableCell>
                <StatusBadge status="active"/>
              </TableCell>
              <TableCell className="flex justify-between">
                <Link href="/tenants/1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4"/>                
                  </Button>
                </Link>

                <Link href="/tenants/edit/1">
                  <Button variant="outline" size="sm">
                    <SquarePen className="h-4 w-4"/>
                  </Button>
                </Link>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="flex gap-4 w-fit items-center">
                <div className="bg-blue-300 rounded-3xl h-fit w-fit p-3">
                  <span className="text-blue-600 font-bold">JS</span>
                </div>
                <div className="flex flex-col">
                  <span>João Silva</span>
                  <span className="text-muted-foreground">CPF: 056.456.789-89</span>
                </div>
              </TableCell>
              <TableCell>
                (67) 9 9999-9999
              </TableCell>
              <TableCell>
                <StatusBadge status="tenant"/>
              </TableCell>
              <TableCell>
                <StatusBadge status="active"/>
              </TableCell>
              <TableCell className="flex justify-between">
                <Link href="/tenants/1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4"/>                
                  </Button>
                </Link>

                <Link href="/tenants/edit/1">
                  <Button variant="outline" size="sm">
                    <SquarePen className="h-4 w-4"/>
                  </Button>
                </Link>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="flex gap-4 w-fit items-center">
                <div className="bg-blue-300 rounded-3xl h-fit w-fit p-3">
                  <span className="text-blue-600 font-bold">JS</span>
                </div>
                <div className="flex flex-col">
                  <span>João Silva</span>
                  <span className="text-muted-foreground">CPF: 056.456.789-89</span>
                </div>
              </TableCell>
              <TableCell>
                (67) 9 9999-9999
              </TableCell>
              <TableCell>
                <StatusBadge status="tenant"/>
              </TableCell>
              <TableCell>
                <StatusBadge status="active"/>
              </TableCell>
              <TableCell className="flex justify-between">
                <Link href="/tenants/1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4"/>                
                  </Button>
                </Link>

                <Link href="/tenants/edit/1">
                  <Button variant="outline" size="sm">
                    <SquarePen className="h-4 w-4"/>
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  )
}
