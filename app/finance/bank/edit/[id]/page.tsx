"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
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
import { SettingRow } from "@/components/setting-row"
import { Switch } from "@/components/ui/switch"
import { BankAccountService } from "@/src/services/finance"

const bankSchema = z.object({
  bank_name: z.string().min(1, { message: "Nome obrigatório" }),
  account_number: z.string().min(1, { message: "Conta obrigatória" }),
  agency_number: z.string().min(1, { message: "Agência obrigatória" }),
  is_active: z.boolean(),
})

type BankFormData = z.infer<typeof bankSchema>

export default function Page() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)
  const [loading, setLoading] = useState(true)

  const form = useForm<BankFormData>({
    resolver: zodResolver(bankSchema),
    defaultValues: { is_active: true },
  })

  const { register, control, handleSubmit, formState } = form

  useEffect(() => {
    BankAccountService.get(id)
      .then((account) => {
        form.reset({
          bank_name: account.bank_name,
          account_number: account.account_number,
          agency_number: account.agency_number,
          is_active: account.is_active,
        })
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [id])

  async function onSubmit(data: BankFormData) {
    try {
      await BankAccountService.update(id, data)
      router.push(`/finance/bank/${id}`)
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return <div className="p-4">Carregando...</div>

  return (
    <>
      <AppHeader
        title="Editar conta bancária"
        subtitle="Alterar dados da conta"
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
            <CardDescription>DADOS DA CONTA</CardDescription>
            <Separator />
            <form className="mt-4">
              <FormSection title="IDENTIFICAÇÃO" columns={2}>
                <Field>
                  <FieldLabel htmlFor="bank_name">Nome/apelido</FieldLabel>
                  <Input
                    id="bank_name"
                    placeholder="Ex: Nubank, Itaú Principal"
                    {...form.register("bank_name")}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="account_number">Conta-corrente</FieldLabel>
                  <Input
                    id="account_number"
                    placeholder="4894894"
                    {...form.register("account_number")}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="agency_number">Agência</FieldLabel>
                  <Input
                    id="agency_number"
                    placeholder="0000"
                    {...form.register("agency_number")}
                  />
                </Field>
              </FormSection>

              <Separator className="my-4" />

              <SettingRow
                label="Conta ativa"
                description="Desativa oculta a conta nos relatórios"
              >
                <Controller
                  control={control}
                  name="is_active"
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </SettingRow>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
