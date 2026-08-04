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
    const [dateInicio, setDateInicio] = useState<Date>()
    const [dateFim, setDateFim] = useState<Date>()

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
              <CardDescription>PARTES</CardDescription>
              <Separator />

                <FieldGroup className="mt-3 grid grid-cols-2 min-w-full">
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
                </FieldGroup>
              

              <CardDescription className="mt-3">PERÍODO E VALORES</CardDescription>
              <Separator />

              <FieldGroup className="grid min-w-full grid-cols-2 mt-3">
                <Field>
                    <FieldLabel htmlFor="dateInicio">Data de início</FieldLabel>
                    <Popover>
                        <PopoverTrigger 
                            render={
                            <Button 
                                variant="outline" 
                                data-empty={!dateInicio}
                                className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                            />
                            }
                        >
                            <CalendarIcon />
                            {dateInicio ? format(dateInicio, "PPP", {locale: ptBR}) : <span>dd/mm/aaaa</span>}
                        </PopoverTrigger>
                        <PopoverContent>
                            <Calendar mode="single" selected={dateInicio} onSelect={setDateInicio} locale={ptBR}/>
                        </PopoverContent>
                    </Popover>
                </Field>
                <Field>
                    <FieldLabel htmlFor="vencimento">Data de vencimento</FieldLabel>
                    <Popover>
                        <PopoverTrigger 
                            render={
                            <Button 
                                variant="outline" 
                                data-empty={!dateFim}
                                className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                            />
                            }
                        >
                            <CalendarIcon />
                            {dateFim ? format(dateFim, "PPP", {locale: ptBR}) : <span>dd/mm/aaaa</span>}
                        </PopoverTrigger>
                        <PopoverContent>
                            <Calendar mode="single" selected={dateFim} onSelect={setDateFim} locale={ptBR}/>
                        </PopoverContent>
                    </Popover>
                </Field>
                <Field>
                  <FieldLabel htmlFor="rent">Aluguel mensal (R$)</FieldLabel>
                  <Input id="rent" placeholder="0,00"/>
                </Field>
                <Field>
                  <FieldLabel htmlFor="caucao">Caução (R$)</FieldLabel>
                  <Input id="caucao" placeholder="0,00 (opcional)"/>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
