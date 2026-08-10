import AppHeader from "@/components/app-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Field, FieldLabel  } from "@/components/ui/field"
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


export default function Page() {
  return (
    <>
      <AppHeader 
        title="Novo imóvel"
        subtitle="Cadastro de propriedade"
        actions={
            <>
            <Link href="/properties">
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
        <Card className="flex-1 p-3">
            <CardContent>
                <form>
                    <FormSection title="INFORMAÇÕES BÁSICAS">
                        <Field>
                            <FieldLabel htmlFor="description">Nome/identificação</FieldLabel>
                            <Input id="description" placeholder="Ex: Casa Jardim Europa"/>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="tipoCasa">Tipo de imóvel</FieldLabel>
                            <Select id="tipoCasa">
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Selecionar..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="r">Residencial</SelectItem>
                                    <SelectItem value="c">Comercial</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="street">Rua</FieldLabel>
                            <Input id="street" placeholder="Ex: Rua Manoel Mendes"/>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="numero">Número</FieldLabel>
                            <Input id="numero" placeholder="Ex: 1985"/>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="description">Bairro</FieldLabel>
                            <Input id="description" placeholder="Ex: Jardim Europa"/>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="area">Área (m2)</FieldLabel>
                            <Input id="area" placeholder="0"/>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="area">Matrícula</FieldLabel>
                            <Input id="area" placeholder="N° matrícula cartório"/>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="area">IPTU anual (R$)</FieldLabel>
                            <Input id="area" placeholder="0,00"/>
                        </Field>
                    </FormSection>
                
                    <FormSection title="VALORES FINANCEIROS" className="mt-3" columns={3}>
                        <Field>
                            <FieldLabel htmlFor="value">Valor de compra (R$)</FieldLabel>
                            <Input id="value" placeholder="0,00"/>
                        </Field>
                        <DatePickerField label="Data de aquisicação" id="aquisicao"/>
                        <Field>
                            <FieldLabel htmlFor="newValue">Valor atual estimado (R$)</FieldLabel>
                            <Input id="newValue" placeholder="0,00"/>
                        </Field>
                    </FormSection>
                </form>
            </CardContent>
        </Card>
      </div>
    </>
  )
}
