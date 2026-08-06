import AppHeader from "@/components/app-header"
import { Card, CardHeader, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"


export default function Page() {
  return (
    <>
      <AppHeader 
        title="Contas bancárias"
        subtitle="Gestão de contas e extratos"
        actions={
          <Link href="/finance/bank/add/">
            <Button variant="outline" size="sm">
                <Plus className="w-4 h-4"/>
                Nova conta
            </Button>
          </Link>
        }
      />

      <div className="min-h-svh p-4">
        <div className="flex flex-1 gap-3">
            <Card className="flex-1">
                <CardHeader>
                    <CardDescription className="text-xl">Saldo total consolidado</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">R$ 18.490,00</div>
                </CardContent>
            </Card>

            <Card className="flex-1">
                <CardHeader>
                    <CardDescription className="text-xl">Contas ativas</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">2</div>
                </CardContent>
            </Card>

            <Card className="flex-1">
                <CardHeader>
                    <CardDescription className="text-xl">último movimentação</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">Hoje</div>
                </CardContent>
            </Card>
        </div>

        <div className="flex-1 pt-4">
           <div className="grid grid-cols-3 gap-3">
            <Link href="/finance/bank/1">
                <Card>
                    <CardHeader className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">Nubank</span>
                            <span>Conta corrente - .....1234</span>
                        </div>
                        <Badge className="bg-green-50 rounded-full text-green-700">Ativa</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <span>Saldo atual</span>
                                <span className="text-2xl font-bold">R$ 8.240</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span>Últ. atualização</span>
                                <span>Hoje, 10:32</span>
                            </div>
                        </div>

                        <Separator className="mt-3"/>
                        
                        <div className="flex justify-around mt-3">
                            <div className="flex flex-col items-center">
                                <span>Entradas/mês</span>
                                <span className="text-green-600">+ R$ 4.800</span>
                            </div>
                            
                            <Separator orientation="vertical"/>

                            <div className="flex flex-col items-center">
                                <span>Saídas/mês</span>
                                <span className="text-red-600">- R$ 920</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>

            <Link href="/finance/bank/1">
                <Card>
                    <CardHeader className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">Nubank</span>
                            <span>Conta corrente - .....1234</span>
                        </div>
                        <Badge className="bg-green-50 rounded-full text-green-700">Ativa</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <span>Saldo atual</span>
                                <span className="text-2xl font-bold">R$ 8.240</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span>Últ. atualização</span>
                                <span>Hoje, 10:32</span>
                            </div>
                        </div>

                        <Separator className="mt-3"/>
                        
                        <div className="flex justify-around mt-3">
                            <div className="flex flex-col items-center">
                                <span>Entradas/mês</span>
                                <span className="text-green-600">+ R$ 4.800</span>
                            </div>
                            
                            <Separator orientation="vertical"/>

                            <div className="flex flex-col items-center">
                                <span>Saídas/mês</span>
                                <span className="text-red-600">- R$ 920</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>

            <Link href="/finance/bank/1">
                <Card>
                    <CardHeader className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">Nubank</span>
                            <span>Conta corrente - .....1234</span>
                        </div>
                        <Badge className="bg-green-50 rounded-full text-green-700">Ativa</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <span>Saldo atual</span>
                                <span className="text-2xl font-bold">R$ 8.240</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span>Últ. atualização</span>
                                <span>Hoje, 10:32</span>
                            </div>
                        </div>

                        <Separator className="mt-3"/>
                        
                        <div className="flex justify-around mt-3">
                            <div className="flex flex-col items-center">
                                <span>Entradas/mês</span>
                                <span className="text-green-600">+ R$ 4.800</span>
                            </div>
                            
                            <Separator orientation="vertical"/>

                            <div className="flex flex-col items-center">
                                <span>Saídas/mês</span>
                                <span className="text-red-600">- R$ 920</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>

            <Link href="/finance/bank/1">
                <Card>
                    <CardHeader className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">Nubank</span>
                            <span>Conta corrente - .....1234</span>
                        </div>
                        <Badge className="bg-green-50 rounded-full text-green-700">Ativa</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <span>Saldo atual</span>
                                <span className="text-2xl font-bold">R$ 8.240</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span>Últ. atualização</span>
                                <span>Hoje, 10:32</span>
                            </div>
                        </div>

                        <Separator className="mt-3"/>
                        
                        <div className="flex justify-around mt-3">
                            <div className="flex flex-col items-center">
                                <span>Entradas/mês</span>
                                <span className="text-green-600">+ R$ 4.800</span>
                            </div>
                            
                            <Separator orientation="vertical"/>

                            <div className="flex flex-col items-center">
                                <span>Saídas/mês</span>
                                <span className="text-red-600">- R$ 920</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>

            <Link href="/finance/bank/1">
                <Card>
                    <CardHeader className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">Nubank</span>
                            <span>Conta corrente - .....1234</span>
                        </div>
                        <Badge className="bg-green-50 rounded-full text-green-700">Ativa</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <span>Saldo atual</span>
                                <span className="text-2xl font-bold">R$ 8.240</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span>Últ. atualização</span>
                                <span>Hoje, 10:32</span>
                            </div>
                        </div>

                        <Separator className="mt-3"/>
                        
                        <div className="flex justify-around mt-3">
                            <div className="flex flex-col items-center">
                                <span>Entradas/mês</span>
                                <span className="text-green-600">+ R$ 4.800</span>
                            </div>
                            
                            <Separator orientation="vertical"/>

                            <div className="flex flex-col items-center">
                                <span>Saídas/mês</span>
                                <span className="text-red-600">- R$ 920</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>

            <Link href="/finance/bank/1">
                <Card>
                    <CardHeader className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">Nubank</span>
                            <span>Conta corrente - .....1234</span>
                        </div>
                        <Badge className="bg-green-50 rounded-full text-green-700">Ativa</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <span>Saldo atual</span>
                                <span className="text-2xl font-bold">R$ 8.240</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span>Últ. atualização</span>
                                <span>Hoje, 10:32</span>
                            </div>
                        </div>

                        <Separator className="mt-3"/>
                        
                        <div className="flex justify-around mt-3">
                            <div className="flex flex-col items-center">
                                <span>Entradas/mês</span>
                                <span className="text-green-600">+ R$ 4.800</span>
                            </div>
                            
                            <Separator orientation="vertical"/>

                            <div className="flex flex-col items-center">
                                <span>Saídas/mês</span>
                                <span className="text-red-600">- R$ 920</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>
           </div>
        </div>
      </div>
    </>
  )
}
