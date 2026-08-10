import AppHeader from "@/components/app-header"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { DatePickerField } from "@/components/date-picker"
import { FormSection } from "@/components/form-section"

export default function Page() {
  return (
    <>
      <AppHeader 
        title="Contrato - Casa Jardim Europa"
        subtitle="João Silva - Ativo"
        actions={
          <>
            <Link href="/contracts/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>

            <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4"/>
                Confirmar Renovação
            </Button>
          </>
        }
      />

      <div className="min-h-svh p-4 flex gap-5">
        <div className="w-1/2">
          <Card>
            <CardContent>
              <CardDescription>CONTRATO ATUAL</CardDescription>
              <Separator />

              <Table className="mt-3">
                <TableBody>
                  <TableRow>
                    <TableCell>Período: </TableCell>
                    <TableCell className="text-right">01/03/2024 - 01/03/2025</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Aluguel: </TableCell>
                    <TableCell className="text-right">R$ 1.500/mês</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Caução: </TableCell>
                    <TableCell className="text-right">R$ 3.000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="w-1/2">
          <Card>
            <CardContent>
              <form action="" className="mt-4">
                <FormSection title="NOVO PERÍODO E VALORES" columns={1}>
                  <DatePickerField label="Nova data de início" id="inicio"/>
                  <DatePickerField label="Nova data de vencimento" id="vencimento"/>      
                  <Field>
                      <FieldLabel htmlFor="rent">Novo Aluguel (R$)</FieldLabel>
                      <Input id="rent" placeholder="0,00"/>
                  </Field>

                  <Field>
                      <FieldLabel htmlFor="caucao">Caução (R$)</FieldLabel>
                      <Input id="caucao" placeholder="0,00"/>
                  </Field>
                </FormSection>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
