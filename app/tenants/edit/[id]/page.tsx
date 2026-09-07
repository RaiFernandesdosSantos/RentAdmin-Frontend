"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

import AppHeader from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { FormSection } from "@/components/form-section"
import { TenantService } from "@/src/services/tenants"

const tenantSchema = z.object({
  name: z.string().min(1, { message: "Nome obrigatório" }),
  cpf: z.string().min(1, { message: "CPF obrigatório" }),
  phone_number: z.string().min(1, { message: "Telefone obrigatório" }),
  email: z.string().nullable().optional(),
  profession: z.string().min(1, { message: "Profissão obrigatória" }),
  monthly_income: z.number().min(1, { message: "Renda obrigatória" }),
  guarantor: z.boolean(),
  is_active: z.boolean(),
})

type TenantFormData = z.infer<typeof tenantSchema>

export default function Page() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id) // pega o id da rota diretamente
  const [loading, setLoading] = useState(true)

  const form = useForm<TenantFormData>({
    resolver: zodResolver(tenantSchema),
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  // busca os dados do inquilino e popula o form
  useEffect(() => {
    TenantService.get(id)
      .then((tenant) => {
        form.reset({
          name: tenant.name,
          cpf: tenant.cpf,
          phone_number: tenant.phone_number,
          email: tenant.email,
          profession: tenant.profession,
          monthly_income: tenant.monthly_income,
          guarantor: tenant.guarantor,
          is_active: tenant.is_active,
        })
      })
      .finally(() => setLoading(false))
  }, [id])

  async function onSubmit(data: TenantFormData) {
    try {
      await TenantService.update(id, data)
      router.push(`/tenants/${id}/`)
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return <div className="p-4">Carregando...</div>

  return (
    <>
      <AppHeader
        title="Editar inquilino"
        subtitle="Atualizar dados"
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
            <FormSection title="TIPO">
              <Controller
                control={control}
                name="guarantor"
                render={({ field }) => (
                  <RadioGroup
                    defaultValue={String(field.value)}
                    className="mt-3 flex flex-row"
                    onValueChange={(value) => field.onChange(value === "true")}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="false" id="loc" />
                      <Label htmlFor="loc">Locatário</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="true" id="fia" />
                      <Label htmlFor="fia">Fiador</Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </FormSection>

            <FormSection title="DADOS PESSOAIS" className="mt-3">
              <Field>
                <FieldLabel htmlFor="name">Nome completo</FieldLabel>
                <Input
                  id="name"
                  placeholder="Nome completo"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="cpf">CPF</FieldLabel>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  {...register("cpf")}
                />
                {errors.cpf && (
                  <p className="text-sm text-red-600">{errors.cpf.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="phone_number">Telefone</FieldLabel>
                <Input
                  id="phone_number"
                  placeholder="(00) 9 0000-0000"
                  {...register("phone_number")}
                />
                {errors.phone_number && (
                  <p className="text-sm text-red-600">
                    {errors.phone_number.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                <Input
                  id="email"
                  placeholder="email@exemplo.com"
                  {...register("email")}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="profession">Profissão</FieldLabel>
                <Input
                  id="profession"
                  placeholder="Profissão"
                  {...register("profession")}
                />
                {errors.profession && (
                  <p className="text-sm text-red-600">
                    {errors.profession.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="monthly_income">
                  Renda mensal (R$)
                </FieldLabel>
                <Input
                  id="monthly_income"
                  placeholder="0,00"
                  {...register("monthly_income", { valueAsNumber: true })}
                />
                {errors.monthly_income && (
                  <p className="text-sm text-red-600">
                    {errors.monthly_income.message}
                  </p>
                )}
              </Field>
            </FormSection>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
