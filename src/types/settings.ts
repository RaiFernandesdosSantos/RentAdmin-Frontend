export interface SystemSettings {
  owner_name: string
  owner_cpf: string
  owner_phone: string
  owner_email: string
  date_format: string
  fiscal_year_start: number
  default_adjustment_index: "IGPM" | "IPCA" | "INPC" | "MANUAL"
  default_due_day: number
  contract_alert_days: number
  default_late_fee: string
  default_interest_rate: string
  default_bank_account: number | null
  default_rent_chart_account: number | null
  notify_expiring_contracts: boolean
  notify_overdue_charges: boolean
  notify_vacant_properties: boolean
  notify_upcoming_expenses: boolean
}
