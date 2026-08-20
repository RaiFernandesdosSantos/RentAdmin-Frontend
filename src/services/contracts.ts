// src/services/contracts.ts
import { api } from "./api"
import type { Contract, ContractPayload } from "@/src/types/contract"

export const contractsService = {
  list: () => {
    return api.get<Contract[]>(`/contracts/`)
  },

  get: (id: number) => api.get<Contract>(`/contracts/${id}/`),

  create: (data: ContractPayload) =>
    api.post<Contract>("/contracts/create/", data),

  update: (id: number, data: Partial<ContractPayload>) =>
    api.patch<Contract>(`/contracts/${id}/`, data),

  delete: (id: number) => api.delete<void>(`/contracts/${id}/`),

  //Criar modulo para renovação de contratos (Duplicar e extenter data)

  // renew: (id: number, data: ContractPayload) =>
  //   api.post<Contract>(`/contracts/${id}/renew/`, data),
}
