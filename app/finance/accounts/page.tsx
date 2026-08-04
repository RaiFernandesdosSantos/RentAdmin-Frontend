import {ArrowLeftToLine, ArrowRightFromLine, Plus} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import AppHeader from "@/components/app-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export default function Page() {
  return (
    <>
      <AppHeader 
        title="Plano de contas"
        subtitle="Categorias hierárquicas"
        actions={
            <Link href="/finance/accounts/add/">
                <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                    Nova conta
                </Button>
            </Link>
        }
      />

      <div className="min-h-svh p-4">
       <Card>
        <CardContent>
            <div className="border-l-2 p-2 border-green-300">
                <span className="flex gap-3 text-green-600">
                    <ArrowLeftToLine className="w-4 h-4 text-green-600"/>
                    3 - Receitas
                </span>

                <Accordion>
                    <AccordionItem value="1">
                        <AccordionTrigger>3.1 - Receita de Aluguel</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex justify-between">
                                <span>3.1.1 - Aluguel Residencial</span>
                                <Badge className="bg-green-50 text-green-700 rounded-full">Receita</Badge>
                            </div>
                            <div className="flex justify-between mt-2">
                                <span>3.1.1 - Aluguel Comercial</span>
                                <Badge className="bg-green-50 text-green-700 rounded-full">Receita</Badge>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion>
                    <AccordionItem value="1">
                        <AccordionTrigger>3.2 - Outras receitas</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex justify-between">
                                <span>3.2.1 - Multas e juros recebidos</span>
                                <Badge className="bg-green-50 text-green-700 rounded-full">Receita</Badge>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className="border-l-2 border-red-300 p-2 mt-3">
                <span className="flex gap-3 text-red-600">
                    <ArrowRightFromLine className="w-4 h-4 text-red-600"/>
                    4 - Despesas
                </span>

                <Accordion>
                    <AccordionItem value="1">
                        <AccordionTrigger>4.1 - Impostos</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex justify-between">
                                <span>4.1.1 - IPTU</span>
                                <Badge className="bg-red-50 text-red-700 rounded-full">Despesa</Badge>
                            </div>

                            <div className="flex justify-between mt-2">
                                <span>4.1.2 - Imposto de renda</span>
                                <Badge className="bg-red-50 text-red-700 rounded-full">Despesa</Badge>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion>
                    <AccordionItem value="1">
                        <AccordionTrigger>4.2 - Despesas operacionais</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex justify-between">
                                <span>4.2.1 - Manutenção e reparos</span>
                                <Badge className="bg-red-50 text-red-700 rounded-full">Despesa</Badge>
                            </div>

                            <div className="flex justify-between mt-2">
                                <span>4.2.2 - Seguro do imóvel</span>
                                <Badge className="bg-red-50 text-red-700 rounded-full">Despesa</Badge>
                            </div>

                            <div className="flex justify-between mt-2">
                                <span>4.2.3 - Taxa de administração</span>
                                <Badge className="bg-red-50 text-red-700 rounded-full">Despesa</Badge>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion>
                    <AccordionItem value="1">
                        <AccordionTrigger>4.3 - Financiamentos</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex justify-between">
                                <span>4.3.1 - Parcela de empréstimo</span>
                                <Badge variant="ghost" className="text-muted-foreground">Não operacional</Badge>
                            </div>

                            <div className="flex justify-between mt-2">
                                <span>4.3.2 - Juros de financiamento</span>
                                <Badge variant="ghost" className="text-muted-foreground">Não operacional</Badge>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </CardContent>
       </Card>
      </div>
    </>
  )
}