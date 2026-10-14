import { api } from "./api"
import {
  DREData,
  DFCData,
  MonthlyRevenue,
  AnalyticsSummary,
} from "../types/analytics"

export const analyticsService = {
  summary: (year?: number, month?: number) => {
    const params = new URLSearchParams()
    if (year) params.append("year", String(year))
    if (month) params.append("month", String(month))
    const query = params.toString()
    return api.get<AnalyticsSummary>(`/analytics/summary/${query ? `?${query}` : ""}`)
  },

  revenueChart: (year?: number) => {
    const params = new URLSearchParams()
    if (year) params.append("year", String(year))
    const query = params.toString()
    return api.get<MonthlyRevenue[]>(`/analytics/revenue-chart/${query ? `?${query}` : ""}`)
  },

  dre: (year: number, month: number, period = "monthly") =>
    api.get<DREData>(
      `/analytics/dre/?year=${year}&month=${month}&period=${period}`
    ),

  dfc: (year: number, month: number, period = "monthly") =>
    api.get<DFCData>(
      `/analytics/dfc/?year=${year}&month=${month}&period=${period}`
    ),
}
