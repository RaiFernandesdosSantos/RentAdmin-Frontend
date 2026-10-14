import {
  BankAccount,
  BankAccountPayload,
  ChartAccount,
  ChartAccountPayload,
  Transactions,
  TransactionsPayload,
  BankAccountEntries,
  BankAccountEntriesPayload,
} from "../types/finance"
import { api } from "./api"

export const BankAccountService = {
  list: (is_active?: boolean) => {
    const query = is_active ? `?status=${is_active}` : ""
    return api.get<BankAccount[]>(`/finance/bank_account/${query}`)
  },

  get: (id: number) => api.get<BankAccount>(`/finance/bank_account/${id}/`),

  create: (data: BankAccountPayload) =>
    api.post<BankAccount>("/finance/bank_account/create/", data),

  update: (id: number, data: Partial<BankAccountPayload>) =>
    api.patch<BankAccount>(`/finance/bank_account/${id}/`, data),

  delete: (id: number) => api.delete<void>(`/finance/bank_account/${id}/`),
}

export const ChartAccountService = {
  list: (is_active?: boolean) => {
    const query = is_active ? `?status=${is_active}` : ""
    return api.get<ChartAccount[]>(`/finance/chart_account/${query}`)
  },

  get: (id: number) => api.get<ChartAccount>(`/finance/chart_account/${id}/`),

  create: (data: ChartAccountPayload) =>
    api.post<ChartAccount>("/finance/chart_account/create/", data),

  update: (id: number, data: Partial<ChartAccountPayload>) =>
    api.patch<ChartAccount>(`/finance/chart_account/${id}/`, data),

  delete: (id: number) => api.delete<void>(`/finance/chart_account/${id}/`),
}

export const TransactionsService = {
  list: (filters?: {
    account_type?: string
    status?: string
    year?: string
    month?: string
    property?: string
    contract?: string
  }) => {
    const params = new URLSearchParams()
    if (filters?.account_type) params.append("account_type", filters.account_type)
    if (filters?.status) params.append("status", filters.status)
    if (filters?.year) params.append("year", filters.year)
    if (filters?.month) params.append("month", filters.month)
    if (filters?.property) params.append("property", filters.property)
    if (filters?.contract) params.append("contract", filters.contract)
    const query = params.toString()
    return api.get<Transactions[]>(`/finance/transactions/${query ? `?${query}` : ""}`)
  },

  get: (id: number) => api.get<Transactions>(`/finance/transactions/${id}/`),

  create: (data: TransactionsPayload) =>
    api.post<Transactions>("/finance/transactions/create/", data),

  /** Marca como pago — o backend gera automaticamente a entrada bancária. */
  markPaid: (id: number, paymentDate: string) =>
    api.patch<Transactions>(`/finance/transactions/${id}/`, {
      status: "PAID",
      payment_date: paymentDate,
    }),

  update: (id: number, data: Partial<TransactionsPayload>) =>
    api.patch<Transactions>(`/finance/transactions/${id}/`, data),

  delete: (id: number) => api.delete<void>(`/finance/transactions/${id}/`),
}

export const BankAccountEntriesService = {
  list: (bankAccountId?: number, year?: number, month?: number) => {
    const params = new URLSearchParams()
    if (bankAccountId) params.append("bank_account", String(bankAccountId))
    if (year) params.append("year", String(year))
    if (month) params.append("month", String(month))
    return api.get<BankAccountEntries[]>(`/finance/entries/?${params}`)
  },

  get: (id: number) => api.get<BankAccountEntries>(`/finance/entries/${id}/`),

  create: (data: BankAccountEntriesPayload) =>
    api.post<BankAccountEntries>("/finance/entries/create/", data),
}

export interface OverdueCharge {
  transaction_id: number
  description: string
  amount: string
  due_date: string
  competence_date: string
  days_late: number
  tenant_id: number | null
  tenant_name: string | null
  tenant_email: string | null
  tenant_phone: string | null
  property_id: number | null
  property_description: string | null
  contract_id: number | null
}

export interface OverdueResponse {
  count: number
  total_amount: string
  charges: OverdueCharge[]
}

export const CollectionsService = {
  /** Cobranças em atraso, com dados do inquilino. */
  listOverdue: () => api.get<OverdueResponse>("/finance/collections/overdue/"),

  /** Marca como EM ATRASO as cobranças pendentes vencidas. */
  markOverdue: () => api.post<{ marked_overdue: number }>(
    "/finance/collections/mark-overdue/",
    {},
  ),

  /** Pré-visualiza o e-mail de cobrança. */
  previewEmail: (transactionId: number) =>
    api.get<{ to: string | null; subject: string; body: string }>(
      `/finance/collections/${transactionId}/email-preview/`,
    ),

  /** Envia o e-mail de cobrança ao inquilino. */
  sendEmail: (transactionId: number) =>
    api.post<{ sent: boolean; to: string; subject: string }>(
      `/finance/collections/${transactionId}/send-email/`,
      {},
    ),
}

export const ContractsFilesService = {
  /** URL do contrato em PDF (módulo Emissão de arquivos). */
  contractPdfUrl: (contractId: number) =>
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/contracts/${contractId}/contract-pdf/`,
}
