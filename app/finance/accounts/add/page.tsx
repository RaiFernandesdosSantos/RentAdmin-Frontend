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
import { Switch } from "@/components/ui/switch"
import { ChartAccountService } from "@/src/services/finance"
import type { ChartAccount } from "@/src/types/finance"

const accountSchema = z.object({
  code: z.string().min(1, { message: "Código obrigatório" }),
  name: z.string().min(1, { message: "Nome obrigatório" }),
  parent: z.number().nullable().optional(),
  type: z.enum(["ENTRIES", "EXPENSES"]),
  report_classification: z.enum(["DRE_DFC", "DFC_ONLY", "DRE_ONLY"]),
  is_active: z.boolean(),
})

type AccountFormData = z.infer<typeof accountSchema>

export default function Page() {
  const router = useRouter()
  const [accounts, setAccounts] = useState<ChartAccount[]>([])

  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      type: "ENTRIES",
      report_classification: "DRE_DFC",
      is_active: true,
    },
  })

  const { control, handleSubmit, formState, watch } = form

  useEffect(() => {
    ChartAccountService.list()
      .then(setAccounts)
      .catch((error) => console.error(error))
  }, [])

  async function onSubmit(data: AccountFormData) {
    try {
      await ChartAccountService.create({
        code: data.code,
        name: data.name,
        parent: data.parent ?? null,
        type: data.type,
        report_classification: data.report_classification,
        is_active: data.is_active,
      })
      router.push("/finance/accounts/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <AppHeader
        title="Nova conta contábil"
        subtitle="Plano de contas"
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
            <CardDescription>NOVA CONTA</CardDescription>
            <Separator />
            <form className="mt-4">
              <FormSection title="IDENTIFICAÇÃO" columns={2}>
                <Field>
                  <FieldLabel htmlFor="code">Código</FieldLabel>
                  <Input
                    id="code"
                    placeholder="Ex.: 2.1.4"
                    {...form.register("code")}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="name">Nome</FieldLabel>
                  <Input
                    id="name"
                    placeholder="Ex.: Taxa de limpeza"
                    {...form.register("name")}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="parent">Conta pai (opcional)</FieldLabel>
                  <Controller
                    control={control}
                    name="parent"
                    render={({ field }) => (
                      <Select
                        value={field.value ? String(field.value) : "none"}
                        onValueChange={(value) =>
                          field.onChange(value === "none" ? null : Number(value))
                        }
                      >
                        <SelectTrigger id="parent">
                          <SelectValue placeholder="Selecionar conta pai..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">— (raiz)</SelectItem>
                          {accounts
                            .filter(
                              (a) => a.parent === null || a.parent === undefined,
                            )
                            .map((a) => (
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
                  <FieldLabel htmlFor="type">Tipo</FieldLabel>
                  <Controller
                    control={control}
                    name="type"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) =>
                          field.onChange(value as "ENTRIES" | "EXPENSES")
                        }
                      >
                        <SelectTrigger id="type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ENTRIES">Entradas (Receita)</SelectItem>
                          <SelectItem value="EXPENSES">Saídas (Despesa)</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="report_classification">
                    Classificação nos relatórios
                  </FieldLabel>
                  <Controller
                    control={control}
                    name="report_classification"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) =>
                          field.onChange(
                            value as "DRE_DFC" | "DFC_ONLY" | "DRE_ONLY",
                          )
                        }
                      >
                        <SelectTrigger id="report_classification">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DRE_DFC">DRE e DFC</SelectItem>
                          <SelectItem value="DFC_ONLY">Apenas DFC</SelectItem>
                          <SelectItem value="DRE_ONLY">Apenas DRE</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="is_active">Ativa</FieldLabel>
                  <Controller
                    control={control}
                    name="is_active"
                    render={({ field }) => (
                      <Switch
                        id="is_active"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
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
