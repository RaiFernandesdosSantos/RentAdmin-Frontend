import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { StatusBadge } from "./app-badge"
import Link from "next/link"

interface PropertyStat {
  label: string
  value: string
  highlight?: boolean
}

interface PropertyCardProps {
  id: number | string
  description: string
  status: "rented" | "vacant" | "sold"
  stats: PropertyStat[]
  tenant?: string
  street: string
  number: string
  neighboorhood: string
}

export function PropertyCard({
  id,
  description,
  status,
  stats,
  tenant,
  street,
  number,
  neighboorhood,
}: PropertyCardProps) {
  return (
    <Link href={`/properties/${id}`} className="flex-1">
      <Card className="h-full transition-colors hover:border-border/80">
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle>{description}</CardTitle>
            <CardDescription>
              {street}, {number} - {neighboorhood}
            </CardDescription>
          </div>
          <StatusBadge status={status} />
        </CardHeader>
        <CardContent className="flex justify-between gap-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-1 flex-col rounded-md bg-muted p-3"
            >
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
              <span className={stat.highlight ? "text-green-400" : ""}>
                {stat.value}
              </span>
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
