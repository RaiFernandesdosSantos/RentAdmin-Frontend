// src/lib/format.ts

/**
 * Formata um valor monetário para o padrão brasileiro
 * Ex: "1500.00" → "R$ 1.500,00"
 */
export function formatCurrency(
  value: string | number | null | undefined
): string {
  if (value === null || value === undefined || value === "") return "—"
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value))
}

/**
 * Formata uma data ISO para o padrão brasileiro
 * Ex: "2025-03-01" → "01/03/2025"
 */
export function formatDate(value: string | null | undefined): string {
  if (!value) return "—"
  // datas (YYYY-MM-DD) recebem T00:00:00 para evitar problema de fuso;
  // datetimes (contêm "T") são usados como estão
  const iso = value.includes("T") ? value : `${value}T00:00:00`
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return "—"
  return new Intl.DateTimeFormat("pt-BR").format(date)
}

/**
 * Formata data e hora
 * Ex: "2025-03-01T14:30:00" → "01/03/2025 14:30"
 */
export function formatDateTime(value: string | null | undefined): string {
  if (!value) return "—"
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value))
}

/**
 * Formata um número como percentual
 * Ex: 8.1 → "8,1%"
 */
export function formatPercent(
  value: number | null | undefined,
  decimals = 1
): string {
  if (value === null || value === undefined) return "—"
  return `${value.toFixed(decimals).replace(".", ",")}%`
}

/**
 * Converte "1.500,00" para "1500.00" antes de mandar pra API
 */
export function parseCurrency(value: string): string {
  return value
    .replace(/\./g, "") // remove separador de milhar
    .replace(",", ".") // troca vírgula por ponto
}

/**
 * Formata mês/ano
 * Ex: { year: 2025, month_number: 3 } → "Mar/25"
 */
export function formatMonthYear(year: number, month: number): string {
  return new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    year: "2-digit",
  }).format(new Date(year, month - 1, 1))
}

/**
 * Retorna quantos dias faltam até uma data
 * Ex: "2025-03-15" → 22 (se hoje for 21/02/2025)
 */
export function daysUntil(value: string | null | undefined): number | null {
  if (!value) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(`${value}T00:00:00`)
  const diff = target.getTime() - today.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

/**
 * Formata número com separador de milhar
 * Ex: 1500 → "1.500"
 */
export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—"
  return new Intl.NumberFormat("pt-BR").format(value)
}
