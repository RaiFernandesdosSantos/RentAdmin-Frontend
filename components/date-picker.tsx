"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Field, FieldLabel } from "@/components/ui/field"

interface DatePickerFieldProps {
  label: string
  id?: string
  value?: Date
  onChange?: (date?: Date) => void
}

export function DatePickerField({ label, id, value, onChange }: DatePickerFieldProps) {
  const [internalDate, setInternalDate] = useState<Date | undefined>(value)

  const date = value ?? internalDate
  const handleSelect = (d?: Date) => {
    setInternalDate(d)
    onChange?.(d)
  }

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              data-empty={!date}
              className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground w-full"
            />
          }
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: ptBR }) : <span>dd/mm/aaaa</span>}
        </PopoverTrigger>
        <PopoverContent>
          <Calendar mode="single" selected={date} onSelect={handleSelect} locale={ptBR} />
        </PopoverContent>
      </Popover>
    </Field>
  )
}