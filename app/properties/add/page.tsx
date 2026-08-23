"use client"

import AppHeader from "@/components/app-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePickerField } from "@/components/date-picker"
import { FormSection } from "@/components/form-section"
import { PropertyService } from "@/src/services/properties"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { useRouter } from "next/navigation"
import { Controller } from "react-hook-form"

const propertySchema = z.object({
  description: z.string().min(1, { message: "Descrição obrigatoria " }),
  property_type: z.number().min(1, { message: "Tipo obrigatorio" }),
  street: z.string().min(1, { message: "Endereço obrigatorio" }),
  number: z.string().min(1, { message: "Endereço obrigatorio" }),
  neighborhood: z.string().min(1, { message: "Endereço obrigatorio" }),
  registration: z
    .string()
    .min(1, { message: "Número de registro do imóvel obrigatorio" }),
  zip_code: z.string().min(1, { message: "Endereço obrigatorio" }),
  acquisition_price: z.string().nullable().optional(),
  acquisition_date: z.string().nullable().optional(),
  actual_value: z.string().nullable().optional(),
  square_meters: z
    .string()
    .min(1, { message: "Metragem do terreno/construção obrigatorio" }),
  number_of_bedrooms: z.number().nullable().optional(),
  number_of_bathrooms: z.number().nullable().optional(),
  garage_spaces: z.number().nullable().optional(),
  status: z.number(),
  sold_price: z.string().nullable().optional(),
})

type PropertyFormData = z.infer<typeof propertySchema>

export default function Page() {
  const router = useRouter()

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      property_type: 1,
      status: 0,
      sold_price: null,
    },
  })

  console.log("erros de validação:", form.formState.errors)

  async function onSubmit(data: PropertyFormData) {
    console.log("onSubmit chamado com:", data)
    try {
      await PropertyService.create(data)
      router.push("/properties/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <AppHeader
        title="Novo imóvel"
        subtitle="Cadastro de propriedade"
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              Cancelar
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                console.log("botão clicado")
                console.log("valores atuais do form:", form.getValues())
                form.handleSubmit(onSubmit)()
              }}
            >
              Salvar
            </Button>
          </>
        }
      />

      <div className="min-h-svh p-4">
        <Card className="flex-1 p-3">
          <CardContent>
            <FormSection title="INFORMAÇÕES BÁSICAS">
              <Field>
                <FieldLabel htmlFor="description">
                  Nome/identificação
                </FieldLabel>
                <Input
                  id="description"
                  placeholder="Ex: Casa Jardim Europa"
                  {...form.register("description")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="type">Tipo de imóvel</FieldLabel>
                <Controller
                  control={form.control}
                  name="property_type"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Selecionar..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={1}>
                          <span>Residencial</span>
                        </SelectItem>
                        <SelectItem value={2}>Comercial</SelectItem>
                        <SelectItem value={0}>Terreno</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="street">Rua</FieldLabel>
                <Input
                  id="street"
                  placeholder="Ex: Rua Manoel Mendes"
                  {...form.register("street")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="number">Número</FieldLabel>
                <Input
                  id="number"
                  placeholder="Ex: 1985"
                  {...form.register("number")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="neighborhood">Bairro</FieldLabel>
                <Input
                  id="neighborhood"
                  placeholder="Ex: Jardim Europa"
                  {...form.register("neighborhood")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="zip_code">CEP</FieldLabel>
                <Input
                  id="zip_code"
                  placeholder="Ex: 79600-000"
                  {...form.register("zip_code")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="square_meters">Área (m2)</FieldLabel>
                <Input
                  id="square_meters"
                  placeholder="0"
                  {...form.register("square_meters")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="number_of_bedrooms">
                  Número de quartos
                </FieldLabel>
                <Input
                  id="number_of_bedrooms"
                  placeholder="Ex.: 3"
                  {...form.register("number_of_bedrooms", {
                    valueAsNumber: true,
                  })}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="number_of_bathrooms">
                  Número de banheiros
                </FieldLabel>
                <Input
                  id="number_of_bathrooms"
                  placeholder="Ex.: 5"
                  {...form.register("number_of_bathrooms", {
                    valueAsNumber: true,
                  })}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="garage_spaces">
                  Espaços na garagem
                </FieldLabel>
                <Input
                  id="garage_spaces"
                  placeholder="Ex.: 2 (carros)"
                  {...form.register("garage_spaces", { valueAsNumber: true })}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="registration">Matrícula</FieldLabel>
                <Input
                  id="registration"
                  placeholder="N° matrícula cartório"
                  {...form.register("registration")}
                />
              </Field>
            </FormSection>

            <FormSection
              title="VALORES FINANCEIROS"
              className="mt-3"
              columns={3}
            >
              <Field>
                <FieldLabel htmlFor="acquisition_price">
                  Valor de compra (R$)
                </FieldLabel>
                <Input
                  id="acquisition_price"
                  placeholder="0,00"
                  {...form.register("acquisition_price")}
                />
              </Field>
              <DatePickerField label="Data de aquisicação" id="aquisicao" />
              <Field>
                <FieldLabel htmlFor="actual_value">
                  Valor atual estimado (R$)
                </FieldLabel>
                <Input
                  id="actual_value"
                  placeholder="0,00"
                  {...form.register("actual_value")}
                />
              </Field>
            </FormSection>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
