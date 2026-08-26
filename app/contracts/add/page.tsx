"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

import AppHeader from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

import { contractsService } from "@/src/services/contracts"
import { TenantService } from "@/src/services/tenants"
import { PropertyService } from "@/src/services/properties"
import type { Property } from "@/src/types/property"
import type { Tenant } from "@/src/types/tenant"

const contractSchema = z.object({
  property: z.number().min(1, { message: "Imovel obrigatorio" }),
  tenant: z.number().min(1, { message: "Inquilino obrigatorio" }),
  guarantor: z.number().nullable().optional(),
  monthly_rent: z.string().min(1, { message: "Valor do aluguel obrigatório" }),
  security_deposit: z.string().nullable().optional(),
  due_day: z.number().min(1),
  start_date: z.string().min(1, { message: "Data de início obrigatória" }),
  end_date: z.string().min(1, { message: "Data de vencimento obrigatória" }),
})

type ContractFormData = z.infer<typeof contractSchema>

export default function Page() {
  const router = useRouter()

  const [properties, setProperties] = useState<Property[]>([])
  const [tenants, setTenants] = useState<Tenant[]>([])

  // busca os dados pra popular os selects
  useEffect(() => {
    PropertyService.list().then(setProperties)
    TenantService.list().then(setTenants)
  }, [])

  const form = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      due_day: 5,
      guarantor: null,
      security_deposit: null,
      start_date: new Date().toISOString().split("T")[0],
    },
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  async function onSubmit(data: ContractFormData) {
    try {
      await contractsService.create(data)
      router.push("/contracts/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <AppHeader
        title="Novo contrato"
        subtitle="Registrar locação"
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
            <div>
              <FormSection title="PARTES">
                {/* Select de imóvel */}
                <Field>
                  <FieldLabel>Imóvel</FieldLabel>
                  <Controller
                    control={control}
                    name="property"
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={field.value?.toString()}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar imóvel..." />
                        </SelectTrigger>
                        <SelectContent>
                          {properties.map((property) => (
                            <SelectItem
                              key={property.id}
                              value={property.id.toString()}
                            >
                              {property.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.property && (
                    <p className="text-sm text-red-600">
                      {errors.property.message}
                    </p>
                  )}
                </Field>

                {/* Select de inquilino */}
                <Field>
                  <FieldLabel>Inquilino</FieldLabel>
                  <Controller
                    control={control}
                    name="tenant"
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={field.value?.toString()}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar inquilino..." />
                        </SelectTrigger>
                        <SelectContent>
                          {tenants.map((tenant) => (
                            <SelectItem
                              key={tenant.id}
                              value={tenant.id.toString()}
                            >
                              {tenant.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.tenant && (
                    <p className="text-sm text-red-600">
                      {errors.tenant.message}
                    </p>
                  )}
                </Field>

                {/* Select de fiador — opcional */}
                <Field>
                  <FieldLabel>Fiador (opcional)</FieldLabel>
                  <Controller
                    control={control}
                    name="guarantor"
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) =>
                          field.onChange(
                            value === "none" ? null : Number(value)
                          )
                        }
                        defaultValue={field.value?.toString() ?? "none"}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sem fiador" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Sem fiador</SelectItem>
                          {tenants.map((tenant) => (
                            <SelectItem
                              key={tenant.id}
                              value={tenant.id.toString()}
                            >
                              {tenant.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
              </FormSection>

              <FormSection title="PERÍODO E VALORES" className="mt-3">
                {/* Data de início */}
                <Controller
                  control={control}
                  name="start_date"
                  render={({ field }) => (
                    <DatePickerField
                      label="Data de início"
                      id="start_date"
                      value={field.value ? new Date(field.value) : undefined}
                      onChange={(date) =>
                        field.onChange(date?.toISOString().split("T")[0])
                      }
                    />
                  )}
                />
                {errors.start_date && (
                  <p className="text-sm text-red-600">
                    {errors.start_date.message}
                  </p>
                )}

                {/* Data de vencimento */}
                <Controller
                  control={control}
                  name="end_date"
                  render={({ field }) => (
                    <DatePickerField
                      label="Data de vencimento"
                      id="end_date"
                      value={field.value ? new Date(field.value) : undefined}
                      onChange={(date) =>
                        field.onChange(date?.toISOString().split("T")[0])
                      }
                    />
                  )}
                />
                {errors.end_date && (
                  <p className="text-sm text-red-600">
                    {errors.end_date.message}
                  </p>
                )}

                {/* Aluguel */}
                <Field>
                  <FieldLabel htmlFor="monthly_rent">
                    Aluguel mensal (R$)
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

                {/* Caução */}
                <Field>
                  <FieldLabel htmlFor="security_deposit">
                    Caução (R$)
                  </FieldLabel>
                  <Input
                    id="security_deposit"
                    placeholder="0,00 (opcional)"
                    {...register("security_deposit")}
                  />
                </Field>

                {/* Dia de vencimento */}
                <Field>
                  <FieldLabel htmlFor="due_day">
                    Dia de vencimento mensal
                  </FieldLabel>
                  <Input
                    id="due_day"
                    type="number"
                    placeholder="Ex: 5"
                    {...register("due_day", { valueAsNumber: true })}
                  />
                  {errors.due_day && (
                    <p className="text-sm text-red-600">
                      {errors.due_day.message}
                    </p>
                  )}
                </Field>
              </FormSection>

              {/* exibe erros gerais de validação */}
              {Object.keys(errors).length > 0 && (
                <div className="mt-4 rounded border border-red-200 bg-red-50 p-3">
                  <p className="mb-1 text-sm font-medium text-red-600">
                    Corrija os erros antes de salvar:
                  </p>
                  {Object.entries(errors).map(([field, error]) => (
                    <p key={field} className="text-sm text-red-500">
                      {field}: {error?.message as string}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
