import {ArrowDownCircle, ArrowUpCircle, Plus} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import AppHeader from "@/components/app-header"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <>
      <AppHeader 
        title="Extrato Bancário"
        subtitle="Movimentações por conta bancária"
        actions={
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4" />
            Nova conta
          </Button>
        }
      />

      <div className="min-h-svh p-4">
       <Card>
        <CardContent>
            <div className="receitas">
                <span className="flex gap-3">
                    <ArrowDownCircle className="w-4 h-4"/>
                    Receitas
                </span>

                <div className="contasReceita flex justify-between">
                    <p>1.1 - Receita de aluguel residencial</p>
                    <span>Receita</span>
                </div>

                <div className="contasReceita flex justify-between">
                    <p>1.2 - Receita de aluguel comercial</p>
                    <span>Receita</span>
                </div>

                <div className="contasReceita flex justify-between">
                    <p>1.3 - Multas e juros recebidos</p>
                    <span>Receita</span>
                </div>
            </div>

            <div className="despesas">
                <span className="flex gap-3">
                    <ArrowUpCircle className="w-4 h-4"/>
                    Despesas
                </span>

                <div className="contasReceita flex justify-between">
                    <p>2.1 - IPTU</p>
                    <span>Imposto</span>
                </div>

                <div className="contasReceita flex justify-between">
                    <p>2.2 - Manutenção e reparos</p>
                    <span>Despesa operacional</span>
                </div>
                
                <div className="contasReceita flex justify-between">
                    <p>2.3 - Seguro do imóvel</p>
                    <span>Despesa operacional</span>
                </div>

                <div className="contasReceita flex justify-between">
                    <p>2.4 - Taxa de administração</p>
                    <span>Despesa operacional</span>
                </div>
            </div>
        </CardContent>
       </Card>
      </div>
    </>
  )
}