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
        title="Nova cobrança"
        subtitle="Lançar conta a receber"
        actions={
          <>
            <Link href="/finance/receivables">
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
              <FormSection title="DADOS DA COBRANÇA">
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
                    <FieldLabel htmlFor="account">Categoria (plano de contas)</FieldLabel>
                    <Select id="account">
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="3.1.1 Aluguel" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">3.1.2</SelectItem>
                            <SelectItem value="2">3.1.3</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>

                <Field>
                    <FieldLabel htmlFor="valor">Valor (R$)</FieldLabel>
                    <Input id="valor" placeholder="0,00"/>
                </Field>

                <DatePickerField 
                    label="Data de vencimento"
                    id="vencimento"
                />
              </FormSection>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
