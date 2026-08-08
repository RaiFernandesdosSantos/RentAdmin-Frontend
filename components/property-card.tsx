import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { StatusBadge } from "./app-badge"
import Link from "next/link"

interface PropertyStat {
  label: string
  value: string
  highlight?: boolean
}

interface PropertyCardProps {
  id: number | string
  name: string
  description: string
  status: "rented" | "vacant" | "sold"
  stats: PropertyStat[]
  tenant?: string
}

export function PropertyCard({ id, name, description, status, stats, tenant }: PropertyCardProps) {
  return (
    <Link href={`/properties/${id}`} className="flex-1">
      <Card className="h-full hover:border-border/80 transition-colors">
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <StatusBadge status={status} />
        </CardHeader>
        <CardContent className="flex justify-between gap-2">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col bg-muted p-3 rounded-md flex-1">
              <span className="text-muted-foreground text-sm">{stat.label}</span>
              <span className={stat.highlight ? "text-green-400" : ""}>{stat.value}</span>
            </div>
          ))}
        </CardContent>
        {tenant && (
          <CardFooter>
            <CardDescription>Inquilino: {tenant}</CardDescription>
          </CardFooter>
        )}
      </Card>
    </Link>
  )
}