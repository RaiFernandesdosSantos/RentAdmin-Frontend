export interface Property {
  id: number
  description: string
  property_type: number
  street: string
  number: string
  neighborhood: string
  registration: string
  zip_code: string
  acquisition_price?: string | null
  acquisition_date?: string | null
  actual_value?: string | null
  square_meters: string
  number_of_bedrooms: number
  number_of_bathrooms: number
  garage_spaces: number
  status: number
  sold_price?: string | null
  created_at: string
  updated_at: string
}

export interface PropertyPayload {
  description: string
  property_type: number
  street: string
  number: string
  neighborhood: string
  registration: string
  zip_code: string //Adicionar busca automatica de CEP -> endereço ou endereço -> CEP
  acquisition_price?: string | null
  acquisition_date?: string | null
  actual_value?: string | null
  square_meters: string
  number_of_bedrooms?: number | null
  number_of_bathrooms?: number | null
  garage_spaces?: number | null
  status: number
  sold_price?: string | null
}
