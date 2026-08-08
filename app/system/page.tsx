import AppHeader from "@/components/app-header"
import { Card, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Field, FieldGroup, FieldLabel, FieldContent, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"


export default function Page() {
  return (
    <>
      <AppHeader 
        title="Configurações"
        subtitle="Parâmetros gerais do sistema"
        actions={
            <>
                <Link href="/">
                    <Button variant="outline" size="sm">
                        Cancelar
                    </Button>
                </Link>

                <Button variant="outline" size="sm">
                    Salvar alterações
                </Button>
            </>
        }
      />

      <div className="min-h-svh p-4">
        <Tabs>
            <TabsList>
                <TabsTrigger value="geral">Geral</TabsTrigger>
                <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
                <TabsTrigger value="notificacao">Notificações</TabsTrigger>
            </TabsList>
            <TabsContent value="geral">
                <Card className="flex-1">
                    <CardContent>
                        <form action="">
                            <CardDescription>DADOS DO PROPRIETÁRIO</CardDescription>
                            <Separator />

                            <FieldGroup className="mt-3 grid grid-cols-2 min-w-full">
                                <Field>
                                    <FieldLabel htmlFor="rent">Nome completo</FieldLabel>
                                    <Input id="rent" placeholder="Rai Santos"/>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="rent">CPF</FieldLabel>
                                    <Input id="rent" placeholder="000.000.000-00"/>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="rent">Telefone</FieldLabel>
                                    <Input id="rent" placeholder="(00) 0 0000-0000"/>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="rent">E-mail</FieldLabel>
                                    <Input id="rent" placeholder="email@exemplo.com"/>
                                </Field>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>

                <Card className="flex-1 mt-3">
                    <CardContent>
                        <form action="">
                            <CardDescription>PREFERÊNCIAS DO SISTEMA</CardDescription>
                            <Separator />

                            <div className="mt-3 min-w-full">
                                <div className="flex justify-between mb-3">
                                    <div className="flex flex-col">
                                        <span>Moeda</span>
                                        <span>Moeda usada em todos os relatórios</span>
                                    </div>

                                    <Select id="guarantor">
                                        <SelectTrigger className="w-32">
                                            <SelectValue placeholder="R$ (BRL)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">US$ (USD)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Separator />

                                <div className="flex justify-between mt-3 mb-3">
                                    <div className="flex flex-col">
                                        <span>Formato de data</span>
                                        <span>Como as datas são exibidas no sistema</span>
                                    </div>

                                    <Select id="guarantor">
                                        <SelectTrigger className="w-32">
                                            <SelectValue placeholder="DD/MM/AAAA" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">MM/DD/AAAA</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Separator />

                                <div className="flex justify-between mt-3">
                                    <div className="flex flex-col">
                                        <span>Ano fiscal</span>
                                        <span>Mês de início do exercício financeiro</span>
                                    </div>

                                    <Select id="guarantor">
                                        <SelectTrigger className="w-32">
                                            <SelectValue placeholder="Janeiro" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Junho</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="financeiro">
                <Card className="flex-1">
                    <CardContent>
                        <form action="">
                            <CardDescription>PARÂMETROS DE ALUGUEL</CardDescription>
                            <Separator />

                            <div className="mt-3 min-w-full">
                                <div className="flex justify-between mb-3">
                                    <div className="flex flex-col">
                                        <span>Índice de reajuste padrão</span>
                                        <span>Usado como sugestão na renovação de contratos</span>
                                    </div>

                                    <Select id="guarantor">
                                        <SelectTrigger className="w-32">
                                            <SelectValue placeholder="IGPM" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">IPCA</SelectItem>
                                            <SelectItem value="1">INPC</SelectItem>
                                            <SelectItem value="1">Manual</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Separator />

                                <div className="flex justify-between mt-3 mb-3">
                                    <div className="flex flex-col">
                                        <span>Alerta de vencimento de contrato</span>
                                        <span>Quantos dias antes avisar no dashboard</span>
                                    </div>

                                    <Select id="guarantor">
                                        <SelectTrigger className="w-32">
                                            <SelectValue placeholder="90 dias" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">60 dias</SelectItem>
                                            <SelectItem value="1">30 dias</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Separator />

                                <div className="flex justify-between mt-3 mb-3">
                                    <div className="flex flex-col">
                                        <span>Multa por atraso padrão (%)</span>
                                        <span>Percentual aplicado em cobrança em atraso</span>
                                    </div>

                                    <Input id="rent" className="w-32" placeholder="2"/>
                                </div>

                                <Separator />

                                <div className="flex justify-between mt-3 mb-3">
                                    <div className="flex flex-col">
                                        <span>Juros de mora padrão (% a.m.)</span>
                                        <span>Juros aplicados após vencimento</span>
                                    </div>

                                    <Input id="rent" className="w-32" placeholder="1"/>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card className="flex-1 mt-3">
                    <CardContent>
                        <form action="">
                            <CardDescription>CONTA BANCÁRIA PADRÃO</CardDescription>
                            <Separator />

                            <div className="mt-3 min-w-full">
                                <div className="flex justify-between mb-3">
                                    <div className="flex flex-col">
                                        <span>Moeda</span>
                                        <span>Moeda usada em todos os relatórios</span>
                                    </div>

                                    <Select id="guarantor">
                                        <SelectTrigger className="w-32">
                                            <SelectValue placeholder="Nubank - .....1234" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Itaú - .....4567</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="notificacao">
                <Card className="flex-1 mt-3">
                    <CardContent>
                        <form action="">
                            <CardDescription>ALERTAS DO SISTEMA</CardDescription>
                            <Separator />

                            <Field orientation="horizontal" className="flex-1 mt-3 mb-3">
                                <FieldContent>
                                    <FieldLabel htmlFor="switch-focus-mode">
                                        Contratos próximos ao vencimento
                                    </FieldLabel>
                                    <FieldDescription>
                                        Exibir alerta no Analytics
                                    </FieldDescription>
                                </FieldContent>
                                <Switch id="switch-focus-mode" defaultChecked/>
                            </Field>

                            <Separator />

                            <Field orientation="horizontal" className="flex-1 mt-3 mb-3">
                                <FieldContent>
                                    <FieldLabel htmlFor="switch-focus-mode">
                                        Cobrança em atraso
                                    </FieldLabel>
                                    <FieldDescription>
                                        Destacar no painel de contas a receber
                                    </FieldDescription>
                                </FieldContent>
                                <Switch id="switch-focus-mode" defaultChecked/>
                            </Field>

                            <Separator />

                            <Field orientation="horizontal" className="flex-1 mt-3 mb-3">
                                <FieldContent>
                                    <FieldLabel htmlFor="switch-focus-mode">
                                        Imóveis vagos
                                    </FieldLabel>
                                    <FieldDescription>
                                        Mostrar alerta de vacância no Analytics
                                    </FieldDescription>
                                </FieldContent>
                                <Switch id="switch-focus-mode" defaultChecked/>
                            </Field>

                            <Separator />

                            <Field orientation="horizontal" className="flex-1 mt-3">
                                <FieldContent>
                                    <FieldLabel htmlFor="switch-focus-mode">
                                        Despesas a vencer em 7 dias
                                    </FieldLabel>
                                    <FieldDescription>
                                        Exibir aviso no painel financeiro
                                    </FieldDescription>
                                </FieldContent>
                                <Switch id="switch-focus-mode"/>
                            </Field>
                        </form>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
