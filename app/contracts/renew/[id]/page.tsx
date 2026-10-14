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
import type { Contract } from "@/src/types/contract"
import { formatCurrency, formatDate } from "@/src/lib/format"

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
  const [contract, setContract] = useState<Contract | null>(null)

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
        setContract(contract)
        form.reset({
          start_date: contract.start_date,
          end_date: contract.end_date,
          monthly_rent: contract.monthly_rent,
          security_deposit: contract.security_deposit,
        })
      })
      .finally(() => setLoading(false))
  }, [id])

  async function onSubmit(data: ContractFormData) {
    try {
      await contractsService.update(id, data)
      router.push("/contracts/")
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return <div className="p-4">Caregando...</div>

  return (
    <>
      <AppHeader
        title={`Contrato - ${contract?.property.description ?? "..."}`}
        subtitle={`${contract?.tenant.name ?? ""} - Renovação`}
        actions={
          <>
            <Link href="/contracts/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
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
                      {contract
                        ? `${formatDate(contract.start_date)} - ${formatDate(contract.end_date)}`
                        : "..."}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Aluguel: </TableCell>
                    <TableCell className="text-right">
                      {contract
                        ? `${formatCurrency(contract.monthly_rent)}/mês`
                        : "..."}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Caução: </TableCell>
                    <TableCell className="text-right">
                      {contract?.security_deposit != null
                        ? formatCurrency(contract.security_deposit)
                        : "—"}
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
              <form action="" className="mt-4">
                <FormSection title="NOVO PERÍODO E VALORES" columns={1}>
                  <Controller
                    control={control}
                    name="start_date"
                    render={({ field }) => (
                      <DatePickerField
                        label="Nova data de início"
                        id="start_date"
                        value={field.value ? new Date(field.value) : undefined}
                        onChange={(date) =>
                          field.onChange(date?.toISOString().split("T")[0])
                        }
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="end_date"
                    render={({ field }) => (
                      <DatePickerField
                        label="Nova data de vencimento"
                        id="end_date"
                        value={field.value ? new Date(field.value) : undefined}
                        onChange={(date) =>
                          field.onChange(date?.toISOString().split("T")[0])
                        }
                      />
                    )}
                  />

                  <Field>
                    <FieldLabel htmlFor="monthly_rent">
                      Novo Aluguel (R$)
                    </FieldLabel>
                    <Input
                      id="monthly_rent"
                      placeholder="0,00"
                      {...register("monthly_rent")}
                    />
                    {errors.monthly_rent && (
                      <p className="text-sm text-red-600">
                        {errors.monthly_rent.message}
                      </p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="security_deposit">
                      Caução (R$)
                    </FieldLabel>
                    <Input
                      id="security_deposit"
                      placeholder="0,00"
                      {...register("security_deposit")}
                    />
                    {errors.security_deposit && (
                      <p className="text-sm text-red-600">
                        {errors.security_deposit.message}
                      </p>
                    )}
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
