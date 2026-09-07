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
import { FormSection } from "@/components/form-section"
import { PropertyService } from "@/src/services/properties"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { useRouter, useParams } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { useEffect, useState } from "react"

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
  const params = useParams()
  const id = Number(params.id)
  const [loading, setLoading] = useState(true)

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  useEffect(() => {
    PropertyService.get(id)
      .then((property) => {
        form.reset({
          description: property.description,
          property_type: property.property_type,
          street: property.street,
          number: property.number,
          neighborhood: property.neighborhood,
          registration: property.registration,
          zip_code: property.zip_code,
          actual_value: property.actual_value,
          square_meters: property.square_meters,
          number_of_bathrooms: property.number_of_bathrooms,
          number_of_bedrooms: property.number_of_bedrooms,
          garage_spaces: property.garage_spaces,
          status: property.status,
          sold_price: property.sold_price,
        })
      })
      .finally(() => setLoading(false))
  }, [id])

  async function onSubmit(data: PropertyFormData) {
    try {
      await PropertyService.update(id, data)
      router.push(`/properties/${id}/`)
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return <div className="p-4">Carregando...</div>

  return (
    <>
      <AppHeader
        title="Edita imóvel"
        subtitle="Atualizar dados"
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              Cancelar
            </Button>

            <Button
              type="button"
              variant="outline"
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
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="type">Tipo de imóvel</FieldLabel>
                <Controller
                  control={control}
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
                  {...register("street")}
                />
                {errors.street && (
                  <p className="text-sm text-red-600">
                    {errors.street.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="number">Número</FieldLabel>
                <Input
                  id="number"
                  placeholder="Ex: 1985"
                  {...register("number")}
                />
                {errors.number && (
                  <p className="text-sm text-red-600">
                    {errors.number.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="neighborhood">Bairro</FieldLabel>
                <Input
                  id="neighborhood"
                  placeholder="Ex: Jardim Europa"
                  {...register("neighborhood")}
                />
                {errors.neighborhood && (
                  <p className="text-sm text-red-600">
                    {errors.neighborhood.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="zip_code">CEP</FieldLabel>
                <Input
                  id="zip_code"
                  placeholder="Ex: 79600-000"
                  {...register("zip_code")}
                />
                {errors.zip_code && (
                  <p className="text-sm text-red-600">
                    {errors.zip_code.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="square_meters">Área (m2)</FieldLabel>
                <Input
                  id="square_meters"
                  placeholder="0"
                  {...register("square_meters")}
                />
                {errors.square_meters && (
                  <p className="text-sm text-red-600">
                    {errors.square_meters.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="number_of_bedrooms">
                  Número de quartos
                </FieldLabel>
                <Input
                  id="number_of_bedrooms"
                  placeholder="Ex.: 3"
                  {...register("number_of_bedrooms", {
                    valueAsNumber: true,
                  })}
                />
                {errors.number_of_bedrooms && (
                  <p className="text-sm text-red-600">
                    {errors.number_of_bedrooms.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="number_of_bathrooms">
                  Número de banheiros
                </FieldLabel>
                <Input
                  id="number_of_bathrooms"
                  placeholder="Ex.: 5"
                  {...register("number_of_bathrooms", {
                    valueAsNumber: true,
                  })}
                />
                {errors.number_of_bathrooms && (
                  <p className="text-sm text-red-600">
                    {errors.number_of_bathrooms.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="garage_spaces">
                  Espaços na garagem
                </FieldLabel>
                <Input
                  id="garage_spaces"
                  placeholder="Ex.: 2 (carros)"
                  {...register("garage_spaces", { valueAsNumber: true })}
                />
                {errors.garage_spaces && (
                  <p className="text-sm text-red-600">
                    {errors.garage_spaces.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="registration">Matrícula</FieldLabel>
                <Input
                  id="registration"
                  placeholder="N° matrícula cartório"
                  {...register("registration")}
                />
                {errors.registration && (
                  <p className="text-sm text-red-600">
                    {errors.registration.message}
                  </p>
                )}
              </Field>
            </FormSection>

            <FormSection
              title="VALORES FINANCEIROS"
              className="mt-3"
              columns={1}
            >
              <Field>
                <FieldLabel htmlFor="actual_value">
                  Valor atual estimado (R$)
                </FieldLabel>
                <Input
                  id="actual_value"
                  placeholder="0,00"
                  {...register("actual_value")}
                />
                {errors.actual_value && (
                  <p className="text-sm text-red-600">
                    {errors.actual_value.message}
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
