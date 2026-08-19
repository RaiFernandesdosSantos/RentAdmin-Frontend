export interface Property{
    id: number
    description: string
    property_type: "LAND" | "RESIDENCIAL" | "COMERCIAL"
    street: string
    number: string
    neighborhood: string
    registration: string
    city: string
    state: string
    zip_code: string
    acquisition_price?: string | null
    acquisition_date?: string | null
    actual_value?: string | null
    square_meters: string
    number_of_bedrooms: number
    number_of_bathrooms: number
    garage_spaces: number
    status: "AVAILABLE" | "RENTED" | "MAINTENANCE" | "SOLD"
    sold_price?: string | null
    created_at: string
    updated_at: string
}

export interface PropertyPayload{
    description: string
    property_type: "LAND" | "RESIDENCIAL" | "COMERCIAL"
    street: string
    number: string
    neighborhood: string
    registration: string
    city: string
    state: string
    zip_code: string
    acquisition_price?: string | null
    acquisition_date?: string | null
    actual_value?: string | null
    square_meters: string
    number_of_bedrooms: number
    number_of_bathrooms: number
    garage_spaces: number
    status: "AVAILABLE" | "RENTED" | "MAINTENANCE" | "SOLD"
    sold_price?: string | null
}