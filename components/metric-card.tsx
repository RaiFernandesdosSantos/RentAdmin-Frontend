import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  label: string
  value: string
  delta?: string
  deltaType?: "up" | "down" | "neutral"
  className?: string
}

export function MetricCard({ label, value, delta, deltaType = "neutral", className }: MetricCardProps) {
  return (
    <Card className={cn("flex-1", className)}>
      <CardHeader>
        <CardDescription className="text-xl">{label}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={cn("text-4xl font-bold", {
              "text-green-600": deltaType === "up",
              "text-red-600": deltaType === "down",
              "text-yellow-600": deltaType === "neutral",
            })}>
                {value}
        </div>

        {delta && (
          <div
            className={cn("flex items-center gap-1 mt-1 text-sm", {
              "text-green-600": deltaType === "up",
              "text-red-600": deltaType === "down",
              "text-yellow-600": deltaType === "neutral",
            })}
          >
            {deltaType === "up" && <ArrowUp className="w-3 h-3" />}
            {deltaType === "down" && <ArrowDown className="w-3 h-3" />}
            <span>{delta}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}