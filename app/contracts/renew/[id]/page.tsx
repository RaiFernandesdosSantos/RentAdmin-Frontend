"use client"

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
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { contractsService } from "@/src/services/contracts"

const contractSchema = z.object({
  monthly_rent: z.number().min(1, { message: "Aluguel obrigatorio" }),
  security_deposit: z.number().nullable().optional(),
  start_date: z.string().min(1, { message: "Data incial obrigatoria" }),
  end_date: z.string().min(1, { message: "Data final obrigatoria" }),
})

type ContractFormData = z.infer<typeof contractSchema>

export default function Page() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)
  const [loading, setLoading] = useState(true)

  const form = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  useEffect(() => {
    contractsService
      .get(id)
      .then((contract) => {
        form.reset({
          start_date: contract.start_date,
          end_date: contract.end_date,
          monthly_rent: contract.monthly_rent,
          security_deposit: contract.security_deposit,
        })
      })
      .finally(() => setLoading(false))
  }, [id])

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
              <RefreshCw className="h-4 w-4" />
              Confirmar Renovação
            </Button>
          </>
        }
      />

      <div className="flex min-h-svh gap-5 p-4">
        <div className="w-1/2">
          <Card>
            <CardContent>
              <CardDescription>CONTRATO ATUAL</CardDescription>
              <Separator />

              <Table className="mt-3">
                <TableBody>
                  <TableRow>
                    <TableCell>Período: </TableCell>
                    <TableCell className="text-right">
                      01/03/2024 - 01/03/2025
                    </TableCell>
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
                  <DatePickerField
                    label="Nova data de início"
                    id="start_date"
                  />
                  <DatePickerField
                    label="Nova data de vencimento"
                    id="end_date"
                  />
                  <Field>
                    <FieldLabel htmlFor="rent">Novo Aluguel (R$)</FieldLabel>
                    <Input id="monthly_rent" placeholder="0,00" />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="caucao">Caução (R$)</FieldLabel>
                    <Input id="security_deposit" placeholder="0,00" />
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
