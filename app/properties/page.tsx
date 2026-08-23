import AppHeader from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { PropertyCard } from "@/components/property-card"
import { PropertyService } from "@/src/services/properties"
import { Property } from "@/src/types/property"

const stats = [
  {
    label: "ROE",
    value: "8,10%",
    highlight: true,
  },
  {
    label: "Aluguel",
    value: "R$ 1.500",
    highlight: false,
  },
  {
    label: "Val. aprox.",
    value: "R$ 220k",
    highlight: false,
  },
]

export default async function Page() {
  const properties = await PropertyService.list()

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
          {properties.map((property: Property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              name={property.description}
              description={property.street}
              status="rented"
              stats={stats}
              tenant=""
            />
          ))}
        </div>
      </div>
    </>
  )
}
