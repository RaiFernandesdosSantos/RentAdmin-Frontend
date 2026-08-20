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
  list: () => {
    return api.get<Transactions[]>(`/finance/transactions/`)
  },

  get: (id: number) => api.get<Transactions>(`/finance/transactions/${id}/`),

  create: (data: TransactionsPayload) =>
    api.post<Transactions>("/finance/transactions/create/", data),

  update: (id: number, data: Partial<TransactionsPayload>) =>
    api.patch<Transactions>(`/finance/transactions/${id}/`, data),

  delete: (id: number) => api.delete<void>(`/finance/transactions/${id}/`),
}

export const BankAccountEntriesService = {
  list: () => {
    return api.get<BankAccountEntries[]>(`/finance/entries/`)
  },

  get: (id: number) => api.get<BankAccountEntries>(`/finance/entries/${id}/`),

  create: (data: BankAccountEntriesPayload) =>
    api.post<BankAccountEntries>("/finance/entries/create/", data),

  update: (id: number, data: Partial<BankAccountEntriesPayload>) =>
    api.patch<BankAccountEntries>(`/finance/entries/${id}/`, data),
}
