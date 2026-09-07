import { api } from "./api"
import { Tenant, TenantPayload } from "../types/tenant"

export const TenantService = {
  list: () => {
    return api.get<Tenant[]>(`/tenants/`)
  },

  get: (id: number) => api.get<Tenant>(`/tenants/${id}/`),

  create: (data: TenantPayload) => api.post<Tenant>("/tenants/create/", data),

  update: (id: number, data: Partial<TenantPayload>) =>
    api.patch<Tenant>(`/tenants/${id}/`, data),

  delete: (id: number) => api.delete<void>(`/tenants/${id}/`),
}
