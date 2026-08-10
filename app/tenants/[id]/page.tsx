import AppHeader from "@/components/app-header"
import { Card, CardHeader, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SquarePen, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/app-badge"

export default function Page() {
  return (
    <>
      <AppHeader 
        title="João Silva1"
        subtitle="Locatário ativo"
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

      <div className="min-h-svh p-4 flex gap-5">
        <div className="w-1/2">
          <Card>
            <CardHeader className="flex items-center gap-5">
              <div className="w-15 bg-blue-300 justify-center flex h-15 items-center rounded-full">
                <span>JS</span>
              </div>

              <div>
                <span className="font-bold text-3xl">João Silva</span>
                <StatusBadge status="tenant"/>
              </div>
            </CardHeader>

            <CardContent>
              <CardDescription>DADOS PESSOAIS</CardDescription>
              <Separator />

              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>CPF: </TableCell>
                    <TableCell className="text-right">054.456.789-89</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Telefone: </TableCell>
                    <TableCell className="text-right">(67) 9 9879-9689</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Profissão: </TableCell>
                    <TableCell className="text-right">Engenheiro</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Renda mensal: </TableCell>
                    <TableCell className="text-right">R$ 6.000</TableCell>
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

              <div className="flex mt-3">
                <div className="flex flex-col w-1/2">
                  <span className="font-bold">Casa Jardim Europa</span>
                  <span className="text-muted-foreground">R$ 1.500/mês - vence 01/03/2027</span>
                </div>
                <div className="w-1/2 flex items-center justify-center">
                  <StatusBadge status="active"/>
                </div>
              </div>

              <CardDescription className="mt-3">FIADOR DE</CardDescription>
              <Separator />

              <div className="mt-3">
                <span className="text-muted-foreground">Nenhum contrato como fiador</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
