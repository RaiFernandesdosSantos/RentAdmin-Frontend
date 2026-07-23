import AppHeader from "@/components/app-header"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function Page() {
  return (
    <>
      <AppHeader 
        title="Novo inquilino / fiador"
        subtitle="Cadastrar pessoa"
        actions={
          <>
            <Link href="/tenants/">
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
              <CardDescription>TIPO</CardDescription>
              <Separator />

              <RadioGroup defaultValue="loc" className="mt-3 flex flex-row">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="loc" id="loc" />
                  <Label htmlFor="loc">Locatário</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="fia" id="fia" />
                  <Label htmlFor="fia">Fiador</Label>
                </div>
              </RadioGroup>

              <CardDescription className="mt-3">DADOS PESSOAIS</CardDescription>
              <Separator />

              <FieldGroup className="grid min-w-full grid-cols-2 mt-3">
                <Field>
                  <FieldLabel htmlFor="nome">Nome completo</FieldLabel>
                  <Input id="nome" placeholder="Nome completo"/>
                </Field>
                <Field>
                  <FieldLabel htmlFor="cpf">CPF</FieldLabel>
                  <Input id="cpf" placeholder="000.000.000-00"/>
                </Field>
                <Field>
                  <FieldLabel htmlFor="fone">Telefone</FieldLabel>
                  <Input id="fone" placeholder="(00) 9 0000-0000"/>
                </Field>
                <Field>
                  <FieldLabel htmlFor="profissao">Profissão</FieldLabel>
                  <Input id="profissao" placeholder="Profissão"/>
                </Field>
                <Field>
                  <FieldLabel htmlFor="renda">Renda mensal (R$)</FieldLabel>
                  <Input id="renda" placeholder="0,00"/>
                </Field>
              </FieldGroup>

              <CardDescription className="mt-3">ENDEREÇO</CardDescription>
              <Separator />

              <FieldGroup className="grid min-w-full grid-cols-2 mt-3">
                <Field>
                  <FieldLabel htmlFor="cep">CEP</FieldLabel>
                  <Input id="cep" placeholder="00.000-000"/>
                </Field>
                <Field>
                  <FieldLabel htmlFor="rua">Rua / Avenida / Viela</FieldLabel>
                  <Input id="rua" placeholder="Rua, Avenida..."/>
                </Field>
                <Field>
                  <FieldLabel htmlFor="number">Número</FieldLabel>
                  <Input id="number" placeholder="n°"/>
                </Field>
                <Field>
                  <FieldLabel htmlFor="bairro">Bairro</FieldLabel>
                  <Input id="bairro" placeholder="Bairro"/>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
