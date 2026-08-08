import AppHeader from "@/components/app-header"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { FormSection } from "@/components/form-section"

export default function Page() {
  return (
    <>
      <AppHeader 
        title="Nova conta"
        subtitle="Plano de contas"
        actions={
          <>
            <Link href="/finance/accounts/">
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
              <FormSection title="DADOS DA CONTA">
                <Field>
                      <FieldLabel htmlFor="tenant">Conta pai (opcional)</FieldLabel>
                      <Select id="tenant">
                          <SelectTrigger className="w-32">
                              <SelectValue placeholder="Raiz (conta principal)" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="1">3.1 - Receitas</SelectItem>
                              <SelectItem value="2">4.1 - Despesas</SelectItem>
                          </SelectContent>
                      </Select>
                  </Field>

                  <Field>
                      <FieldLabel htmlFor="valor">Nome da conta</FieldLabel>
                      <Input id="valor" placeholder="Ex: IPTU, Aluguel Residencial"/>
                  </Field>

                  <Field>
                      <FieldLabel htmlFor="property">Tipo</FieldLabel>
                      <Select id="property">
                          <SelectTrigger className="w-32">
                              <SelectValue placeholder="Receita" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="1">Receita</SelectItem>
                              <SelectItem value="2">Despesa</SelectItem>
                          </SelectContent>
                      </Select>
                  </Field>

                  <Field>
                      <FieldLabel htmlFor="account">Classificação DRE/DFC</FieldLabel>
                      <Select id="account">
                          <SelectTrigger className="w-32">
                              <SelectValue placeholder="Entra no DRE e DFC" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="1">Apenas DFC (não operacional)</SelectItem>
                              <SelectItem value="2">Apenas DRE</SelectItem>
                          </SelectContent>
                      </Select>
                  </Field>
                </FormSection>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
