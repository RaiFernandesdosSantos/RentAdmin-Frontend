import { api } from "./api"
import { Tenant, TenantPayload } from "../types/tenant"

export const TenantService = {
  list: () => {
    return api.get<Tenant[]>(`/properties/`)
  },

  get: (id: number) => api.get<Tenant>(`/properties/${id}/`),

  create: (data: TenantPayload) =>
    api.post<Tenant>("/properties/create/", data),

  update: (id: number, data: Partial<TenantPayload>) =>
    api.patch<Tenant>(`/properties/${id}/`, data),

  delete: (id: number) => api.delete<void>(`/properties/${id}/`),
}
