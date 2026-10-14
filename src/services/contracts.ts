// src/services/contracts.ts
import { api } from "./api"
import type { Contract, ContractPayload } from "@/src/types/contract"

export const contractsService = {
  list: (filters?: {
    tenant?: string
    guarantor?: string
    property?: string
    status?: string
  }) => {
    const params = new URLSearchParams()
    if (filters?.tenant) params.append("tenant", filters.tenant)
    if (filters?.guarantor) params.append("guarantor", filters.guarantor)
    if (filters?.property) params.append("property", filters.property)
    if (filters?.status) params.append("status", filters.status)
    const query = params.toString()
    return api.get<Contract[]>(`/contracts/${query ? `?${query}` : ""}`)
  },

  get: (id: number) => api.get<Contract>(`/contracts/${id}/`),

  create: (data: ContractPayload) =>
    api.post<Contract>("/contracts/create/", data),

  update: (id: number, data: Partial<ContractPayload>) =>
    api.patch<Contract>(`/contracts/${id}/`, data),

  delete: (id: number) => api.delete<void>(`/contracts/${id}/`),

  /** Encerra o contrato antecipadamente e cancela cobranças em aberto. */
  close: (id: number) => api.post<Contract>(`/contracts/${id}/close/`, {}),
}
