import AppHeader from "@/components/app-header"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"


export default function Page() {
  return (
    <>
      <AppHeader 
        title="Imóveis"
        subtitle="Portfólio de propriedades"
        actions={
          <Link href="/properties/add">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4" />
              Novo imóvel
            </Button>
          </Link>
        }
      />

      <div className="min-h-svh p-4">
        <div className="flex flex-1 gap-4">
          <Link href="/properties/1" className="flex-1">
            <Card>
              <CardHeader className="flex justify-between">
                <div className="div">
                  <CardTitle>Casa Jardim Europa</CardTitle>
                  <CardDescription>Residencial - Rua das Flores, 120</CardDescription>
                </div>
                <div>
                  <CardDescription className="bg-green-600/50 p-1 rounded-4xl text-green-300">Alugado</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex justify-between">
                <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                  <span className="text-muted-foreground">ROE</span>
                  <span className="text-green-400">8,1%</span>
                </div>
                <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                  <span className="text-muted-foreground">Aluguel</span>
                  <span>R$ 1.500,00</span>
                </div>
                <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                  <span className="text-muted-foreground">Val. aprox.</span>
                  <span>R$ 220k</span>
                </div>
              </CardContent>
              <CardFooter>
                <CardDescription>Inquilino: João Silva</CardDescription>
              </CardFooter>
            </Card>
          </Link>

          <Card className="flex-1">
            <CardHeader className="flex justify-between">
              <div className="div">
                <CardTitle>Casa Jardim Europa</CardTitle>
                <CardDescription>Residencial - Rua das Flores, 120</CardDescription>
              </div>
              <div>
                <CardDescription className="bg-green-600/50 p-1 rounded-4xl text-green-300">Alugado</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex justify-between">
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">ROE</span>
                <span className="text-green-400">8,1%</span>
              </div>
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">Aluguel</span>
                <span>R$ 1.500,00</span>
              </div>
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">Val. aprox.</span>
                <span>R$ 220k</span>
              </div>
            </CardContent>
            <CardFooter>
              <CardDescription>Inquilino: João Silva</CardDescription>
            </CardFooter>
          </Card>

          <Card className="flex-1">
            <CardHeader className="flex justify-between">
              <div className="div">
                <CardTitle>Casa Jardim Europa</CardTitle>
                <CardDescription>Residencial - Rua das Flores, 120</CardDescription>
              </div>
              <div>
                <CardDescription className="bg-green-600/50 p-1 rounded-4xl text-green-300">Alugado</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex justify-between">
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">ROE</span>
                <span className="text-green-400">8,1%</span>
              </div>
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">Aluguel</span>
                <span>R$ 1.500,00</span>
              </div>
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">Val. aprox.</span>
                <span>R$ 220k</span>
              </div>
            </CardContent>
            <CardFooter>
              <CardDescription>Inquilino: João Silva</CardDescription>
            </CardFooter>
          </Card>
        </div>

        <div className="flex flex-1 gap-4 pt-4">
          <Card className="flex-1">
            <CardHeader className="flex justify-between">
              <div className="div">
                <CardTitle>Casa Jardim Europa</CardTitle>
                <CardDescription>Residencial - Rua das Flores, 120</CardDescription>
              </div>
              <div>
                <CardDescription className="bg-green-600/50 p-1 rounded-4xl text-green-300">Alugado</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex justify-between">
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">ROE</span>
                <span className="text-green-400">8,1%</span>
              </div>
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">Aluguel</span>
                <span>R$ 1.500,00</span>
              </div>
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">Val. aprox.</span>
                <span>R$ 220k</span>
              </div>
            </CardContent>
            <CardFooter>
              <CardDescription>Inquilino: João Silva</CardDescription>
            </CardFooter>
          </Card>

          <Card className="flex-1">
            <CardHeader className="flex justify-between">
              <div className="div">
                <CardTitle>Casa Jardim Europa</CardTitle>
                <CardDescription>Residencial - Rua das Flores, 120</CardDescription>
              </div>
              <div>
                <CardDescription className="bg-green-600/50 p-1 rounded-4xl text-green-300">Alugado</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex justify-between">
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">ROE</span>
                <span className="text-green-400">8,1%</span>
              </div>
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">Aluguel</span>
                <span>R$ 1.500,00</span>
              </div>
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">Val. aprox.</span>
                <span>R$ 220k</span>
              </div>
            </CardContent>
            <CardFooter>
              <CardDescription>Inquilino: João Silva</CardDescription>
            </CardFooter>
          </Card>

          <Card className="flex-1">
            <CardHeader className="flex justify-between">
              <div className="div">
                <CardTitle>Casa Jardim Europa</CardTitle>
                <CardDescription>Residencial - Rua das Flores, 120</CardDescription>
              </div>
              <div>
                <CardDescription className="bg-green-600/50 p-1 rounded-4xl text-green-300">Alugado</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex justify-between">
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">ROE</span>
                <span className="text-green-400">8,1%</span>
              </div>
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">Aluguel</span>
                <span>R$ 1.500,00</span>
              </div>
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">Val. aprox.</span>
                <span>R$ 220k</span>
              </div>
            </CardContent>
            <CardFooter>
              <CardDescription>Inquilino: João Silva</CardDescription>
            </CardFooter>
          </Card>
        </div>

        <div className="flex flex-1 gap-4 pt-4">
          <Card className="flex-1">
            <CardHeader className="flex justify-between">
              <div className="div">
                <CardTitle>Casa Jardim Europa</CardTitle>
                <CardDescription>Residencial - Rua das Flores, 120</CardDescription>
              </div>
              <div>
                <CardDescription className="bg-green-600/50 p-1 rounded-4xl text-green-300">Alugado</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex justify-between">
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">ROE</span>
                <span className="text-green-400">8,1%</span>
              </div>
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">Aluguel</span>
                <span>R$ 1.500,00</span>
              </div>
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">Val. aprox.</span>
                <span>R$ 220k</span>
              </div>
            </CardContent>
            <CardFooter>
              <CardDescription>Inquilino: João Silva</CardDescription>
            </CardFooter>
          </Card>

          <Card className="flex-1">
            <CardHeader className="flex justify-between">
              <div className="div">
                <CardTitle>Casa Jardim Europa</CardTitle>
                <CardDescription>Residencial - Rua das Flores, 120</CardDescription>
              </div>
              <div>
                <CardDescription className="bg-green-600/50 p-1 rounded-4xl text-green-300">Alugado</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex justify-between">
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">ROE</span>
                <span className="text-green-400">8,1%</span>
              </div>
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">Aluguel</span>
                <span>R$ 1.500,00</span>
              </div>
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">Val. aprox.</span>
                <span>R$ 220k</span>
              </div>
            </CardContent>
            <CardFooter>
              <CardDescription>Inquilino: João Silva</CardDescription>
            </CardFooter>
          </Card>

          <Card className="flex-1">
            <CardHeader className="flex justify-between">
              <div className="div">
                <CardTitle>Casa Jardim Europa</CardTitle>
                <CardDescription>Residencial - Rua das Flores, 120</CardDescription>
              </div>
              <div>
                <CardDescription className="bg-green-600/50 p-1 rounded-4xl text-green-300">Alugado</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex justify-between">
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">ROE</span>
                <span className="text-green-400">8,1%</span>
              </div>
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">Aluguel</span>
                <span>R$ 1.500,00</span>
              </div>
              <div className="flex flex-col bg-slate-700 p-3 rounded-md">
                <span className="text-muted-foreground">Val. aprox.</span>
                <span>R$ 220k</span>
              </div>
            </CardContent>
            <CardFooter>
              <CardDescription>Inquilino: João Silva</CardDescription>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}
