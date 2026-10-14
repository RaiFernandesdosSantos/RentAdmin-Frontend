import { api } from "./api"
import type { SystemSettings } from "../types/settings"

export const settingsService = {
  get: () => api.get<SystemSettings>("/settings/"),
  update: (data: unknown) => api.patch<SystemSettings>("/settings/", data),
}
