import AppHeader from "@/components/app-header"
import { Card, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Field, FieldLabel, FieldContent, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { SettingRow } from "@/components/setting-row"
import { FormSection } from "@/components/form-section"


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
                            <FormSection title="DADOS DO PROPRIETÁRIO">
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
                            </FormSection>
                        </form>
                    </CardContent>
                </Card>

                <Card className="flex-1 mt-3">
                    <CardContent>
                        <form action="">
                            <CardDescription>PREFERÊNCIAS DO SISTEMA</CardDescription>
                            <Separator />

                            <div className="mt-3 min-w-full">
                                <SettingRow label="Moeda" description="Moeda usada em todos os relatórios" className="pt-0">
                                    <Select id="guarantor">
                                        <SelectTrigger className="w-32">
                                            <SelectValue placeholder="R$ (BRL)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">US$ (USD)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </SettingRow>

                                <SettingRow label="Formato de data" description="Como as datas são exibidas no sistema">
                                    <Select id="guarantor">
                                        <SelectTrigger className="w-32">
                                            <SelectValue placeholder="DD/MM/AAAA" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">MM/DD/AAAA</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </SettingRow>

                                <SettingRow label="Ano fiscal" description="Mês de início do exercício financeiro" showSeparator={false}>
                                    <Select id="guarantor">
                                        <SelectTrigger className="w-32">
                                            <SelectValue placeholder="Janeiro" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Junho</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </SettingRow>
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
                                <SettingRow label="Índice de reajuste padrão" description="Usado como sugestão na renovação de contratos">
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
                                </SettingRow>

                                <SettingRow label="Alerta de vencimento de contrato" description="Quantos dias antes aviisar no dashboard">
                                    <Select id="guarantor">
                                        <SelectTrigger className="w-32">
                                            <SelectValue placeholder="90 dias" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">60 dias</SelectItem>
                                            <SelectItem value="1">30 dias</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </SettingRow>

                                <SettingRow label="Multa por atraso padrão (%)" description="Percentual aplicado em cobrança em atraso">
                                    <Input id="rent" className="w-32" placeholder="2"/>
                                </SettingRow>

                                <SettingRow label="Juros de mora padrão (% a.m.)" description="Juros aplicados após vencimento" showSeparator={false}>
                                    <Input id="rent" className="w-32" placeholder="1"/>
                                </SettingRow>
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
                                <SettingRow label="Conta para novos lançamentos" description="Pré-selecionada ao criar receitas e despesas" showSeparator={false}>
                                    <Select id="guarantor">
                                        <SelectTrigger className="w-32">
                                            <SelectValue placeholder="Nubank - .....1234" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Itaú - .....4567</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </SettingRow>
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
