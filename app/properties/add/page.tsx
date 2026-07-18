"use client"

import AppHeader from "@/components/app-header"
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { FieldGroup, Field, FieldLabel  } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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
        <Card className="flex-1 p-3 gap-0">
            <CardHeader>
                <CardDescription>
                    INFORMAÇÕES BÁSICAS
                    <Separator />
                </CardDescription>
            </CardHeader>
            
            <CardContent>
                <form>
                    <FieldGroup className="grid min-w-full grid-cols-2 pt-4">
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
                    </FieldGroup>
                

                    <CardDescription className="pt-4">VALORES FINANCEIROS</CardDescription>
                    <Separator />
                    
                    <FieldGroup className="grid min-w-full grid-cols-3 pt-4">
                        <Field>
                            <FieldLabel htmlFor="value">Valor de compra (R$)</FieldLabel>
                            <Input id="value" placeholder="0,00"/>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="description">Data de Aquisição</FieldLabel>
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
                            <FieldLabel htmlFor="newValue">Valor atual estimado (R$)</FieldLabel>
                            <Input id="newValue" placeholder="0,00"/>
                        </Field>
                    </FieldGroup>
                    
                    <FieldGroup className="pt-3">
                        <Field>
                            <FieldLabel htmlFor="obs">Observações</FieldLabel>
                            <Textarea placeholder="Informações adicionais sobre o imóvel"/>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
      </div>
    </>
  )
}
