import AppHeader from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ChartAccountService } from "@/src/services/finance"
import type { ChartAccount } from "@/src/types/finance"

function AccountRow({ account }: { account: ChartAccount }) {
  const typeLabel = account.type === "ENTRIES" ? "Receita" : "Despesa"
  const typeClass =
    account.type === "ENTRIES"
      ? "bg-green-50 text-green-700"
      : "bg-red-50 text-red-700"

  const reportLabel =
    account.report_classification === "DRE_DFC"
      ? "DRE e DFC"
      : account.report_classification === "DFC_ONLY"
        ? "Apenas DFC"
        : "Apenas DRE"

  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm">
        {account.code} - {account.name}
      </span>
      <span className="flex items-center gap-2">
        {!account.is_active && (
          <Badge className="rounded-full bg-gray-100 text-gray-500">
            Inativa
          </Badge>
        )}
        <Badge className={`rounded-full ${typeClass}`}>{typeLabel}</Badge>
        <span className="text-xs text-muted-foreground">{reportLabel}</span>
      </span>
    </div>
  )
}

export default async function Page() {
  const accounts = await ChartAccountService.list()

  // monta a árvore: raiz -> grupo -> conta
  const roots = accounts.filter((a: ChartAccount) => a.parent === null || a.parent === undefined)
  const childrenOf = (parentId: number) =>
    accounts.filter((a: ChartAccount) => a.parent?.id === parentId)

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
            {roots.length === 0 && (
              <p className="text-muted-foreground">
                Nenhuma conta cadastrada. Rode{" "}
                <code>python manage.py seed_initial_data</code> no backend para
                criar o plano de contas padrão.
              </p>
            )}
            <Accordion>
              {roots.map((root: ChartAccount) => {
                const groups = childrenOf(root.id)
                const rootType = root.type === "ENTRIES" ? "Receitas" : "Despesas"
                return (
                  <AccordionItem key={root.id} value={String(root.id)}>
                    <AccordionTrigger>
                      <span
                        className={
                          root.type === "ENTRIES"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {root.code} - {root.name}
                      </span>
                      <Badge className="ml-2 rounded-full" variant="outline">
                        {rootType}
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="ml-4 flex flex-col gap-2">
                        {groups.map((group: ChartAccount) => {
                          const leaves = childrenOf(group.id)
                          return (
                            <div key={group.id} className="border-l-2 pl-3">
                              <span className="font-medium">
                                {group.code} - {group.name}
                              </span>
                              <div className="ml-4">
                                {leaves.map((leaf: ChartAccount) => (
                                  <AccountRow key={leaf.id} account={leaf} />
                                ))}
                              </div>
                            </div>
                          )
                        })}
                        {groups.length === 0 && (
                          <AccountRow account={root} />
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
