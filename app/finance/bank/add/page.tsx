// app/(dashboard)/finance/bank/add/page.tsx
"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

import AppHeader from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FormSection } from "@/components/form-section"
import { BankAccountService } from "@/src/services/finance"

const bankAccountSchema = z.object({
  bank_name: z.string().min(1, { message: "Nome obrigatório" }),
  account_number: z.string().min(1, { message: "Número da conta obrigatório" }),
  agency_number: z.string().min(1, { message: "Agência obrigatória" }),
  initial_balance: z.string().optional(),
})

type BankAccountFormData = z.infer<typeof bankAccountSchema>

export default function Page() {
  const router = useRouter()

  const form = useForm<BankAccountFormData>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      initial_balance: "0,00",
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  async function onSubmit(data: BankAccountFormData) {
    try {
      await BankAccountService.create({
        bank_name: data.bank_name,
        account_number: data.account_number,
        agency_number: data.agency_number,
        is_active: true,
        initial_balance: data.initial_balance,
      })
      router.push("/finance/bank/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <AppHeader
        title="Nova conta bancária"
        subtitle="Cadastrar conta"
        actions={
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </>
        }
      />

      <div className="min-h-svh p-4">
        <Card>
          <CardContent>
            <FormSection title="DADOS DA CONTA">
              <Field>
                <FieldLabel htmlFor="bank_name">Nome / apelido</FieldLabel>
                <Input
                  id="bank_name"
                  placeholder="Ex: Nubank, Itaú Principal"
                  {...register("bank_name")}
                />
                {errors.bank_name && (
                  <p className="text-sm text-red-600">
                    {errors.bank_name.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="account_number">Conta corrente</FieldLabel>
                <Input
                  id="account_number"
                  placeholder="0000000"
                  {...register("account_number")}
                />
                {errors.account_number && (
                  <p className="text-sm text-red-600">
                    {errors.account_number.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="agency_number">Agência</FieldLabel>
                <Input
                  id="agency_number"
                  placeholder="0000"
                  {...register("agency_number")}
                />
                {errors.agency_number && (
                  <p className="text-sm text-red-600">
                    {errors.agency_number.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="initial_balance">
                  Saldo inicial (R$)
                </FieldLabel>
                <Input
                  id="initial_balance"
                  placeholder="0,00"
                  {...register("initial_balance")}
                />
              </Field>
            </FormSection>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
