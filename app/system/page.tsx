"use client"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

import AppHeader from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { settingsService } from "../../src/services/settings"
import { BankAccountService, ChartAccountService } from "@/src/services/finance"
import type { BankAccount } from "@/src/types/finance"
import type { ChartAccount } from "@/src/types/finance"

const settingsSchema = z.object({
  // geral
  owner_name: z.string().optional(),
  owner_cpf: z.string().optional(),
  owner_phone: z.string().optional(),
  owner_email: z.string().email().optional().or(z.literal("")),
  date_format: z.string(),
  fiscal_year_start: z.number().min(1).max(12),

  // financeiro
  default_adjustment_index: z.enum(["IGPM", "IPCA", "INPC", "MANUAL"]),
  default_due_day: z.number().min(1).max(28),
  contract_alert_days: z.number().min(1),
  default_late_fee: z.string(),
  default_interest_rate: z.string(),
  default_bank_account: z.number().nullable().optional(),
  default_rent_chart_account: z.number().nullable().optional(),

  // notificações
  notify_expiring_contracts: z.boolean(),
  notify_overdue_charges: z.boolean(),
  notify_vacant_properties: z.boolean(),
  notify_upcoming_expenses: z.boolean(),
})

type SettingsFormData = z.infer<typeof settingsSchema>

export default function Page() {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([])
  const [chartAccounts, setChartAccounts] = useState<ChartAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  useEffect(() => {
    Promise.all([
      settingsService.get(),
      BankAccountService.list(),
      ChartAccountService.list(),
    ])
      .then(([settings, banks, accounts]) => {
        setBankAccounts(banks)
        // mostra só contas filhas de receita pra selecionar como padrão de aluguel
        setChartAccounts(accounts.filter((a) => a.parent !== null))

        form.reset({
          owner_name: settings.owner_name,
          owner_cpf: settings.owner_cpf,
          owner_phone: settings.owner_phone,
          owner_email: settings.owner_email,
          date_format: settings.date_format,
          fiscal_year_start: settings.fiscal_year_start,
          default_adjustment_index: settings.default_adjustment_index,
          default_due_day: settings.default_due_day,
          contract_alert_days: settings.contract_alert_days,
          default_late_fee: settings.default_late_fee,
          default_interest_rate: settings.default_interest_rate,
          default_bank_account: settings.default_bank_account ?? null,
          default_rent_chart_account:
            settings.default_rent_chart_account ?? null,
          notify_expiring_contracts: settings.notify_expiring_contracts,
          notify_overdue_charges: settings.notify_overdue_charges,
          notify_vacant_properties: settings.notify_vacant_properties,
          notify_upcoming_expenses: settings.notify_upcoming_expenses,
        })
      })
      .finally(() => setLoading(false))
  }, [])

  async function onSubmit(data: SettingsFormData) {
    try {
      await settingsService.update(data)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return <div className="p-4">Carregando...</div>

  return (
    <>
      <AppHeader
        title="Configurações"
        subtitle="Parâmetros gerais do sistema"
        actions={
          <>
            {saveSuccess && (
              <span className="text-sm text-green-600">Salvo com sucesso!</span>
            )}
            <Button
              type="button"
              size="sm"
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              {isSubmitting ? "Salvando..." : "Salvar alterações"}
            </Button>
          </>
        }
      />

      <div className="min-h-svh p-4">
        <Tabs defaultValue="geral">
          <TabsList>
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          </TabsList>

          {/* ABA GERAL */}
          <TabsContent value="geral">
            <Card className="mt-3">
              <CardContent>
                <p className="mb-2 text-xs text-muted-foreground uppercase">
                  Dados do proprietário
                </p>
                <Separator className="mb-3" />
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Nome completo</FieldLabel>
                    <Input placeholder="Seu nome" {...register("owner_name")} />
                  </Field>
                  <Field>
                    <FieldLabel>CPF</FieldLabel>
                    <Input
                      placeholder="000.000.000-00"
                      {...register("owner_cpf")}
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Telefone</FieldLabel>
                    <Input
                      placeholder="(00) 9 0000-0000"
                      {...register("owner_phone")}
                    />
                  </Field>
                  <Field>
                    <FieldLabel>E-mail</FieldLabel>
                    <Input
                      placeholder="email@exemplo.com"
                      {...register("owner_email")}
                    />
                    {errors.owner_email && (
                      <p className="text-sm text-red-600">
                        {errors.owner_email.message}
                      </p>
                    )}
                  </Field>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-3">
              <CardContent>
                <p className="mb-2 text-xs text-muted-foreground uppercase">
                  Preferências do sistema
                </p>
                <Separator className="mb-3" />

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">Formato de data</p>
                    <p className="text-sm text-muted-foreground">
                      Como as datas são exibidas
                    </p>
                  </div>
                  <Controller
                    control={control}
                    name="date_format"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DD/MM/YYYY">DD/MM/AAAA</SelectItem>
                          <SelectItem value="MM/DD/YYYY">MM/DD/AAAA</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">
                      Mês de início do ano fiscal
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Início do exercício financeiro
                    </p>
                  </div>
                  <Controller
                    control={control}
                    name="fiscal_year_start"
                    render={({ field }) => (
                      <Select
                        onValueChange={(v) => field.onChange(Number(v))}
                        defaultValue={field.value?.toString()}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "Janeiro",
                            "Fevereiro",
                            "Março",
                            "Abril",
                            "Maio",
                            "Junho",
                            "Julho",
                            "Agosto",
                            "Setembro",
                            "Outubro",
                            "Novembro",
                            "Dezembro",
                          ].map((m, i) => (
                            <SelectItem key={i + 1} value={String(i + 1)}>
                              {m}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ABA FINANCEIRO */}
          <TabsContent value="financeiro">
            <Card className="mt-3">
              <CardContent>
                <p className="mb-2 text-xs text-muted-foreground uppercase">
                  Parâmetros de aluguel
                </p>
                <Separator className="mb-3" />

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">
                      Índice de reajuste padrão
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Sugestão na renovação de contratos
                    </p>
                  </div>
                  <Controller
                    control={control}
                    name="default_adjustment_index"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IGPM">IGPM</SelectItem>
                          <SelectItem value="IPCA">IPCA</SelectItem>
                          <SelectItem value="INPC">INPC</SelectItem>
                          <SelectItem value="MANUAL">Manual</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <Separator />

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">
                      Dia de vencimento padrão
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Dia do mês para vencimento dos aluguéis
                    </p>
                  </div>
                  <Input
                    type="number"
                    className="w-20"
                    {...register("default_due_day", { valueAsNumber: true })}
                  />
                </div>
                <Separator />

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">
                      Alerta de vencimento de contrato
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Dias antes para avisar no dashboard
                    </p>
                  </div>
                  <Controller
                    control={control}
                    name="contract_alert_days"
                    render={({ field }) => (
                      <Select
                        onValueChange={(v) => field.onChange(Number(v))}
                        defaultValue={field.value?.toString()}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 dias</SelectItem>
                          <SelectItem value="60">60 dias</SelectItem>
                          <SelectItem value="90">90 dias</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <Separator />

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">Multa por atraso (%)</p>
                    <p className="text-sm text-muted-foreground">
                      Percentual em cobranças em atraso
                    </p>
                  </div>
                  <Input
                    className="w-20"
                    placeholder="2"
                    {...register("default_late_fee")}
                  />
                </div>
                <Separator />

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">
                      Juros de mora (% a.m.)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Juros aplicados após vencimento
                    </p>
                  </div>
                  <Input
                    className="w-20"
                    placeholder="1"
                    {...register("default_interest_rate")}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-3">
              <CardContent>
                <p className="mb-2 text-xs text-muted-foreground uppercase">
                  Padrões financeiros
                </p>
                <Separator className="mb-3" />

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">Conta bancária padrão</p>
                    <p className="text-sm text-muted-foreground">
                      Pré-selecionada em novos lançamentos
                    </p>
                  </div>
                  <Controller
                    control={control}
                    name="default_bank_account"
                    render={({ field }) => (
                      <Select
                        onValueChange={(v) =>
                          field.onChange(v === "none" ? null : Number(v))
                        }
                        defaultValue={field.value?.toString() ?? "none"}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Selecionar..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Nenhuma</SelectItem>
                          {bankAccounts.map((b) => (
                            <SelectItem key={b.id} value={b.id.toString()}>
                              {b.bank_name} ····{b.account_number}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <Separator />

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">
                      Conta padrão para aluguel
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Plano de contas usado ao gerar parcelas
                    </p>
                  </div>
                  <Controller
                    control={control}
                    name="default_rent_chart_account"
                    render={({ field }) => (
                      <Select
                        onValueChange={(v) =>
                          field.onChange(v === "none" ? null : Number(v))
                        }
                        defaultValue={field.value?.toString() ?? "none"}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Selecionar..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Nenhuma</SelectItem>
                          {chartAccounts.map((a) => (
                            <SelectItem key={a.id} value={a.id.toString()}>
                              {a.code} · {a.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ABA NOTIFICAÇÕES */}
          <TabsContent value="notificacoes">
            <Card className="mt-3">
              <CardContent>
                <p className="mb-2 text-xs text-muted-foreground uppercase">
                  Alertas do sistema
                </p>
                <Separator className="mb-3" />

                {[
                  {
                    name: "notify_expiring_contracts" as const,
                    label: "Contratos próximos ao vencimento",
                    desc: "Exibir alerta no Analytics",
                  },
                  {
                    name: "notify_overdue_charges" as const,
                    label: "Cobranças em atraso",
                    desc: "Destacar no painel de contas a receber",
                  },
                  {
                    name: "notify_vacant_properties" as const,
                    label: "Imóveis vagos",
                    desc: "Mostrar alerta de vacância no Analytics",
                  },
                  {
                    name: "notify_upcoming_expenses" as const,
                    label: "Despesas a vencer em 7 dias",
                    desc: "Exibir aviso no painel financeiro",
                  },
                ].map((item, index, arr) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                      <Controller
                        control={control}
                        name={item.name}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                    {index < arr.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
