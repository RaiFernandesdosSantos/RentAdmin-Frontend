import { Property } from "./property"
import { Contract } from "./contract"

export interface BankAccount{
    id: number
    bank_name: string
    account_number: string
    agency_number: string
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface BankAccountPayload{
    bank_name: string
    account_number: string
    agency_number: string
    is_active: boolean
}

export interface ChartAccount{
    id: number
    code: string
    name: string
    parent?: ChartAccount | null
    children?: ChartAccount[]
    type: "ENTRIES" | "EXPENSES"
    report_classification: "DRE_DFC" | "DFC_ONLY" | "DRE_ONLY"
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface ChartAccountPayload{
    code: string
    name: string
    parent?: number | null
    children?: number[] | null
    type: 'ENTRIES' | 'EXPENSES'
    report_classification: 'DRE_DFC' | 'DFC_ONLY' | 'DRE_ONLY'
    is_active: boolean
}

export interface Transactions{
    id: number
    description: string
    status: "PENDING" | "PAID" | "OVERDUE" | "CANCELLED"
    amount: string
    due_date: string
    payment_date: string
    competence_date: string
    account: ChartAccount
    bank_account: BankAccount
    property?: Property | null
    contract?: Contract | null
    recurrence: "NONE" | "MONTHLY" | "ANNUAL"
    created_at: string
    updated_at: string
}

export interface TransactionsPayload{
    description: string
    status: "PENDING" | "PAID" | "OVERDUE" | "CANCELLED"
    amount: string
    due_date: string
    payment_date: string
    competence_date: string
    account: number
    bank_account: number
    property?: number | null
    contract?: number | null
    recurrence: "NONE" | "MONTHLY" | "ANNUAL"
}

export interface BankAccountEntries{
    id: number
    bank_account: BankAccount
    transaction: Transactions
    balance_before: string
    balance_after: string
    create_at: string
}

export interface BankAccountEntriesPayload{
    bank_account: number
    transaction: number
    balance_before: string
    balance_after: string
}