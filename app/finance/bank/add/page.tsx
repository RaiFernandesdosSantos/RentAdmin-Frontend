'use client'

import AppHeader from "@/components/app-header"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { ptBR } from "date-fns/locale"

export default function Page() {
    const [date, setDate] = useState<Date>()

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
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
