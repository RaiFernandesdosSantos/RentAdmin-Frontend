import AppHeader from "@/components/app-header"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FormSection } from "@/components/form-section"

export default function Page() {
  return (
    <>
      <AppHeader 
        title="Nova conta bancária"
        subtitle="Cadastrar conta"
        actions={
          <>
            <Link href="/finance/">
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
                        <FieldLabel htmlFor="conta">Nome/apelido</FieldLabel>
                        <Input id="conta" placeholder="Ex: Nubank, Itaú Principal"/>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="conta">Conta-corrente</FieldLabel>
                        <Input id="conta" placeholder="4894894"/>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="conta">Agência</FieldLabel>
                        <Input id="conta" placeholder="0000"/>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="conta">Saldo inicial (R$)</FieldLabel>
                        <Input id="conta" placeholder="0,00"/>
                    </Field>
              </FormSection>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
