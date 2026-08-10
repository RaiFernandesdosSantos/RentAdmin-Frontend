import AppHeader from "@/components/app-header"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { DatePickerField } from "@/components/date-picker"
import { FormSection } from "@/components/form-section"

export default function Page() {
  return (
    <>
      <AppHeader 
        title="Novo inquilino / fiador"
        subtitle="Cadastrar pessoa"
        actions={
          <>
            <Link href="/contracts/">
              <Button variant="outline" size="sm">
                Cancelar
              </Button>
            </Link>

            <Button variant="outline" size="sm">
              Salvar
            </Button>
          </>
        }
      />

      <div className="min-h-svh p-4">
        <Card>
          <CardContent>
            <form action="">
              <FormSection title="PARTES">
                <Field>
                      <FieldLabel htmlFor="property">Imóvel</FieldLabel>
                      <Select id="property">
                          <SelectTrigger className="w-32">
                              <SelectValue placeholder="Selecionar imóvel..." />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="1">Casa Jardim Europa</SelectItem>
                              <SelectItem value="2">Casa Vila Nova</SelectItem>
                          </SelectContent>
                      </Select>
                  </Field>

                  <Field>
                      <FieldLabel htmlFor="tenant">Inquilino</FieldLabel>
                      <Select id="tenant">
                          <SelectTrigger className="w-32">
                              <SelectValue placeholder="Selecionar inquilino..." />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="1">João Miguel</SelectItem>
                              <SelectItem value="2">Felipe Tito</SelectItem>
                          </SelectContent>
                      </Select>
                  </Field>

                  <Field>
                      <FieldLabel htmlFor="guarantor">Fiador</FieldLabel>
                      <Select id="guarantor">
                          <SelectTrigger className="w-32">
                              <SelectValue placeholder="Sem fiador" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="1">João Miguel</SelectItem>
                              <SelectItem value="2">Felipe Tito</SelectItem>
                          </SelectContent>
                      </Select>
                  </Field>
                </FormSection>

              <FormSection title="PERÍODO E VALORES" className="mt-3">
                <DatePickerField 
                  label="Data de início"
                  id="inicio"
                />
                <DatePickerField 
                  label="Data de vencimento"
                  id="vencimento"
                />
                <Field>
                  <FieldLabel htmlFor="rent">Aluguel mensal (R$)</FieldLabel>
                  <Input id="rent" placeholder="0,00"/>
                </Field>
                <Field>
                  <FieldLabel htmlFor="caucao">Caução (R$)</FieldLabel>
                  <Input id="caucao" placeholder="0,00 (opcional)"/>
                </Field>
              </FormSection>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
