import { CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FieldGroup } from "@/components/ui/field"
import { cn } from "@/lib/utils"

interface FormSectionProps {
  title: string
  children: React.ReactNode
  columns?: 1 | 2 | 3
  className?: string
}

const colsMap = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
}

export function FormSection({ title, children, columns = 2, className }: FormSectionProps) {
  return (
    <div className={className}>
      <CardDescription>{title}</CardDescription>
      <Separator className="my-2" />
      <FieldGroup className={cn("grid min-w-full mt-3", colsMap[columns])}>
        {children}
      </FieldGroup>
    </div>
  )
}