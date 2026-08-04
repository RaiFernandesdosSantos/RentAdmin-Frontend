"use client"

import AppHeader from "@/components/app-header"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

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
        title="Contrato - Casa Jardim Europa"
        subtitle="João Silva - Ativo"
        actions={
          <>
            <Link href="/contracts/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>

            <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4"/>
                Confirmar Renovação
            </Button>
          </>
        }
      />

      <div className="min-h-svh p-4 flex gap-5">
        <div className="w-1/2">
          <Card>
            <CardContent>
              <CardDescription>CONTRATO ATUAL</CardDescription>
              <Separator />

              <Table className="mt-3">
                <TableBody>
                  <TableRow>
                    <TableCell>Período: </TableCell>
                    <TableCell className="text-right">01/03/2024 - 01/03/2025</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Aluguel: </TableCell>
                    <TableCell className="text-right">R$ 1.500/mês</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Caução: </TableCell>
                    <TableCell className="text-right">R$ 3.000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="w-1/2">
          <Card>
            <CardContent>
              <CardDescription>NOVO PERÍODO E VALORES</CardDescription>
              <Separator />

                <form action="" className="mt-4">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="dateInicio">Nova data de início</FieldLabel>
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
                            <FieldLabel htmlFor="dateInicio">Nova data de vencimento</FieldLabel>
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
                            <FieldLabel htmlFor="rent">Novo Aluguel (R$)</FieldLabel>
                            <Input id="rent" placeholder="0,00"/>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="caucao">Caução (R$)</FieldLabel>
                            <Input id="caucao" placeholder="0,00"/>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
