import { Property } from "./property"

export interface Contract {
  id: number
  property: Property
  tenant: Tenant
  guarantor: Tenant | null
  monthly_rent: number
  security_deposit: number | null
  due_day: number
  start_date: string
  end_date: string
  status: 'ACTIVE' | 'EXPIRING' | 'EXPIRED' | 'CANCELLED' | 'RENEWED'
  created_at: string
  updated_at: string
}

export interface ContractPayload {
  property: number
  tenant: number
  guarantor?: number | null
  monthly_rent: number
  security_deposit?: number | null
  due_day: number
  start_date: string
  end_date: string
}