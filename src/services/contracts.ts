// src/services/contracts.ts
import { api } from './api'
import type { Contract, ContractPayload } from '@/src/types/contract'

export const contractsService = {
  list: (status?: string) => {
    const query = status ? `?status=${status}` : ''
    return api.get<Contract[]>(`/contracts/${query}`)
  },

  get: (id: number) =>
    api.get<Contract>(`/contracts/${id}/`),

  create: (data: ContractPayload) =>
    api.post<Contract>('/contracts/create/', data),

  update: (id: number, data: Partial<ContractPayload>) =>
    api.patch<Contract>(`/contracts/${id}/`, data),

  delete: (id: number) =>
    api.delete<void>(`/contracts/${id}/`),

  renew: (id: number, data: ContractPayload) =>
    api.post<Contract>(`/contracts/${id}/renew/`, data),
}