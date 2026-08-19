const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

async function request<T>(endpoint: string, options?: RequestInit): Promise<T>{
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        ...options
    })

    if(!response.ok){
        const error = await response.json().catch(() => ({}))
        throw new Error(error.detail || `Erro ${response.status}`)
    }

    if(response.status === 204) return null as T
    
    return response.json()
}

export const api = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: unknown) => request<T>(url, { method: 'POST', body: JSON.stringify(data) }),
  put: <T>(url: string, data: unknown) => request<T>(url, { method: 'PUT', body: JSON.stringify(data) }),
  patch: <T>(url: string, data: unknown) => request<T>(url, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: <T>(url: string) => request<T>(url, { method: 'DELETE' }),
}