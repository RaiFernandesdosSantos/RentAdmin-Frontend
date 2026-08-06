'use client'

import AppHeader from "@/components/app-header"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Field, FieldLabel, FieldGroup, FieldContent, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

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
              <CardDescription>DADOS DA CONTA</CardDescription>
              <Separator />
                <FieldGroup className="mt-3 grid grid-cols-2 min-w-full">
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
                </FieldGroup>

                <Field orientation="horizontal" className="flex-1 mt-5">
                    <FieldContent>
                        <FieldLabel htmlFor="switch-focus-mode">
                            Conta ativa
                        </FieldLabel>
                        <FieldDescription>
                            Desativar oculta a conta dos relátorios
                        </FieldDescription>
                    </FieldContent>
                    <Switch id="switch-focus-mode" defaultChecked/>
                </Field>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
