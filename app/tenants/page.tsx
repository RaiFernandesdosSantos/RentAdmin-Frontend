import AppHeader from "@/components/app-header"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CircleUser, Eye, SquarePen } from "lucide-react"


export default function Page() {
  return (
    <>
      <AppHeader 
        title="Inquilinos"
        subtitle="Cadastro de locatários e fiadores"
        actions={
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4" />
            Novo inquilino
          </Button>
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
                CPF
              </TableHead>
              <TableHead>
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <CircleUser className="h-4 w-4"/>
                João Silva
                Locatário
              </TableCell>
              <TableCell>
                (67) 9 9999-9999
              </TableCell>
              <TableCell>
                ***.456.***-**
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
                <CircleUser className="h-4 w-4"/>
                João Silva
                Locatário
              </TableCell>
              <TableCell>
                (67) 9 9999-9999
              </TableCell>
              <TableCell>
                ***.456.***-**
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
                <CircleUser className="h-4 w-4"/>
                João Silva
                Locatário
              </TableCell>
              <TableCell>
                (67) 9 9999-9999
              </TableCell>
              <TableCell>
                ***.456.***-**
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
                <CircleUser className="h-4 w-4"/>
                João Silva
                Locatário
              </TableCell>
              <TableCell>
                (67) 9 9999-9999
              </TableCell>
              <TableCell>
                ***.456.***-**
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
                <CircleUser className="h-4 w-4"/>
                João Silva
                Locatário
              </TableCell>
              <TableCell>
                (67) 9 9999-9999
              </TableCell>
              <TableCell>
                ***.456.***-**
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
      </div>
    </>
  )
}
