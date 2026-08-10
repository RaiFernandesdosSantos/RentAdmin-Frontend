import AppHeader from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { PropertyCard } from "@/components/property-card"

const properties = [
  {
    id: 1,
    name: "Casa Jardim Europa",
    description: "Residencial - Rua das Flores, 120",
    status: "rented",
    stats: [{
      label: "ROE",
      value: "8,10%",
      highlight: true
    },
    {
      label: "Aluguel",
      value: "R$ 1.500",
      highlight: false
    },
    {
      label: "Val. aprox.",
      value: "R$ 220k",
      highlight: false
    }],
    tenant: "João Silva"
  },

  {
    id: 2,
    name: "Casa Jardim Europa",
    description: "Residencial - Rua das Flores, 120",
    status: "vacant",
    stats: [{
      label: "ROE",
      value: "8,10%",
      highlight: true
    },
    {
      label: "Aluguel",
      value: "R$ 1.500",
      highlight: false
    },
    {
      label: "Val. aprox.",
      value: "R$ 220k",
      highlight: false
    }],
    tenant: "João Silva"
  },

  {
    id: 3,
    name: "Casa Jardim Europa",
    description: "Residencial - Rua das Flores, 120",
    status: "sold",
    stats: [{
      label: "ROE",
      value: "8,10%",
      highlight: true
    },
    {
      label: "Aluguel",
      value: "R$ 1.500",
      highlight: false
    },
    {
      label: "Val. aprox.",
      value: "R$ 220k",
      highlight: false
    }],
    tenant: "João Silva"
  },
]

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
        {properties.map((pro) =>
          <PropertyCard 
            key={pro.id}
            id={pro.id}
            name={pro.name}
            description={pro.description}
            status={pro.status}
            stats={pro.stats}
            tenant={pro.tenant}
          />
        )}
        </div>
      </div>
    </>
  )
}
