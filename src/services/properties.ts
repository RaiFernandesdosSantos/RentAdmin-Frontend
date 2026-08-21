import { api } from "./api"
import { Property, PropertyPayload } from "../types/property"

export const PropertyService = {
  list: () => {
    return api.get<Property[]>(`/properties/`)
  },

  get: (id: number) => api.get<Property>(`/properties/${id}/`),

  create: (data: PropertyPayload) =>
    api.post<Property>("/properties/create/", data),

  update: (id: number, data: Partial<PropertyPayload>) =>
    api.patch<Property>(`/properties/${id}/`, data),

  delete: (id: number) => api.delete<void>(`/properties/${id}/`),
}
