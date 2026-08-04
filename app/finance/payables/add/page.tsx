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
        title="Nova despesa"
        subtitle="Lançar conta a pagar"
        actions={
          <>
            <Link href="/finance/payables">
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
              <CardDescription>DADOS DA DESPESA</CardDescription>
              <Separator />
                <FieldGroup className="mt-3 grid grid-cols-2 min-w-full">
                    <Field>
                        <FieldLabel htmlFor="desc">Descrição</FieldLabel>
                        <Input id="desc" placeholder="Ex: IPTU Casa Jardim Europa"/>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="property">Imóvel (opcional)</FieldLabel>
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

                    <Field>
                        <FieldLabel htmlFor="vencimento">Data de vencimento</FieldLabel>
                        <Popover>
                            <PopoverTrigger 
                                render={
                                <Button 
                                    variant="outline" 
                                    data-empty={!date}
                                    className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                                />
                                }
                            >
                                <CalendarIcon />
                                {date ? format(date, "PPP", {locale: ptBR}) : <span>dd/mm/aaaa</span>}
                            </PopoverTrigger>
                            <PopoverContent>
                                <Calendar mode="single" selected={date} onSelect={setDate} locale={ptBR}/>
                            </PopoverContent>
                        </Popover>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="recorrente">Recorrente?</FieldLabel>
                        <Select id="recorrente">
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder="Não" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Mensal</SelectItem>
                                <SelectItem value="2">Anual</SelectItem>
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
