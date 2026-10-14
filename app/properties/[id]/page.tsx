import AppHeader from "@/components/app-header"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PenSquare, ArrowLeft, ArrowRight } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHead,
} from "@/components/ui/table"
import { MetricCard } from "@/components/metric-card"
import { StatusBadge } from "@/components/app-badge"
import { Badge } from "@/components/ui/badge"
import {
  SellPropertyButton,
  DeletePropertyButton,
} from "@/components/entity-actions"
import { PropertyService } from "@/src/services/properties"
import { contractsService } from "@/src/services/contracts"
import { formatCurrency, formatDate } from "@/src/lib/format"
import type { Contract } from "@/src/types/contract"

interface PageProps {
  params: Promise<{ id: string }>
}

function propertyStatusLabel(status: number) {
  const labels = ["Disponível", "Alugado", "Em manutenção", "Vendido"]
  return labels[status] ?? "—"
}

function propertyStatusBadge(status: number) {
  if (status === 0) return "vacant"
  if (status === 1) return "rented"
  if (status === 2) return "inactive"
  return "sold"
}

function contractStatusLabel(status: number) {
  const labels = ["Ativo", "A vencer", "Vencido", "Encerrado", "Renovado"]
  return labels[status]
}

function contractStatusBadge(status: number) {
  if (status === 0) return "active"
  if (status === 1) return "expiring"
  if (status === 2) return "overdue"
  if (status === 4) return "active"
  return "cancelled"
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const property = await PropertyService.get(Number(id))
  const contracts = await contractsService.list({ property: id })

  const activeContract = contracts.find(
    (c: Contract) => c.status === 0 || c.status === 1,
  )
  const history = contracts

  const actualValue = property.actual_value
    ? Number(property.actual_value)
    : null
  const acquisitionPrice = property.acquisition_price
    ? Number(property.acquisition_price)
    : null
  const soldPrice = property.sold_price ? Number(property.sold_price) : null

  let valuation: number | null = null
  if (actualValue && acquisitionPrice && acquisitionPrice > 0) {
    valuation = ((actualValue - acquisitionPrice) / acquisitionPrice) * 100
  }

  let roe: number | null = null
  if (activeContract && actualValue && actualValue > 0) {
    roe = ((activeContract.monthly_rent * 12) / actualValue) * 100
  }

  const daysRemaining = activeContract
    ? Math.ceil(
        (new Date(`${activeContract.end_date}T00:00:00`).getTime() -
          Date.now()) /
          (1000 * 60 * 60 * 24),
      )
    : null

  return (
    <>
      <AppHeader
        title={property.description}
        subtitle={`${property.street}, ${property.number} - ${
          property.property_type === 0
            ? "Terreno"
            : property.property_type === 1
              ? "Residencial"
              : "Comercial"
        }`}
        actions={
          <>
            <Link href="/properties">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>

            {property.status !== 3 && (
              <SellPropertyButton propertyId={property.id} />
            )}

            <Link href={`/properties/edit/${id}`}>
              <Button variant="outline" size="sm">
                <PenSquare className="h-4 w-4" />
                Editar
              </Button>
            </Link>

            <DeletePropertyButton propertyId={property.id} />
          </>
        }
      />

      <div className="min-h-svh p-4">
        <div className="flex h-1/4 flex-1 gap-4">
          <MetricCard
            label="Valor de compra"
            value={
              acquisitionPrice !== null ? formatCurrency(acquisitionPrice) : "—"
            }
          />

          <MetricCard
            label={soldPrice !== null ? "Valor de venda" : "Valor atual est."}
            value={
              soldPrice !== null
                ? formatCurrency(soldPrice)
                : actualValue !== null
                  ? formatCurrency(actualValue)
                  : "—"
            }
          />

          <MetricCard
            label="Valorização"
            value={valuation !== null ? `${valuation.toFixed(2)}%` : "—"}
            deltaType={valuation !== null && valuation >= 0 ? "up" : "down"}
          />

          <MetricCard
            label="ROE anual"
            value={roe !== null ? `${roe.toFixed(2)}%` : "—"}
            deltaType="up"
          />
        </div>

        <div className="h-3/4 flex-1">
          <div className="flex h-1/2 flex-1 gap-4 pt-3">
            <Card className="w-1/2">
              <CardHeader className="flex justify-between">
                <CardTitle>Dados do imóvel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Tipo</span>
                    <span>
                      {property.property_type === 0
                        ? "Terreno"
                        : property.property_type === 1
                          ? "Residencial"
                          : "Comercial"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Área</span>
                    <span>{property.square_meters} m²</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Bairro</span>
                    <span>{property.neighborhood}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">CEP</span>
                    <span>{property.zip_code}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Matrícula</span>
                    <span>{property.registration}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Adquirido em</span>
                    <span>
                      {property.acquisition_date
                        ? formatDate(property.acquisition_date)
                        : "—"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">
                      Quartos / Banheiros / Vagas
                    </span>
                    <span>
                      {property.number_of_bedrooms ?? "—"} /{" "}
                      {property.number_of_bathrooms ?? "—"} /{" "}
                      {property.garage_spaces ?? "—"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Status</span>
                    <StatusBadge
                      status={propertyStatusBadge(property.status) as never}
                      label={propertyStatusLabel(property.status)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="w-1/2">
              <CardHeader className="flex justify-between">
                <CardTitle>Contrato ativo</CardTitle>
                {activeContract && (
                  <Link href={`/contracts/${activeContract.id}`}>
                    <CardDescription className="flex gap-2 hover:opacity-80">
                      Ver contrato
                      <ArrowRight className="h-4 w-4" />
                    </CardDescription>
                  </Link>
                )}
              </CardHeader>
              <CardContent>
                {activeContract ? (
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-muted-foreground">
                          Inquilino
                        </TableCell>
                        <TableCell className="text-right">
                          {activeContract.tenant.name}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="text-muted-foreground">
                          Aluguel
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(activeContract.monthly_rent)}/mês
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="text-muted-foreground">
                          Vencimento (dia)
                        </TableCell>
                        <TableCell className="text-right">
                          dia {activeContract.due_day}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="text-muted-foreground">
                          Fim do contrato
                        </TableCell>
                        <TableCell className="text-right">
                          {formatDate(activeContract.end_date)}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="text-muted-foreground">
                          Restante
                        </TableCell>
                        <TableCell className="flex justify-end">
                          <Badge
                            variant="outline"
                            className="rounded-full bg-yellow-50 text-yellow-700"
                          >
                            {daysRemaining} dias
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                ) : (
                  <p className="pt-3 text-muted-foreground">
                    Nenhum contrato ativo para este imóvel.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex h-1/2 flex-1 gap-4 pt-3">
            <Card className="flex-1">
              <CardHeader className="flex justify-between">
                <CardTitle>Histórico de locações</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-muted-foreground">
                        Inquilino
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Início
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Fim
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Valor
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-muted-foreground"
                        >
                          Nenhuma locação registrada.
                        </TableCell>
                      </TableRow>
                    )}
                    {history.map((contract: Contract) => (
                      <TableRow key={contract.id}>
                        <TableCell>{contract.tenant.name}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(contract.start_date)}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(contract.end_date)}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(contract.monthly_rent)}
                        </TableCell>
                        <TableCell>
                          <StatusBadge
                            status={
                              contractStatusBadge(contract.status) as never
                            }
                            label={contractStatusLabel(contract.status)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
