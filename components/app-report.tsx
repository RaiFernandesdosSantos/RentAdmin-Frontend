import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ReportRow {
  account: string
  current: number
  previous: number
  accumulated: number
}

interface ReportSectionProps {
  title: string
  type: "revenue" | "expense" | "non-operational"
  rows: ReportRow[]
  totalLabel: string
  total: { current: number; previous: number; accumulated: number }
}

const typeConfig = {
  revenue:         { titleClass: "text-green-600", totalClass: "text-green-600", borderClass: "" },
  expense:         { titleClass: "text-red-600",   totalClass: "text-red-600",   borderClass: "" },
  "non-operational": { titleClass: "text-blue-600", totalClass: "text-blue-600", borderClass: "border-l-4 border-blue-300" },
}

export function ReportSection({ title, type, rows, totalLabel, total }: ReportSectionProps) {
  const config = typeConfig[type]
  return (
    <div className={cn("bg-muted/40 p-3 mt-3 rounded-md", config.borderClass)}>
      <div className="flex items-center gap-2">
        <span className={cn("font-medium", config.titleClass)}>{title}</span>
        {type === "non-operational" && (
          <Badge className="bg-blue-50 text-blue-600 rounded-full text-xs">Apenas DFC</Badge>
        )}
      </div>
      <Table className="mt-3">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.account}>
              <TableCell className="w-6/12">{row.account}</TableCell>
              <TableCell className="w-2/12 text-right">{row.current}</TableCell>
              <TableCell className="w-2/12 text-right">{row.previous}</TableCell>
              <TableCell className="w-2/12 text-right">{row.accumulated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Separator className="mt-3" />
      <div className="mt-3 flex text-sm font-medium">
        <div className="w-6/12">{totalLabel}</div>
        <div className={cn("w-2/12 text-right", config.totalClass)}>{total.current}</div>
        <div className={cn("w-2/12 text-right", config.totalClass)}>{total.previous}</div>
        <div className={cn("w-2/12 text-right", config.totalClass)}>{total.accumulated}</div>
      </div>
    </div>
  )
}