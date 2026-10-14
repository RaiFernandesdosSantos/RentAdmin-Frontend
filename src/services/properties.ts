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

  /** Registra a venda do imóvel (status, preço e data). */
  sell: (id: number, soldPrice: string, soldDate: string) =>
    api.patch<Property>(`/properties/${id}/sold/`, {
      sold_price: soldPrice,
      sold_date: soldDate,
    }),
}
