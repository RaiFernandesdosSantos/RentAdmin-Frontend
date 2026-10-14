export interface MonthlyRevenueSummary {
  total: string
  previous: string
  delta: string
  delta_pct: number
}

export interface MonthlyRevenue {
  month: string
  year: number
  month_number: number
  total: string
}

interface ROEProperty {
  property_id: number
  property_name: string
  property_type: string
  roe: number | null
  monthly_rent: string | null
  status: "rented" | "vacant"
}

interface ROESummary {
  average_roe: number
  properties: ROEProperty[]
}

interface Vacancy {
  total_properties: number
  vacant_count: number
  vacant_pct: number
}

interface Expiring_contracts {
  contract_id: number
  tenant_name: string
  property_name: string
  end_date: string
  days_remaining: number
}

interface Default {
  overdue_this_month: string
  overdue_this_month_count: number
  overdue_year_total: string
  overdue_year_count: number
  default_rate: number
}

export interface AnalyticsSummary {
  revenue: MonthlyRevenueSummary
  roe: ROESummary
  vacancy: Vacancy
  expiring_contracts: Expiring_contracts[]
  default: Default
}

export interface AccountRow {
  account_id: number
  code: string
  name: string
  current: string
  previous: string
  accumulated: string
}

export interface AccountGroup {
  group_id: number
  code: string
  name: string
  total: string
  total_prev: string
  children: AccountRow[]
}

export interface DREData {
  period: { year: number; month: number; type: string }
  revenues: AccountGroup[]
  expenses: AccountGroup[]
  total_revenue: string
  total_expenses: string
  net_result: string
  margin: number
}

export interface DFCData {
  period: { year: number; month: number; type: string }
  initial_balance: string
  inflows: AccountGroup[]
  outflows: AccountGroup[]
  non_operational: AccountGroup[]
  total_inflows: string
  total_outflows: string
  total_non_op: string
  cash_variation: string
  final_balance: string
}
