"use client"

import AppHeader from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Field, FieldLabel } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { FormSection } from "@/components/form-section"
import { TenantService } from "@/src/services/tenants"
import { useForm, Controller } from "react-hook-form"
import z from "zod"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"

const tenantSchema = z.object({
  name: z.string().min(1, { message: "Nome obrigatorio" }),
  cpf: z.string().min(1, { message: "CPF obrigatorio" }),
  email: z.string().nullable().optional(),
  phone_number: z.string().min(1, { message: "Telefone obrigatorio" }),
  guarantor: z.boolean(),
  profession: z.string().min(1, { message: "Profissão obrigatoria" }),
  monthly_income: z.number().min(1, { message: "Renda mensal obrigatoria" }),
  zip_code: z.string().nullable().optional(),
  street: z.string().nullable().optional(),
  number: z.string().nullable().optional(),
  neighborhood: z.string().nullable().optional(),
  is_active: z.boolean(),
})

type TenantFormData = z.infer<typeof tenantSchema>

export default function Page() {
  const router = useRouter()

  const form = useForm<TenantFormData>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      guarantor: false,
      is_active: true,
    },
  })

  async function onSubmit(data: TenantFormData) {
    try {
      await TenantService.create(data)
      router.push("/tenants/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <AppHeader
        title="Novo inquilino / fiador"
        subtitle="Cadastrar pessoa"
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              Cancelar
            </Button>

            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={form.handleSubmit(onSubmit)}
            >
              Salvar
            </Button>
          </>
        }
      />

      <div className="min-h-svh p-4">
        <Card>
          <CardContent>
            <CardDescription>TIPO</CardDescription>
            <Separator />
            <Controller
              control={form.control}
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
            <FormSection title="DADOS PESSOAIS" className="mt-3">
              <Field>
                <FieldLabel htmlFor="nome">Nome completo</FieldLabel>
                <Input
                  id="nome"
                  {...form.register("name")}
                  placeholder="Nome completo"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="cpf">CPF</FieldLabel>
                <Input
                  id="cpf"
                  {...form.register("cpf")}
                  placeholder="000.000.000-00"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="fone">Telefone</FieldLabel>
                <Input
                  id="fone"
                  {...form.register("phone_number")}
                  placeholder="(00) 9 0000-0000"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                <Input
                  id="email"
                  {...form.register("email")}
                  placeholder="email@exemplo.com"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="profissao">Profissão</FieldLabel>
                <Input
                  id="profissao"
                  {...form.register("profession")}
                  placeholder="Profissão"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="renda">Renda mensal (R$)</FieldLabel>
                <Input
                  id="renda"
                  {...form.register("monthly_income", { valueAsNumber: true })}
                  placeholder="0,00"
                />
              </Field>
            </FormSection>

            <FormSection title="ENDEREÇO" className="mt-3">
              <Field>
                <FieldLabel htmlFor="cep">CEP</FieldLabel>
                <Input
                  id="cep"
                  {...form.register("zip_code")}
                  placeholder="00.000-000"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="rua">Rua / Avenida / Viela</FieldLabel>
                <Input
                  id="rua"
                  {...form.register("street")}
                  placeholder="Rua, Avenida..."
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="number">Número</FieldLabel>
                <Input
                  id="number"
                  {...form.register("number")}
                  placeholder="n°"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="bairro">Bairro</FieldLabel>
                <Input
                  id="bairro"
                  {...form.register("neighborhood")}
                  placeholder="Bairro"
                />
              </Field>
            </FormSection>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
