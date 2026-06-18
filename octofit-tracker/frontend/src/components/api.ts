// export const VITE_CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
export const VITE_CODESPACE_NAME = 'crispy-space-chainsaw-p4x7vrpxxgc75r7'

export const BASE_API_URL = VITE_CODESPACE_NAME
  ? `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getResourceUrl(resource: string) {
  return `${BASE_API_URL}/${resource}`
}

export function normalizeListResponse(json: unknown) {
  if (Array.isArray(json)) {
    return { items: json, pageInfo: null }
  }

  if (json && typeof json === 'object') {
    const data = json as Record<string, unknown>
    if (Array.isArray(data.data)) {
      return { items: data.data, pageInfo: data.page ?? null }
    }
    if (Array.isArray(data.results)) {
      return { items: data.results, pageInfo: data.page ?? null }
    }
    if (Array.isArray(data.items)) {
      return { items: data.items, pageInfo: data.page ?? null }
    }
  }

  return { items: [], pageInfo: null }
}
