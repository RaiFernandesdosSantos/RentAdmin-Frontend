import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface SettingRowProps {
  label: string
  description?: string
  children: React.ReactNode
  showSeparator?: boolean
  className?: string
}

export function SettingRow({ label, description, children, showSeparator = true, className }: SettingRowProps) {
  return (
    <>
      <div className={cn("flex items-center justify-between py-3", className)}>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{label}</span>
          {description && (
            <span className="text-sm text-muted-foreground">{description}</span>
          )}
        </div>
        <div className="shrink-0 ml-4">{children}</div>
      </div>
      {showSeparator && <Separator />}
    </>
  )
}