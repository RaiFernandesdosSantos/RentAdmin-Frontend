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
              <CardDescription>DADOS DA CONTA</CardDescription>
              <Separator />
                <FieldGroup className="mt-3 grid grid-cols-2 min-w-full">
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
                </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
