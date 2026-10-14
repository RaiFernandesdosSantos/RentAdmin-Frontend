"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

import AppHeader from "@/components/app-header"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FormSection } from "@/components/form-section"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChartAccountService,
  BankAccountService,
  TransactionsService,
} from "@/src/services/finance"
import { PropertyService } from "@/src/services/properties"
import type { ChartAccount, BankAccount } from "@/src/types/finance"
import type { Property } from "@/src/types/property"

const chargeSchema = z.object({
  description: z.string().min(1, { message: "Descrição obrigatória" }),
  amount: z.string().min(1, { message: "Valor obrigatório" }),
  due_date: z.string().min(1, { message: "Vencimento obrigatório" }),
  account: z.number().min(1, { message: "Conta contábil obrigatória" }),
  bank_account: z.number().min(1, { message: "Conta bancária obrigatória" }),
  property: z.number().nullable().optional(),
})

type ChargeFormData = z.infer<typeof chargeSchema>

export default function Page() {
  const router = useRouter()
  const [chartAccounts, setChartAccounts] = useState<ChartAccount[]>([])
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([])
  const [properties, setProperties] = useState<Property[]>([])

  const form = useForm<ChargeFormData>({
    resolver: zodResolver(chargeSchema),
  })

  const { handleSubmit, formState } = form

  useEffect(() => {
    Promise.all([
      ChartAccountService.list(),
      BankAccountService.list(),
      PropertyService.list(),
    ])
      .then(([charts, banks, props]) => {
        // apenas contas folha de receita
        setChartAccounts(
          charts.filter(
            (a) => a.parent !== null && a.type === "ENTRIES" && a.is_active,
          ),
        )
        setBankAccounts(banks)
        setProperties(props)
      })
      .catch((error) => console.error(error))
  }, [])

  async function onSubmit(data: ChargeFormData) {
    try {
      await TransactionsService.create({
        description: data.description,
        status: "PENDING",
        amount: data.amount,
        due_date: data.due_date,
        payment_date: null,
        competence_date: `${data.due_date.slice(0, 7)}-01`,
        account: data.account,
        bank_account: data.bank_account,
        property: data.property ?? null,
        contract: null,
        recurrence: "NONE",
      })
      router.push("/finance/receivables/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <AppHeader
        title="Nova cobrança"
        subtitle="Lançar conta a receber"
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button
              variant="outline"
              size="sm"
              type="button"
              disabled={formState.isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              Salvar
            </Button>
          </>
        }
      />

      <div className="min-h-svh p-4">
        <Card>
          <CardContent>
            <CardDescription>DADOS DA COBRANÇA</CardDescription>
            <Separator />
            <form className="mt-4">
              <FormSection title="LANÇAMENTO" columns={2}>
                <Field>
                  <FieldLabel htmlFor="description">Descrição</FieldLabel>
                  <Input
                    id="description"
                    placeholder="Ex.: Aluguel - Casa Jardim Europa"
                    {...form.register("description")}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="amount">Valor (R$)</FieldLabel>
                  <Input
                    id="amount"
                    placeholder="1500.00"
                    {...form.register("amount")}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="due_date">Vencimento</FieldLabel>
                  <Input id="due_date" type="date" {...form.register("due_date")} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="property">Imóvel (opcional)</FieldLabel>
                  <Controller
                    control={form.control}
                    name="property"
                    render={({ field }) => (
                      <Select
                        value={field.value ? String(field.value) : "none"}
                        onValueChange={(value) =>
                          field.onChange(value === "none" ? null : Number(value))
                        }
                      >
                        <SelectTrigger id="property">
                          <SelectValue placeholder="Selecionar imóvel..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">—</SelectItem>
                          {properties.map((p) => (
                            <SelectItem key={p.id} value={String(p.id)}>
                              {p.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="account">Conta contábil</FieldLabel>
                  <Controller
                    control={form.control}
                    name="account"
                    render={({ field }) => (
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger id="account">
                          <SelectValue placeholder="Selecionar conta..." />
                        </SelectTrigger>
                        <SelectContent>
                          {chartAccounts.map((a) => (
                            <SelectItem key={a.id} value={String(a.id)}>
                              {a.code} · {a.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="bank_account">Conta bancária</FieldLabel>
                  <Controller
                    control={form.control}
                    name="bank_account"
                    render={({ field }) => (
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger id="bank_account">
                          <SelectValue placeholder="Selecionar conta..." />
                        </SelectTrigger>
                        <SelectContent>
                          {bankAccounts.map((b) => (
                            <SelectItem key={b.id} value={String(b.id)}>
                              {b.bank_name} · AG {b.agency_number} CC{" "}
                              {b.account_number}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
              </FormSection>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
