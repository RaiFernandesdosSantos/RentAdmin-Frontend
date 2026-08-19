export interface Tenant{
    id: number
    name: string
    cpf: string
    email: string
    phone_number: string
    guarantor: boolean
    profession: string
    monthly_income: string
    zip_code: string
    street: string
    number: string
    neighborhood: string
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface TenantPayload{
    name: string
    cpf: string
    email: string
    phone_number: string
    guarantor: boolean
    profession: string
    monthly_income: string
    zip_code: string
    street: string
    number: string
    neighborhood: string
    is_active: boolean
}